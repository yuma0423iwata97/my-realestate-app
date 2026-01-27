"use client";
import { MapPin } from "lucide-react"; // アイコンがあれば使用

// エリアの定義：日本人になじみのあるグループ分け
const DISTRICT_GROUPS = [
  {
    label: "スクンビット（日本人人気エリア）",
    options: [
      { label: "ワッタナー (北側: トンロー/エカマイ/プロンポン)", value: "Watthana" },
      { label: "クロントゥーイ (南側: アソーク/プラカノン)", value: "Khlong Toei" },
      { label: "プラカノン (オンヌット〜)", value: "Phara Khanong" },
      { label: "スアンルアン (東部)", value: "Suan Luang" },
      { label: "バンナー (郊外・大規模店)", value: "Bang Na" },
    ],
  },
  {
    label: "シーロム・サトーン・ルンピニ",
    options: [
      { label: "パトゥムワン (サイアム/プルンチット)", value: "Pathum Wan" },
      { label: "サトーン (ビジネス街)", value: "Sathon" },
      { label: "バンラック (シーロム)", value: "Bang Rak" },
      { label: "ヤンナワ (ラマ3世通り)", value: "Yan Nawa" },
    ],
  },
  {
    label: "ラチャダー・ラマ9・北側",
    options: [
      { label: "フワイクワン (ラチャダー/新CBD)", value: "Huai Khwang" },
      { label: "ディンデーン (ラマ9)", value: "Din Daeng" },
      { label: "パヤタイ (BTS北側)", value: "Phaya Thai" }, // 修正: スペル確認要(Phaya Thaiが一般的)
      { label: "チャトゥチャック (北バスターミナル)", value: "Chatuchak" },
      { label: "バンスー (グランドステーション)", value: "Bang Sue" },
    ],
  },
  {
    label: "リバーサイド・トンブリー側",
    options: [
      { label: "クローンサーン (アイコンサイアム周辺)", value: "Khlong San" },
      { label: "トンブリー", value: "Thon Buri" },
      { label: "バーンプラット", value: "Bang Phlat" },
    ],
  },
  {
    label: "その他エリア",
    options: [
      { label: "バーンカピ", value: "Bang Kapi" },
      { label: "ラックシー", value: "Lak Si" },
      { label: "ラーチャテーウィー", value: "Ratchathewi" },
      { label: "プラウェート", value: "Prawet" },
      { label: "バーンケー", value: "Phasi Charoen" }, // Phasi Charoenなど
      { label: "サムットプラカーン県", value: "Mueang Samut Prakan District" },
      { label: "バーンプリー", value: "Bang Phli District" },
      { label: "バーンサオトン", value: "Bang Sao Thong District" },
    ],
  },
];

type Props = {
  value: string;
  onChange: (next: string) => void;
  label?: string;
  className?: string;
  // カスタムオプションがある場合はそれを使う（基本は使わない想定）
  options?: { label: string; options: { label: string; value: string }[] }[];
};

export default function DistrictField({
  value,
  onChange,
  label = "エリア（区）",
  className,
  options,
}: Props) {
  // カスタムoptionsが渡されたらそれを使用、なければデフォルトのDISTRICT_GROUPSを使用
  const groups = options ?? DISTRICT_GROUPS;

  return (
    <label className={["flex flex-col text-sm w-full", className ?? ""].join(" ")}>
      {label && (
        <span className="mb-1.5 font-bold text-gray-700 flex items-center gap-1.5">
          <MapPin size={14} className="text-red-500" />
          {label}
        </span>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none border border-gray-300 rounded-lg w-full px-3 py-2.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow cursor-pointer"
        >
          <option value="">エリアを指定しない（すべて）</option>
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
        {/* カスタム矢印アイコン（selectのデフォルト矢印を消してこれを使うときれいです） */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </label>
  );
}