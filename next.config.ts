// /next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /** ここで外部画像 URL をホワイトリスト登録する */
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',   // ← ★ドメインだけ
        pathname: '/**',                  //   すべてのパスを許可
      },
      // Google Photos なども使う場合は ↓ 追加
      // {
      //   protocol: 'https',
      //   hostname: 'lh3.googleusercontent.com',
      //   pathname: '/**',
      // },
    ],
  },
};

module.exports = nextConfig;
