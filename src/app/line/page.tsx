"use client";

import React from "react";
import Link from "next/link";
import { Train, ChevronRight, Info } from "lucide-react";

/**
 * 路線と駅のデータ定義
 * StationFieldで定義した駅名（value）と一致させることで、検索時に正しくヒットするようにしています。
 */
const TRAIN_LINES = [
  {
    id: "bts-sukhumvit",
    name: "BTS スクンビット線",
    description: "日本人居住率No.1のメインライン",
    colorClass: "bg-[#77C043]",     // BTSライトグリーン
    textClass: "text-[#77C043]",
    borderClass: "border-[#77C043]",
    lightBgClass: "bg-[#77C043]/10",
    stations: [
      { code: "N9", en: "Ha Yaek Lat Phrao", ja: "ハーイェーク・ラップラオ" },
      { code: "N6", en: "Sena Nikhom", ja: "セナニコム" },
      { code: "N2", en: "Phaya Thai", ja: "パヤタイ" },
      { code: "N1", en: "Ratchathewi", ja: "ラチャテウィー" },
      { code: "E2", en: "Phloen Chit", ja: "プルンチット" },
      { code: "E4", en: "Asok", ja: "アソーク", popular: true },
      { code: "E5", en: "Phrom Phong", ja: "プロンポン", popular: true },
      { code: "E6", en: "Thong Lo", ja: "トンロー", popular: true },
      { code: "E7", en: "Ekkamai", ja: "エカマイ", popular: true },
      { code: "E8", en: "Phra Khanong", ja: "プラカノン" },
      { code: "E9", en: "On Nut", ja: "オンヌット", popular: true },
      { code: "E10", en: "Bang Chak", ja: "バンチャック" },
      { code: "E11", en: "Punnawithi", ja: "プンナウィティ" },
      { code: "E12", en: "Udom Suk", ja: "ウドムスック" },
      { code: "E13", en: "Bang Na", ja: "バンナー" },
    ],
  },
  {
    id: "mrt-blue",
    name: "MRT ブルーライン",
    description: "ビジネス街と下町を結ぶ地下鉄",
    colorClass: "bg-[#1A4396]",     // MRTブルー
    textClass: "text-[#1A4396]",
    borderClass: "border-[#1A4396]",
    lightBgClass: "bg-[#1A4396]/10",
    stations: [
      { code: "BL15", en: "Lat Phrao", ja: "ラップラオ" },
      { code: "BL17", en: "Sutthisan", ja: "スティサン" },
      { code: "BL18", en: "Huai khwang", ja: "ホワイクワン" },
      { code: "BL20", en: "Phra Ram 9", ja: "ラマ9", popular: true },
      { code: "BL22", en: "Sukhumvit", ja: "スクンビット (アソーク接続)" },
      { code: "BL23", en: "Queen Sirikit", ja: "クイーンシリキット" },
      { code: "BL24", en: "Khlong Toei", ja: "クロントゥーイ" },
      { code: "BL25", en: "Lumphini", ja: "ルンピニ" },
      { code: "BL26", en: "Si Lom", ja: "シーロム (サラデーン接続)", popular: true },
      { code: "BL27", en: "Samyan", ja: "サムヤーン" },
      { code: "BL30", en: "Bang O", ja: "バンオー" },
    ],
  },
  {
    id: "bts-silom",
    name: "BTS シーロム線",
    description: "サトーン・シーロム方面へのアクセス",
    colorClass: "bg-[#00827E]",     // BTSダークグリーン
    textClass: "text-[#00827E]",
    borderClass: "border-[#00827E]",
    lightBgClass: "bg-[#00827E]/10",
    stations: [
      { code: "W1", en: "National Stadium", ja: "ナショナルスタジアム" },
      { code: "S2", en: "Sala Daeng", ja: "サラデーン", popular: true },
      { code: "S4", en: "Saint Louis", ja: "セントルイス" },
      { code: "S7", en: "Krung Thon Buri", ja: "クルントンブリー" },
      { code: "S8", en: "Wongwain Yai", ja: "ウォンウェンヤイ" },
      { code: "S10", en: "Talat Phlu", ja: "タラートプルー" },
      { code: "S11", en: "BTS Wutthakat", ja: "ウッタカート" },
      { code: "S12", en: "Bang Wa", ja: "バンワー" },
    ],
  },
];

export default function TrainSearchPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans text-gray-800">
      
      {/* ヒーローセクション */}
      <section className="bg-white border-b border-gray-100 pt-10 pb-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold mb-4">
            <Train size={14} />
            STATION SEARCH
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            駅・路線から探す
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            通勤や通学のルートに合わせて。<br />
            バンコクの主要3路線から、ご希望の駅を選択してください。
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl -mt-6 relative z-10 space-y-10">
        
        {/* 各路線のカード */}
        {TRAIN_LINES.map((line) => (
          <div 
            key={line.id} 
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* 路線ヘッダー */}
            <div className={`px-6 py-4 flex items-center justify-between border-b ${line.lightBgClass} ${line.borderClass} border-opacity-20`}>
              <div className="flex items-center gap-4">
                {/* 路線カラーアイコン */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${line.colorClass} text-white`}>
                  <Train size={20} />
                </div>
                <div>
                  <h2 className={`text-lg font-bold ${line.textClass}`}>
                    {line.name}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {line.description}
                  </p>
                </div>
              </div>
            </div>

            {/* 駅リスト（路線図風） */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {line.stations.map((station) => (
                  <Link
                    key={station.code}
                    href={`/properties?station=${encodeURIComponent(station.en)}`}
                    className={`
                      group relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 hover:shadow-md
                      ${station.popular 
                        ? "bg-white border-gray-300 hover:border-red-400" 
                        : "bg-gray-50/50 border-gray-100 hover:bg-white hover:border-gray-300"
                      }
                    `}
                  >
                    {/* 駅コードバッジ */}
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 shadow-sm
                      ${line.colorClass} text-white
                    `}>
                      {station.code}
                    </div>
                    
                    {/* 駅名 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800 text-sm truncate">
                          {station.en}
                        </span>
                        {station.popular && (
                          <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold whitespace-nowrap">
                            人気
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 truncate">
                        {station.ja}
                      </div>
                    </div>

                    <ChevronRight size={16} className="text-gray-300 group-hover:text-red-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* ヒントセクション */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex items-start gap-3">
          <Info className="text-blue-500 shrink-0 mt-0.5" size={20} />
          <div className="text-sm text-blue-800">
            <h4 className="font-bold mb-1">駅選びのヒント</h4>
            <p className="opacity-80 leading-relaxed">
              初めてのバンコク生活なら、日本人が多く住む<span className="font-bold">プロンポン (Phrom Phong)</span>、<span className="font-bold">トンロー (Thong Lo)</span>、<span className="font-bold">エカマイ (Ekkamai)</span>周辺がおすすめです。
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}