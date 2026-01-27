"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Property } from '@/components/Property';

type HistoryContextType = {
  history: Property[];
  addHistory: (property: Property) => void;
  clearHistory: () => void;
};

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<Property[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 初回ロード時にlocalStorageから読み込む
  useEffect(() => {
    const saved = localStorage.getItem('cch_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // 変更があるたびにlocalStorageに保存
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cch_history', JSON.stringify(history));
    }
  }, [history, isLoaded]);

  const addHistory = (property: Property) => {
    setHistory((prev) => {
      // 重複を除去して先頭に追加
      const filtered = prev.filter((p) => p.ID !== property.ID);
      // 最大20件まで保存
      return [property, ...filtered].slice(0, 20);
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}