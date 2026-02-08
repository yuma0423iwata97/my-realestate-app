import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import Contents from "@/components/Contents";
import BigOptionCard from "@/components/BigOptionCard";
import { Blocks, Train, ChevronRight, MapPin, Star } from "lucide-react";

// 環境変数の型安全確保
const API = process.env.SHEET_API_URL || "";

// 型定義の明示（保守性向上）
interface Property {
  ID: number;
  Title: string;
  Price: number;
  Thumbnail?: string;
  Province: string;
  District: string;
}

// 人気エリアのデータ定義（視覚的要素を追加）
const POPULAR_AREAS = [
  {
    id: "phrom-phong",
    name: "プロンポン",
    en: "Phrom Phong",
    catch: "日本人ファミリー人気No.1",
    desc: "スーパー・病院・公園が揃う、初めての海外生活でも安心の日本人街。",
    image: "/area-phromphong.jpg", // 実際には適切な画像パスに置き換えてください
    tags: ["家族向け", "便利", "日本人多"],
    href: "/properties?station=Phrom%20Phong"
  },
  {
    id: "thong-lo",
    name: "トンロー",
    en: "Thong Lo",
    catch: "トレンドと美食の街",
    desc: "お洒落なカフェや高級日本食店が立ち並ぶ、バンコクの流行発信地。",
    image: "/area-thonglo.jpg",
    tags: ["単身・夫婦", "グルメ", "お洒落"],
    href: "/properties?station=Thong%20Lor"
  },
  {
    id: "ekkamai",
    name: "エカマイ",
    en: "Ekkamai",
    catch: "落ち着きと利便性のバランス",
    desc: "トンローの隣で少し落ち着いた住宅街。ゲートウェイエカマイもあり便利。",
    image: "/area-ekkamai.jpg",
    tags: ["バランス", "住宅街", "買い物"],
    href: "/properties?station=Ekkamai"
  },
  {
    id: "asok",
    name: "アソーク",
    en: "Asok",
    catch: "BTS×MRTの最強アクセス",
    desc: "ビジネスの中心地。どこへ行くにも便利な交通の結節点。",
    image: "/area-asok.jpg",
    tags: ["通勤便利", "都会", "単身"],
    href: "/properties?station=Asok"
  },
  {
    id: "phra-khanong",
    name: "プラカノン",
    en: "Phra Khanong",
    catch: "コスパ重視の注目エリア",
    desc: "家賃を抑えつつ、都心へのアクセスも維持したい方に人気急上昇中。",
    image: "/area-phrakhanong.jpg",
    tags: ["コスパ", "下町情緒", "穴場"],
    href: "/properties?station=Phra%20Khanong"
  },
  {
    id: "on-nut",
    name: "オンヌット",
    en: "On Nut",
    catch: "生活感あふれる暮らしやすい街",
    desc: "大型スーパーが駅前にあり、生活費も安く抑えられる現実的な選択肢。",
    image: "/area-onnut.jpg",
    tags: ["高コスパ", "生活便利", "単身"],
    href: "/properties?station=On%20Nut"
  },
];

/** * データ取得ロジック
 * エラー時もサイト全体をクラッシュさせず、空配列とエラーログを返す
 */
async function getFeatured(): Promise<Property[]> {
  if (!API) {
    console.error("API URL is not defined");
    return [];
  }
  try {
    const res = await fetch(`${API}?perPage=6`, { 
      next: { revalidate: 3600 } // ← 1時間はキャッシュを使う（高速化＆ビルド成功）
    });
    if (!res.ok) throw new Error("Failed to fetch");
    const { data } = await res.json();
    return data || [];
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

/**
 * おすすめ物件セクションコンポーネント
 */
async function FeaturedSection() {
  const properties = await getFeatured();

  if (properties.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
        <p className="text-gray-500">現在おすすめ物件を準備中です。</p>
      </div>
    );
  }
}
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((p, idx) => (
        <Link
          key={`${p.ID}-${idx}`}
          href={`/properties/${p.ID}`}
          className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          {/* 画像アスペクト比を固定してレイアウト崩れを防ぐ */}
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-200">
            <Image
              src={p.Thumbnail || "/placeholder.jpg"}
              alt={p.Title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              新着
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
              {p.Title}
            </h3>
            <div className="mt-auto space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <MapPin size={16} className="mr-1 text-gray-400" />
                {[p.District, p.Province].filter(Boolean).join(", ")}
              </div>
              <p className="text-xl font-extrabold text-red-600">
                {p.Price ? p.Price.toLocaleString() : "-"} <span className="text-sm font-medium text-gray-500">THB/月</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="pb-20">
      {/* Hero Section: ファーストビュー */}
      <section className="relative bg-gray-900 py-16 sm:py-32">
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-gray-900" />
  </div>

  <div className="container-base relative z-10 text-center px-4 sm:px-0">
    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 drop-shadow-md leading-tight">
      バンコクの<span className="text-red-500">理想の住まい</span>を、<br className="sm:hidden" />
      ここから。
    </h1>

    <p className="text-gray-300 text-base sm:text-xl max-w-2xl mx-auto mb-10">
      日本人向けのコンドミニアム・アパートメント検索。<br />
      エリア、沿線、こだわり条件から快適な物件を見つけましょう。
    </p>

    <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      <BigOptionCard
        href="/area"
        title="エリアから探す"
        subtitle="Province / District"
        icon={<Blocks className="h-6 w-6 text-red-500" />}
      />
      <BigOptionCard
        href="/line"
        title="沿線・駅から探す"
        subtitle="BTS / MRT"
        icon={<Train className="h-6 w-6 text-blue-500" />}
      />
    </div>
  </div>
</section>

      {/* コンテンツメニューバー */}
      <section className="border-b bg-white shadow-sm sticky top-16 z-40 block">
  <div className="container-base py-0">
    <Contents />
  </div>
</section>


      {/* === 人気のエリアセクション（刷新） === */}
      <section className="container-base py-16">
        <div className="text-center mb-10">
          <span className="text-red-600 font-bold tracking-widest text-xs uppercase mb-2 block">
            POPULAR AREAS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 inline-block relative z-10">
            日本人に人気のエリア
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            初めてのバンコク生活でも安心。<br className="sm:hidden" />
            日本人が多く住む、生活環境の整った主要エリアを厳選しました。
          </p>
        </div>

        {/* グリッドレイアウト（PC:3列 / Mobile:1列） */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_AREAS.map((area) => (
            <Link 
              key={area.id} 
              href={area.href}
              className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* 画像エリア */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                <Image 
                   src={area.image} 
                   alt={area.name} 
                   fill 
                   className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                {/* オーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80" />
                
                {/* エリア名（画像上） */}
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs font-bold opacity-80 uppercase tracking-wider mb-1">{area.en}</p>
                  <h3 className="text-2xl font-bold">{area.name}</h3>
                </div>
              </div>

              {/* コンテンツエリア */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-3">
                   <h4 className="font-bold text-red-600 text-sm mb-2 flex items-center gap-1">
                      <Star size={14} fill="currentColor" />
                      {area.catch}
                   </h4>
                   <p className="text-gray-600 text-sm leading-relaxed">
                      {area.desc}
                   </p>
                </div>
                
                {/* タグ */}
                <div className="mt-auto pt-4 flex flex-wrap gap-2">
                   {area.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                         #{tag}
                      </span>
                   ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center">
           <Link 
             href="/areas" 
             className="inline-flex items-center gap-2 text-sm font-bold text-red-600 border border-red-600 px-6 py-3 rounded-full hover:bg-red-50 transition-colors"
           >
             エリアガイドで詳しく見る <ChevronRight size={16} />
           </Link>
        </div>
      </section>

      {/* こだわり検索 
      <section className="bg-gray-50 py-16">
        <div className="container-base">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold border-l-4 border-red-600 pl-4">こだわり条件から探す</h2>
            <Link href="/features" className="hidden sm:flex items-center text-red-600 font-medium hover:underline">
              すべて見る <ChevronRight size={18} />
            </Link>
          </div>

          <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4 gap-4 scrollbar-hide snap-x">
            {[
               { title: "～4000万円の一戸建て", href: "/features/price-under-40m" },
               { title: "7日以内の新着・更新", href: "/features/new-within-7days" },
               { title: "ルーフバルコニー", href: "/features/roof-balcony" },
               { title: "LDK18帖以上", href: "/features/ldk-18plus" },
            ].map((item, i) => (
              <div key={i} className="min-w-[200px] snap-start">
                <SmallCard
                  href={item.href}
                  imageSrc="/placeholder.jpg"
                  title={item.title}
                />
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-between mb-8">
             <h2 className="text-2xl font-bold border-l-4 border-blue-600 pl-4">家賃・価格から探す</h2>
          </div>
          
           <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4 gap-4 scrollbar-hide snap-x">
            {[
               { title: "～1万バーツ", href: "/search?price_max=10000" },
               { title: "1～1.5万バーツ", href: "/search?price_min=10000&price_max=15000" },
               { title: "1.5～2万バーツ", href: "/search?price_min=15000&price_max=20000" },
               { title: "2万バーツ以上", href: "/search?price_min=20000" },
            ].map((item, i) => (
              <div key={i} className="min-w-[200px] snap-start">
                <SmallCard
                  href={item.href}
                  imageSrc="/placeholder.jpg"
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

       おすすめ物件セクション */}
      <section className="container-base py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">新着・おすすめ物件</h2>
          <Link href="/properties" className="text-sm text-gray-500 hover:text-red-600 flex items-center gap-1">
            物件一覧へ <ChevronRight size={16} />
          </Link>
        </div>
        
        <Suspense fallback={<LoadingSkeleton />}>
          <FeaturedSection />
        </Suspense>
      </section>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border rounded-xl overflow-hidden shadow-sm bg-white">
          <div className="h-48 bg-gray-200 animate-pulse" />
          <div className="p-5 space-y-3">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3 mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}