import { createClient } from "microcms-js-sdk";

// 環境変数が読み込めていない場合の安全策
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || "";
const apiKey = process.env.MICROCMS_API_KEY || "";

if (!serviceDomain || !apiKey) {
  console.warn("MicroCMSの環境変数が設定されていません");
}

export const client = createClient({
  serviceDomain,
  apiKey,
});

// 型定義
export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: {
    url: string;
    height: number;
    width: number;
  };
  category?: {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    name: string; // MicroCMS側で選択肢の値をどう設定したかによりますが、基本はこれ
  };
  publishedAt: string;
  updatedAt: string;
};

export type BlogResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Blog[];
};