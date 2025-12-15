import { Component, createSignal, Show } from "solid-js";
import { FileUploader } from "./components/FileUploader";
import { WatViewer } from "./components/WatViewer";
import { WasmParser } from "./core/parser";
import { WatFormatter } from "./core/wat-formatter";

const App: Component = () => {
	const [watContent, setWatContent] = createSignal<string>("");
	const [fileName, setFileName] = createSignal<string>("");
	const [error, setError] = createSignal<string>("");
	const [fileSize, setFileSize] = createSignal<number>(0);
	const [version, setVersion] = createSignal<number | null>(null);

	const handleFileLoaded = (name: string, data: Uint8Array) => {
		setFileName(name);
		setFileSize(data.byteLength);
		setError("");
		setWatContent("");
		setVersion(null);

		try {
			// Basic check before full parse
			if (data.byteLength < 8) {
				throw new Error("File too small to be a WebAssembly module");
			}

			const parser = new WasmParser(data);
			const module = parser.parse();

			const formatter = new WatFormatter(module);
			const wat = formatter.format();

			setWatContent(wat);
			// If we got here, header was valid -> Version 1
			setVersion(1);
		} catch (e: any) {
			console.error(e);
			setError(e.message || "Unknown error during parsing");
			// Even on error, if we have partial content or header passed, we might want to show something.
			// For now, simple error handling.
		}
	};

	const handleError = (msg: string) => {
		setError(msg);
	};

	return (
		<div class="min-h-screen bg-background text-onBackground font-sans flex flex-col">
			<header class="bg-surface text-primary p-4 shadow-sm border-b border-outline/10 z-10">
				<div class="container mx-auto flex items-center gap-3">
					<div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-onPrimary font-bold text-lg">
						W
					</div>
					<h1 class="text-2xl font-bold tracking-tight">
						Wasm Decoder
						<span class="text-sm font-normal opacity-70 ml-2">by Fabio Piscitelli M.715339 v1.0</span>
					</h1>
				</div>
			</header>

			<main class="container mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 flex-grow">
				{/* Left Column: Input & Stats */}
				<section class="w-full lg:w-1/3 flex flex-col gap-6">
					<div class="bg-surface p-6 rounded-2xl shadow-sm border border-outline/10">
						<h2 class="text-lg font-semibold mb-4 text-primary flex items-center gap-2">Input Source</h2>
						<FileUploader onFileLoaded={handleFileLoaded} onError={handleError} />

						<Show when={error()}>
							<div class="mt-4 p-3 bg-errorContainer text-onErrorContainer rounded-lg text-sm border-l-4 border-error">
								<strong>Error:</strong> {error()}
							</div>
						</Show>
					</div>

					<Show when={fileName()}>
						<div class="bg-surface p-6 rounded-2xl shadow-sm border border-outline/10 animate-fade-in transition-all">
							<h2 class="text-lg font-semibold mb-4 text-primary">File Stats</h2>
							<div class="space-y-3 text-sm">
								<div class="flex justify-between p-2 rounded hover:bg-surfaceVariant/50">
									<span class="text-outline">Name</span>
									<span class="font-mono text-onSurface">{fileName()}</span>
								</div>
								<div class="flex justify-between p-2 rounded hover:bg-surfaceVariant/50">
									<span class="text-outline">Size</span>
									<span class="font-mono text-onSurface">{fileSize().toLocaleString()} bytes</span>
								</div>
								<div class="flex justify-between p-2 rounded hover:bg-surfaceVariant/50">
									<span class="text-outline">Wasm Version</span>
									<span class="font-mono text-onSurface">
										{version() !== null ? `0x${version()!.toString(16)}` : "-"}
									</span>
								</div>
							</div>
						</div>
					</Show>
				</section>

				{/* Right Column: Output */}
				<section class="w-full lg:w-2/3 bg-surface p-6 rounded-2xl shadow-sm border border-outline/10 h-[80vh] lg:h-auto flex flex-col min-h-[500px]">
					<WatViewer content={watContent()} hasContent={!!watContent()} />
				</section>
			</main>

			<footer class="p-4 text-center text-outline text-sm">Project B07 - AI-Assisted Wasm Decoder</footer>
		</div>
	);
};

export default App;
