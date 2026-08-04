import { Link } from "@/i18n/navigation";
import { ComponentProps } from "react";
import styles from "./Button.module.css";

type ButtonVariant =
  | "primary"
  | "white"
  | "outline-white"
  | "hero"
  | "secondary"
  | "submit"
  | "download"
  | "download-small"
  | "download-full"
  | "outline"
  | "card";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentProps<"button">, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentProps<typeof Link>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const variantClasses: Record<ButtonVariant, string> = {
    primary: styles.btnPrimary,
    white: styles.btnWhite,
    "outline-white": styles.btnOutlineWhite,
    hero: styles.heroBtn,
    secondary: styles.btnSecondary,
    submit: styles.btnSubmit,
    download: styles.btnDownload,
    "download-small": styles.btnDownloadSmall,
    "download-full": styles.btnDownloadFull,
    outline: styles.btnOutline,
    card: styles.btnCard,
  };

  const combinedClassName = `${variantClasses[variant]} ${className}`.trim();

  if (props.href) {
    const { href, ...linkProps } = props as ButtonAsLink;
    return (
      <Link href={href} className={combinedClassName} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
