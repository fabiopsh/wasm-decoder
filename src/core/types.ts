export enum ValType {
	i32 = 0x7f,
	i64 = 0x7e,
	f32 = 0x7d,
	f64 = 0x7c,
	v128 = 0x7b,
	funcRef = 0x70,
	externRef = 0x6f,
}

export enum SectionId {
	Custom = 0,
	Type = 1,
	Import = 2,
	Function = 3,
	Table = 4,
	Memory = 5,
	Global = 6,
	Export = 7,
	Start = 8,
	Element = 9,
	Code = 10,
	Data = 11,
}

export interface FuncType {
	params: ValType[];
	results: ValType[];
}

export interface ExportEntry {
	name: string;
	kind: number; // 0=Func, 1=Table, 2=Mem, 3=Global
	index: number;
}

export interface Instruction {
	opcode: number;
	mnemonic: string;
	operands: (number | bigint)[];
}

export interface FuncBody {
	locals: { count: number; type: ValType }[];
	instructions: Instruction[];
}

export interface WasmModule {
	types: FuncType[];
	functionSection: number[]; // Index into types
	exports: ExportEntry[];
	codes: FuncBody[];
}
