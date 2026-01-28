import { Text } from "@/components/typography";

interface StatItemProps {
  value: string | number;
  label: string;
  className?: string;
}

export default function StatItem({
  value,
  label,
  className = "",
}: StatItemProps) {
  return (
    <div className={`stat-item ${className}`}>
      <div className="stat-value">{value}</div>
      <Text text={label} variant="small" className="stat-label" />
    </div>
  );
}
