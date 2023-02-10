const ShortUUID = require("shortuuid");

const originalId = new ShortUUID(
  "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
);

function encodedUUID() {
  const encodeId = originalId.encode("5d64408c-3f4c-4a08-81a0-6af3fe6823f6");
  return encodeId;
}

function decodedUUID(data) {
  const decodeId = originalId.decode(data);
  return decodeId;
}

console.log("passing data", "5d64408c-3f4c-4a08-81a0-6af3fe6823f6");
let data = encodedUUID();
console.log("encoded data", data);
let result = decodedUUID(data);
console.log("decoded data", result);
