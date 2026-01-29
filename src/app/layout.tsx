import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';
import Image from 'next/image'; // 追加
import { History, Menu, Heart } from "lucide-react";
import Providers from "@/components/Providers";
import FavoriteCountBadge from "@/components/FavoriteCountBadge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CITY CLUB HOUSE | バンコクのコンドミニアム・不動産探し",
  description: "バンコクの日本人向け賃貸物件・コンドミニアム検索サイト。手数料無料、日本人スタッフ対応。",
  
  verification: {
    google: "4DkqyLV6x_-bAQ5zU9a5limAYlYfI3DibX_K5cHBAls",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <Providers>
          <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container-base h-16 flex items-center justify-between">
              
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                {/* <img> を <Image> に変更 */}
                <div className="relative h-10 w-10 rounded-sm overflow-hidden">
                  <Image 
                    src="/cch-logo.JPEG" 
                    alt="City Club House Logo" 
                    fill 
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <span className="font-black tracking-widest text-xl sm:text-2xl text-[#1f1a17] uppercase leading-none hidden sm:block">
                  City Club House
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                <div className="flex items-center text-sm font-medium text-gray-600 bg-gray-100 rounded-full p-1 border">
                  <Link href="/favorites" className="flex items-center gap-2 px-4 py-1.5 rounded-full hover:bg-white hover:shadow-sm transition-all relative">
                    <Heart size={16} className="text-red-500" />
                    <span>お気に入り</span>
                    <FavoriteCountBadge />
                  </Link>
                  <Link href="/history" className="flex items-center gap-2 px-4 py-1.5 rounded-full hover:bg-white hover:shadow-sm transition-all">
                    <History size={16} className="text-blue-500" />
                    <span>閲覧履歴</span>
                  </Link>
                </div>
                {/* ユーザーメニュー (後に追加必須）*/}
                {/*<UserMenu />*/}
              </nav>

              <div className="md:hidden flex items-center gap-4">
                <Link href="/favorites" className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative">
                  <Heart size={24} />
                  <FavoriteCountBadge />
                </Link>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t bg-white py-8 mt-12">
            <div className="container-base text-center text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} CITY CLUB HOUSE. All rights reserved.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}