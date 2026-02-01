import styles from "./Text.module.css";

interface TextProps {
  text?: string;
  variant?: "body" | "lead" | "hero-subtitle" | "small" | "caption" | "meta";
  color?: "default" | "muted" | "light" | "primary";
  align?: "left" | "center" | "right";
  className?: string;
  as?: "p" | "span" | "div" | "strong" | "blockquote";
}

export default function Text({
  text,
  variant = "body",
  color = "default",
  align = "left",
  className = "",
  as = "p",
}: TextProps) {
  const Tag = as;

  // Map variant to CSS module classes
  const variantClassMap = {
    body: styles.variantBody,
    lead: styles.variantLead,
    "hero-subtitle": styles.variantHeroSubtitle,
    small: styles.variantSmall,
    caption: styles.variantCaption,
    meta: styles.variantMeta,
  };

  // Color classes
  const colorClassMap = {
    default: styles.colorDefault,
    muted: styles.colorMuted,
    light: styles.colorLight,
    primary: styles.colorPrimary,
  };

  // Alignment classes
  const alignClassMap = {
    left: styles.alignLeft,
    center: styles.alignCenter,
    right: styles.alignRight,
  };

  // Build classes array
  const classes = [
    styles.text,
    variantClassMap[variant],
    colorClassMap[color],
    alignClassMap[align],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Tag className={classes}>{text}</Tag>;
}
