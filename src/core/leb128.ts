import { BinaryReader } from "./binary-reader";

/**
 * Utilities for reading LEB128 (Little Endian Base 128) encoded values.
 * LEB128 is a variable-length code compression method used in WebAssembly.
 * Reference: https://webassembly.github.io/spec/core/binary/values.html#integers
 */
export const LEB128 = {
	/**
	 * Reads a variable-length unsigned 32-bit integer (varuint32).
	 * @param reader The BinaryReader instance to read from.
	 * @returns The decoded unsigned 32-bit integer.
	 * @throws Error if the integer representation is too long.
	 */
	readVarUint32(reader: BinaryReader): number {
		let result = 0;
		let shift = 0;
		while (true) {
			const byte = reader.readByte();
			result |= (byte & 0x7f) << shift;
			if ((byte & 0x80) === 0) break;
			shift += 7;
			if (shift >= 32) {
				// Although spec says "It is a validation error if the result of unsigned LEB128 does not fit",
				// we'll just guard against infinite loops/massive shifts in JS numbers.
				// JS bitwise operators treat numbers as 32-bit signed integers, so huge numbers might behave oddly if we rely on bitwise too much for the final value,
				// but here we are accumulating a number.
				// For > 32 bits we'd need bigint, but this is readVarUint32.
				// If we exceed safe 32-bit range (or 53-bit JS safe integer), we should stop or throw.
				// Standard max length for u32 is 5 bytes.
				if (shift > 35) throw new Error("Integer representation too long");
			}
		}
		return result >>> 0; // Ensure unsigned 32-bit
	},

	/**
	 * Reads a variable-length signed 32-bit integer (varint32).
	 * @param reader The BinaryReader instance to read from.
	 * @returns The decoded signed 32-bit integer.
	 * @throws Error if the integer representation is too long.
	 */
	readVarInt32(reader: BinaryReader): number {
		let result = 0;
		let shift = 0;
		let byte = 0;
		while (true) {
			byte = reader.readByte();
			result |= (byte & 0x7f) << shift;
			shift += 7;
			if ((byte & 0x80) === 0) break;
			if (shift >= 32) {
				// Max length for i32 is 5 bytes
				if (shift > 35) throw new Error("Integer representation too long");
			}
		}

		// Sign extension
		if (shift < 32 && byte & 0x40) {
			result |= ~0 << shift;
		}
		return result;
	},

	/**
	 * Reads a variable-length signed 64-bit integer (varint64).
	 * Uses BigInt to support 64-bit values in JavaScript.
	 * @param reader The BinaryReader instance to read from.
	 * @returns The decoded signed 64-bit integer as a BigInt.
	 * @throws Error if the integer representation is too long.
	 */
	readVarInt64(reader: BinaryReader): bigint {
		let result = 0n;
		let shift = 0n;
		let byte = 0;
		while (true) {
			byte = reader.readByte();
			result |= BigInt(byte & 0x7f) << shift;
			shift += 7n;
			if ((byte & 0x80) === 0) break;
			if (shift >= 64n) {
				// Max length for i64 is 10 bytes (70 bits capacity, but 64 used)
				if (shift > 70n) throw new Error("Integer representation too long");
			}
		}

		// Sign extension
		if (shift < 64n && byte & 0x40) {
			// Create a mask of 1s from bit `shift` upwards
			// ~0n is ...111111
			// We need to shift it left by `shift`
			// Use boolean logic for clarity/correctness in comments if confusing, but bitwise is standard
			const mask = ~0n << shift;
			result |= mask;
		}
		return result;
	},
};
