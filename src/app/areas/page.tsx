import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Train, 
  Building2, 
  Coffee, 
  ShoppingBag, 
  Moon, 
  Sun,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const metadata = {
  title: 'バンコク エリアガイド | CITY CLUB HOUSE',
  description: '初めてのバンコク生活、どこに住む？主要エリアの特徴、メリット・注意点を日本人向けに徹底解説。',
};

// エリアデータの定義
type Area = {
  id: string;
  name: string;
  enName: string;
  catch: string;
  target: string;
  features: string;
  pros: string[];
  cons: string[];
  tags: string[];
};

const areas: Record<string, Area[]> = {
  "royal": [ // 王道・日本人人気
    {
      id: "Phrom-Phong",
      name: "プロンポン",
      enName: "Phrom Phong",
      catch: "日本人ファミリーの“王道”",
      target: "子連れ、初海外生活、便利さと安心を最優先",
      features: "日本人向けの飲食店・スーパー・サービスが密集する「日本人街」。高級デパート（エムクオーティエ等）と公園が駅前にあり、生活の全てがここで完結します。",
      pros: ["家族での生活が回しやすい（買い物・習い事）", "初めてでも圧倒的に安心"],
      cons: ["家賃相場はバンコク最高峰", "朝夕の渋滞が激しい"],
      tags: ["ファミリー", "日本人多", "買い物便利"]
    },
    {
      id: "Thong-Lor",
      name: "トンロー",
      enName: "Thong Lo",
      catch: "お洒落・グルメ・ナイトライフ",
      target: "夫婦・単身、外食多め、都会感・コミュニティ重視",
      features: "バンコクのトレンド発信地。お洒落なカフェ、バー、高級日本食店が立ち並びます。夜遅くまで賑わう眠らない街。",
      pros: ["食とコミュニティの選択肢が豊富", "生活の満足度・キラキラ感が高い"],
      cons: ["夜の騒音が気になる場所も（ソイ選び重要）", "歩道が狭い通りがある"],
      tags: ["単身・夫婦", "グルメ", "お洒落"]
    },
    {
      id: "Ekkamai",
      name: "エカマイ",
      enName: "Ekkamai",
      catch: "トンローの隣、少し落ち着く住宅街",
      target: "トンローは好きだが、少し静かめがいい人",
      features: "トンローの華やかさを享受しつつ、一本入ると落ち着いた住宅街が広がります。バスターミナルや大型スーパーもあり便利。",
      pros: ["便利さと落ち着きのバランスが良い", "高速道路に乗りやすい"],
      cons: ["駅徒歩圏を外すと移動が不便（バイタク必須）", "歩道が少ない通りがある"],
      tags: ["バランス", "住宅街", "高速近い"]
    }
  ],
  "convenience": [ // 利便性・コスパ
    {
      id: "Asok",
      name: "アソーク",
      enName: "Asok",
      catch: "交通最強・都心の結節点",
      target: "単身〜夫婦、出社が多い、移動時間を短縮したい",
      features: "BTS（高架鉄道）とMRT（地下鉄）が交差するバンコクの中心。オフィスビルやホテルが立ち並ぶビジネス街。",
      pros: ["どこへ行くにもアクセス最強", "タクシーで場所を伝えやすい"],
      cons: ["常に人が多く賑やか", "緑や静けさは少なめ"],
      tags: ["交通便利", "ビジネス", "都会"]
    },
    {
      id: "phra-khanong",
      name: "プラカノン",
      enName: "Phra Khanong",
      catch: "都心寄りコスパ帯の入口",
      target: "家賃を抑えつつスクンビットの利便性を維持したい",
      features: "エカマイの隣で、近年開発が進むエリア。下町情緒と新しいコンドミニアムが混在しています。",
      pros: ["価格と利便性のバランスが良い", "ローカルフードも楽しめる"],
      cons: ["駅近を外すと不便", "夜は暗い通りもある"],
      tags: ["コスパ", "開発中", "下町"]
    },
    {
      id: "on-nut",
      name: "オンヌット",
      enName: "On Nut",
      catch: "「最初の街」に選ばれる現実的エリア",
      target: "移住直後、生活安定・コスパ重視",
      features: "大型スーパー（Lotus's, Big C）が駅前にあり生活しやすい。家賃相場がぐっと下がるため、広くてきれいな部屋に住めます。",
      pros: ["家賃に対する満足度が高い", "生活感があり暮らしやすい"],
      cons: ["都心の華やかさは減る", "通勤ラッシュ時のBTSが混む"],
      tags: ["高コスパ", "生活便利", "単身"]
    }
  ],
  "distinctive": [ // 特徴派（ビジネス、郊外、ローカルなど）
    {
      id: "silom-sathorn",
      name: "シーロム・サトーン",
      enName: "Silom / Sathorn",
      catch: "ビジネス街・整った都心生活",
      target: "周辺勤務、落ち着き重視、日本人会本館を利用する人",
      features: "東京で言う丸の内・大手町。高層ビルが並び、道路も整備されています。日本人会本館があります。",
      pros: ["街並みが綺麗で歩道が広い", "欧米人も多く国際的"],
      cons: ["スクンビットの日本人街からは遠い", "家賃は安くない"],
      tags: ["ビジネス", "綺麗", "日本人会"]
    },
    {
      id: "ratchada-rama9",
      name: "ラチャダー・ラマ9",
      enName: "Ratchada / Rama 9",
      catch: "新CBD・MRT沿線の都市生活",
      target: "MRT通勤、新しい街が好き、合理性重視",
      features: "「第2の都心」として開発されたエリア。巨大ショッピングモールやITモールがあり、中国・韓国系の居住者も多い。",
      pros: ["築浅・高層コンドが多い", "買い物環境が充実"],
      cons: ["日本人向けサービスは少なめ", "独自のカルチャーがある"],
      tags: ["新都心", "築浅", "MRT"]
    },
    {
      id: "ari",
      name: "アーリー",
      enName: "Ari",
      catch: "カフェ文化・お洒落ローカル",
      target: "落ち着き、散歩、カフェ好き",
      features: "緑が多く、邸宅を改装したカフェやレストランが点在。欧米人やタイ人の富裕層に人気のエリア。",
      pros: ["街の雰囲気が良く散歩が楽しい", "静かな環境"],
      cons: ["日本人向けスーパー等は少ない", "都心から少し離れる"],
      tags: ["お洒落", "カフェ", "静か"]
    }
  ]
};

export default function AreaGuidePage() {
  return (
    <div className="bg-gray-50 pb-20 font-sans">
      <section className="border-b bg-white shadow-sm sticky top-16 z-40 hidden sm:block">
        <div className="container-base py-3">
          <Contents />
        </div>
      </section>
      {/* ヒーローセクション */}
      <section className="relative bg-white pt-12 pb-16 border-b border-gray-100">
        <div className="container-base text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold mb-4">
            <MapPin size={14} />
            BANGKOK AREA GUIDE
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
            バンコク、どこに住む？
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            「渋滞」「日本人エリア」「生活動線」...<br/>
            バンコク特有の事情を知れば、あなたにぴったりの街が見えてきます。
          </p>
        </div>
      </section>

      {/* エリア選びの3つの軸 */}
      <section className="container-base -mt-8 relative z-10 mb-16">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100">
          <h2 className="text-center text-xl font-bold text-gray-900 mb-8">
            エリア選び、基本の<span className="text-red-600">3つの軸</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center px-2">
              <div className="w-14 h-14 mx-auto bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <Train size={28} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">駅までの距離</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                渋滞が激しいバンコクでは「駅徒歩圏」が快適さの命。<strong className="text-gray-700">BTS（高架鉄道）</strong>や<strong className="text-gray-700">MRT（地下鉄）</strong>に乗れるかが重要です。
              </p>
            </div>
            <div className="text-center px-2 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0">
              <div className="w-14 h-14 mx-auto bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-4">
                <Building2 size={28} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">生活動線と安心</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                日本語対応の病院（サミティベート等）や日本人スーパーが近いか。初めてなら<strong className="text-gray-700">プロンポン周辺</strong>が安心です。
              </p>
            </div>
            <div className="text-center px-2 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0">
              <div className="w-14 h-14 mx-auto bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
                <Coffee size={28} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">ライフスタイル</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                アソークは「都会」、トンローは「夜遊び」、オンヌットは「生活感」。街の色と自分の好みを合わせましょう。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ざっくりエリアマップ概念図 */}
      <section className="container-base mb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <MapPin className="text-red-600" />
          バンコク主要エリアマップ
        </h2>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <p className="text-sm text-gray-500 mb-6 text-center">
            スクンビット線（BTS）を中心に、東西に街が広がっています。<br/>
            <span className="text-red-600 font-bold">右に行くほど（東側）</span>家賃が下がり、ローカル色が強まる傾向があります。
          </p>
          
          {/* 簡易マップ可視化 */}
          <div className="relative flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-2">
            
            {/* 左側：都心・ビジネス */}
            <div className="flex-1 space-y-2">
              <div className="bg-gray-100 p-4 rounded-lg text-center h-full flex flex-col justify-center">
                <span className="text-xs font-bold text-gray-400 block mb-1">ビジネス・旧市街</span>
                <div className="font-bold text-gray-700">シーロム / サトーン</div>
                <div className="font-bold text-gray-700 mt-2">リバーサイド</div>
              </div>
            </div>

            {/* 中央ライン：BTSスクンビット線 */}
            <div className="flex-[3] flex flex-col relative">
              {/* BTSライン */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-2 bg-green-100 -translate-y-1/2 rounded-full"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2 relative z-10">
                {/* 1. サイアム〜アソーク */}
                <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                  <span className="text-[10px] bg-blue-200 text-blue-800 px-1 rounded block w-fit mx-auto mb-1">都心</span>
                  <div className="font-bold text-sm">サイアム<br/>〜アソーク</div>
                  <p className="text-[10px] text-gray-500 mt-1">デパート・オフィス</p>
                </div>

                {/* 2. プロンポン (王道) */}
                <div className="bg-red-50 border-2 border-red-100 p-3 rounded-lg text-center shadow-sm relative transform md:scale-110">
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">日本人最多</span>
                  <div className="font-bold text-red-900">プロンポン</div>
                  <p className="text-[10px] text-red-800 mt-1">便利・家族向け</p>
                </div>

                {/* 3. トンロー・エカマイ */}
                <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                  <span className="text-[10px] bg-orange-200 text-orange-800 px-1 rounded block w-fit mx-auto mb-1">人気</span>
                  <div className="font-bold text-sm">トンロー<br/>エカマイ</div>
                  <p className="text-[10px] text-gray-500 mt-1">お洒落・飲食</p>
                </div>

                {/* 4. プラカノン・オンヌット */}
                <div className="bg-green-50 border border-green-100 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                  <span className="text-[10px] bg-green-200 text-green-800 px-1 rounded block w-fit mx-auto mb-1">コスパ</span>
                  <div className="font-bold text-sm">プラカノン<br/>オンヌット</div>
                  <p className="text-[10px] text-gray-500 mt-1">生活感・安い</p>
                </div>

                {/* 5. バンナー方面 */}
                <div className="bg-gray-50 border border-gray-100 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                  <span className="text-[10px] bg-gray-200 text-gray-600 px-1 rounded block w-fit mx-auto mb-1">郊外</span>
                  <div className="font-bold text-sm text-gray-500">バンナー<br/>方面</div>
                  <p className="text-[10px] text-gray-400 mt-1">広さ・新しさ</p>
                </div>
              </div>
            </div>

            {/* 上部：北側エリア */}
            <div className="flex-1 space-y-2">
               <div className="bg-purple-50 p-4 rounded-lg text-center h-full flex flex-col justify-center border border-purple-100">
                <span className="text-xs font-bold text-purple-400 block mb-1">北側・MRT</span>
                <div className="font-bold text-purple-900 text-sm">アーリー</div>
                <div className="font-bold text-purple-900 text-sm mt-1">ラチャダー</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 詳細エリアガイド */}
      <section className="container-base mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">エリア別 詳細ガイド</h2>
        </div>

        {/* 1. 王道エリア */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-2">
            <span className="text-2xl">👑</span>
            <h3 className="text-xl font-bold text-gray-800">日本人に人気の「王道」エリア</h3>
            <span className="text-sm text-gray-500 hidden sm:inline">初めてのバンコクならまずはここをチェック</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {areas.royal.map((area) => (
              <AreaCard key={area.id} area={area} colorClass="border-t-4 border-t-red-500" />
            ))}
          </div>
        </div>

        {/* 2. コスパ・利便性エリア */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-2">
            <span className="text-2xl">🚃</span>
            <h3 className="text-xl font-bold text-gray-800">利便性 & コスパ重視</h3>
            <span className="text-sm text-gray-500 hidden sm:inline">通勤便利、または家賃を抑えたい方へ</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {areas.convenience.map((area) => (
              <AreaCard key={area.id} area={area} colorClass="border-t-4 border-t-blue-500" />
            ))}
          </div>
        </div>

        {/* 3. その他の特徴的エリア */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-2">
            <span className="text-2xl">🏙️</span>
            <h3 className="text-xl font-bold text-gray-800">ビジネス・独自スタイル</h3>
            <span className="text-sm text-gray-500 hidden sm:inline">オフィス近くや、静かな環境を求める方へ</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {areas.distinctive.map((area) => (
              <AreaCard key={area.id} area={area} colorClass="border-t-4 border-t-purple-500" />
            ))}
          </div>
        </div>
      </section>

      {/* 失敗しない選び方 Tips */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="container-base">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            失敗しない「エリア選び」のコツ
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <CheckCircle2 className="text-green-600" />
                まずは「第一候補」を決める
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><span className="font-bold text-gray-900">とにかく安心：</span> プロンポン / トンロー</li>
                <li><span className="font-bold text-gray-900">通勤最優先：</span> アソーク (BTS/MRT)</li>
                <li><span className="font-bold text-gray-900">コスパ重視：</span> オンヌット / プラカノン</li>
                <li><span className="font-bold text-gray-900">静かな都心：</span> サトーン / シーロム</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <AlertCircle className="text-orange-600" />
                「駅徒歩」の感覚に注意
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                バンコクは暑く、歩道が悪い場所も多いため、日本の「徒歩10分」とは体感が違います。
              </p>
              <div className="bg-white p-3 rounded border border-gray-200 text-xs text-gray-500">
                <strong>Tips:</strong> ソイ（脇道）の奥の物件は、トゥクトゥク送迎サービスの有無を必ず確認しましょう。
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/search" 
              className="inline-flex items-center gap-2 bg-red-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-red-700 transition-all hover:-translate-y-1"
            >
              <ShoppingBag size={20} />
              さっそく物件を探してみる
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              まだ迷っている方は、<Link href="/contact" className="text-red-600 underline">お問い合わせ</Link>からご相談ください。<br/>
              スタッフがライフスタイルに合わせてご提案します。
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

// -----------------------------------------------------------------------------
// サブコンポーネント: エリアカード
// -----------------------------------------------------------------------------

function AreaCard({ area, colorClass }: { area: Area, colorClass: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden border border-gray-100 ${colorClass}`}>
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="text-xl font-bold text-gray-900">{area.name}</h4>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{area.enName}</p>
          </div>
        </div>
        
        <p className="text-sm font-bold text-red-600 mb-4 min-h-[1.5em]">{area.catch}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {area.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
              #{tag}
            </span>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm text-gray-600 leading-relaxed">
          {area.features}
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs font-bold text-gray-400 mb-1 flex items-center gap-1">
              <Sun size={12} /> MERIT
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              {area.pros.map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">●</span>
                  <span className="flex-1">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 mb-1 flex items-center gap-1">
              <Moon size={12} /> NOTE
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              {area.cons.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">●</span>
                  <span className="flex-1">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-100 mt-auto">
        <Link 
          href={`/properties?station=${area.id}`} 
          className="flex items-center justify-center w-full py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-800 hover:text-white transition-colors gap-2"
        >
          <Building2 size={16} />
          {area.name}の物件を見る
        </Link>
      </div>
    </div>
  );
}