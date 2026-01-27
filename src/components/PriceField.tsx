"use client";

type Props = {
  min: string;
  max: string;
  onChange: (next: { min: string; max: string }) => void;
  className?: string;
};

export default function PriceFields({ min, max, onChange, className }: Props) {
  return (
    <div className={["flex items-center gap-2", className ?? ""].join(" ")}>
      <input
        type="number"
        placeholder="Min"
        className="border rounded px-3 py-2 w-32"
        value={min}
        onChange={(e) => onChange({ min: e.target.value, max })}
      />
      <span>–</span>
      <input
        type="number"
        placeholder="Max"
        className="border rounded px-3 py-2 w-32"
        value={max}
        onChange={(e) => onChange({ min, max: e.target.value })}
      />
    </div>
  );
}