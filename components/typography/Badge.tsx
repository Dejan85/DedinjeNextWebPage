import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "light" | "accent";
  className?: string;
}

export default function Badge({
  children,
  variant = "primary",
  className = "",
}: BadgeProps) {
  const variantClasses = {
    primary:
      "bg-gradient-to-br from-primary/10 to-primary/5 text-primary",
    light: "bg-white/15 text-white",
    accent: "bg-accent/10 text-accent",
  };

  const classes = `inline-block px-5 py-2 text-xs font-bold uppercase tracking-[2px] rounded-full ${variantClasses[variant]} ${className}`;

  return <span className={classes}>{children}</span>;
}
