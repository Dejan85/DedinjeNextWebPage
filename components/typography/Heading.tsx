import styles from "./Heading.module.css";

interface HeadingProps {
  text?: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "hero" | "xl" | "lg" | "md" | "sm" | "xs";
  color?: "dark" | "light" | "primary";
  align?: "left" | "center" | "right";
  className?: string;
  dangerouslySetInnerHTML?: { __html: string };
}

export default function Heading({
  text,
  variant = "h2",
  size,
  color = "dark",
  align = "left",
  className = "",
  dangerouslySetInnerHTML,
}: HeadingProps) {
  const Tag = variant;

  // Map size to CSS module classes
  const sizeClassMap = {
    hero: styles.sizeHero,
    xl: styles.sizeXl,
    lg: styles.sizeLg,
    md: styles.sizeMd,
    sm: styles.sizeSm,
    xs: styles.sizeXs,
  };

  // Map variant to default size classes
  const variantClassMap = {
    h1: styles.h1,
    h2: styles.h2,
    h3: styles.h3,
    h4: styles.h4,
    h5: styles.h5,
    h6: styles.h6,
  };

  // Color classes
  const colorClassMap = {
    dark: styles.colorDark,
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
    styles.heading,
    size ? sizeClassMap[size] : variantClassMap[variant],
    size === "hero" ? styles.fontBold : styles.fontSemibold,
    colorClassMap[color],
    alignClassMap[align],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (dangerouslySetInnerHTML) {
    return <Tag className={classes} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />;
  }

  return <Tag className={classes}>{text}</Tag>;
}
