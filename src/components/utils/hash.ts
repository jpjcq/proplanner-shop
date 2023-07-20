import crypto from "crypto";

export default function hashEmail(email: string): string {
  const hash = crypto.createHash("sha256");
  hash.update(email.toLowerCase());
  return hash.digest("hex");
}
