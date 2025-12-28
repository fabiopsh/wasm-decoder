import { Component } from "solid-js";

const TheorySection: Component = () => {
	return (
		<section class="space-y-8">
			<h2 class="text-3xl font-bold text-primary border-b pb-4 border-outline/10">
				WebAssembly (WASM) & WAT Deep Dive
			</h2>

			<div class="prose prose-onSurface max-w-none space-y-12">
				{/* 1. What is WebAssembly? */}
				<div class="space-y-4">
					<h3 class="text-2xl font-bold text-secondary flex items-center gap-2">
						<span class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center text-sm">1</span>
						What is WebAssembly?
					</h3>
					<p class="text-onSurface/80 leading-relaxed">
						WebAssembly (often abbreviated as <strong>Wasm</strong>) is a binary instruction format for a
						stack-based virtual machine. It is designed as a portable compilation target for programming
						languages, enabling deployment on the web for client and server applications.
					</p>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
						<div class="p-4 bg-surfaceVariant/20 rounded-xl border border-outline/10">
							<h4 class="font-bold text-primary text-sm mb-2">Efficient & Fast</h4>
							<p class="text-xs text-onSurface/70">
								Small file size and near-native execution speed by leveraging common hardware capabilities.
							</p>
						</div>
						<div class="p-4 bg-surfaceVariant/20 rounded-xl border border-outline/10">
							<h4 class="font-bold text-primary text-sm mb-2">Safe & Secure</h4>
							<p class="text-xs text-onSurface/70">
								Executes in a memory-safe, sandboxed environment that prevents unauthorized access to the host
								system.
							</p>
						</div>
						<div class="p-4 bg-surfaceVariant/20 rounded-xl border border-outline/10">
							<h4 class="font-bold text-primary text-sm mb-2">Open & Portable</h4>
							<p class="text-xs text-onSurface/70">
								A World Wide Web Consortium (W3C) standard that runs on any modern browser and standalone
								runtimes.
							</p>
						</div>
					</div>
				</div>

				{/* 2. The Binary Format Structure */}
				<div class="space-y-4">
					<h3 class="text-2xl font-bold text-secondary flex items-center gap-2">
						<span class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center text-sm">2</span>
						The Binary Format (.wasm)
					</h3>
					<p class="text-onSurface/80 leading-relaxed">
						A <code>.wasm</code> file is a binary file composed of a header and a series of
						<strong>sections</strong>. This structured approach allows for efficient streaming and parallel
						compilation.
					</p>

					<div class="bg-black/30 p-6 rounded-2xl border border-outline/10 font-mono text-sm space-y-2">
						<p class="text-success">// Header</p>
						<p>
							<span class="text-primary">0x00 0x61 0x73 0x6D</span>
							<span class="text-outline/50 ml-2">; Magic number "\0asm"</span>
						</p>
						<p>
							<span class="text-primary">0x01 0x00 0x00 0x00</span>
							<span class="text-outline/50 ml-2">; Version 1</span>
						</p>
						<p class="text-success mt-4">// Sections (ID + Size + Payload)</p>
						<p>
							<span class="text-secondary">0x01</span>
							<span class="text-outline/50 ml-2">; Section ID 1 (Type Section)</span>
						</p>
						<p>
							<span class="text-secondary">0x07</span>
							<span class="text-outline/50 ml-2">; Section ID 7 (Export Section)</span>
						</p>
						<p>
							<span class="text-secondary">0x0A</span>
							<span class="text-outline/50 ml-2">; Section ID 10 (Code Section)</span>
						</p>
					</div>

					<div class="p-4 bg-primary/5 rounded-xl border border-primary/10">
						<h4 class="font-bold text-primary text-sm mb-2">LEB128 Encoding</h4>
						<p class="text-sm text-onSurface/80">
							WebAssembly uses <strong>Little Endian Base 128 (LEB128)</strong> for its integer representation.
							This is a variable-length compression format that allows small integers to take up only one byte,
							regardless of their bit depth (up to 32 or 64).
						</p>
					</div>
				</div>

				{/* 3. The Stack Machine Architecture */}
				<div class="space-y-4">
					<h3 class="text-2xl font-bold text-secondary flex items-center gap-2">
						<span class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center text-sm">3</span>
						The Stack Machine
					</h3>
					<p class="text-onSurface/80 leading-relaxed">
						Unlike physical CPUs that use registers to store temporary values, a Wasm virtual machine uses an{" "}
						<strong>operand stack</strong>. Instructions push values onto the stack and pop them off to perform
						operations.
					</p>
					<div class="bg-surfaceVariant/10 p-5 rounded-2xl border border-outline/5">
						<h4 class="font-bold text-onSurface mb-3 text-sm">Example: adding 10 + 20</h4>
						<div class="space-y-3 font-mono text-sm">
							<div class="flex items-center gap-4">
								<span class="px-2 py-1 bg-black/40 rounded text-secondary w-28">i32.const 10</span>
								<span class="text-outline">→</span>
								<span class="text-onSurface/70">[10]</span>
							</div>
							<div class="flex items-center gap-4">
								<span class="px-2 py-1 bg-black/40 rounded text-secondary w-28">i32.const 20</span>
								<span class="text-outline">→</span>
								<span class="text-onSurface/70">[10, 20]</span>
							</div>
							<div class="flex items-center gap-4 border-t border-outline/10 pt-2">
								<span class="px-2 py-1 bg-black/40 rounded text-primary w-28">i32.add</span>
								<span class="text-outline">→</span>
								<span class="text-onSurface/70">[30]</span>
							</div>
						</div>
					</div>
				</div>

				{/* 4. Memory and Types */}
				<div class="space-y-4">
					<h3 class="text-2xl font-bold text-secondary flex items-center gap-2">
						<span class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center text-sm">4</span>
						Memory & Type System
					</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
						<div>
							<h4 class="font-bold text-primary mb-2">Linear Memory</h4>
							<p class="text-sm text-onSurface/80 leading-relaxed">
								Wasm modules have access to a single "Linear Memory", which is a contiguous, extensible array of
								raw bytes. It is isolated from the rest of the browser's memory and managed in{" "}
								<strong>64KB pages</strong>.
							</p>
						</div>
						<div>
							<h4 class="font-bold text-primary mb-2">Strict Typing</h4>
							<p class="text-sm text-onSurface/80 leading-relaxed">
								WebAssembly is explicitly typed. It supports four basic numeric types:
								<code>i32</code>, <code>i64</code> (integers), <code>f32</code>, and
								<code>f64</code> (floating-point). All operations specify the type they operate on (e.g.,{" "}
								<code>i32.add</code>).
							</p>
						</div>
					</div>
				</div>

				{/* 5. WebAssembly Text Format (WAT) */}
				<div class="space-y-4">
					<h3 class="text-2xl font-bold text-secondary flex items-center gap-2">
						<span class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center text-sm">5</span>
						WebAssembly Text (WAT)
					</h3>
					<p class="text-onSurface/80 leading-relaxed">
						WAT is the human-readable representation of Wasm. It uses <strong>S-expressions</strong>
						(Lisp-like syntax) to define parts of the module. While the binary format is for machines, WAT is
						designed for developers to debug, analyze, and even write Wasm by hand.
					</p>
					<pre class="bg-gray-900 text-green-400 p-6 rounded-2xl overflow-x-auto text-sm shadow-inner border border-outline/5">
						{`(module
  ;; Define a function that adds two 32-bit integers
  (func $add (param $a i32) (param $b i32) (result i32)
    local.get $a    ;; Push param 'a' to stack
    local.get $b    ;; Push param 'b' to stack
    i32.add         ;; Pop 'a' and 'b', push result
  )

  ;; Export the function to JavaScript
  (export "add" (func $add))
)`}
					</pre>
					<p class="text-sm text-onSurface/70 italic mt-2">
						<strong>Fun Fact:</strong> Most WASM decoders (including this one!) work by recursively parsing binary
						sections and mapping them to these S-expression structures.
					</p>
				</div>
			</div>

			{/* Core Concepts Footer */}
			<div class="mt-12 p-8 bg-primary/5 rounded-3xl border border-primary/10">
				<h4 class="font-bold text-primary mb-4 flex items-center gap-2">
					<span class="text-xl">💡</span>
					Important to Remember
				</h4>
				<ul class="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
					<li class="flex items-start gap-3">
						<span class="text-primary mt-1">•</span>
						<span class="text-sm text-onSurface/80">
							<strong>No Garbage Collection:</strong> Memory in core Wasm is managed manually by the developer
							(although GC proposals are being implemented).
						</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-primary mt-1">•</span>
						<span class="text-sm text-onSurface/80">
							<strong>Host Environment:</strong> Wasm cannot do anything on its own; it requires a host (like the
							browser or Node.js) to provide imports (like console.log or DOM access).
						</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-primary mt-1">•</span>
						<span class="text-sm text-onSurface/80">
							<strong>Two-way Translation:</strong> You can always convert between .wasm (binary) and .wat (text)
							using tools like <code>wasm2wat</code> and <code>wat2wasm</code>.
						</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-primary mt-1">•</span>
						<span class="text-sm text-onSurface/80">
							<strong>Validation:</strong> Wasm runtimes perform a strict validation pass before execution to
							ensure the stack is used safely and types are consistent.
						</span>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default TheorySection;
