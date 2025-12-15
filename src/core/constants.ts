export const MAGIC_NUMBER = 0x6d736100;
export const VERSION = 1;

export const Opcode = {
	// Control Flow
	unreachable: 0x00,
	nop: 0x01,
	block: 0x02,
	loop: 0x03,
	if: 0x04,
	else: 0x05,
	end: 0x0b,
	br: 0x0c,
	br_if: 0x0d,
	return: 0x0f,
	call: 0x10,
	call_indirect: 0x11,

	// Parametric
	drop: 0x1a,
	select: 0x1b,

	// Variable
	local_get: 0x20,
	local_set: 0x21,
	local_tee: 0x22,
	global_get: 0x23,
	global_set: 0x24,

	// Memory
	i32_load: 0x28,
	i64_load: 0x29,
	f32_load: 0x2a,
	f64_load: 0x2b,
	i32_store: 0x36,
	i64_store: 0x37,
	f32_store: 0x38,
	f64_store: 0x39,

	// Constants
	i32_const: 0x41,
	i64_const: 0x42,
	f32_const: 0x43,
	f64_const: 0x44,

	// Numeric (subset)
	i32_eqz: 0x45,
	i32_eq: 0x46,
	i32_ne: 0x47,
	i32_lt_s: 0x48,
	i32_lt_u: 0x49,
	i32_gt_s: 0x4a,
	i32_gt_u: 0x4b,
	i32_le_s: 0x4c,
	i32_le_u: 0x4d,
	i32_ge_s: 0x4e,
	i32_ge_u: 0x4f,

	i32_add: 0x6a,
	i32_sub: 0x6b,
	i32_mul: 0x6c,
	i32_div_s: 0x6d,
	i32_div_u: 0x6e,
	i32_rem_s: 0x6f,
	i32_rem_u: 0x70,
	i32_and: 0x71,
	i32_or: 0x72,
	i32_xor: 0x73,
	i32_shl: 0x74,
	i32_shr_s: 0x75,
	i32_shr_u: 0x76,
	i32_rotl: 0x77,
	i32_rotr: 0x78,

	// More can be added as needed
} as const;

export type OpcodeValue = (typeof Opcode)[keyof typeof Opcode];
