import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://cityclubhouse.net'

  return {
    rules: {
      userAgent: '*', // すべてのボット（Google, Bing等）に対して
      allow: '/',     // 全ページのアクセスを許可
      disallow: [     // クロールしてほしくないパスを指定
        '/private/',  // (例) 管理画面などがあれば
        '/api/',      // APIエンドポイントは検索結果に出したくない場合
      ],
    },
    // ここでsitemapの場所をGoogleに教えます
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}