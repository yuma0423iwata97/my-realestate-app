"use client";

import { FavoritesProvider } from "@/context/FavoritesContext";
import { HistoryProvider } from "@/context/HistoryContext";
import { AuthProvider } from "@/context/AuthContext"; // ★ 追加

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider> {/* ★ 追加: 最上位で認証を管理 */}
      <FavoritesProvider>
        <HistoryProvider>
          {children}
        </HistoryProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}