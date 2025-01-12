import fs from "fs";
import path from "path";
import crypto from "crypto";

const hashCache = new Map<string, string>();

export function getImageUrl(src: string) {
  if (process.env.NODE_ENV !== "production") {
    return src;
  }

  if (hashCache.has(src)) {
    return `${src}?v=${hashCache.get(src)}`;
  }

  const publicDir = path.join(process.cwd(), "public");
  const filePath = path.join(publicDir, src);

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const hash = crypto.createHash("md5").update(fileBuffer).digest("hex");
    hashCache.set(src, hash);
    return `${src}?v=${hash}`;
  } catch (error) {
    console.error(`Error reading file: ${src}`, error);
    return src;
  }
}
