// src/app/area/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MobileAreaSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [mode, setMode] = useState<"all" | "any">("all");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 送信先はお好みで変更（例：/search/area）
    const params = new URLSearchParams({ q, mode });
    router.push(`/search/area?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-3">
      <h1 className="mb-2 text-base font-extrabold tracking-tight">
        フリーワード検索
      </h1>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* 1行レイアウト：md以上で横並び */}
        <div className="grid grid-cols-1 gap-4 items-center">
          {/* 入力 */}
          <label className="block">
            <span className="sr-only">エリア名</span>
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="例）世田谷区"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-[16px] placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
            />
          </label>

          {/* 検索ボタン */}
          <button
            type="submit"
            className="h-[56px] w-full rounded-lg bg-gradient-to-b from-red-600 to-red-700 text-white text-[20px] font-extrabold tracking-wide shadow-sm hover:brightness-105 active:translate-y-[1px] transition"
          >
            検索する
          </button>
        </div>

        {/* ラジオ（すべて/いずれか） */}
        <fieldset className="flex flex-wrap items-center gap-8">
          <legend className="sr-only">検索条件の一致方法</legend>

          {/* すべてを含む */}
          <label className="inline-flex items-center gap-3 cursor-pointer">
            <span
              className={[
                "relative h-6 w-6 rounded-full border",
                mode === "all" ? "border-sky-500" : "border-gray-300",
              ].join(" ")}
            >
              <input
                type="radio"
                name="mode"
                value="all"
                checked={mode === "all"}
                onChange={() => setMode("all")}
                className="peer absolute inset-0 opacity-0 cursor-pointer"
              />
              <span
                className={[
                  "pointer-events-none absolute inset-1 rounded-full",
                  mode === "all" ? "bg-sky-500" : "bg-gray-200",
                ].join(" ")}
              />
            </span>
            <span className="text-[18px]">すべてを含む</span>
          </label>

          {/* いずれかを含む */}
          <label className="inline-flex items-center gap-3 cursor-pointer">
            <span
              className={[
                "relative h-6 w-6 rounded-full border",
                mode === "any" ? "border-sky-500" : "border-gray-300",
              ].join(" ")}
            >
              <input
                type="radio"
                name="mode"
                value="any"
                checked={mode === "any"}
                onChange={() => setMode("any")}
                className="peer absolute inset-0 opacity-0 cursor-pointer"
              />
              <span
                className={[
                  "pointer-events-none absolute inset-1 rounded-full",
                  mode === "any" ? "bg-gray-300" : "bg-gray-200",
                ].join(" ")}
              />
            </span>
            <span className="text-[18px]">いずれかを含む</span>
          </label>
        </fieldset>
      </form>
    </div>
  );
}
