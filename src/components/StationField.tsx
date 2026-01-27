"use client";
import { Train } from "lucide-react";

// 駅の定義：路線ごとにグループ分けして、日本人が探しやすくする
// value は提供されたリストの文字列をそのまま使用
const STATION_GROUPS = [
  {
    label: "BTS スクンビット線 (主要エリア)",
    options: [
      { label: "Ha Yaek Lat Phrao (ハーイェーク・ラップラオ)", value: "Ha Yaek Lat Phrao" },
      { label: "Sena Nikhom (セナニコム)", value: "Sena Nikhom" },
      { label: "Ratchayothin (ラチャヨティン)", value: "Ratchayothin" },
      { label: "Phahon Yothin (パホンヨーティン)", value: "Phahon Yothin" },
      { label: "Phaya Thai (パヤタイ)", value: "Phaya Thai" },
      { label: "Ratchathewi (ラチャテウィー)", value: "Ratchathewi" },
      { label: "Phloen Chit (プルンチット)", value: "Phloen Chit" },
      { label: "Asok (アソーク)", value: "Asok" },
      { label: "Asoke (アソーク - 表記揺れ)", value: "Asoke" }, // DB検索用
      { label: "Phrom Phong (プロンポン)", value: "Phrom Phong" },
      { label: "Thong Lor (トンロー)", value: "Thong Lor" },
      { label: "BTS Thong Lor (トンロー - 表記揺れ)", value: "BTS Thong Lor" }, // DB検索用
      { label: "Ekkamai (エカマイ)", value: "Ekkamai" },
      { label: "Phra Khanong (プラカノン)", value: "Phra Khanong" },
      { label: "On Nut (オンヌット)", value: "ON Nut" }, // ON Nutの大文字ママ
      { label: "Bang Chak (バンチャック)", value: "Bang Chak" },
      { label: "Punnawithi (プンナウィティ)", value: "Punnawithi" },
      { label: "Udom Suk (ウドムスック)", value: "Udom Suk" },
      { label: "Bang Na (バンナー)", value: "Bang Na" },
    ],
  },
  {
    label: "BTS シーロム線",
    options: [
      { label: "National Stadium (ナショナルスタジアム)", value: "National Stadium" },
      { label: "Sala Daeng (サラデーン)", value: "Sala Daeng" },
      { label: "Saint Louis (セントルイス)", value: "Saint Louis" },
      { label: "Krung Thon Buri (クルントンブリー)", value: "Krung Thon Buri" },
      { label: "Wongwain Yai (ウォンウェンヤイ)", value: "Wongwain Yai" },
      { label: "Bang Wa (バンワー)", value: "Bang Wa" },
      { label: "Talat Phlu (タラートプルー)", value: "Talat Phlu" },
      { label: "BTS Wutthakat (ウッタカート)", value: "BTS Wutthakat" },
    ],
  },
  {
    label: "MRT ブルーライン (地下鉄)",
    options: [
      { label: "Bang O (バンオー)", value: "Bang O" },
      { label: "Bang Pho (バーンポー)", value: "Bang Pho" },
      { label: "Lat Phrao (ラップラオ)", value: "Lat Phrao" },
      { label: "Sutthisan (スティサン)", value: "Sutthisan" },
      { label: "Huai khwang (ホワイクワン)", value: "Huai khwang" },
      { label: "Phra Ram 9 (ラマ9)", value: "Phra Ram 9" },
      { label: "Sukhumvit (スクンビット - アソーク接続)", value: "Sukhumvit" },
      { label: "Queen Sirikit (クイーンシリキット)", value: "Queen Sirikit National Convention Center" },
      { label: "Khlong Toei (クロントゥーイ)", value: "Khlong Toei" },
      { label: "Lumphini (ルンピニ)", value: "Lumphini" },
      { label: "Samyan (サムヤーン)", value: "Samyan" },
    ],
  },
  {
    label: "その他 (MRTパープル/イエロー/ARL)",
    options: [
      { label: "Bang Khen (バンケーン)", value: "Bang Khen" },
      { label: "Bang Son (バンソン)", value: "Bang Son" },
      { label: "Khlong Tan (クロンタン)", value: "Khlong Tan" },
      { label: "Ramkhamhaeng (ラムカムヘン)", value: "Ramkhamhaeng" },
      { label: "Srinagarindra 38 (シーナカリン38)", value: "Srinagarindra 38" },
      { label: "Wongsawang (ウォンサワン)", value: "Wongsawang" },
    ],
  },
];

type Props = {
  value: string;
  onChange: (next: string) => void;
  label?: string;
  className?: string;
  // カスタムオプションがある場合はそれを使う
  options?: { label: string; options: { label: string; value: string }[] }[];
};

export default function StationField({
  value,
  onChange,
  label = "Station1", // デフォルトタイトル
  className,
  options,
}: Props) {
  // カスタムoptionsが渡されたらそれを使用、なければデフォルトのSTATION_GROUPSを使用
  const groups = options ?? STATION_GROUPS;

  return (
    <label className={["flex flex-col text-sm w-full", className ?? ""].join(" ")}>
      {label && (
        <span className="mb-1.5 font-bold text-gray-700 flex items-center gap-1.5">
          <Train size={14} className="text-blue-600" />
          {label}
        </span>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none border border-gray-300 rounded-lg w-full px-3 py-2.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow cursor-pointer"
        >
          <option value="">駅を指定しない</option>
          {groups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {/* カスタム矢印アイコン */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </label>
  );
}