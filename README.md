# Wasm Decoder (Project B07)

A client-side WebAssembly Decoder built with **SolidJS**, **TypeScript**, and **Tailwind CSS**.
This project parses `.wasm` binary files and displays their corresponding textual representation (`.wat`) directly in the browser, without using any external parsing libraries (e.g., `wabt.js` or `binaryen`).

Try it: https://fabiopsh.github.io/wasm-decoder/

## Features

-  **Zero Dependencies Parsing**: Custom implementation of a WebAssembly Binary Reader, LEB128 decoder, and AST parser.
-  **Client-Side Only**: All processing happens locally in your browser. No files are uploaded to any server.
-  **Modern UI**: Designed with Material Design 3 principles using Tailwind CSS.
-  **Interactive Viewer**: Drag & drop support, syntax highlighting-like display, copy to clipboard, and download functionality.

## Tech Stack

-  **Framework**: [SolidJS](https://www.solidjs.com/)
-  **Build Tool**: [Vite](https://vitejs.dev/)
-  **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-  **Language**: TypeScript

## Getting Started

### Prerequisites

-  Node.js (v18 or higher recommended)
-  npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/wasm-decoder.git
   cd wasm-decoder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

### Build

To build the project for production:

```bash
npm run build
```

The output files will be in the `dist` directory.

## Architecture

The project is organized into two main parts:

1. **Core (`src/core/`)**: Contains the pure TypeScript logic for parsing WebAssembly binaries.
   -  `binary-reader.ts`: Handles low-level byte reading.
   -  `leb128.ts`: Decodes variable-length integers.
   -  `parser.ts`: Main parser logic for Wasm sections and instructions.
   -  `wat-formatter.ts`: Converts the parsed AST into `.wat` format.
2. **UI (`src/components/`, `App.tsx`)**: The SolidJS components for the user interface.

## Supported Features (Wasm v1)

-  **Sections**: Type, Function, Export, Code.
-  **Instructions**: Control flow (`block`, `loop`, `if`, `br`, `call`), variable access (`local.get/set`, `global.get/set`), constants, and basic numeric operations.
-  **Types**: i32, i64, f32, f64.

## License

This project is developed for the "Advanced Programming" course (University of Pisa).
