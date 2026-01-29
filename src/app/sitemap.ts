import { MetadataRoute } from 'next';

// サイトのベースURL（独自ドメイン取得後はここを書き換えてください）
const BASE_URL = 'https://cityclubhouse.net'; 
const API = process.env.SHEET_API_URL as string;

// データ型の定義（page.tsxと同じもの）
interface Property {
  ID: number;
  // ...他はsitemapには不要なので省略可ですが、一応IDがあれば十分です
  Updated?: string; // もし更新日があれば使う
}

interface ApiResponse {
  data: Property[];
}

export const revalidate = 3600; // 1時間に1回更新（API負荷軽減のため重要）

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. 固定ページの定義
  const staticRoutes = [
    '',           // トップページ
    '/properties', // 物件一覧
    '/contact',    // お問い合わせ
    '/about',   // CCHについて
    '/area',
    '/areas',
    '/favorites',
    '/flow',
    '/history',
    '/line',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8, // トップページは優先度MAX
  }));

  // 2. 動的ページ（物件詳細）の取得と定義
  let propertyRoutes: MetadataRoute.Sitemap = [];

  try {
    // 全物件のIDを取得（APIが全件返す仕様前提）
    // ※もしページネーションがある場合は、全件取得できるパラメータ等を調整してください
    const res = await fetch(API, { next: { revalidate: 3600 } });
    if (res.ok) {
      const { data }: ApiResponse = await res.json();
      
      propertyRoutes = data.map((property) => ({
        url: `${BASE_URL}/properties/${property.ID}`,
        lastModified: new Date(), // 本当はproperty.Updatedなどがあればそれを使う
        changeFrequency: 'weekly' as const,
        priority: 0.7, // 個別物件の優先度
      }));
    }
  } catch (error) {
    console.error('Sitemap generation failed:', error);
  }

  // 3. 合体して返す
  return [...staticRoutes, ...propertyRoutes];
}