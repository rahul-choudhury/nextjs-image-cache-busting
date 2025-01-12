/* eslint-disable @typescript-eslint/no-unused-vars */
import Image, { ImageProps } from "next/image";
import { getImageUrl } from "@/lib/utils";

export default function Home() {
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Image
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
