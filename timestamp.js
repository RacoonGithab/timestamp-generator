let lastMs = -1;

function encode48(newTime) {
    if (!Number.isInteger(newTime) || newTime < 0 || newTime > 0xFFFFFFFFFFF) {
        throw new Error("NewTime must fit in 48 bits")
    }

    const buf = Buffer.alloc(6);

    buf[0] = (newTime / 0x10000000000) & 0xFF;
    buf[1] = (newTime / 0x100000000) & 0xFF;
    buf[2] = (newTime >>> 24) & 0xFF;
    buf[3] = (newTime >>> 16) & 0xFF;
    buf[4] = (newTime >>> 8) & 0xFF;
    buf[5] = newTime & 0xFF;

    return buf;
}

function toBase64Url(buf) {
    return buf.toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}


export function generateTimestamp48() {
    let newTime = Date.now();

    if (newTime <= lastMs) {
        newTime = lastMs + 1;
    }

    lastMs = newTime;
    return toBase64Url(encode48(newTime));
}


export function decodeTimestamp48(str) {
    const padded = str.padEnd(str.length + (4 - (str.length % 4)) % 4, "=");
    const b64 = padded.replace(/-/g, "+").replace(/_/g, "/");
    const buf = Buffer.from(b64, "base64");

    if (buf.length !== 6) {
        throw new Error("Expected 6-byte buffer");
    }

    return (
        buf[0] * 0x10000000000 +
        buf[1] * 0x100000000 +
        (buf[2] << 24 >>> 0) +
        (buf[3] << 16) +
        (buf[4] << 8) +
        buf[5]
    );
}
