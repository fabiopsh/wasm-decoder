import { Component } from "solid-js";

const ValidationSection: Component = () => {
	const validationSteps = [
		{
			step: "1. Methodology",
			title: "Test-Driven Development with AI",
			details:
				"The validation approach followed a 'Test-Driven Development' (TDD) style adapted for AI assistance. Instead of writing code and validating it at the end, validation occurred in distinct stages: Specification Compliance (ensuring architecture met the zero-dependency requirement), Functional Verification (using reference tools like wasm2wat to verify output accuracy), and Usability Testing (refining the UI based on Material Design 3 principles).",
			result:
				"Iterative validation integrated directly into the AI-assisted development workflow, focusing on verifying compliance with project specifications.",
		},
		{
			step: "2. Usability Validation",
			title: "Interface Design & Experience",
			details:
				"Material Design 3 Compliance: The interface was implemented using Tailwind CSS to strictly follow Material Design 3 guidelines, validated by ensuring color contrast (onPrimary over primary colors) and consistent spacing/typography (Roboto and Fira Code fonts). Responsiveness: The split-screen design (Input vs. Output) behaves responsively, stacking vertically on smaller screens. Feedback Mechanisms: Visual cues for file loading states and error reporting. The FileUploader component supports both 'Click-to-Upload' and 'Drag & Drop' interactions.",
			result:
				"Responsive, modern UI validated against Material Design 3 principles with seamless user interactions.",
		},
		{
			step: "3. Client-Side Performance",
			title: "Zero-Latency Interaction",
			details:
				"Validation confirmed that file processing occurs strictly in browser memory (Client-Side Only). No network requests are made to upload files, ensuring privacy and instant feedback. Large File Handling: The application includes a soft validation check for file size (10MB limit) to prevent browser freezing, improving the perceived stability of the application.",
			result:
				"Complete client-side processing with zero external dependencies, ensuring privacy and instant results.",
		},
		{
			step: "4. Ground Truth Comparison",
			title: "wasm2wat from WABT",
			details:
				"To validate the correctness of the decoder's output, the industry-standard tool wasm2wat (from the WebAssembly Binary Toolkit - WABT) was used as the 'Ground Truth.' Procedure: A set of valid .wasm binaries was processed by both the AI-generated decoder and wasm2wat. Success Criteria: The output was checked to ensure it matched the semantic structure of wasm2wat output, particularly regarding section order, instruction nesting, and type signatures.",
			result:
				"All decoder outputs matched the semantic structure of wasm2wat, validating structural correctness and instruction accuracy.",
		},
		{
			step: "5. Case Study",
			title: "The Factorial Function",
			details:
				"A dedicated testing script (generate_wasm.mjs) was created to programmatically generate specific WASM binaries. A recursive factorial function was generated to test control flow (if, else, call) and arithmetic operations. Issue Detection: During this validation step, the decoder initially failed to render the output correctly. Diagnosis: By comparing the binary hex with the decoder's error logs, specific 64-bit integer instructions were missing from the opcode map: 0x51 (i64.eq), 0x7d (i64.sub), 0x7e (i64.mul).",
			result:
				"Resolution: The opcode map in src/core/constants.ts was updated to include these missing definitions, and the decoder was re-validated successfully.",
		},
		{
			step: "6. Specification Compliance",
			title: "WebAssembly Core Spec (v1)",
			details:
				"The decoder was validated against the official WebAssembly Core Specification (Version 1). LEB128 Decoding: The src/core/leb128.ts module was verified to correctly handle variable-length integers, including edge cases for padding bytes. Magic Number Validation: The parser correctly rejects files that do not start with \\0asm (0x00 0x61 0x73 0x6D) and version 1, ensuring strictly valid input processing.",
			result:
				"Full compliance with WebAssembly Core Specification Version 1, including proper LEB128 handling and magic number validation.",
		},
		{
			step: "7. Conclusion",
			title: "Validation Summary",
			details:
				"The application successfully passed all validation stages. It fulfills the architectural requirement of zero external dependencies by implementing a custom parser. Usability testing confirmed a responsive, modern UI, while functional validation—aided by synthetic test generation and cross-referencing with wasm2wat—ensured the decoder provides accurate and effective results for standard WebAssembly modules.",
			result:
				"Project successfully implements all core requirements: custom parser with zero dependencies, modern responsive UI, and accurate WAT text generation.",
		},
	];

	return (
		<section class="space-y-6">
			<div class="flex items-center justify-between border-b pb-4 border-outline/10">
				<h2 class="text-3xl font-bold text-primary">Project Validation</h2>
				<span class="px-3 py-1 bg-success/10 text-success text-xs font-bold rounded-full uppercase tracking-wider">
					Validation Report
				</span>
			</div>
			<p class="text-onSurface/70 italic text-lg leading-relaxed">
				This document details the validation strategies employed to ensure the quality, usability, and functional
				correctness of the AI-Assisted WebAssembly (WASM) Decoder.
			</p>

			<div class="space-y-10 mt-8">
				{validationSteps.map((item, i) => (
					<div class="relative pl-8 border-l-2 border-success/20 hover:border-success/50 transition-colors pb-2">
						<div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-success border-4 border-background shadow-sm"></div>
						<div class="mb-2">
							<span class="text-sm font-bold text-outline uppercase tracking-widest">{item.step}</span>
							<h3 class="text-2xl font-bold text-primary leading-tight mt-1">{item.title}</h3>
						</div>

						<div class="mt-4 p-6 bg-primary/5 rounded-2xl border border-primary/10">
							<div class="flex items-center gap-2 mb-3">
								<span class="text-primary text-sm font-bold flex items-center gap-1">
									<span class="w-2 h-2 rounded-full bg-primary"></span>
									VALIDATION DETAILS
								</span>
							</div>
							<p class="text-base text-onSurface leading-relaxed">{item.details}</p>
						</div>

						<div class="mt-4 p-6 bg-success/5 rounded-2xl border border-success/10 relative overflow-hidden">
							<div class="absolute top-0 right-0 p-2 text-success/20">
								<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
								</svg>
							</div>
							<div class="flex items-center gap-2 mb-2">
								<span class="text-success text-sm font-bold uppercase tracking-wider">Result</span>
							</div>
							<p class="text-base text-onSurface leading-relaxed relative z-10">{item.result}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default ValidationSection;
