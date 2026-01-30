import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client, Blog } from '@/lib/microcms';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'バンコク生活お役立ちブログ | CITY CLUB HOUSE',
  description: 'バンコクでの生活情報、エリアガイド、不動産選びのコツなど、現地スタッフならではの情報をお届けします。',
};

// microCMSから記事一覧を取得
async function getBlogList() {
  try {
    const data = await client.getList<Blog>({
      endpoint: "blogs",
      queries: { limit: 100, orders: '-publishedAt' }, // 最新順に100件
    });
    return data.contents;
  } catch (e) {
    console.error("ブログ記事の取得に失敗しました:", e);
    return [];
  }
}

export default async function BlogIndexPage() {
  const posts = await getBlogList();

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans text-gray-800">
      
      {/* ヘッダー */}
      <section className="bg-white border-b border-gray-200 py-12 shadow-sm">
        <div className="container-base text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-full mb-4">
            <BookOpen size={24} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            バンコク生活ブログ
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            不動産情報だけでなく、現地の生活に役立つ情報を発信中。<br/>
            バンコク暮らしのヒントを見つけてください。
          </p>
        </div>
      </section>

      {/* 記事一覧エリア */}
      <div className="container-base py-12">
        
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>現在、記事を準備中です。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

// カードコンポーネント (内部定義)
function BlogCard({ post }: { post: Blog }) {
  // 本文から抜粋を生成（HTMLタグを除去して先頭文字を取得）
  const excerpt = post.content
    ? post.content.replace(/<[^>]*>/g, '').substring(0, 80) + '...'
    : '...';

  return (
    <Link href={`/blog/${post.id}`} className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
      {/* サムネイル画像 */}
      <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
        {post.eyecatch ? (
          <Image
            src={post.eyecatch.url}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
            No Image
          </div>
        )}
        
        {post.category && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
            {post.category.name}
          </div>
        )}
      </div>

      {/* 記事内容 */}
      <div className="flex-1 p-5 flex flex-col">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <Clock size={14} />
          <time>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('ja-JP')}</time>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">
          {excerpt}
        </p>

        <div className="flex items-center text-red-600 text-sm font-bold mt-auto group-hover:underline decoration-red-200 underline-offset-4">
          続きを読む <ChevronRight size={16} />
        </div>
      </div>
    </Link>
  );
}