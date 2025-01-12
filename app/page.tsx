import fs from "fs";
import path from "path";
import crypto from "crypto";

import Image, { ImageProps } from "next/image";

export default function Home() {
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, idx) => (
          <CacheBustedImage
            key={idx}
            src={`/${(idx + 1).toString().padStart(2, "0")}.jpg`}
            alt=""
            width={500}
            height={500}
            className="object-cover aspect-square w-[20vw] rounded-md"
          />
        ))}
      </div>
    </div>
  );
}

function CacheBustedImage({ src, alt, ...props }: ImageProps) {
  const cacheBustedSrc = typeof src === "string" ? getImageUrl(src) : src;
  return <Image src={cacheBustedSrc} alt={alt} {...props} />;
}

const hashCache = new Map<string, string>();

function getImageUrl(src: string) {
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
