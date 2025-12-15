export const LEB128 = {
    readVarUint32(reader) {
        let result = 0;
        let shift = 0;
        while (true) {
            const byte = reader.readByte();
            result |= (byte & 0x7f) << shift;
            if ((byte & 0x80) === 0)
                break;
            shift += 7;
            if (shift >= 32) {
                // Although spec says "It is a validation error if the result of unsigned LEB128 does not fit",
                // we'll just guard against infinite loops/massive shifts in JS numbers.
                // JS bitwise operators treat numbers as 32-bit signed integers, so huge numbers might behave oddly if we rely on bitwise too much for the final value,
                // but here we are accumulating a number.
                // For > 32 bits we'd need bigint, but this is readVarUint32.
                // If we exceed safe 32-bit range (or 53-bit JS safe integer), we should stop or throw.
                // Standard max length for u32 is 5 bytes.
                if (shift > 35)
                    throw new Error("Integer representation too long");
            }
        }
        return result >>> 0; // Ensure unsigned 32-bit
    },
    readVarInt32(reader) {
        let result = 0;
        let shift = 0;
        let byte = 0;
        while (true) {
            byte = reader.readByte();
            result |= (byte & 0x7f) << shift;
            shift += 7;
            if ((byte & 0x80) === 0)
                break;
            if (shift >= 32) {
                // Max length for i32 is 5 bytes
                if (shift > 35)
                    throw new Error("Integer representation too long");
            }
        }
        // Sign extension
        if (shift < 32 && byte & 0x40) {
            result |= ~0 << shift;
        }
        return result;
    },
    readVarInt64(reader) {
        let result = 0n;
        let shift = 0n;
        let byte = 0;
        while (true) {
            byte = reader.readByte();
            result |= BigInt(byte & 0x7f) << shift;
            shift += 7n;
            if ((byte & 0x80) === 0)
                break;
            if (shift >= 64n) {
                // Max length for i64 is 10 bytes (70 bits capacity, but 64 used)
                if (shift > 70n)
                    throw new Error("Integer representation too long");
            }
        }
        // Sign extension
        if (shift < 64n && byte & 0x40) {
            // Create a mask of 1s from bit `shift` upwards
            // ~0n is ...111111
            // We need to shift it left by `shift`
            const mask = ~0n << shift;
            result |= mask;
        }
        return result;
    },
};
