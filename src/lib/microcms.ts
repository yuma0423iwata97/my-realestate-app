import { createClient } from "microcms-js-sdk";
import type { MicroCMSImage, MicroCMSDate } from "microcms-js-sdk";

// 環境変数のチェック
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

// クライアントの初期化
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// --- 型定義 ---

// カテゴリー
export type Category = {
  id: string;
  name: string;
} & MicroCMSDate;

// ブログ記事
export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: MicroCMSImage;
  category?: Category;
  description?: string; // 記事の概要文（メタデータ用）
} & MicroCMSDate;