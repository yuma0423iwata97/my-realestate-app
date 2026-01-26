import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true, // 外部画像の最適化をスキップ（特に無料プランでの制限回避に有効）
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // すべての外部画像を許可（開発中は便利）
      },
    ],
  },
  // output: 'export', // ← これを削除またはコメントアウト
};

export default nextConfig;