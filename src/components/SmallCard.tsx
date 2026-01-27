// src/components/SmallCard.tsx
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

type Props = {
  href: string;
  imageSrc: string;
  imageAlt?: string;
  title: string;              // 例: "〜4000万円の一戸建て"
  className?: string;
};

export default function SmallCard({
  href,
  imageSrc,
  imageAlt = "",
  title,
  className,
}: Props) {
  return (
    <Link
      href={href}
      className={[
        "group block rounded-2xl border bg-white shadow-sm ring-1 ring-black/5 overflow-hidden",
        "transition hover:shadow-md",
        className ?? "",
      ].join(" ")}
      aria-label={title}
    >
      {/* 画像（16:9） */}
      <div className="relative aspect-[16/9]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 360px"
          priority={false}
        />
        {/* ほんのり白マスク（見本の淡いトーン） */}
        <div className="absolute inset-0 bg-white/10 group-hover:bg-white/0 transition" aria-hidden />
      </div>

      {/* テキスト行 */}
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-[18px] font-semibold text-gray-800">
          {title}
        </p>
        <ChevronRight
          className="h-5 w-5 text-red-600 shrink-0 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </div>
    </Link>
  );
}
