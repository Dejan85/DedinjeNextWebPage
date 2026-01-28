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
  objectFit = "cover",
}: ImageProps) {
  // Ako je fill true, koristimo CSS za fill efekat
  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: objectFit,
          inset: 0,
        }}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ objectFit }}
    />
  );
}
