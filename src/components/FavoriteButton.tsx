"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import type { Property } from "@/components/Property";
import { useEffect, useState } from "react";

type Props = {
  property: Property;
  className?: string;
  iconSize?: number;
};

export default function FavoriteButton({ property, className, iconSize = 20 }: Props) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isFav, setIsFav] = useState(false);
  
  // マウント時のちらつき防止（クライアントサイドでのみ判定）
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted) {
      setIsFav(isFavorite(property.ID));
    }
  }, [mounted, isFavorite, property.ID]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // リンク遷移防止
    e.stopPropagation(); // バブリング防止

    if (isFav) {
      removeFavorite(property.ID);
    } else {
      addFavorite(property);
    }
  };

  if (!mounted) {
    // SSR時はグレーのハートを表示しておく（レイアウトシフト防止）
    return (
      <button className={className}>
        <Heart size={iconSize} className="text-gray-400" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleFavorite}
      className={`${className} transition-transform active:scale-90`}
      aria-label={isFav ? "お気に入りから削除" : "お気に入りに追加"}
    >
      <Heart
        size={iconSize}
        className={`transition-colors duration-300 ${
          isFav ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-400"
        }`}
      />
    </button>
  );
}