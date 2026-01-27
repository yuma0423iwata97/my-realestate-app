'use client';

import { useMemo } from 'react'; // ★ 追加

const LAYOUTS = ['1LDK', '1DK', '2LDK', '2DK', '3LDK', '4LDK']; // シートの Type 値と合わせる

type Props = {
  value: string;                               // 親から渡される現在値
  onChange: (next: string) => void;            // 親へ変更通知
  label?: string;                              // ラベル文言（任意）
  className?: string;
  options?: string[];                          // デフォは上のLAYOUTS
};

export default function LayoutField({
  value,
  onChange,
  label = "Field",
  className,
  options,
}: Props) {
  const list = useMemo(() => (options ?? LAYOUTS).slice().sort(), [options]);

  return (
    <label className={["flex flex-col text-sm", className ?? ""].join(" ")}>
      <span className="mb-1">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">すべて</option>
        {list.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </label>
  );
}