import assert from "node:assert";
import {decodeTimestamp48, generateTimestamp48} from "./timestamp.js";

console.log("Running tests...");

const ts = generateTimestamp48();
assert.strictEqual(typeof ts, "string", "A string should be returned.");
assert.strictEqual(ts.length, 8, "Must be exactly 8 characters");

const decoded = decodeTimestamp48(ts);
assert.ok(Number.isInteger(decoded), "Must be an integer (newTime)");
assert.ok(decoded > 1600000000000, "Timestamp must be > 2020");
assert.ok(decoded < Date.now() + 1000, "The timestamp should not be too far in the future.");

const seen = new Set();
let last = -1;

for (let i = 0; i < 100; i++) {
    const t = generateTimestamp48();
    assert.strictEqual(t.length, 8, "Always 8 characters");
    assert.ok(!seen.has(t), "Tags must be unique");
    seen.add(t);

    const dec = decodeTimestamp48(t);
    assert.ok(dec > last, "The labels must strictly increase.")
    last = dec;
}

console.log("✅ All tests were successful:", ts);