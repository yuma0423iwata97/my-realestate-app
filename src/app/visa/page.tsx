import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Plane, 
  Briefcase, 
  User, 
  Crown, 
  Heart, 
  GraduationCap, 
  FileText, 
  Info,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CalendarDays,
  Coins
} from 'lucide-react';

export const metadata = {
  title: '2026年版 タイ王国ビザ制度・完全実務ガイド | CITY CLUB HOUSE',
  description: '観光、就労、リタイアメント、DTV、LTRまで。タイ移住・長期滞在に必要なビザの最新情報を網羅した完全ガイド。',
};

export default function VisaGuidePage() {
  return (
    <div className="bg-white min-h-screen pb-20 font-sans text-gray-800">
      
      {/* --- Hero Section --- */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2000&auto=format&fit=crop" 
            alt="Bangkok Cityscape" 
            fill 
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container-base relative z-10 text-center text-white pt-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-wider uppercase">
            <BookOpen size={14} /> Official Guide 2026
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-lg">
            2026年版 タイ王国ビザ制度<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">完全実務ガイド</span>
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed drop-shadow-md">
            戦略的選択と取得・維持のすべて。<br/>
            観光から永住に近いステータスまで、あらゆる選択肢を網羅的に解説します。
          </p>
        </div>
      </section>

      {/* --- Sticky Navigation --- */}
      <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm overflow-x-auto no-scrollbar">
        <div className="container-base">
          <nav className="flex items-center justify-start md:justify-center gap-6 py-4 min-w-max">
            {[
              { id: 'short-stay', label: '短期滞在', icon: Plane },
              { id: 'dtv', label: 'DTV (ノマド)', icon: Briefcase },
              { id: 'elite-ltr', label: '富裕層 (Elite/LTR)', icon: Crown },
              { id: 'retirement', label: 'リタイアメント', icon: User },
              { id: 'others', label: '就労・結婚', icon: FileText },
              { id: 'tax', label: '税務・まとめ', icon: Coins },
            ].map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-red-600 transition-colors py-1 border-b-2 border-transparent hover:border-red-600"
              >
                <item.icon size={16} />
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="container-base py-16 space-y-24">

        {/* --- Introduction --- */}
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            転換点を迎えた<br className="md:hidden"/>タイの入国管理政策
          </h2>
          <p className="text-gray-600 leading-loose text-lg">
            2026年現在、タイ王国の入国管理制度は過去数十年の歴史の中で最も劇的な転換期を迎えています。
            かつて容易だった「ビザラン」や実態のない教育ビザは厳格化され、一方で「デスティネーション・タイランド・ビザ（DTV）」や「長期居住者ビザ（LTR）」といった革新的な制度が登場しました。<br/><br/>
            本ガイドでは、現在のタイのビザエコシステムを網羅的に分析し、最適なビザ選びのための実務的な情報を提供します。
          </p>
        </section>

        {/* --- Section 1: 短期滞在 --- */}
        <section id="short-stay" className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Plane size={24} />
            </div>
            <div>
              <span className="text-blue-600 font-bold text-sm tracking-wider uppercase">Section 01</span>
              <h2 className="text-3xl font-bold text-gray-900">短期滞在と「ビザラン」の終焉</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-green-500" /> ビザ免除措置（ノービザ）
              </h3>
              <p className="text-gray-600 mb-6">
                日本国籍者は観光目的であればビザなしで入国可能です。2025年以降、滞在可能期間は固定化されました。
              </p>
              <ul className="space-y-3 bg-white p-5 rounded-xl border border-gray-200">
                <li className="flex justify-between text-sm">
                  <span className="text-gray-500">初回入国</span>
                  <span className="font-bold">60日間</span>
                </li>
                <li className="flex justify-between text-sm border-t border-gray-100 pt-2">
                  <span className="text-gray-500">国内延長</span>
                  <span className="font-bold">+30日間 (1回のみ)</span>
                </li>
                <li className="flex justify-between text-sm border-t border-gray-100 pt-2">
                  <span className="text-gray-500">最大滞在</span>
                  <span className="font-bold text-blue-600">合計 90日間</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
              <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                <AlertTriangle className="text-red-600" /> ビザランへの厳格な規制
              </h3>
              <p className="text-red-800 text-sm mb-4 leading-relaxed">
                隣国へ一時出国し即座に再入国する「ビザラン」は厳しく監視されています。
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">陸路入国の制限</h4>
                  <p className="text-xs text-gray-500">暦年（1月〜12月）で2回までに制限。3回目以降は原則入国拒否。</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">空路入国の監視</h4>
                  <p className="text-xs text-gray-500">短期間に「入国60日＋延長30日」を繰り返すと、居住実態があるとみなされ入国拒否リスク増。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 2: DTV --- */}
        <section id="dtv" className="scroll-mt-32">
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            {/* 装飾 */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-gray-700 pb-8">
                <div>
                  <span className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-2 block">Digital Nomad Revolution</span>
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-4">デスティネーション・タイランド・ビザ (DTV)</h2>
                  <p className="text-gray-300 max-w-xl">
                    2024年に導入された革新的なビザ。デジタルノマドや文化学習者に対し、5年間の長期滞在資格を提供します。
                  </p>
                </div>
                <div className="bg-blue-600 px-6 py-3 rounded-xl text-center">
                  <div className="text-xs text-blue-200 uppercase font-bold">Cost Performance</div>
                  <div className="text-2xl font-black">最強</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* スペック */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-white/10 backdrop-blur border border-white/10 p-5 rounded-xl">
                    <div className="text-gray-400 text-xs mb-1">有効期間</div>
                    <div className="text-xl font-bold">5年間</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur border border-white/10 p-5 rounded-xl">
                    <div className="text-gray-400 text-xs mb-1">滞在可能期間</div>
                    <div className="text-xl font-bold">1回 180日 <span className="text-sm font-normal text-gray-400">(+180日延長可)</span></div>
                  </div>
                  <div className="bg-white/10 backdrop-blur border border-white/10 p-5 rounded-xl">
                    <div className="text-gray-400 text-xs mb-1">就労</div>
                    <div className="text-xl font-bold text-green-400">海外リモートOK</div>
                  </div>
                </div>

                {/* カテゴリー詳細 */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Briefcase size={18} className="text-blue-400"/> ワークケーション
                    </h4>
                    <p className="text-sm text-gray-400 mb-4">日本の企業に在籍したままリモートワークを行う会社員やフリーランス向け。</p>
                    <ul className="text-xs space-y-2 text-gray-300">
                      <li className="flex gap-2"><span className="text-blue-500">●</span> 資金証明: 50万バーツ以上</li>
                      <li className="flex gap-2"><span className="text-blue-500">●</span> 雇用契約書またはポートフォリオ</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-pink-500 transition-colors">
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Heart size={18} className="text-pink-400"/> ソフトパワー
                    </h4>
                    <p className="text-sm text-gray-400 mb-4">ムエタイ、料理、医療などで「学びながら長期滞在」したい方向け。</p>
                    <ul className="text-xs space-y-2 text-gray-300">
                      <li className="flex gap-2"><span className="text-pink-500">●</span> 6ヶ月以上のコース必須</li>
                      <li className="flex gap-2"><span className="text-pink-500">●</span> スクールからの受入書</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 3: 富裕層 (Elite vs LTR) --- */}
        <section id="elite-ltr" className="scroll-mt-32">
          <div className="text-center mb-10">
            <span className="text-yellow-600 font-bold tracking-widest text-xs uppercase mb-2 block">For High Net Worth Individuals</span>
            <h2 className="text-3xl font-bold text-gray-900">富裕層の選択：エリート vs LTR</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Thailand Privilege */}
            <div className="bg-white border border-yellow-200 rounded-2xl p-8 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-bl-full -mr-16 -mt-16 z-0 group-hover:scale-110 transition-transform"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
                    <Crown size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Thailand Privilege<br/><span className="text-sm font-normal text-gray-500">旧エリートビザ</span></h3>
                </div>
                <div className="text-3xl font-extrabold text-gray-900 mb-2">90万THB<span className="text-base font-normal text-gray-500">〜</span></div>
                <p className="text-sm text-gray-500 mb-6">「滞在権の購入」。審査がほぼ不要で、空港送迎などのVIP特典が付帯。</p>
                <div className="space-y-3 mb-8">
                  {['GOLD (5年): 90万THB', 'PLATINUM (10年): 150万THB', 'DIAMOND (15年): 250万THB'].map((plan, i) => (
                    <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-700">{plan.split(':')[0]}</span>
                      <span className="font-bold">{plan.split(':')[1]}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-yellow-50 text-yellow-800 text-xs p-3 rounded-lg text-center">
                  資産証明や年収要件が面倒な方におすすめ
                </div>
              </div>
            </div>

            {/* LTR Visa */}
            <div className="bg-white border border-blue-200 rounded-2xl p-8 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-full -mr-16 -mt-16 z-0 group-hover:scale-110 transition-transform"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                    <TrendingUp size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">LTR Visa<br/><span className="text-sm font-normal text-gray-500">長期居住者ビザ</span></h3>
                </div>
                <div className="text-3xl font-extrabold text-gray-900 mb-2">5万THB<span className="text-base font-normal text-gray-500"> (申請料)</span></div>
                <p className="text-sm text-gray-500 mb-6">高ポテンシャル外国人向け。要件は厳格だが、税制優遇が強力。</p>
                
                <div className="bg-blue-50 rounded-xl p-5 mb-6 border border-blue-100">
                  <h4 className="font-bold text-blue-900 text-sm mb-2">最大のメリット：税制優遇</h4>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    海外からの所得をタイに持ち込んでも、タイでの個人所得税が免除されます。資産家にとって最強の節税ツール。
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-gray-400 uppercase">主な要件</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 資産100万ドル以上</li>
                    <li>• 年収8万ドル以上</li>
                    <li>• タイへの投資50万ドル以上 (富裕層カテゴリ)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 4: リタイアメント --- */}
        <section id="retirement" className="scroll-mt-32">
          <div className="bg-orange-50 rounded-3xl p-8 md:p-12 border border-orange-100">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <div className="inline-flex items-center gap-2 text-orange-600 font-bold mb-4">
                  <User size={20} /> Retirement Visa (Non-O)
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  リタイアメントビザの<br/>「国内切り替え」戦略
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  50歳以上の方を対象としたロングステイビザ。日本で取得する「O-Aビザ」は高額な保険加入が必須ですが、タイ国内で「Oビザ」に切り替えることで保険要件を回避する手法が一般的です。
                </p>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
                  <h4 className="font-bold text-orange-800 text-sm mb-2 flex items-center gap-2">
                    <ShieldCheck size={16} /> 資金の熟成ルール (Seasoning)
                  </h4>
                  <p className="text-xs text-gray-600">
                    申請に向けて、80万バーツ以上の資金をタイの銀行口座内で2ヶ月間維持（熟成）させる必要があります。更新時も同様のルールが適用され、資金は実質的に「塩漬け」となります。
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <div className="absolute inset-0 bg-orange-200 rounded-2xl rotate-3"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-md h-full flex flex-col justify-center">
                  <h3 className="font-bold text-gray-900 mb-6 text-center">切り替えプロセス</h3>
                  <div className="space-y-6">
                    {[
                      { step: '01', text: 'ノービザまたは観光ビザで入国' },
                      { step: '02', text: 'タイ銀行口座を開設し80万B送金' },
                      { step: '03', text: '資金を2ヶ月間口座で維持（熟成）' },
                      { step: '04', text: '入国管理局でビザ切り替え申請' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="text-2xl font-black text-orange-200">{item.step}</div>
                        <div className="text-sm font-bold text-gray-700">{item.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 5: その他（就労・結婚・教育） --- */}
        <section id="others" className="scroll-mt-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mb-4">
                <Heart size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2">結婚ビザ (Non-O)</h3>
              <p className="text-xs text-gray-500 mb-4">タイ国籍者と結婚している場合。</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 資金要件: 40万バーツ（リタイアの半分）</li>
                <li>• 審査: 厳格。家庭訪問による実態調査あり。</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-4">
                <Briefcase size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2">就労ビザ (Non-B)</h3>
              <p className="text-xs text-gray-500 mb-4">タイで働くための必須セット。</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 必須: ワークパーミットとのセット取得</li>
                <li>• 基本要件: 資本金200万B + タイ人4名雇用</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4">
                <GraduationCap size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2">教育ビザ (Non-ED)</h3>
              <p className="text-xs text-gray-500 mb-4">2025年以降、監視が強化されています。</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• リスク: 実態のない通学はビザ取消の対象</li>
                <li>• 安全策: 正規大学やインター校は引き続き安全</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Section 6: 税務とまとめ --- */}
        <section id="tax" className="scroll-mt-32">
          <div className="bg-gray-900 text-gray-300 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Coins className="text-yellow-400" />
              税務とファイナンス：2024年改正歳入法の影響
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="mb-4 text-sm leading-relaxed">
                  2024年1月より、<strong className="text-white bg-red-600/20 px-1">「タイ居住者（年180日以上滞在）が、海外で得た所得をタイに持ち込んだ場合、個人所得税の課税対象となる」</strong>という新ルールが適用されています。
                </p>
                <p className="text-sm leading-relaxed">
                  これにより、DTVやリタイアメントビザで滞在し、日本の年金や貯蓄をタイの生活費として送金している人は、原則として確定申告の義務が生じる可能性があります。
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h4 className="font-bold text-white text-sm mb-4">戦略的対応</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" />
                    <span><strong>LTRビザの活用：</strong>海外所得持ち込み課税が免除される唯一のビザ。</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" />
                    <span><strong>非居住者ステータス：</strong>滞在を年179日以下に抑えれば課税対象外。</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --- Action Plan --- */}
        <section className="bg-blue-50 py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 text-center">
          <div className="container-base">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
              結論とアクションプラン
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-sm font-bold text-gray-500 mb-2">年180日以内の滞在</div>
                <div className="text-xl font-bold text-blue-600 mb-2">DTV ビザ</div>
                <p className="text-xs text-gray-500">コスト・手軽さで最適解</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-blue-100">
                <div className="text-sm font-bold text-gray-500 mb-2">完全移住 (資産家)</div>
                <div className="text-xl font-bold text-blue-600 mb-2">LTR ビザ</div>
                <p className="text-xs text-gray-500">税務メリットを最優先</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-sm font-bold text-gray-500 mb-2">完全移住 (一般)</div>
                <div className="text-xl font-bold text-blue-600 mb-2">Non-O ビザ</div>
                <p className="text-xs text-gray-500">資金熟成ルールを厳守</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA --- */}
        <section className="container-base text-center pt-16">
          <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-10 md:p-16 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">タイでの安全で豊かな生活へ</h2>
              <p className="text-red-100 mb-8 max-w-2xl mx-auto text-lg">
                ビザ取得だけでなく、住まい探しから生活のセットアップまで。<br/>
                City Club Houseがトータルでサポートします。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/" 
                  className="inline-flex items-center justify-center gap-2 bg-white text-red-600 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all hover:scale-105"
                >
                  <ArrowRight size={20} />
                  物件を探す
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center gap-2 bg-red-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-red-800 transition-all hover:scale-105"
                >
                  お問い合わせ
                </Link>
              </div>
            </div>
            {/* 背景パターン */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>
        </section>

      </div>
    </div>
  );
}