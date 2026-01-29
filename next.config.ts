

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 画像の許可設定（以前の設定を維持）
  images: {
  	unoptimized: true, // 外部画像の最適化をスキップ（特に無料プランでの制限回避に有効）
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io', // MicroCMSの画像用に追加
      },
    ],
  },
  // ★ここを追加：ESLintのエラーでビルドを止めない設定
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;