import ProgramCard, { type ProgramCardItem } from "./ProgramCard";
import styles from "./ProgramCardGrid.module.css";

interface ProgramCardGridProps {
  items: ProgramCardItem[];
  className?: string;
  titleColor?: "light" | "dark";
}

export default function ProgramCardGrid({
  items,
  className = "",
  titleColor = "light",
}: ProgramCardGridProps) {
  return (
    <div className={`${styles.grid} ${className}`}>
      {items.map((item) => (
        <ProgramCard key={item.id} item={item} titleColor={titleColor} />
      ))}
    </div>
  );
}
