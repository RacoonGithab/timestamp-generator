# timestamp-generator

Generator of 48-bit timestamps in UUIDv7 style.

## Installation
```bash
npm install
```

## Usage
```bash
import { generateTimestamp48, decodeTimestamp48 } from "./timestamp.js";

const ts = generateTimestamp48();
console.log("Base64URL:", ts); // For example: "AZjbuC_1"
console.log("Millis:", decodeTimestamp48(ts)); // 1724504561397
```