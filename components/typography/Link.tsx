import { ReactNode } from "react";
import NextLink from "next/link";

interface LinkProps {
  children: ReactNode;
  href: string;
  variant?: "default" | "primary" | "light" | "underline";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
}

export default function Link({
  children,
  href,
  variant = "default",
  size = "md",
  className = "",
  external = false,
}: LinkProps) {
  const variantClasses = {
    default: "text-inherit hover:text-primary",
    primary: "text-primary hover:text-primary-dark",
    light: "text-white hover:text-white/80",
    underline: "text-primary underline hover:text-primary-dark",
  };

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const classes = `font-semibold inline-flex items-center gap-2 transition-all duration-300 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <NextLink href={href} className={classes} {...linkProps}>
      {children}
    </NextLink>
  );
}
