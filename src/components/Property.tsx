"use client";

import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton"; 
import { 
  MapPin, 
  Train, 
  Home, 
  Ruler, 
  Building2, 
  Calendar, 
  MessageCircle,
  ChevronRight,
  Eye,
  FileText,
  Image as ImageIcon,
  Bath // バスルームアイコン追加
} from "lucide-react";
import clsx from "clsx";

export type Property = {
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
  Floor?: number; // DB上は数値のケースが多いですが、文字列で来る場合は適宜調整
  Year?: number;
  Month?: number;
  Thumbnail?: string;
  Images?: string[];
  Bedroom?: number;  // ★追加
  Bathroom?: number; // ★追加
};

type Props = {
  data: Property;
  className?: string;
  actions?: string[];
  onFavoriteClick?: (p: Property) => void;
  vertical?: boolean; 
};

const STATION_DISPLAY_MAP: Record<string, string> = {
  // 必要に応じてマッピングを追加
};

export default function PropertyCard({
  data,
  className,
  actions = ["見学予約", "詳細を見る"],
  vertical = false,
}: Props) {
  if (!data) return null;
  const p = data;
  const formattedPrice = p.Price ? new Intl.NumberFormat("ja-JP").format(p.Price) : "お問い合わせ";
  const rawStation = p.Station1 || "最寄駅情報なし";
  const displayStation = STATION_DISPLAY_MAP[rawStation] ? `${rawStation} (${STATION_DISPLAY_MAP[rawStation]})` : rawStation;

  // ★ Bedroom/Bathroom を優先表示するロジック
  // データがない場合は従来のLayoutを表示、それもなければ "-"
  const layoutDisplay = p.Bedroom !== undefined
    ? `${p.Bedroom} Bed${p.Bathroom !== undefined ? ` / ${p.Bathroom} Bath` : ''}`
    : (p.Layout || "-");

  const getActionIcon = (label: string) => {
    if (label.includes("見学") || label.includes("予約")) return <Eye size={16} />;
    if (label.includes("間取り") || label.includes("詳細")) return <FileText size={16} />;
    if (label.includes("写真")) return <ImageIcon size={16} />;
    return <ChevronRight size={16} />;
  };

  const getActionLink = (label: string) => {
    if (label.includes("見学") || label.includes("予約")) {
      return "/contact";
    }
    return `/properties/${p.ID}`;
  };

  const isSale = p.Type === "売買" || p.Type === "販売" || p.Type === "Sale";
  const badgeColor = isSale ? "bg-blue-600" : "bg-red-600";

  return (
    <article 
      className={clsx(
        "group relative flex bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
        vertical ? "flex-col h-full" : "flex-col md:flex-row",
        className
      )}
    >
      {/* 画像エリア */}
      <div 
        className={clsx(
          "relative shrink-0 overflow-hidden bg-gray-100",
          vertical ? "w-full aspect-[4/3]" : "w-full md:w-[320px] lg:w-[360px] aspect-[4/3] md:aspect-auto"
        )}
      >
        <Link href={`/properties/${p.ID}`} className="block w-full h-full">
          <Image
            src={p.Thumbnail || "/placeholder.jpg"}
            alt={p.Title || "物件画像"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={vertical ? "(max-width: 768px) 100vw, 400px" : "(max-width: 768px) 100vw, 360px"}
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-40 transition-opacity" />
        </Link>
        
        <div className={`absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded shadow-sm ${badgeColor}`}>
          {p.Type || "賃貸"}
        </div>

        <FavoriteButton 
          property={p} 
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm z-10 hover:bg-white transition-colors text-gray-500 hover:text-red-500"
        />
      </div>

      {/* コンテンツエリア */}
      <div className="flex-1 p-4 md:p-5 flex flex-col justify-between min-w-0">
        <div>
          <div className="mb-3">
             <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                <MapPin size={12} className="text-gray-400" />
                <span>{[p.District, p.Province].filter(Boolean).join(", ") || "エリア情報なし"}</span>
             </div>
             <Link href={`/properties/${p.ID}`} className="block text-lg font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
              {p.Title || "名称未設定の物件"}
            </Link>
          </div>

          {/* スペックグリッド */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-2 my-4 bg-gray-50 rounded-xl p-3 border border-gray-100">
             <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 flex items-center gap-1">
                  <Home size={10} /> ベッド / バス
                </span>
                <span className="text-sm font-bold text-gray-800 truncate" title={layoutDisplay}>
                  {layoutDisplay}
                </span>
             </div>
             <div className="flex flex-col border-l border-gray-200 pl-3">
                <span className="text-[10px] text-gray-500 flex items-center gap-1"><Ruler size={10} /> 広さ</span>
                <span className="text-sm font-bold text-gray-800">{p.Size ? `${p.Size} ㎡` : "-"}</span>
             </div>
             <div className="flex flex-col pt-2 border-t border-gray-200 col-span-1">
                <span className="text-[10px] text-gray-500 flex items-center gap-1"><Building2 size={10} /> 階数</span>
                <span className="text-sm font-bold text-gray-800">{p.Floor ? `${p.Floor}階` : "-"}</span>
             </div>
             <div className="flex flex-col pt-2 border-t border-l border-gray-200 pl-3 col-span-1">
                <span className="text-[10px] text-gray-500 flex items-center gap-1"><Calendar size={10} /> 築年</span>
                <span className="text-sm font-bold text-gray-800">{p.Year ? `${p.Year}年` : "-"}</span>
             </div>
          </div>

          <div className="space-y-1.5 mb-4">
             <div className="flex items-center gap-2 text-sm text-gray-700">
                <Train size={16} className="text-blue-500 shrink-0" />
                <span className="font-medium truncate" title={displayStation}>{displayStation}</span>
                {(p.Time1 ?? 0) > 0 && <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded shrink-0">徒歩{p.Time1}分</span>}
             </div>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-dashed border-gray-200 pt-3 mt-auto">
           <div>
              <span className="text-xs font-bold text-gray-500 block">家賃 / 月</span>
              <span className="text-2xl font-extrabold text-red-600 tracking-tight">
                 {formattedPrice}
                 {p.Price ? <span className="text-sm text-gray-500 font-medium ml-1">THB</span> : null}
              </span>
           </div>
           
           {/* モバイル用アイコン */}
           <div className={clsx("md:hidden", vertical && "!block")}>
              <a 
                href="https://lin.ee/XQiv5FI" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#06C755] text-white shadow-md active:scale-95 transition-transform hover:bg-[#05b54d]"
              >
                 <MessageCircle size={20} />
              </a>
           </div>
        </div>
      </div>

      {/* サイドバー（PC用アクション） */}
      {!vertical && (
        <div className="hidden md:flex p-4 w-64 bg-gray-50 border-l border-gray-100 flex-col justify-center gap-3 shrink-0">
           <div className="flex items-center gap-2 mb-2 pb-3 border-b border-gray-200">
              <div className="w-8 h-8 rounded bg-white border border-gray-200 p-0.5 overflow-hidden shrink-0">
                 <Image src="/cch-logo.JPEG" alt="CCH" width={32} height={32} className="object-cover w-full h-full" unoptimized />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-gray-400 leading-none">取扱不動産</p>
                 <p className="text-xs font-bold text-gray-800 leading-tight">CITY CLUB HOUSE</p>
              </div>
           </div>
           
           <a 
             href="https://lin.ee/XQiv5FI" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="flex items-center justify-center gap-2 w-full bg-[#06C755] hover:bg-[#05b54d] text-white text-sm font-bold py-2.5 rounded-lg shadow-sm transition-all hover:shadow-md"
           >
              <MessageCircle size={18} /> LINEで問い合わせ
           </a>
           
           <div className="flex flex-col gap-2">
              {actions.map((label, i) => (
                 <Link 
                   key={i} 
                   href={getActionLink(label)} 
                   className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold transition-colors border ${i === 0 ? "bg-white border-red-200 text-red-600 hover:bg-red-50" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                 >
                    <div className="flex items-center gap-2">
                       <span className={i === 0 ? "text-red-500" : "text-gray-400"}>{getActionIcon(label)}</span>
                       <span>{label}</span>
                    </div>
                    <ChevronRight size={14} className="text-gray-300" />
                 </Link>
              ))}
           </div>
        </div>
      )}
    </article>
  );
}