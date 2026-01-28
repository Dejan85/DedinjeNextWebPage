import { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  color?: "dark" | "light" | "primary";
  align?: "left" | "center" | "right";
  className?: string;
}

export default function Heading({
  children,
  variant = "h2",
  size,
  color = "dark",
  align = "left",
  className = "",
}: HeadingProps) {
  const Tag = variant;

  // Automatske veličine na osnovu variante ako size nije prosleđen
  const sizeClasses = {
    h1: "text-5xl",
    h2: "text-4xl",
    h3: "text-2xl",
    h4: "text-lg",
    h5: "text-base",
    h6: "text-sm",
  };

  // Custom size override
  const customSizeClasses = {
    xl: "text-5xl", // 48px+
    lg: "text-4xl", // 42px
    md: "text-2xl", // 24px
    sm: "text-lg", // 18px
    xs: "text-base", // 16px
  };

  const colorClasses = {
    dark: "text-gray-800",
    light: "text-white",
    primary: "text-primary",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const finalSize = size ? customSizeClasses[size] : sizeClasses[variant];

  const classes = `font-roboto font-semibold leading-tight ${finalSize} ${colorClasses[color]} ${alignClasses[align]} ${className}`;

  return <Tag className={classes}>{children}</Tag>;
}
