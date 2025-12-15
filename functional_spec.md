Specifica Tecnica: AI-Assisted WebAssembly Decoder (Project B07)

Obiettivo: Generare una Web Application (SPA) completa e funzionante per il decoding di file binari .wasm in formato testuale .wat.

1. Panoramica del Progetto

L'applicazione deve permettere all'utente di caricare un file binario WebAssembly (.wasm), analizzarne i byte raw lato client (browser), e visualizzare la rappresentazione testuale (.wat) corrispondente.
Vincolo Fondamentale: Non utilizzare librerie esterne per il parsing (no wabt.js, no binaryen). Il decoder deve essere implementato manualmente in TypeScript per scopi didattici.

2. Stack Tecnologico & Configurazione

Framework: SolidJS (configurato con Vite).

Linguaggio: TypeScript (Strict Mode abilitato).

Styling: Tailwind CSS.

Ambiente: Browser (nessun backend, tutta la logica è client-side).

3. Architettura del Software

Il codice deve essere modulare, separando nettamente la logica di decoding dall'interfaccia utente.

3.1 Core Logic (src/core/)

Questa directory contiene la logica pura di parsing. Nessuna dipendenza da SolidJS.

BinaryReader (Classe):

Incapsula un Uint8Array.

Gestisce un cursore interno (offset).

Metodi richiesti: readByte(), readBytes(length), eof(), peek().

LEB128 (Modulo):

Implementazione dell'algoritmo Little Endian Base 128.

readVarUint32(reader): Per dimensioni sezioni e indici.

readVarInt32(reader): Per costanti i32.const (gestione bit di segno).

WasmParser (Classe):

Metodo principale: parse(buffer: Uint8Array): WasmModule.

Step 1: Validazione Magic Number (0x0061736d) e Versione (0x01).

Step 2: Loop attraverso le sezioni basato su ID (1 byte) e Dimensione (VarUint32).

Step 3: Switch/Case per delegare il parsing di sezioni specifiche (Type, Function, Export, Code).

WatFormatter (Classe):

Metodo principale: format(module: WasmModule): string.

Trasforma l'AST in stringhe S-expression indentate (es. (module ...)).

3.2 Strutture Dati (AST)

Il parser deve popolare e restituire strutture conformi a queste interfacce:

// src/core/types.ts

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
functionSection: number[]; // Indici dei tipi per ogni funzione
exports: ExportEntry[];
codes: FuncBody[];
}

4. Specifiche Funzionali di Parsing

4.1 Sezioni Obbligatorie

Il parser deve gestire correttamente:

Type Section (ID 1): Vettori di tipi di funzione.

Function Section (ID 3): Associazione tra indici funzione e indici tipo.

Export Section (ID 7): Nomi delle funzioni esportate.

Code Section (ID 10): Body delle funzioni.

4.2 Decoding Istruzioni (Opcode)

Supportare il parsing delle seguenti istruzioni nella Code Section. Se un opcode non è riconosciuto, emettere un placeholder "unknown".

Control Flow: block, loop, if, else, end (0x0B), br, br_if, return, call.

Variables: local.get, local.set, local.tee, global.get, global.set.

Constants: i32.const (VarInt32), i64.const (VarInt64), f32.const, f64.const.

Numeric: i32.eqz, i32.eq, i32.ne, i32.lt_s, i32.add, i32.sub, i32.mul, i32.div_s.

5. Requisiti Interfaccia Utente (SolidJS)

Layout

Layout a due colonne (o stacked su mobile):

Colonna Sinistra (Input):

Area di Upload (Drag & Drop o Click).

Card "Statistiche File": Nome, Dimensione, Versione Wasm rilevata.

Lista delle Sezioni trovate (es. "Type Section: 140 bytes").

Colonna Destra (Output):

Editor/Viewer di testo per il codice WAT generato.

Syntax highlighting minimale (o font monospazio colorato).

Pulsanti: "Download .wat", "Copy to Clipboard".

Gestione Errori

Se il Magic Number è errato, mostrare errore critico: "File non valido".

Se il parsing fallisce a metà (es. opcode sconosciuto o file tronco), mostrare errore ma visualizzare il parziale decodificato fino a quel punto.

6. Struttura Cartelle Suggerita

src/
├── assets/
├── components/
│ ├── FileUploader.tsx
│ ├── HexViewer.tsx (Opzionale: mostra byte raw)
│ ├── WatViewer.tsx (Output finale)
│ └── Layout.tsx
├── core/
│ ├── ast.ts (Interfacce)
│ ├── binary-reader.ts
│ ├── constants.ts (Opcode map, Section IDs)
│ ├── leb128.ts
│ ├── parser.ts (Main logic)
│ └── wat-formatter.ts
├── App.tsx
└── index.tsx

7. Istruzioni per l'IA Generatrice

Implementa prima i file in src/core/ per garantire che la logica di business sia solida.

Usa createResource o createSignal di SolidJS per gestire il parsing asincrono del file.

Assicurati che il CSS (Tailwind) sia responsive e moderno (Dark mode preferita).

Non dimenticare di gestire i casi limite nel decoder LEB128 (overflow, padding).
