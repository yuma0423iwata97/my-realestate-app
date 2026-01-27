"use client";

import PropertyCard from "@/components/Property";
import { useHistory } from "@/context/HistoryContext";
import { History, Trash2, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const { history, clearHistory } = useHistory();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-screen bg-gray-50" />;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200 py-12 shadow-sm">
        <div className="container-base text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-full mb-4">
            <History size={24} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">閲覧履歴</h1>
          <p className="text-gray-500 mb-6 max-w-lg mx-auto">
            最近チェックした物件がここに保存されます（最大20件）。<br />
            気になった物件を後から比較するのに便利です。
          </p>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-sm text-red-600 hover:bg-red-50 hover:text-red-700 px-5 py-2.5 rounded-full transition-all border border-transparent hover:border-red-100 flex items-center justify-center gap-2 mx-auto font-bold"
            >
              <Trash2 size={16} /> 履歴をすべて削除
            </button>
          )}
        </div>
      </div>

      <div className="container-base py-12">
        {history.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 text-gray-400 rounded-full mb-4">
              <Search size={32} />
            </div>
            <p className="text-xl font-bold text-gray-900 mb-2">閲覧履歴はありません</p>
            <p className="text-gray-500 mb-8">気になった物件の詳細ページを見ると、ここに履歴が残ります。</p>
            <Link href="/search" className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-full shadow-lg hover:bg-red-700 hover:shadow-xl hover:-translate-y-0.5 transition-all">
              物件を探しに行く
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {history.map((p) => (
              <PropertyCard 
                key={p.ID} 
                data={p} 
                // PropertyCard自体は変更せず、CSSで強制的に縦型カードスタイルを適用
                // !flex-col: PCでも縦積みに強制 (PropertyCardのmd:flex-rowを打ち消し)
                // [&>div:first-child]:!w-full: 画像エリアの幅固定を解除して100%に
                // [&>div:last-child]:!hidden: PC用サイドバー（アクションボタン列）を非表示にしてスッキリさせる
                className="!flex-col [&>div:first-child]:!w-full [&>div:last-child]:!hidden h-full shadow-md hover:shadow-xl"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}