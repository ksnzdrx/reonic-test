interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  bgColor: string;
  labelColor: string;
  valueColor: string;
}

export function StatCard({
  title,
  value,
  unit,
  subtitle,
  bgColor,
  labelColor,
  valueColor
}: StatCardProps) {
  return (
    <div className={`rounded-xl p-4 ${bgColor}`}>
      <div className={`text-sm font-medium mb-1 ${labelColor}`}>{title}</div>
      <div className={`text-3xl font-bold ${valueColor}`}>
        {value} {unit && <span className="text-xl">{unit}</span>}
      </div>
      {subtitle && (
        <div className={`text-xs mt-1 ${labelColor}`}>{subtitle}</div>
      )}
    </div>
  );
}