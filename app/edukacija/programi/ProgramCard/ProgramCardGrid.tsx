import ProgramCard, { type ProgramCardItem } from "./ProgramCard";
import styles from "./ProgramCardGrid.module.css";

interface ProgramCardGridProps {
  items: ProgramCardItem[];
  className?: string;
}

export default function ProgramCardGrid({
  items,
  className = "",
}: ProgramCardGridProps) {
  return (
    <div className={`${styles.grid} ${className}`}>
      {items.map((item) => (
        <ProgramCard key={item.id} item={item} />
      ))}
    </div>
  );
}
