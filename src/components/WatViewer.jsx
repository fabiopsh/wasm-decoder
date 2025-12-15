import { Show } from "solid-js";
export const WatViewer = (props) => {
    const copyToClipboard = () => {
        if (props.content) {
            navigator.clipboard.writeText(props.content);
            // Could verify with a toast, but keeping it simple
            alert("Copied to clipboard!");
        }
    };
    const downloadFile = () => {
        if (!props.content)
            return;
        const blob = new Blob([props.content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "output.wat";
        a.click();
        URL.revokeObjectURL(url);
    };
    return (<div class="flex flex-col h-full">
			<div class="flex justify-between items-center mb-4">
				<h2 class="text-xl font-semibold text-primary">WAT Output</h2>
				<Show when={props.hasContent}>
					<div class="flex gap-2">
						<button onClick={copyToClipboard} class="px-3 py-1 text-sm bg-secondaryContainer text-onSecondaryContainer rounded-full hover:bg-secondaryContainer/80 transition-colors font-medium">
							Copy
						</button>
						<button onClick={downloadFile} class="px-3 py-1 text-sm bg-primary text-onPrimary rounded-full hover:bg-primary/90 transition-colors font-medium">
							Download .wat
						</button>
					</div>
				</Show>
			</div>

			<div class="flex-grow bg-surfaceVariant/30 rounded-lg p-0 relative overflow-hidden border border-outline/10">
				<Show when={props.hasContent} fallback={<div class="flex items-center justify-center h-full text-outline italic p-4">
							No file loaded. Upload a .wasm file to see the representation.
						</div>}>
					<pre class="w-full h-full p-4 overflow-auto text-sm font-mono bg-[#1e1e1e] text-[#d4d4d4] leading-relaxed relative">
						{props.content}
					</pre>
				</Show>
			</div>
		</div>);
};
