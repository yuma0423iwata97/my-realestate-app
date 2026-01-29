"use client";

import { FavoritesProvider } from "@/context/FavoritesContext";
import { HistoryProvider } from "@/context/HistoryContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
      <FavoritesProvider>
        <HistoryProvider>
          {children}
        </HistoryProvider>
      </FavoritesProvider>
  );
}