import type { HTMLAttributes, PropsWithChildren } from "react";
import "./Container.module.css";

export type ContainerVariant = "default" | "fluid" | "wide";

export type ContainerProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    variant?: ContainerVariant;
  }
>;

export default function Container({
  className,
  children,
  variant = "default",
  ...props
}: ContainerProps) {
  const variantClass =
    variant === "default" ? undefined : `container--${variant}`;

  return (
    <div
      className={["container", variantClass, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
