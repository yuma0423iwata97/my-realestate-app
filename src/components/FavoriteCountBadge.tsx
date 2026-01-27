"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { useEffect, useState } from "react";

export default function FavoriteCountBadge() {
  const { favorites } = useFavorites();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || favorites.length === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white">
      {favorites.length}
    </span>
  );
}