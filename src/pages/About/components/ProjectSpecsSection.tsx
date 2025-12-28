import { Component } from "solid-js";

const ProjectSpecsSection: Component = () => {
	return (
		<section class="space-y-6">
			<h2 class="text-3xl font-bold text-primary border-b pb-4 border-outline/10">
				B07 - AI-Assisted WebAssembly Binary Decoder and Text (WAT) Generator
			</h2>
			<div class="prose prose-onSurface max-w-none space-y-8">
				<div>
					<h3 class="text-2xl font-semibold text-primary mb-3">Goal</h3>
					<p class="text-lg leading-relaxed bg-primary/5 p-4 rounded-xl border border-primary/10">
						Use AI to help design and implement a WebAssembly binary (.wasm) decoder that parses the binary format
						and produces the corresponding textual WAT representation (at least for core sections such as types,
						functions, imports/exports, and code).
					</p>
				</div>

				<div>
					<h3 class="text-2xl font-semibold text-primary mb-4">Tasks</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div class="p-6 bg-surfaceVariant/20 rounded-2xl border border-outline/10">
							<h4 class="font-bold text-secondary flex items-center gap-2 mb-3">
								<span class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center text-sm">
									1
								</span>
								Design & Implement
							</h4>
							<p class="text-onSurface/80 text-sm leading-relaxed">
								Use AI to assist in understanding the WebAssembly binary format and implement a decoder that
								reads a .wasm file, parses its sections, and prints a structured WAT-like text representation.
							</p>
						</div>

						<div class="p-6 bg-surfaceVariant/20 rounded-2xl border border-outline/10">
							<h4 class="font-bold text-secondary flex items-center gap-2 mb-3">
								<span class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center text-sm">
									2
								</span>
								Test & Demonstrate
							</h4>
							<p class="text-onSurface/80 text-sm leading-relaxed">
								Collect small .wasm binaries, run them through your decoder, and compare the output with a
								reference disassembler (e.g. wasm2wat) to check correctness and pinpoint limitations.
							</p>
						</div>

						<div class="p-6 bg-surfaceVariant/20 rounded-2xl border border-outline/10 md:col-span-2">
							<h4 class="font-bold text-secondary flex items-center gap-2 mb-3">
								<span class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center text-sm">
									3
								</span>
								AI Usage & Verification Report
							</h4>
							<p class="text-onSurface/80 text-sm leading-relaxed">
								Submit the prompts you used with AI and write a short report explaining how you validated the
								AI-generated code and format understanding by cross-checking with the Wasm spec and reference
								tools.
							</p>
						</div>
					</div>
				</div>

				<div class="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex items-center justify-between">
					<div class="space-y-1">
						<p class="text-sm text-outline font-medium">Developer</p>
						<p class="text-lg font-bold text-primary">Fabio Piscitelli</p>
					</div>
					<div class="text-right space-y-1">
						<p class="text-sm text-outline font-medium">Student ID</p>
						<p class="text-lg font-bold text-primary">M.715339</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProjectSpecsSection;
