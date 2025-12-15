import { BinaryReader } from "./binary-reader";
import { LEB128 } from "./leb128";
import { MAGIC_NUMBER, VERSION, Opcode, OpcodeValue } from "./constants";
import { WasmModule, SectionId, ValType, FuncType, ExportEntry, FuncBody, Instruction } from "./types";

export class WasmParser {
	private reader: BinaryReader;
	private module: WasmModule;

	constructor(buffer: Uint8Array) {
		this.reader = new BinaryReader(buffer);
		this.module = {
			types: [],
			functionSection: [],
			exports: [],
			codes: [],
		};
	}

	parse(): WasmModule {
		this.validateHeader();

		while (!this.reader.eof()) {
			const sectionId = this.reader.readByte();
			const sectionSize = LEB128.readVarUint32(this.reader);
			const sectionEnd = this.reader.pos + sectionSize;

			switch (sectionId) {
				case SectionId.Type:
					this.parseTypeSection();
					break;
				case SectionId.Function:
					this.parseFunctionSection();
					break;
				case SectionId.Export:
					this.parseExportSection();
					break;
				case SectionId.Code:
					this.parseCodeSection();
					break;
				default:
					// Skip other sections for now
					this.reader.pos = sectionEnd;
					break;
			}

			// Ensure we are exactly at the end of the section (validity check)
			if (this.reader.pos !== sectionEnd) {
				// If we under-read, skip to end. If we over-read, it's an error.
				if (this.reader.pos < sectionEnd) {
					this.reader.pos = sectionEnd;
				} else {
					console.warn(`Section ${sectionId} parsed past end`);
					// We can allow this or throw. For now, we trust the logic but reset to be safe if minor drift.
					// Actually, over-read is usually a bug in parsing logic.
				}
			}
		}

		return this.module;
	}

	private validateHeader() {
		const magic = this.reader.readBytes(4);
		// 0x00 0x61 0x73 0x6d -> 0x6d736100 (LE)
		const magicNum = new DataView(magic.buffer, magic.byteOffset, 4).getUint32(0, true);
		if (magicNum !== MAGIC_NUMBER) {
			throw new Error(`Invalid magic number: ${magicNum.toString(16)}`);
		}

		const version = this.reader.readBytes(4);
		const verNum = new DataView(version.buffer, version.byteOffset, 4).getUint32(0, true);
		if (verNum !== VERSION) {
			throw new Error(`Unsupported version: ${verNum}`);
		}
	}

	private parseTypeSection() {
		const count = LEB128.readVarUint32(this.reader);
		for (let i = 0; i < count; i++) {
			const form = this.reader.readByte();
			if (form !== 0x60) {
				throw new Error(`Unexpected type form: ${form.toString(16)}`);
			}

			const paramCount = LEB128.readVarUint32(this.reader);
			const params: ValType[] = [];
			for (let j = 0; j < paramCount; j++) {
				params.push(this.reader.readByte());
			}

			const resultCount = LEB128.readVarUint32(this.reader);
			const results: ValType[] = [];
			for (let j = 0; j < resultCount; j++) {
				results.push(this.reader.readByte());
			}

			this.module.types.push({ params, results });
		}
	}

	private parseFunctionSection() {
		const count = LEB128.readVarUint32(this.reader);
		for (let i = 0; i < count; i++) {
			const typeIdx = LEB128.readVarUint32(this.reader);
			this.module.functionSection.push(typeIdx);
		}
	}

	private parseExportSection() {
		const count = LEB128.readVarUint32(this.reader);
		for (let i = 0; i < count; i++) {
			const nameLen = LEB128.readVarUint32(this.reader);
			const nameBytes = this.reader.readBytes(nameLen);
			const name = new TextDecoder("utf-8").decode(nameBytes);

			const kind = this.reader.readByte();
			const index = LEB128.readVarUint32(this.reader);

			this.module.exports.push({ name, kind, index });
		}
	}

	private parseCodeSection() {
		const count = LEB128.readVarUint32(this.reader);
		for (let i = 0; i < count; i++) {
			const bodySize = LEB128.readVarUint32(this.reader);
			const bodyStart = this.reader.pos;

			// Parse locals
			const localVecCount = LEB128.readVarUint32(this.reader);
			const locals: { count: number; type: ValType }[] = [];
			for (let l = 0; l < localVecCount; l++) {
				const n = LEB128.readVarUint32(this.reader);
				const t = this.reader.readByte();
				locals.push({ count: n, type: t });
			}

			// Parse instructions
			const instructions = this.parseInstructions(bodyStart + bodySize);

			this.module.codes.push({ locals, instructions });

			// Ensure we end at body completion
			if (this.reader.pos !== bodyStart + bodySize) {
				this.reader.pos = bodyStart + bodySize;
			}
		}
	}

	private parseInstructions(endPos: number): Instruction[] {
		const instructions: Instruction[] = [];
		while (this.reader.pos < endPos) {
			const opcode = this.reader.readByte();

			// Handle 'end' of function
			if (opcode === Opcode.end && this.reader.pos === endPos) {
				// This 'end' terminates the function body.
				// But 'end' is also a real instruction for blocks.
				// The logic here is simplistic: we parse until we hit the strict byte limit declared by Code Section.
				// Inside blocks, 'end' will be just another instruction.
				break;
			}

			const instr = this.decodeInstruction(opcode);
			instructions.push(instr);
		}
		return instructions;
	}

	private decodeInstruction(opcode: number): Instruction {
		const instr: Instruction = {
			opcode,
			mnemonic: this.getMnemonic(opcode),
			operands: [],
		};

		switch (opcode) {
			case Opcode.block:
			case Opcode.loop:
			case Opcode.if:
				// block type (varint or 0x40 for empty)
				// simplified: reading a byte or varint used for type
				// Spec says "blocktype". It is either 0x40 (void) or a ValType.
				// Both fit in a byte mostly, but technically it's a type index or valtype.
				// Read a byte for now (usually signed 33 bit, but practically 1 byte for primitives)
				const blockType = this.reader.readByte();
				instr.operands.push(blockType);
				break;

			case Opcode.br:
			case Opcode.br_if:
			case Opcode.call:
			case Opcode.local_get:
			case Opcode.local_set:
			case Opcode.local_tee:
			case Opcode.global_get:
			case Opcode.global_set:
				instr.operands.push(LEB128.readVarUint32(this.reader));
				break;

			case Opcode.i32_const:
				instr.operands.push(LEB128.readVarInt32(this.reader));
				break;

			case Opcode.i64_const:
				instr.operands.push(LEB128.readVarInt64(this.reader));
				break;

			case Opcode.f32_const:
				instr.operands.push(this.reader.readF32());
				break;

			case Opcode.f64_const:
				instr.operands.push(this.reader.readF64());
				break;
			// ... Add more cases as needed for specific immediate args

			default:
				// Simple opcodes with no operands (nop, return, i32.add etc) fall here
				break;
		}

		return instr;
	}

	private getMnemonic(opcode: number): string {
		// Reverse lookup from constants or a map
		const entry = Object.entries(Opcode).find(([k, v]) => v === opcode);
		return entry ? entry[0] : `unknown_0x${opcode.toString(16)}`;
	}
}
