"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User as UserIcon } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function UserMenu() {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  if (user) {
    // ログイン中
    return (
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
          <UserIcon size={16} className="text-gray-400" />
          <span className="truncate max-w-[150px]">{user.email}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">ログアウト</span>
        </button>
      </div>
    );
  }

  // 未ログイン
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link
        href="/signup"
        className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors whitespace-nowrap"
      >
        会員登録
      </Link>
      <Link
        href="/login"
        className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white bg-red-600 rounded-md hover:bg-red-700 shadow-sm transition-colors whitespace-nowrap"
      >
        ログイン
      </Link>
    </div>
  );
}