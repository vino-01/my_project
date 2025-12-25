const crypto = require("crypto");

const algorithm = "aes-256-cbc";

function resolveKey() {
  const keyHex = process.env.ENCRYPTION_KEY;
  const secret = process.env.ENCRYPTION_SECRET;

  if (keyHex) {
    const k = Buffer.from(keyHex, "hex");
    if (k.length !== 32) {
      throw new Error("ENCRYPTION_KEY must be 64 hex chars (32 bytes)");
    }
    return k;
  }

  if (secret) {
    const salt = process.env.ENCRYPTION_SALT || "my_project";
    return crypto.scryptSync(secret, salt, 32);
  }

  console.warn(
    "[encryption] Missing ENCRYPTION_KEY/ENCRYPTION_SECRET; using insecure dev default"
  );
  // Insecure development-only fallback to avoid boot-time crash.
  return crypto.scryptSync("development-secret", "my_project", 32);
}

const key = resolveKey();

exports.encrypt = (buffer) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return { iv, encrypted };
};

exports.decrypt = (encrypted, iv) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]);
};
