// src/components/BigOptionCard.tsx
// 注意: このプレビュー環境では next/link が動作しないため、標準の <a> タグを使用しています。
// 本番環境では import Link from "next/link"; を使用し、<a> を <Link> に置き換えてください。
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  href: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  ariaLabel?: string;
};

export default function BigOptionCard({
  href,
  title,
  subtitle,
  icon,
  ariaLabel,
}: Props) {
  return (
    <a
      href={href}
      aria-label={ariaLabel ?? `${title}${subtitle ? " " + subtitle : ""}`}
      className="
        group relative flex items-center justify-between
        w-full p-5 sm:p-6
        bg-white/95 backdrop-blur-sm
        border border-gray-200 rounded-xl
        shadow-sm hover:shadow-xl
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:border-red-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2
        no-underline
      "
    >
      <div className="flex items-center gap-5">
        {/* アイコンエリア：背景をなくし、アイコン自体を強調 */}
        <div 
          className="
            flex-shrink-0 flex items-center justify-center 
            w-12 h-12 sm:w-14 sm:h-14 
            bg-gray-50 rounded-full 
            text-gray-700 group-hover:text-red-600 group-hover:bg-red-50
            transition-colors duration-300
          "
        >
          {/* アイコンサイズを少し大きく調整するためのラッパー */}
          <div className="transform scale-110 sm:scale-125">
            {icon}
          </div>
        </div>

        {/* テキストエリア：左揃えで階層を整理 */}
        <div className="flex flex-col text-left">
          <span className="text-sm font-medium text-gray-500 tracking-wider uppercase mb-0.5">
            {subtitle}
          </span>
          <span className="text-lg sm:text-xl font-bold text-gray-900 leading-tight group-hover:text-red-600 transition-colors">
            {title}
          </span>
        </div>
      </div>

      {/* アクションエリア：矢印で進行方向を示唆 */}
      <div className="pl-4 text-gray-300 group-hover:text-red-500 group-hover:translate-x-1 transition-all duration-300">
        <ChevronRight size={24} strokeWidth={2.5} />
      </div>

      {/* 装飾：ホバー時に出現する微細なグラデーションボーダー（ボトムのみ） */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-red-500/0 to-transparent group-hover:via-red-500/70 transition-all duration-500 opacity-0 group-hover:opacity-100 rounded-b-xl" />
    </a>
  );
}