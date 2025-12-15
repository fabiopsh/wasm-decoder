export class BinaryReader {
	private buffer: Uint8Array;
	private view: DataView;
	private offset: number;

	constructor(buffer: Uint8Array) {
		this.buffer = buffer;
		this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
		this.offset = 0;
	}

	get pos(): number {
		return this.offset;
	}

	set pos(value: number) {
		this.offset = value;
	}

	get byteLength(): number {
		return this.buffer.byteLength;
	}

	eof(): boolean {
		return this.offset >= this.buffer.byteLength;
	}

	readByte(): number {
		if (this.eof()) {
			throw new Error("Unexpected EOF");
		}
		return this.buffer[this.offset++];
	}

	readBytes(length: number): Uint8Array {
		if (this.offset + length > this.buffer.byteLength) {
			throw new Error("Unexpected EOF reading bytes");
		}
		const result = this.buffer.subarray(this.offset, this.offset + length);
		this.offset += length;
		return result;
	}

	peek(): number {
		if (this.eof()) return -1;
		return this.buffer[this.offset];
	}

	// Helper for direct reading if needed
	readF32(): number {
		if (this.offset + 4 > this.buffer.byteLength) throw new Error("Unexpected EOF reading f32");
		const val = this.view.getFloat32(this.offset, true); // Little endian
		this.offset += 4;
		return val;
	}

	readF64(): number {
		if (this.offset + 8 > this.buffer.byteLength) throw new Error("Unexpected EOF reading f64");
		const val = this.view.getFloat64(this.offset, true); // Little endian
		this.offset += 8;
		return val;
	}
}
