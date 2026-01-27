"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

// ソートの型定義に priceDesc を追加
type SortValue = "idAsc" | "priceAsc" | "priceDesc" | "sizeDesc";

export default function Sort() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  // URLの?sort= を現在値として読む（デフォは idAsc）
  const value = (params.get("sort") as SortValue) || "idAsc";

  const onChange = (v: SortValue) => {
    const q = new URLSearchParams(params.toString());
    q.set("sort", v);
    q.delete("page"); // ページングがあるならリセット
    router.replace(`${pathname}?${q.toString()}`);
  };

  return (
    <div className="inline-block">
      <div className="mb-1 text-[15px]">並び替え：</div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortValue)}
          className="
            w-64 appearance-none rounded border border-gray-300 bg-white
            px-3 py-2 pr-9 text-[18px] leading-tight
            focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none
          "
        >
          <option value="idAsc">おすすめ順</option>
          <option value="priceAsc">価格が安い順</option>
          <option value="priceDesc">価格が高い順</option> {/* 追加 */}
          <option value="sizeDesc">面積の広い順</option>
        </select>
        <svg
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-700"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
        >
          <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}