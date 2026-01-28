import NextImage from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export default function Image({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  priority = false,
  quality = 85,
  sizes,
  objectFit = "cover",
}: ImageProps) {
  if (fill) {
    return (
      <NextImage
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        quality={quality}
        sizes={sizes}
        style={{ objectFit }}
      />
    );
  }

  const imageWidth = width || 800;
  const imageHeight = height || 600;

  return (
    <NextImage
      src={src}
      alt={alt}
      width={imageWidth}
      height={imageHeight}
      className={className}
      priority={priority}
      quality={quality}
      sizes={sizes}
      style={{ objectFit }}
    />
  );
}
