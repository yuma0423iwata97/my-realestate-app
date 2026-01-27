"use client";

import PropertyCard from "@/components/Property";
import { useFavorites } from "@/context/FavoritesContext";
import { Heart, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-screen bg-gray-50" />; // ローディング中の表示

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200 py-12 shadow-sm">
        <div className="container-base text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 text-red-500 rounded-full mb-4">
            <Heart size={24} fill="currentColor" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">お気に入り物件</h1>
          <p className="text-gray-500 mb-6">
            {favorites.length}件の物件を保存しています
          </p>
        </div>
      </div>

      <div className="container-base py-12">
        {favorites.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 text-gray-400 rounded-full mb-4">
              <Search size={32} />
            </div>
            <p className="text-xl font-bold text-gray-900 mb-2">お気に入りの物件はありません</p>
            <p className="text-gray-500 mb-8">気になった物件のハートマークを押してリストに追加しましょう。</p>
            <Link href="/search" className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-full shadow-lg hover:bg-red-700 hover:shadow-xl hover:-translate-y-0.5 transition-all">
              物件を探しに行く
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((p) => (
              <PropertyCard 
                key={p.ID} 
                data={p} 
                // HistoryPageと同様のスタイル修正
                // !flex-col: PCでも縦積みに強制
                // [&>div:first-child]:!w-full: 画像幅を100%に
                // [&>div:last-child]:!hidden: PC用サイドバー非表示
                className="!flex-col [&>div:first-child]:!w-full [&>div:last-child]:!hidden h-full shadow-md hover:shadow-xl"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}