import { createSignal } from "solid-js";
export const FileUploader = (props) => {
    let fileInput;
    const [isDragging, setIsDragging] = createSignal(false);
    const handleFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const buffer = e.target?.result;
            if (buffer) {
                props.onFileLoaded(file.name, new Uint8Array(buffer));
            }
        };
        reader.onerror = () => {
            props.onError("Error reading file");
        };
        reader.readAsArrayBuffer(file);
    };
    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const onDragLeave = () => {
        setIsDragging(false);
    };
    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };
    return (<div class={`p-8 border-2 border-dashed rounded-lg text-center transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[200px]
        ${isDragging()
            ? "border-primary bg-primaryContainer/20"
            : "border-outline/50 hover:bg-surfaceVariant hover:border-primary"}
      `} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} onClick={() => fileInput?.click()}>
			<input type="file" class="hidden" accept=".wasm" ref={fileInput} onChange={(e) => {
            if (e.currentTarget.files?.[0]) {
                handleFile(e.currentTarget.files[0]);
            }
        }}/>
			<div class="text-4xl mb-4 text-primary">📂</div>
			<p class="text-onSurfaceVariant font-medium">Click or Drag & Drop .wasm file here</p>
			<p class="text-sm text-outline mt-2">Maximum file size: 10MB (Client-side limit mostly for perf)</p>
		</div>);
};
