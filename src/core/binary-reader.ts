/**
 * Utility class for reading binary data from a buffer.
 * Keeps track of the current position (offset) and provides methods to read various data types.
 */
export class BinaryReader {
	private buffer: Uint8Array;
	private view: DataView;
	private offset: number;

	/**
	 * Creates a new BinaryReader instance.
	 * @param buffer The Uint8Array containing the binary data.
	 */
	constructor(buffer: Uint8Array) {
		this.buffer = buffer;
		this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
		this.offset = 0;
	}

	/**
	 * Gets the current read position (offset).
	 */
	get pos(): number {
		return this.offset;
	}

	/**
	 * Sets the current read position (offset).
	 */
	set pos(value: number) {
		this.offset = value;
	}

	/**
	 * Gets the total length of the buffer in bytes.
	 */
	get byteLength(): number {
		return this.buffer.byteLength;
	}

	/**
	 * Checks if the reader has reached the end of the buffer.
	 * @returns True if the offset is at or beyond the buffer length.
	 */
	eof(): boolean {
		return this.offset >= this.buffer.byteLength;
	}

	/**
	 * Reads a single byte from the buffer.
	 * @returns The byte value (0-255).
	 * @throws Error if trying to read past the end of the buffer.
	 */
	readByte(): number {
		if (this.eof()) {
			throw new Error("Unexpected EOF");
		}
		return this.buffer[this.offset++];
	}

	/**
	 * Reads a sequence of bytes from the buffer.
	 * @param length The number of bytes to read.
	 * @returns A Uint8Array containing the read bytes.
	 * @throws Error if trying to read past the end of the buffer.
	 */
	readBytes(length: number): Uint8Array {
		if (this.offset + length > this.buffer.byteLength) {
			throw new Error("Unexpected EOF reading bytes");
		}
		const result = this.buffer.subarray(this.offset, this.offset + length);
		this.offset += length;
		return result;
	}

	/**
	 * Peeks at the next byte without advancing the offset.
	 * @returns The next byte value, or -1 if EOF.
	 */
	peek(): number {
		if (this.eof()) return -1;
		return this.buffer[this.offset];
	}

	/**
	 * Reads a 32-bit floating point number (little-endian).
	 * @returns The read float value.
	 * @throws Error if trying to read past the end of the buffer.
	 */
	readF32(): number {
		if (this.offset + 4 > this.buffer.byteLength) throw new Error("Unexpected EOF reading f32");
		const val = this.view.getFloat32(this.offset, true); // Little endian
		this.offset += 4;
		return val;
	}

	/**
	 * Reads a 64-bit floating point number (little-endian).
	 * @returns The read float value.
	 * @throws Error if trying to read past the end of the buffer.
	 */
	readF64(): number {
		if (this.offset + 8 > this.buffer.byteLength) throw new Error("Unexpected EOF reading f64");
		const val = this.view.getFloat64(this.offset, true); // Little endian
		this.offset += 8;
		return val;
	}
}
