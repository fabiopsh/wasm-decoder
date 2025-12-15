import fs from "fs";

// Simple Wasm module binary generation
// This generates a module with:
// 1. Type Section: (func (param i64) (result i64))
// 2. Function Section: 1 function of type 0
// 3. Export Section: export "factorial" (func 0)
// 4. Code Section: Implementation of factorial
const wasmBuffer = new Uint8Array([
	// Magic & Version
	0x00,
	0x61,
	0x73,
	0x6d,
	0x01,
	0x00,
	0x00,
	0x00,

	// Section 1: Type
	// 1 type: (param i64) (result i64)
	0x01,
	0x06,
	0x01,
	0x60,
	0x01,
	0x7e,
	0x01,
	0x7e,

	// Section 3: Function
	// 1 function using type type index 0
	0x03,
	0x02,
	0x01,
	0x00,

	// Section 7: Export
	// Export "factorial" as func 0
	0x07,
	0x0d,
	0x01,
	0x09,
	0x66,
	0x61,
	0x63,
	0x74,
	0x6f,
	0x72,
	0x69,
	0x61,
	0x6c,
	0x00,
	0x00,

	// Section 10: Code
	// Body of function 0
	// Size: 25 bytes (1 count + 1 bodySize + 23 body) = 0x19
	// Body Size: 23 bytes = 0x17
	0x0a,
	0x19,
	0x01,
	0x17,
	0x00, // local decls count
	// Instructions:
	// local.get 0
	0x20,
	0x00,
	// i64.const 0
	0x42,
	0x00,
	// i64.eq
	0x51,
	// if i64
	0x04,
	0x7e,
	// i64.const 1
	0x42,
	0x01,
	// else
	0x05,
	// local.get 0
	0x20,
	0x00,
	// local.get 0
	0x20,
	0x00,
	// i64.const 1
	0x42,
	0x01,
	// i64.sub
	0x7d,
	// call 0 (recursive)
	0x10,
	0x00,
	// i64.mul
	0x7e,
	// end
	0x0b,
	// end of function
	0x0b,
]);

fs.writeFileSync("factorial.wasm", wasmBuffer);
console.log("Generated factorial.wasm");
