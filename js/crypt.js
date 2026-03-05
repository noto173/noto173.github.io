function encrypt(key, text) {
    let seed = key.split("").reduce((a,c) => a + c.charCodeAt(0), 0);
    return text.split("").map((c,i) => {
        // simple PRNG
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        const mask = seed & 0xFF;
        const code = c.charCodeAt(0) ^ mask;
        return ("0" + code.toString(16)).slice(-2);
    }).join("");
}

function decrypt(key, encoded) {
    let seed = key.split("").reduce((a,c) => a + c.charCodeAt(0), 0);
    return encoded.match(/.{1,2}/g).map((hex,i) => {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        const mask = seed & 0xFF;
        const code = parseInt(hex,16) ^ mask;
        return String.fromCharCode(code);
    }).join("");
}