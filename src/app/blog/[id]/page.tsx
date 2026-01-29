import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import parse from 'html-react-parser';
import * as cheerio from 'cheerio';
import { Clock, ChevronRight, Folder } from 'lucide-react';
import { client, Blog } from '@/lib/microcms';

// --- 型定義 ---
type Props = {
  params: Promise<{ id: string }>;
};

// --- データ取得 ---
async function getBlogPost(id: string): Promise<Blog | null> {
  try {
    const data = await client.get({
      endpoint: "blogs",
      contentId: id,
      // next: { revalidate: 3600 } // MicroCMS SDKはデフォルトでキャッシュしないため、必要に応じて設定
    });
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// 静的生成用（任意：SSGにするなら必要）
export async function generateStaticParams() {
  const { contents } = await client.getList<Blog>({ endpoint: "blogs" });
  return contents.map((post) => ({
    id: post.id,
  }));
}

export const revalidate = 3600; // 1時間ごとに再生成

// --- 記事詳細ページ ---
export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) notFound();

  // 目次(TOC)の生成ロジック
  // 第3引数に false を指定して「断片（フラグメント）」として読み込ませる
const $ = cheerio.load(post.content || "", null, false);
  const headings = $('h2, h3').toArray().map((data) => ({
    text: $(data).text(),
    id: $(data).attr('id') || `section-${Math.random().toString(36).substr(2, 9)}`,
    tag: data.tagName,
  }));

  // 本文中のH2/H3にIDを付与
  $('h2, h3').each((i, el) => {
    if (!$(el).attr('id')) {
      $(el).attr('id', headings[i].id);
    }
  });
  // imgタグにクラスを追加（Tailwindでのスタイリングのため）
  $('img').addClass('w-full h-auto rounded-lg my-6 shadow-sm border border-gray-100');
  
  const contentHtml = $.html();

  return (
    <div className="bg-[#f9fafb] min-h-screen py-8 md:py-12 font-sans">
      <div className="container-base">
        
        {/* パンくずリスト */}
        <nav className="flex items-center text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-red-600 transition-colors">TOP</Link>
          <ChevronRight size={14} className="mx-2 shrink-0" />
          <Link href="/blog" className="hover:text-red-600 transition-colors">ブログ一覧</Link>
          <ChevronRight size={14} className="mx-2 shrink-0" />
          <span className="font-semibold text-gray-800 truncate">{post.title}</span>
        </nav>

        {/* 2カラムレイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          
          {/* === 左カラム：記事本文 === */}
          <main className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* アイキャッチ画像 */}
            {post.eyecatch && (
              <div className="w-full aspect-video relative">
                <Image
                  src={post.eyecatch.url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="p-6 md:p-10">
              {/* ヘッダー情報 */}
              <div className="mb-8 border-b border-gray-100 pb-8">
                <div className="flex flex-wrap gap-3 mb-4">
                  {post.category && (
                    <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-red-100">
                      <Folder size={12} />
                      {post.category.name}
                    </span>
                  )}
                  <div className="flex items-center text-gray-500 text-xs font-medium">
                    <Clock size={14} className="mr-1" />
                    {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                  </div>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                  {post.title}
                </h1>
              </div>

              {/* 目次ボックス */}
              {headings.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-10">
                  <p className="font-bold text-gray-800 mb-4 text-center">目次</p>
                  <ul className="space-y-3 text-sm">
                    {headings.map((h) => (
                      <li key={h.id} className={`${h.tag === 'h3' ? 'ml-6 text-gray-600' : 'font-medium text-gray-800'}`}>
                        <a href={`#${h.id}`} className="hover:text-red-600 hover:underline transition-colors flex items-start gap-2">
                          <span className="text-red-400 mt-0.5">●</span>
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 記事本文 */}
              <div className="blog-content prose prose-lg prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 max-w-none">
                {parse(contentHtml)}
              </div>
            </div>
          </main>


          {/* === 右カラム：サイドバー === */}
          <aside className="space-y-6">
            {/* プロフィール */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b">運営者：CityClubHouse</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full shrink-0 overflow-hidden relative border border-gray-100">
                   <Image src="/cch-logo.JPEG" alt="logo" fill className="object-cover" />
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  バンコクのコンドミニアム探しを徹底サポート。「透明性・即レス」がモットー。現地から最新情報をお届けします。
                </p>
              </div>
              <a href="/contact" className="block w-full bg-red-600 text-white text-center font-bold py-3 rounded-lg text-sm hover:bg-red-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                お問い合わせはこちら
              </a>
            </div>

            {/* 物件検索バナー */}
            <div className="bg-[#1f2937] p-6 rounded-xl text-center text-white shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <p className="font-bold text-lg mb-2">バンコクの物件を探す</p>
                <p className="text-xs text-gray-400 mb-6">スクンビットエリアを中心に厳選掲載</p>
                <Link href="/" className="block w-full bg-white text-gray-900 font-bold py-3 rounded hover:bg-gray-100 transition shadow-md">
                  物件一覧を見る
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

// SEO用メタデータ生成
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const post = await getBlogPost(id);
  
  if(!post) return { title: '記事が見つかりません' };
  
  // HTMLタグを除去して説明文を作る
  const description = post.description 
    ? post.description 
    : (post.content || "").replace(/<[^>]*>/g, '').substring(0, 100) + '...';

  return {
    title: `${post.title} | CityClubHouse ブログ`,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      images: [post.eyecatch?.url || '/og-default.png'],
      type: 'article',
    }
  };
}