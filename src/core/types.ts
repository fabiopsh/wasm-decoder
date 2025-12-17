/**
 * WebAssembly Value Types.
 * These byte values correspond to the binary encoding of types in WASM.
 * Reference: https://webassembly.github.io/spec/core/binary/types.html#value-types
 */
export enum ValType {
	i32 = 0x7f, // 32-bit integer
	i64 = 0x7e, // 64-bit integer
	f32 = 0x7d, // 32-bit floating point
	f64 = 0x7c, // 64-bit floating point
	v128 = 0x7b, // 128-bit vector (SIMD)
	funcRef = 0x70, // Function reference
	externRef = 0x6f, // External reference
}

/**
 * WebAssembly Section IDs.
 * Each section in a WASM binary has a unique ID used to identify its content.
 * Reference: https://webassembly.github.io/spec/core/binary/modules.html#sections
 */
export enum SectionId {
	Custom = 0, // Custom section (debugging, names, etc.)
	Type = 1, // Function signatures
	Import = 2, // External imports (functions, memory, etc.)
	Function = 3, // Function definitions (mapping to type signatures)
	Table = 4, // Indirect function tables
	Memory = 5, // Memory definitions
	Global = 6, // Global variables
	Export = 7, // Exports to the host environment
	Start = 8, // Start function index
	Element = 9, // Element segments (for initializing tables)
	Code = 10, // Function bodies (bytecode)
	Data = 11, // Data segments (for initializing memory)
}

/**
 * Represents a function signature type.
 * Defines the types of parameters and return values.
 */
export interface FuncType {
	params: ValType[]; // List of parameter types
	results: ValType[]; // List of result types
}

/**
 * Represents an exported entity from the WASM module.
 */
export interface ExportEntry {
	name: string; // The export name
	kind: number; // The kind of export: 0=Func, 1=Table, 2=Mem, 3=Global
	index: number; // The index of the exported entity
}

/**
 * Represents a single WebAssembly instruction.
 */
export interface Instruction {
	opcode: number; // The opcode of the instruction
	mnemonic: string; // The human-readable name of the instruction
	operands: (number | bigint)[]; // Operands for the instruction (immediate values)
}

/**
 * Represents the body of a function.
 */
export interface FuncBody {
	locals: { count: number; type: ValType }[]; // Local variables defined in the function
	instructions: Instruction[]; // The sequence of instructions in the function body
}

/**
 * Represents a parsed WebAssembly module.
 * Contains all the necessary information to understand the module's structure.
 */
export interface WasmModule {
	types: FuncType[]; // List of function types defined in the module
	functionSection: number[]; // Maps function indices to their type indices
	exports: ExportEntry[]; // List of exported entities
	codes: FuncBody[]; // List of function bodies
}
