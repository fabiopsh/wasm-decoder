import { Component, createSignal, For } from "solid-js";
import { A } from "@solidjs/router";

const About: Component = () => {
	const [activeSection, setActiveSection] = createSignal("specs");

	const sections = [
		{ id: "specs", label: "Project Specifics", icon: "📋" },
		{ id: "prompts", label: "Prompt History", icon: "💬" },
		{ id: "theory", label: "WASM & WAT Theory", icon: "📚" },
	];

	return (
		<div class="min-h-screen bg-background text-onBackground font-sans flex flex-col">
			{/* Header - Reused from App for consistency */}
			<header class="bg-surface text-primary p-4 shadow-sm border-b border-outline/10 z-10">
				<div class="container mx-auto flex items-center justify-between">
					<div class="flex items-center gap-3">
						<div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-onPrimary font-bold text-lg">
							W
						</div>
						<h1 class="text-2xl font-bold tracking-tight">
							Wasm Decoder
							<span class="text-sm font-normal opacity-70 ml-2">About the Project</span>
						</h1>
					</div>
					<A
						href="/"
						class="px-4 py-2 bg-primary text-onPrimary rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
					>
						Back to Decoder
					</A>
				</div>
			</header>

			<main class="container mx-auto p-4 md:p-6 flex flex-col md:row gap-6 flex-grow ">
				<div class="flex flex-col md:flex-row gap-6 h-full">
					{/* Sidebar Navigation */}
					<nav class="w-full md:w-64 flex-shrink-0">
						<div class="bg-surface rounded-2xl shadow-sm border border-outline/10 overflow-hidden sticky top-6">
							<div class="p-4 border-b border-outline/5 bg-primary/5">
								<h2 class="font-bold text-primary">Navigation</h2>
							</div>
							<div class="p-2 space-y-1">
								<For each={sections}>
									{(section) => (
										<button
											onClick={() => setActiveSection(section.id)}
											class={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
												activeSection() === section.id
													? "bg-primary text-onPrimary shadow-md"
													: "hover:bg-surfaceVariant/50 text-onSurface/80"
											}`}
										>
											<span class="text-xl">{section.icon}</span>
											<span class="font-medium">{section.label}</span>
										</button>
									)}
								</For>
							</div>
						</div>
					</nav>

					{/* Content Area */}
					<div class="flex-grow bg-surface rounded-2xl shadow-sm border border-outline/10 p-6 md:p-10 animate-fade-in overflow-y-auto max-h-[calc(100vh-180px)]">
						{activeSection() === "specs" && (
							<section class="space-y-6">
								<h2 class="text-3xl font-bold text-primary border-b pb-4 border-outline/10">
									B07 - AI-Assisted WebAssembly Binary Decoder and Text (WAT) Generator
								</h2>
								<div class="prose prose-onSurface max-w-none space-y-8">
									<div>
										<h3 class="text-2xl font-semibold text-primary mb-3">Goal</h3>
										<p class="text-lg leading-relaxed bg-primary/5 p-4 rounded-xl border border-primary/10">
											Use AI to help design and implement a WebAssembly binary (.wasm) decoder that parses
											the binary format and produces the corresponding textual WAT representation (at least
											for core sections such as types, functions, imports/exports, and code).
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
													Use AI to assist in understanding the WebAssembly binary format and implement a
													decoder that reads a .wasm file, parses its sections, and prints a structured
													WAT-like text representation.
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
													Collect small .wasm binaries, run them through your decoder, and compare the
													output with a reference disassembler (e.g. wasm2wat) to check correctness and
													pinpoint limitations.
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
													Submit the prompts you used with AI and write a short report explaining how you
													validated the AI-generated code and format understanding by cross-checking with
													the Wasm spec and reference tools.
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
						)}

						{activeSection() === "prompts" && (
							<section class="space-y-6">
								<div class="flex items-center justify-between border-b pb-4 border-outline/10">
									<h2 class="text-3xl font-bold text-primary">Prompt History</h2>
									<span class="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase tracking-wider">
										AI-Assisted Development
									</span>
								</div>
								<p class="text-onSurface/70 italic text-lg leading-relaxed">
									This log tracks the interaction with AI that led to the creation of the Wasm Decoder,
									documenting the prompts used and the resulting development reflections.
								</p>

								<div class="space-y-10 mt-8">
									{[
										{
											step: "1. Planning",
											title: "Initial Understanding & Documentation",
											prompt:
												"For a university exam, I was assigned this project: B07 - AI-Assisted WebAssembly Binary Decoder and Text (WAT) Generator. I would like you to explain to me, first of all, what it is and what are the main topics I need to know. Then, I want us to make a document to define all the steps of the implementation of the project. Let's create a well-detailed functional and technical document.",
											observation:
												"This initial step provided a comprehensive breakdown of the assignment, explaining the WebAssembly binary format and the structure of WAT. The AI successfully generated a functional and technical specification document that served as the roadmap for the entire development process.",
										},
										{
											step: "2. Design",
											title: "Stack Definition & UI",
											prompt:
												"I want to work with the SolidJS framework in TypeScript. The interface must be able to load a binary file. After processing, it should show the resulting WAT view. Please use Google's Material Design 3 style. Make it so it is easier to read.",
											observation:
												"SolidJS was chosen for its fine-grained reactivity. Google’s Material Design 3 provided a modern, clean, and accessible look. The AI helped integrate the components seamlessly into the SolidJS app.",
										},
										{
											step: "3. Implementation",
											title: "Environment Setup",
											prompt:
												"I have created a GitHub repository. I cloned it to my machine, opened the folder, and added the functional_spec.md file we generated. Let's start the implementation based on the specs (remembering the Material Design 3 style). Ignore the README for now.",
											observation:
												"The setup process was smooth. Providing the context that the repository was already active allowed the AI to jump straight into generating the core files and the project structure.",
										},
										{
											step: "4. Verification",
											title: "Unit Testing & QA",
											prompt: "Build also some small WASM tools to verify the decoder?",
											observation:
												"The AI generated several WASM binaries to test the decoder. This was essential for verifying that the binary-to-text conversion logic was handling different opcodes correctly. The results were compared with wasm2wat for quality assurance.",
										},
										{
											step: "5. Debugging",
											title: "Adding Missing Instructions",
											prompt:
												"Using the application i passed the @factorial.wasm file generated by the generate_wasm.mjs. It seems that some code are not recognized. It's missing something?",
											observation:
												"The decoder was missing definitions for several 64-bit integer (i64) operations used in the factorial test file (0x51: i64.eqz, 0x7d: i64.sub, 0x7e: i64.mul). The AI identified and provided the correct mapping.",
										},
										{
											step: "6. Refinement",
											title: "Fix Opcode Mapping",
											prompt:
												"The opcode mapping is still not 100% correct. Can you double check the WebAssembly specification and provide the complete list of opcodes for core instructions?",
											observation:
												"The AI provided a more comprehensive list of opcodes by referencing the official WASM specification. This manual cross-referencing allowed the final tool to be much more robust.",
										},
									].map((item, i) => (
										<div class="relative pl-8 border-l-2 border-primary/20 hover:border-primary/50 transition-colors pb-2">
											<div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-sm"></div>
											<div class="mb-2">
												<span class="text-xs font-bold text-outline uppercase tracking-widest">
													{item.step}
												</span>
												<h3 class="text-xl font-bold text-primary leading-tight mt-1">{item.title}</h3>
											</div>

											<div class="mt-4 p-5 bg-black/30 rounded-2xl border border-outline/10 shadow-inner group">
												<div class="flex items-center gap-2 mb-3">
													<span class="text-success text-xs font-bold flex items-center gap-1">
														<span class="w-2 h-2 rounded-full bg-success animate-pulse"></span>
														AI PROMPT
													</span>
												</div>
												<p class="text-sm font-mono text-onSurface/90 leading-relaxed italic">
													"{item.prompt}"
												</p>
											</div>

											<div class="mt-4 p-5 bg-secondary/5 rounded-2xl border border-secondary/10 relative overflow-hidden">
												<div class="absolute top-0 right-0 p-2 text-secondary/20">
													<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
														<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
													</svg>
												</div>
												<div class="flex items-center gap-2 mb-2">
													<span class="text-secondary text-xs font-bold uppercase tracking-wider">
														Reflection & Observations
													</span>
												</div>
												<p class="text-sm text-onSurface/80 leading-relaxed relative z-10">
													{item.observation}
												</p>
											</div>
										</div>
									))}
								</div>
							</section>
						)}

						{activeSection() === "theory" && (
							<section class="space-y-6">
								<h2 class="text-3xl font-bold text-primary border-b pb-4 border-outline/10">
									WASM & WAT Theory
								</h2>
								<div class="prose prose-onSurface max-w-none space-y-8">
									<div>
										<h3 class="text-2xl font-semibold text-primary">WebAssembly (WASM)</h3>
										<p>
											WebAssembly is a binary instruction format for a stack-based virtual machine. It is
											designed as a portable compilation target for programming languages like C, C++, and
											Rust, enabling deployment on the web for client and server applications.
										</p>
										<div class="bg-surfaceVariant/20 p-4 rounded-lg border-l-4 border-primary mt-2">
											<p class="text-sm italic">
												<strong>Module Structure:</strong> A Wasm module consists of a header (magic "\0asm"
												and version 1) followed by a series of sections (Type, Import, Function, Table,
												Memory, Global, Export, Start, Element, Code, Data).
											</p>
										</div>
									</div>

									<div>
										<h3 class="text-2xl font-semibold text-primary">WebAssembly Text (WAT)</h3>
										<p>
											WAT is the human-readable text representation of the WebAssembly binary format. It uses
											S-expressions (nested lists) to represent the module's structure and instructions.
										</p>
										<pre class="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm shadow-inner mt-2">
											{`(module
  (func $add (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add)
  (export "add" (func $add))
)`}
										</pre>
									</div>

									<div class="p-6 bg-errorContainer/10 rounded-2xl border border-error/20">
										<h4 class="font-bold text-error mb-2">Fundamental Concepts</h4>
										<ul class="list-disc list-inside space-y-1 text-sm">
											<li>
												<strong>LEB128:</strong> Variable-length code used to store integers.
											</li>
											<li>
												<strong>Stack Machine:</strong> Instructions push/pop values from an operand stack.
											</li>
											<li>
												<strong>Sections:</strong> Optional blocks of data with specific IDs.
											</li>
										</ul>
									</div>
								</div>
							</section>
						)}
					</div>
				</div>
			</main>

			<footer class="p-4 text-center text-outline text-sm">Project B07 - AI-Assisted Wasm Decoder</footer>
		</div>
	);
};

export default About;
