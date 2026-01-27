"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  Search, 
  RotateCcw, 
  SlidersHorizontal, 
  ChevronDown, 
  MapPin, 
  Banknote, 
  LayoutDashboard,
} from "lucide-react";

// 各フィールドコンポーネント
import PriceField from "@/components/PriceField";
import DistrictField from "@/components/DistrictField";
import LayoutField from "@/components/LayoutField";

export default function SearchPanel() {
  const params = useSearchParams();
  const router = useRouter();

  // 状態管理
  const [price, setPrice] = useState({
    min: params.get("min") || "",
    max: params.get("max") || "",
  });
  const [district, setDistrict] = useState(params.get("district") || "");
  const [layout, setLayout] = useState(params.get("layout") || "");

  // アクティブな条件があるか判定
  const activeConditions = [
    price.min, 
    price.max, 
    district, 
    layout
  ].filter(Boolean).length;

  const hasAnyCondition = activeConditions > 0;
  
  // パネル開閉状態
  const [isOpen, setIsOpen] = useState(false);

  // URL変更時の同期 (ブラウザバック対応 & 初回ロード)
  useEffect(() => {
    const currentMin = params.get("min") || "";
    const currentMax = params.get("max") || "";
    const currentDistrict = params.get("district") || "";
    const currentLayout = params.get("layout") || "";

    setPrice({ min: currentMin, max: currentMax });
    setDistrict(currentDistrict);
    setLayout(currentLayout);

    // 何か条件があれば最初は開いておく（UX向上）
    if (currentMin || currentMax || currentDistrict || currentLayout) {
      setIsOpen(true);
    }
  }, [params]);

  const applySearch = () => {
    const q = new URLSearchParams(params.toString());
    
    const setOrDelete = (key: string, val: string) => {
      if (val) q.set(key, val);
      else q.delete(key);
    };

    setOrDelete("min", price.min);
    setOrDelete("max", price.max);
    setOrDelete("district", district);
    setOrDelete("layout", layout);
    
    q.delete("page"); 

    router.push(`/properties?${q.toString()}`, { scroll: false });
    // モバイルなどでは検索後に閉じるのもアリですが、
    // ユーザーが微調整したい場合が多いので開いたままにします。
  };

  const clearAll = () => {
    setPrice({ min: "", max: "" });
    setDistrict("");
    setLayout("");
    
    const q = new URLSearchParams(params.toString());
    ["min", "max", "district", "layout", "page"].forEach((k) => q.delete(k));
    
    router.push(`/properties?${q.toString()}`, { scroll: false });
  };

  return (
    <section className="w-full max-w-5xl mx-auto mb-8 font-sans">
      
      {/* 1. トグルボタン (開閉トリガー) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          group relative w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300
          ${isOpen 
            ? "bg-white border-red-200 shadow-lg ring-1 ring-red-100" 
            : "bg-white/80 border-gray-200 hover:border-red-300 hover:shadow-md"
          }
        `}
      >
        <div className="flex items-center gap-4">
          <div className={`
            flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300
            ${hasAnyCondition ? "bg-red-600 text-white" : "bg-red-50 text-red-600 group-hover:bg-red-100"}
          `}>
            <SlidersHorizontal size={20} />
          </div>
          <div className="text-left">
            <span className="block font-bold text-gray-800 text-lg leading-tight">
              条件を指定して検索
            </span>
            <span className="text-sm text-gray-500 mt-0.5 block">
              {hasAnyCondition 
                ? <span className="text-red-600 font-bold">{activeConditions}件の条件が適用中</span> 
                : "エリア、予算、間取りで絞り込み"}
            </span>
          </div>
        </div>
        
        <div className={`
          p-2 rounded-full transition-transform duration-300 text-gray-400 group-hover:text-red-500
          ${isOpen ? "rotate-180 bg-gray-50" : ""}
        `}>
          <ChevronDown size={24} />
        </div>
      </button>

      {/* 2. 検索パネル本体 (アニメーション開閉) */}
      <div
        className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? "max-h-[800px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}
        `}
      >
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* 左側：入力フォームエリア */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              {/* エリア */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <MapPin size={18} className="text-red-500" />
                  エリアを選択
                </label>
                {/* label="" を渡してコンポーネント内のデフォルトラベルを非表示にする */}
                <DistrictField value={district} onChange={setDistrict} label="" />
              </div>

              {/* 間取り */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <LayoutDashboard size={18} className="text-red-500" />
                  間取りタイプ
                </label>
                <LayoutField value={layout} onChange={setLayout} label="" />
              </div>

              {/* 価格 (2カラム分使う) */}
              <div className="md:col-span-2 space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <Banknote size={18} className="text-red-500" />
                  家賃 (THB)
                </label>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <PriceField min={price.min} max={price.max} onChange={setPrice} />
                </div>
              </div>

            </div>

            {/* 右側：アクションボタンエリア (PCでは右サイドバー風、スマホでは下部) */}
            <div className="lg:col-span-4 flex flex-col justify-end lg:border-l lg:border-gray-100 lg:pl-8 space-y-4 pt-4 lg:pt-0">
              
              <div className="hidden lg:block mb-auto text-sm text-gray-400 leading-relaxed">
                <p>ご希望の条件を入力して検索ボタンを押してください。</p>
              </div>

              <button
                type="button"
                onClick={applySearch}
                className="
                  w-full py-4 rounded-xl bg-red-600 text-white font-bold text-lg shadow-md
                  hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0
                  transition-all flex items-center justify-center gap-3
                "
              >
                <Search size={22} strokeWidth={2.5} />
                この条件で検索
              </button>

              <button
                type="button"
                onClick={clearAll}
                className="
                  w-full py-3 rounded-xl border border-gray-200 text-gray-500 font-bold
                  hover:bg-gray-50 hover:text-gray-700 hover:border-gray-300
                  transition-colors flex items-center justify-center gap-2
                "
              >
                <RotateCcw size={16} />
                条件をクリア
              </button>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}