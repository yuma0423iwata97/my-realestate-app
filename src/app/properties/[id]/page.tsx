import React from 'react';
import ImageCarousel from '@/components/ImageCarousel';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import FavoriteButton from '@/components/FavoriteButton';
import HistoryRecorder from '@/components/HistoryRecorder';
import { getImagesByFolder } from '@/lib/cloudinary'; // ★ 追加: Cloudinary関数
import { 
  MapPin, 
  Train, 
  Home, 
  Ruler, 
  Building2, 
  Calendar, 
  MessageCircle, 
  ArrowLeft,
  Share2,
  Mail,
  Info
} from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

interface Property {
  ID: number;
  Type?: string;
  Title: string;
  Station1?: string;
  Time1?: number;
  Station2?: string;
  Time2?: number;
  Address?: string;
  Province?: string;
  District?: string;
  Price?: number;
  Layout?: string;
  Size?: number;
  Floor?: number;
  Year?: number;
  Month?: number;
  Images: string[];
  Thumbnail?: string; 
  Features?: string[]; 
}

interface ApiResponse {
  data: Property[];
  total: number;
}

const API = process.env.SHEET_API_URL as string;
export const dynamic = 'force-dynamic';

export default async function PropertyDetail({ params }: Props) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (Number.isNaN(id)) notFound();

  let property: Property | null = null;

  try {
    // 1. スプレッドシートAPIから基本情報を取得
    const res = await fetch(`${API}?id=${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('API Error');
    const { data }: ApiResponse = await res.json();
    property = data[0] || null;

    // 2. Cloudinaryから画像を取得 (並行処理も可能だがシンプルに直列で記述)
    // フォルダ構成は "properties/{ID}" と仮定しています
    if (property) {
      const folderPath = `properties/${id}`;
      const cloudImages = await getImagesByFolder(folderPath);
      
      // Cloudinaryに画像があればそれを優先使用、なければスプレッドシートの画像、それもなければ空
      if (cloudImages.length > 0) {
        property.Images = cloudImages;
      }
    }

  } catch (e) {
    console.error(e);
    // エラーでもNotFoundにはせず、データが取れている部分だけで表示を試みるなどのハンドリングも可
    if (!property) notFound();
  }

  if (!property) notFound();
  const p = property;
  
  // コンテキスト保存用にThumbnailを補完 (Imagesの1枚目を使用)
  if (!p.Thumbnail && p.Images?.length > 0) {
    p.Thumbnail = p.Images[0];
  }

  const formattedPrice = p.Price ? p.Price.toLocaleString() : "お問い合わせ";
  const mapQuery = encodeURIComponent(`${p.Title} ${p.District} Bangkok`);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* 閲覧履歴を記録 */}
      <HistoryRecorder property={p} />

      {/* ヘッダーナビ */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
        <div className="container-base py-3 flex items-center justify-between">
          <Link href="/properties" className="text-sm font-bold text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors">
            <ArrowLeft size={16} /> 一覧へ戻る
          </Link>
          <div className="flex items-center gap-4">
            <FavoriteButton 
              property={p} 
              className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-gray-100" 
              iconSize={24}
            />
          </div>
        </div>
      </div>

      <div className="container-base py-8">
        {/* タイトルエリア */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`px-2.5 py-0.5 rounded text-xs font-bold text-white ${p.Type === '売買' ? 'bg-blue-600' : 'bg-red-600'}`}>
              {p.Type || "賃貸"}
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-gray-200 text-gray-600">ID: {p.ID}</span>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-gray-200 text-gray-600">{p.District}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-2">{p.Title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <MapPin size={16} className="text-gray-400 shrink-0" />
              <span>{p.Address || `${p.District}, ${p.Province}`}</span>
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs ml-1 font-bold">(地図を見る)</a>
            </div>
            {p.Station1 && (
              <div className="flex items-center gap-1.5">
                <Train size={16} className="text-blue-500 shrink-0" />
                <span className="font-bold">{p.Station1}</span>
                {(p.Time1 ?? 0) > 0 && <span>徒歩{p.Time1}分</span>}
              </div>
            )}
          </div>
        </div>

        {/* 2カラムレイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          
          {/* 左カラム */}
          <div className="space-y-8 min-w-0">
            {/* 画像カルーセル */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              {p.Images?.length > 0 ? (
                <ImageCarousel images={p.Images} alt={p.Title} className="w-full aspect-[4/3] md:aspect-[16/9] object-cover" />
              ) : (
                <div className="aspect-video bg-gray-100 flex flex-col items-center justify-center text-gray-400">
                  <span className="text-4xl mb-2">📷</span>
                  <span className="font-bold">画像準備中</span>
                  <span className="text-xs mt-2">ID: {p.ID} の画像をCloudinaryにアップロードしてください</span>
                </div>
              )}
            </div>

            {/* スペック */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info size={20} className="text-red-600" /> 物件概要
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SpecItem icon={Ruler} label="広さ" value={p.Size ? `${p.Size} ㎡` : "-"} />
                <SpecItem icon={Home} label="間取り" value={p.Layout || "-"} />
                <SpecItem icon={Building2} label="階数" value={p.Floor ? `${p.Floor}階` : "-"} />
                <SpecItem icon={Calendar} label="築年" value={p.Year ? `${p.Year}年` : "-"} />
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-50"><dt className="text-gray-500">物件タイプ</dt><dd className="font-bold text-gray-900">{p.Type || "賃貸"}</dd></div>
                  <div className="flex justify-between py-2 border-b border-gray-50"><dt className="text-gray-500">エリア</dt><dd className="font-bold text-gray-900">{p.District}</dd></div>
                  <div className="flex justify-between py-2 border-b border-gray-50"><dt className="text-gray-500">最寄り駅</dt><dd className="font-bold text-gray-900">{p.Station1 || "-"}</dd></div>
                  <div className="flex justify-between py-2 border-b border-gray-50"><dt className="text-gray-500">完成年月</dt><dd className="font-bold text-gray-900">{p.Year}年 {p.Month ? `${p.Month}月` : ""}</dd></div>
                </dl>
              </div>
            </section>
          </div>

          {/* 右カラム（追従） */}
          <div className="lg:block">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
                <p className="text-sm font-bold text-gray-500 mb-1">月額家賃</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-red-600 tracking-tight">{formattedPrice}</span>
                  <span className="text-sm font-bold text-gray-500 mb-1.5">THB</span>
                </div>
                <div className="space-y-3">
                  <a href="https://lin.ee/XQiv5FI" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-[#06C755] hover:bg-[#05b54d] text-white font-bold rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-95">
                    <MessageCircle size={20} /> LINEで空室状況を確認
                  </a>
                  <a href="/contact" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-xl transition-colors">
                    <Mail size={18} /> フォームから問い合わせ
                  </a>
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                <h3 className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-2"><Info size={16} /> スタッフのコメント</h3>
                <p className="text-sm text-blue-800 leading-relaxed opacity-80">{p.District}エリアの人気物件です。{p.Station1}駅まで徒歩圏内で、周辺には日本食レストランも多く生活に便利です。ぜひ一度ご内見ください。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 修正箇所: icon の型を React.ElementType に変更
function SpecItem({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center text-center border border-gray-100">
      <div className="text-gray-400 mb-1"><Icon size={20} /></div>
      <div className="text-xs font-bold text-gray-500 mb-0.5">{label}</div>
      <div className="font-bold text-gray-900">{value}</div>
    </div>
  );
}