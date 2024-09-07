const ENCRYPTION_KEY = "X9f%bQ#z2P$mK&jL7@vN4cR8sW1hF6gT";
export function encryptEmail(email: string) {
  const encoded = Buffer.from(email).toString("base64");
  return encoded
    .split("")
    .map((char) => {
      return String.fromCharCode(
        char.charCodeAt(0) ^ ENCRYPTION_KEY.charCodeAt(0)
      );
    })
    .join("");
}

export function decryptEmail(encryptedEmail: string) {
  const decoded = encryptedEmail
    .split("")
    .map((char) => {
      return String.fromCharCode(
        char.charCodeAt(0) ^ ENCRYPTION_KEY.charCodeAt(0)
      );
    })
    .join("");
  return Buffer.from(decoded, "base64").toString("utf-8");
}
