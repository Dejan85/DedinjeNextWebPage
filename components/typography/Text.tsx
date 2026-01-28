import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  variant?: "body" | "lead" | "small" | "caption" | "meta";
  color?: "default" | "muted" | "light" | "primary";
  align?: "left" | "center" | "right";
  className?: string;
  as?: "p" | "span" | "div";
}

export default function Text({
  children,
  variant = "body",
  color = "default",
  align = "left",
  className = "",
  as = "p",
}: TextProps) {
  const Tag = as;

  const variantClasses = {
    body: "text-[15px] leading-relaxed", // 15px, line-height: 1.7
    lead: "text-lg leading-loose", // 18px, line-height: 1.8
    small: "text-sm leading-normal", // 14px, line-height: 1.6
    caption: "text-xs leading-normal", // 13px
    meta: "text-xs", // 13px
  };

  const colorClasses = {
    default: "text-gray-600",
    muted: "text-gray-500",
    light: "text-white",
    primary: "text-primary",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const classes = `font-opensans ${variantClasses[variant]} ${colorClasses[color]} ${alignClasses[align]} ${className}`;

  return <Tag className={classes}>{children}</Tag>;
}
