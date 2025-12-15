export class BinaryReader {
    buffer;
    view;
    offset;
    constructor(buffer) {
        this.buffer = buffer;
        this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        this.offset = 0;
    }
    get pos() {
        return this.offset;
    }
    set pos(value) {
        this.offset = value;
    }
    get byteLength() {
        return this.buffer.byteLength;
    }
    eof() {
        return this.offset >= this.buffer.byteLength;
    }
    readByte() {
        if (this.eof()) {
            throw new Error("Unexpected EOF");
        }
        return this.buffer[this.offset++];
    }
    readBytes(length) {
        if (this.offset + length > this.buffer.byteLength) {
            throw new Error("Unexpected EOF reading bytes");
        }
        const result = this.buffer.subarray(this.offset, this.offset + length);
        this.offset += length;
        return result;
    }
    peek() {
        if (this.eof())
            return -1;
        return this.buffer[this.offset];
    }
    // Helper for direct reading if needed
    readF32() {
        if (this.offset + 4 > this.buffer.byteLength)
            throw new Error("Unexpected EOF reading f32");
        const val = this.view.getFloat32(this.offset, true); // Little endian
        this.offset += 4;
        return val;
    }
    readF64() {
        if (this.offset + 8 > this.buffer.byteLength)
            throw new Error("Unexpected EOF reading f64");
        const val = this.view.getFloat64(this.offset, true); // Little endian
        this.offset += 8;
        return val;
    }
}
