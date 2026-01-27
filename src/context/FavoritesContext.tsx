"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Property } from '@/components/Property';

type FavoritesContextType = {
  favorites: Property[];
  addFavorite: (property: Property) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 初回ロード時にlocalStorageから読み込む
  useEffect(() => {
    const saved = localStorage.getItem('cch_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // 変更があるたびにlocalStorageに保存
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cch_favorites', JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  const addFavorite = (property: Property) => {
    setFavorites((prev) => {
      if (prev.some((p) => p.ID === property.ID)) return prev;
      return [...prev, property];
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((p) => p.ID !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.some((p) => p.ID === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}