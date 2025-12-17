/**
 * The standard WebAssembly Magic Number.
 * The first 4 bytes of a valid WASM binary are '\0asm' (0x00 0x61 0x73 0x6D).
 * Note: 0x6d736100 is indeed '\0asm' in little-endian.
 */
export const MAGIC_NUMBER = 0x6d736100;

/**
 * The supported WebAssembly Version.
 * Currently, only version 1 is standard.
 */
export const VERSION = 1;

/**
 * WebAssembly Opcodes.
 * A mapping of opcode mnemonics to their byte values.
 * Reference: https://webassembly.github.io/spec/core/binary/instructions.html
 */
export const Opcode = {
	// Control Flow Instructions
	unreachable: 0x00, // Traps immediately
	nop: 0x01, // No operation
	block: 0x02, // Begins a block
	loop: 0x03, // Begins a loop
	if: 0x04, // Begins an if-else block
	else: 0x05, // Else branch
	end: 0x0b, // End of a block/loop/if
	br: 0x0c, // Branch (jump) to a label
	br_if: 0x0d, // Conditional branch
	return: 0x0f, // Return from function
	call: 0x10, // Call a function
	call_indirect: 0x11, // Call function indirectly from table

	// Parametric Instructions
	drop: 0x1a, // Pop a value from the stack and discard it
	select: 0x1b, // Select one of two values based on condition

	// Variable Instructions
	local_get: 0x20, // Get value of a local variable
	local_set: 0x21, // Set value of a local variable
	local_tee: 0x22, // Set local variable and keep value on stack
	global_get: 0x23, // Get value of a global variable
	global_set: 0x24, // Set value of a global variable

	// Memory Instructions
	i32_load: 0x28, // Load 32-bit integer from memory
	i64_load: 0x29, // Load 64-bit integer from memory
	f32_load: 0x2a, // Load 32-bit float from memory
	f64_load: 0x2b, // Load 64-bit float from memory
	i32_store: 0x36, // Store 32-bit integer to memory
	i64_store: 0x37, // Store 64-bit integer to memory
	f32_store: 0x38, // Store 32-bit float to memory
	f64_store: 0x39, // Store 64-bit float to memory

	// Constants
	i32_const: 0x41, // Push a 32-bit integer constant
	i64_const: 0x42, // Push a 64-bit integer constant
	f32_const: 0x43, // Push a 32-bit float constant
	f64_const: 0x44, // Push a 64-bit float constant

	// Numeric Instructions (subset)
	i32_eqz: 0x45, // Compare i32 equal to zero
	i32_eq: 0x46, // Compare i32 equality
	i32_ne: 0x47, // Compare i32 inequality
	i32_lt_s: 0x48, // Compare i32 less than (signed)
	i32_lt_u: 0x49, // Compare i32 less than (unsigned)
	i32_gt_s: 0x4a, // Compare i32 greater than (signed)
	i32_gt_u: 0x4b, // Compare i32 greater than (unsigned)
	i32_le_s: 0x4c, // Compare i32 less than or equal (signed)
	i32_le_u: 0x4d, // Compare i32 less than or equal (unsigned)
	i32_ge_s: 0x4e, // Compare i32 greater than or equal (signed)
	i32_ge_u: 0x4f, // Compare i32 greater than or equal (unsigned)

	// i64 Comparison Instructions
	i64_eqz: 0x50, // Compare i64 equal to zero
	i64_eq: 0x51, // Compare i64 equality
	i64_ne: 0x52, // Compare i64 inequality
	i64_lt_s: 0x53, // Compare i64 less than (signed)
	i64_lt_u: 0x54, // Compare i64 less than (unsigned)
	i64_gt_s: 0x55, // Compare i64 greater than (signed)
	i64_gt_u: 0x56, // Compare i64 greater than (unsigned)
	i64_le_s: 0x57, // Compare i64 less than or equal (signed)
	i64_le_u: 0x58, // Compare i64 less than or equal (unsigned)
	i64_ge_s: 0x59, // Compare i64 greater than or equal (signed)
	i64_ge_u: 0x5a, // Compare i64 greater than or equal (unsigned)

	i32_add: 0x6a, // i32 addition
	i32_sub: 0x6b, // i32 subtraction
	i32_mul: 0x6c, // i32 multiplication
	i32_div_s: 0x6d, // i32 signed division
	i32_div_u: 0x6e, // i32 unsigned division
	i32_rem_s: 0x6f, // i32 signed remainder
	i32_rem_u: 0x70, // i32 unsigned remainder
	i32_and: 0x71, // i32 bitwise AND
	i32_or: 0x72, // i32 bitwise OR
	i32_xor: 0x73, // i32 bitwise XOR
	i32_shl: 0x74, // i32 shift left
	i32_shr_s: 0x75, // i32 signed shift right
	i32_shr_u: 0x76, // i32 unsigned shift right
	i32_rotl: 0x77, // i32 rotate left
	i32_rotr: 0x78, // i32 rotate right

	// i64 Arithmetic Instructions
	i64_clz: 0x79, // i64 count leading zeros
	i64_ctz: 0x7a, // i64 count trailing zeros
	i64_popcnt: 0x7b, // i64 population count
	i64_add: 0x7c, // i64 addition
	i64_sub: 0x7d, // i64 subtraction
	i64_mul: 0x7e, // i64 multiplication
	i64_div_s: 0x7f, // i64 signed division
	i64_div_u: 0x80, // i64 unsigned division
	i64_rem_s: 0x81, // i64 signed remainder
	i64_rem_u: 0x82, // i64 unsigned remainder
	i64_and: 0x83, // i64 bitwise AND
	i64_or: 0x84, // i64 bitwise OR
	i64_xor: 0x85, // i64 bitwise XOR
	i64_shl: 0x86, // i64 shift left
	i64_shr_s: 0x87, // i64 signed shift right
	i64_shr_u: 0x88, // i64 unsigned shift right
	i64_rotl: 0x89, // i64 rotate left
	i64_rotr: 0x8a, // i64 rotate right

	// More can be added as needed
} as const;

export type OpcodeValue = (typeof Opcode)[keyof typeof Opcode];
