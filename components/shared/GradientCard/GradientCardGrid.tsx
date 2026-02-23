import GradientCard, { type GradientCardItem } from "./GradientCard";
import styles from "./GradientCardGrid.module.css";

interface GradientCardGridProps {
  items: GradientCardItem[];
  className?: string;
}

export default function GradientCardGrid({
  items,
  className = "",
}: GradientCardGridProps) {
  return (
    <div className={`${styles.grid} ${className}`}>
      {items.map((item) => (
        <GradientCard key={item.id} item={item} />
      ))}
    </div>
  );
}
