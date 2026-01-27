// src/components/filters/LayoutField.tsx
"use client";

type Props = {
  value: string;                         // 親からもらう現在値
  onChange: (next: string) => void;      // 親へ変更通知
  label?: string;                        // ラベル文言（任意）
  className?: string;
  options?: string[];                    // デフォは下のリスト
};

const DEFAULT_LAYOUTS = ["1LDK", "1DK", "2LDK", "2DK", "3LDK", "4LDK"];

export default function LayoutField({
  value,
  onChange,
  label = "間取り",
  className,
  options,
}: Props) {
  const list = options ?? DEFAULT_LAYOUTS;

  return (
    <label className={["flex flex-col text-sm", className ?? ""].join(" ")}>
      <span className="mb-1">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded w-56 px-3 py-2"
      >
        <option value="">すべて</option>
        {list.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </label>
  );
}

