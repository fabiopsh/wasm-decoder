import { WasmModule, ValType, Instruction, FuncBody } from "./types";
import { Opcode } from "./constants";

/**
 * Converts a parsed WasmModule back into the WebAssembly Text Format (WAT).
 * This is useful for debugging and displaying the structure of a WASM file.
 */
export class WatFormatter {
	private module: WasmModule;
	private indentLevel: number = 0;
	private lines: string[] = [];

	/**
	 * Creates a new WatFormatter instance.
	 * @param module The WasmModule to format.
	 */
	constructor(module: WasmModule) {
		this.module = module;
	}

	/**
	 * Generates a string representation of the WasmModule in WAT format.
	 * @returns The formatted WAT string.
	 */
	format(): string {
		this.lines = [];
		this.indentLevel = 0;

		this.emit("(module");
		this.indent();

		// 1. Types
		this.module.types.forEach((type, index) => {
			const params = type.params.length ? ` (param ${type.params.map(this.formatType).join(" ")})` : "";
			const results = type.results.length ? ` (result ${type.results.map(this.formatType).join(" ")})` : "";
			this.emit(`(type $t${index} (func${params}${results}))`);
		});

		// 2. Functions (Indices match functionSection and codes)
		// We need to map exports to function indices to give them names if we want, or just print exports separately.
		// In WAT, exports can be inline: (func (export "name") ...)
		// For simplicity, let's list exports separately or just use standard separate (export ...) statements at the bottom?
		// standard WAT usually puts (func) then others.

		// Let's iterate over defined functions.
		// Note: If imports existed, function index space would include them. We assume no imports for this scope.
		this.module.functionSection.forEach((typeIdx, funcIdx) => {
			const type = this.module.types[typeIdx];
			const body = this.module.codes[funcIdx];

			// Check if exported
			const exportEntry = this.module.exports.find((e) => e.kind === 0 && e.index === funcIdx);
			const exportStr = exportEntry ? ` (export "${exportEntry.name}")` : "";

			// Params/Results from type
			// To make it look like "func $0 (type $t0) ...", or expand params.
			// Expanding is more readable.
			const params = type.params.length
				? ` (param ${type.params.map((t, i) => `p${i} ${this.formatType(t)}`).join(" ")})`
				: "";
			const results = type.results.length ? ` (result ${type.results.map(this.formatType).join(" ")})` : "";

			this.emit(`(func $f${funcIdx}${exportStr} (type $t${typeIdx})${params}${results}`);
			this.indent();

			// Locals
			body.locals.forEach((localGroup) => {
				const typeStr = this.formatType(localGroup.type);
				for (let i = 0; i < localGroup.count; i++) {
					this.emit(`(local ${typeStr})`);
				}
			});

			// Body
			body.instructions.forEach((instr) => {
				this.emitInstruction(instr);
			});

			this.outdent();
			this.emit(")");
		});

		// 3. Other exports (Memory, Table, Global if we had them) -> we only parsed basic exports
		// The loop above handled func exports inline?
		// Wait, if I do inline `(export ...)` on the func, I don't need a separate export section in output.
		// But if there are other exports (e.g. memory) handled by a future version...
		// For this spec, we just handle functions mainly.
		// Let's check if any export was NOT a function?
		this.module.exports.forEach((e) => {
			if (e.kind !== 0) {
				this.emit(`(export "${e.name}" (... kind ${e.kind} index ${e.index}))`);
			}
		});

		this.outdent();
		this.emit(")");

		return this.lines.join("\n");
	}

	/**
	 * Emits a single instruction.
	 * Calls appropriate indentation for block structures.
	 * @param instr The instruction to emit.
	 */
	private emitInstruction(instr: Instruction) {
		const operands = instr.operands
			.map((op) => {
				if (typeof op === "bigint") return op.toString();
				return op.toString();
			})
			.join(" ");

		const space = operands ? " " : "";

		// Indentation for block/loop/if could be nice
		if (instr.mnemonic === "end") {
			this.outdent();
		}

		this.emit(`${instr.mnemonic}${space}${operands}`);

		if (["block", "loop", "if", "else"].includes(instr.mnemonic)) {
			this.indent();
		}
		// 'else' specifically should be "dedent then indent" but simplest is just indent next.
		// Actually 'else' is: dedent previous block part, indent else part.
		// But we just indent.
	}

	/**
	 * Formats a ValType enum into its string representation.
	 * @param type The value type.
	 * @returns The string representation (e.g., "i32", "f64").
	 */
	private formatType(type: ValType): string {
		// enum to string
		switch (type) {
			case ValType.i32:
				return "i32";
			case ValType.i64:
				return "i64";
			case ValType.f32:
				return "f32";
			case ValType.f64:
				return "f64";
			default:
				return "unknown";
		}
	}

	/**
	 * Helper to append a line with current indentation.
	 * @param line The line definition.
	 */
	private emit(line: string) {
		this.lines.push(`${"  ".repeat(this.indentLevel)}${line}`);
	}

	/**
	 * Increases indentation level.
	 */
	private indent() {
		this.indentLevel++;
	}

	/**
	 * Decreases indentation level.
	 */
	private outdent() {
		this.indentLevel = Math.max(0, this.indentLevel - 1);
	}
}
