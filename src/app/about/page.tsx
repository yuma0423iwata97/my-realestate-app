import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import { 
  ShieldCheck, 
  MessageCircle, 
  Clock, 
  FileText, 
  Wrench, 
  Users, 
  Smartphone, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  HeartHandshake,
  Languages,
  BadgeCheck,
} from 'lucide-react';

export const metadata = {
  title: 'City Club Houseについて | バンコクの安心賃貸',
  description: '契約から入居後のトラブル対応まで、すべて日本語でサポート。現地ネットワークと即応体制で、初めてのバンコク移住を支えます。',
};

export default function AboutPage() {
  return (
    <div className="bg-white pb-20 font-sans text-gray-800">
      
      {/* ----------------------------------------------------------------------
          A. ヒーローセクション
          目的：最初の10秒で「ここなら安心だ」と感じさせる
      ---------------------------------------------------------------------- */}
      <section className="relative bg-gray-900 text-white pt-20 pb-24 md:pt-32 md:pb-32 overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent z-10" />
           {/* 背景画像がある場合はImageコンポーネントを使用 */}
           <div className="absolute inset-0 w-full h-full">
             <Image 
               src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2000&auto=format&fit=crop"
               alt="Bangkok City"
               fill
               className="object-cover opacity-40"
               priority
               unoptimized // ★ 追加: これによりnext.config.jsへのドメイン追加が不要になります
             />
           </div>
        </div>

        <div className="container-base relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
              バンコクの部屋探し、<br />
              契約も入居後も<span className="text-red-500">日本語</span>で。
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
              言葉が通じない国での暮らしは、不安がつきもの。<br className="hidden md:block"/>
              物件探しから契約、入居後のトラブル対応まで。<br className="hidden md:block"/>
              現地ネットワークと即応体制で、初めての移住を支えます。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://lin.ee/XQiv5FI" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b54d] text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all hover:scale-105"
              >
                <MessageCircle size={24} fill="currentColor" className="text-white" />
                LINEで無料相談する
              </a>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-900 font-bold py-4 px-8 rounded-full shadow-lg transition-all hover:scale-105"
              >
                <FileText size={20} />
                条件を送って物件提案を受ける
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              現在、通常30分以内に返信しています
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          B. 不安を先に潰す
          ターゲット：初めて海外に住む人の「3大不安」に答える
      ---------------------------------------------------------------------- */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-base">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              海外での部屋探し、<br className="md:hidden" />こんな<span className="text-red-600">不安</span>ありませんか？
            </h2>
            <p className="text-gray-600">CCHなら、その不安をすべて解消できます。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 不安 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative group hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white border border-gray-200 p-4 rounded-full shadow-sm text-gray-400 group-hover:text-red-500 transition-colors">
                <FileText size={32} />
              </div>
              <h3 className="mt-8 text-lg font-bold text-center mb-3">契約内容が怖い...</h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                英語やタイ語の契約書にサインするのが不安。<br/>不利な条件がないか心配。
              </p>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <p className="font-bold text-red-700 text-sm flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} /> 日本語で事前確認
                </p>
                <p className="text-xs text-red-600 mt-1">
                  契約書の内容はすべて日本語で解説。納得いただいてからサインします。
                </p>
              </div>
            </div>

            {/* 不安 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative group hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white border border-gray-200 p-4 rounded-full shadow-sm text-gray-400 group-hover:text-red-500 transition-colors">
                <Languages size={32} />
              </div>
              <h3 className="mt-8 text-lg font-bold text-center mb-3">言葉が通じない...</h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                オーナーとの交渉や要望を、<br/>自分の言葉で伝えられる自信がない。
              </p>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <p className="font-bold text-red-700 text-sm flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} /> 100%日本語対応
                </p>
                <p className="text-xs text-red-600 mt-1">
                  ご相談から入居後の連絡まで、CCHが日本語の窓口になります。
                </p>
              </div>
            </div>

            {/* 不安 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative group hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white border border-gray-200 p-4 rounded-full shadow-sm text-gray-400 group-hover:text-red-500 transition-colors">
                <Wrench size={32} />
              </div>
              <h3 className="mt-8 text-lg font-bold text-center mb-3">トラブル対応は？</h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                水漏れやエアコン故障時、<br/>修理業者がいつ来るか分からない。
              </p>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <p className="font-bold text-red-700 text-sm flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} /> タイ人スタッフ立会い
                </p>
                <p className="text-xs text-red-600 mt-1">
                  現場にはタイ人スタッフが急行。業者への指示出しまで行います。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          C. CCHの約束（信頼の核）
          実績がなくても「運用ルール」で信頼を勝ち取る
      ---------------------------------------------------------------------- */}
      <section className="py-16 border-b border-gray-100">
        <div className="container-base">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="inline-block bg-black text-white px-3 py-1 rounded text-xs font-bold mb-4">
                OUR PROMISE
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
                当たり前のことを、<br/>
                徹底してやり切ります。
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                海外不動産でよくある「連絡が来ない」「言ったことが伝わっていない」。<br/>
                私たちはこれを防ぐため、独自の運用ルールを設けています。
              </p>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-blue-50 p-2 rounded-lg text-blue-600 shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">365日・即レス対応</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      LINEの平均返信時間は30分以内。土日祝日も休まず対応します。緊急時は電話対応も可能です。
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-blue-50 p-2 rounded-lg text-blue-600 shrink-0">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">透明性のある点検</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      入居前の傷チェックは写真と動画で記録し、共有します。「退去時に覚えのない請求が来た」を防ぎます。
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-blue-50 p-2 rounded-lg text-blue-600 shrink-0">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">チーム体制でサポート</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      担当者一人に任せきりにせず、チームで情報を共有。担当が休みでも対応が止まることはありません。
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="md:w-1/2 relative">
              {/* イメージ図 */}
              <div className="aspect-square bg-gray-100 rounded-2xl relative overflow-hidden border border-gray-200 shadow-lg">
                
                {/* 画像: next/image に置き換え */}
                <Image
                  src="/aboutCCH.jpg"
                  alt="日本人スタッフとタイ人スタッフが笑顔でミーティングしている様子"
                  fill
                  className="object-cover"
                />

                {/* 信頼バッジ風装飾（更新）: 半透明＋リンク化 */}
                <a 
                  href="https://lin.ee/XQiv5FI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute bottom-6 right-6 bg-white/85 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 max-w-[200px] hover:scale-105 transition-transform duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="text-green-500" size={20} />
                    <span className="font-bold text-sm text-gray-900 group-hover:text-green-600 transition-colors">LINEで完結</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-snug">
                    面倒なメールのやり取りは不要。チャットでサクサク進みます。
                  </p>
                </a>

              </div>
            </div>

            
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          E. “トラブルに強い理由”を図解（最重要差別化）
          視覚的に「なぜ解決できるのか」を見せる
      ---------------------------------------------------------------------- */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container-base text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            なぜ、CCHは<br className="md:hidden" />「トラブルに強い」のか？
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            「言葉の壁」が原因で修理が遅れる・伝わらないことを防ぐため、<br/>
            日本人窓口の裏で、強力な現地チームが動いています。
          </p>

          <div className="max-w-4xl mx-auto">
             <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
                
                {/* User */}
                <div className="bg-white text-gray-900 p-6 rounded-xl w-full md:w-64 relative z-10">
                   <div className="text-4xl mb-2">🧑‍💻</div>
                   <h4 className="font-bold text-lg">お客様</h4>
                   <p className="text-xs text-gray-500 mt-2">日本語でLINE連絡</p>
                   <div className="mt-3 bg-green-100 text-green-700 text-xs py-1 px-2 rounded-full font-bold">
                      「エアコンから水が...」
                   </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex flex-col items-center px-4">
                   <span className="text-xs text-gray-400 mb-1">LINE 即レス</span>
                   <ArrowRight className="text-white" size={24} />
                </div>
                <div className="md:hidden py-2"><ArrowRight className="text-white rotate-90" size={24} /></div>

                {/* CCH Team (Center) */}
                <div className="bg-red-600 p-6 rounded-xl w-full md:w-80 shadow-2xl relative z-20 border-2 border-red-400">
                   <h4 className="font-bold text-xl mb-4 text-white">CITY CLUB HOUSE</h4>
                   <div className="flex gap-2 items-stretch">
                      <div className="bg-white/10 p-2 rounded flex-1">
                         <span className="text-2xl block mb-1">🇯🇵</span>
                         <span className="text-xs font-bold block">日本人担当</span>
                         <span className="text-[10px] opacity-80">内容理解・報告</span>
                      </div>
                      <div className="flex items-center text-white/50"><ArrowRight size={16} /></div>
                      <div className="bg-white text-red-600 p-2 rounded flex-1">
                         <span className="text-2xl block mb-1">🇹🇭</span>
                         <span className="text-xs font-bold block">タイ人担当</span>
                         <span className="text-[10px] text-red-800">現場交渉・立会い</span>
                      </div>
                   </div>
                   <p className="text-xs text-white/80 mt-3 border-t border-white/20 pt-2">
                      言語の壁をチーム内で解消
                   </p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex flex-col items-center px-4">
                   <span className="text-xs text-gray-400 mb-1">タイ語で交渉</span>
                   <ArrowRight className="text-white" size={24} />
                </div>
                <div className="md:hidden py-2"><ArrowRight className="text-white rotate-90" size={24} /></div>

                {/* Owner */}
                <div className="bg-gray-800 p-6 rounded-xl w-full md:w-64 border border-gray-700 relative z-10">
                   <div className="text-4xl mb-2">🏢</div>
                   <h4 className="font-bold text-lg text-gray-200">オーナー/業者</h4>
                   <p className="text-xs text-gray-500 mt-2">的確な指示で動く</p>
                   <div className="mt-3 bg-gray-700 text-gray-300 text-xs py-1 px-2 rounded-full">
                      即日修理手配へ
                   </div>
                </div>

             </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          D. サービス範囲（できることを「フェーズ別」に見せる）
          「全部やります」を具体的に分解
      ---------------------------------------------------------------------- */}
      <section className="py-16">
        <div className="container-base">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              物件探しからご帰国まで。<br/>
              トータルサポート。
            </h2>
            <p className="text-gray-500">
              単なる「物件紹介屋」ではありません。あなたのバンコク生活のパートナーです。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phase 1 */}
            <ServiceCard 
              phase="01" 
              title="お部屋探し" 
              items={['条件ヒアリング', '物件提案', '内見手配・同行', 'エリア案内']}
              icon={HelpCircle}
            />
            {/* Phase 2 */}
            <ServiceCard 
              phase="02" 
              title="ご契約" 
              items={['条件交渉', '契約書リーガルチェック', '必要書類サポート', '契約金送金サポート']}
              icon={FileText}
            />
            {/* Phase 3 */}
            <ServiceCard 
              phase="03" 
              title="ご入居" 
              items={['入居前点検（撮影）', 'インターネット手配', '入居立会い', 'メーター確認']}
              icon={Key} // Keyコンポーネントを使用
            />
            {/* Phase 4 */}
            <ServiceCard 
              phase="04" 
              title="入居後〜退去" 
              items={['不具合の一次対応', 'オーナー連絡代行', '退去立会い', 'デポジット返金交渉']}
              icon={HeartHandshake}
              isHighlight
            />
          </div>
          
          <div className="mt-8 bg-gray-50 p-6 rounded-xl text-center border border-gray-100">
             <h4 className="font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                <BadgeCheck className="text-blue-500" />
                さらに、生活立ち上げもサポート
             </h4>
             <p className="text-sm text-gray-600">
                携帯SIM契約のアドバイス / 銀行口座開設サポート / 引越し業者の紹介 / 空港送迎の手配
             </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          G. 料金について（無料である理由を明確化）
          お金の話を先にすることで信頼を得る
      ---------------------------------------------------------------------- */}
      <section className="py-16 bg-red-50">
        <div className="container-base">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <span className="text-red-600 font-bold tracking-widest text-sm mb-2 block">PRICE</span>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                仲介手数料は、<br/>
                <span className="text-red-600 text-4xl">完全無料</span>です。
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                City Club Houseのサービス料は、成約時に物件オーナー様から支払われるコミッション（手数料）で賄われています。<br/><br/>
                そのため、<strong className="text-gray-900 bg-red-100 px-1">お客様から仲介手数料をいただくことは一切ありません。</strong><br/>
                また、日本人向けだからといって家賃に上乗せすることもありません。現地の市場価格そのままでご紹介します。
              </p>
              <div className="text-xs text-gray-400">
                ※ごく一部の例外物件（格安アパート等）の場合は事前にご相談しますが、通常コンドミニアム等はすべて無料です。
              </div>
            </div>
            <div className="shrink-0">
               <div className="w-40 h-40 bg-red-100 rounded-full flex flex-col items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-gray-500 text-sm font-bold">お客様負担</span>
                  <span className="text-5xl font-black text-red-600">0</span>
                  <span className="text-gray-500 text-sm font-bold">Baht</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          H. よくある質問
          最後のひと押し
      ---------------------------------------------------------------------- */}
      <section className="py-16 container-base max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">よくあるご質問</h2>
        <div className="space-y-4">
          <FAQItem 
            q="どのタイミングで費用が発生しますか？"
            a="ご契約時の「予約金」や「前家賃・デポジット」など、物件に関する費用以外、当社への支払いは発生しません。ご相談・内見・物件提案はすべて無料です。"
          />
          <FAQItem 
            q="日本にいながら部屋を決めることはできますか？"
            a="はい、可能です。LINEでのビデオ通話による「オンライン内見」に対応しています。渡航前に仮押さえまで完了させる方も増えています。"
          />
          <FAQItem 
            q="駐在員契約（法人契約）は可能ですか？"
            a="はい、対応可能です。会社規定の契約書フォーマットへの修正交渉や、必要書類の作成もサポートいたします。"
          />
          <FAQItem 
            q="内見は何件くらい見れますか？"
            a="制限はありませんが、1日あたり3〜5件程度が体力的にもおすすめです。ご納得いくまで何度でもご案内します。"
          />
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          I. CTA（最後の背中押し）
      ---------------------------------------------------------------------- */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="container-base max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">
            まずは条件だけ送ってください。<br/>
            あなたに合う物件をご提案します。
          </h2>
          <p className="text-gray-400 mb-10 text-lg">
            まだ時期が決まっていなくても大丈夫。<br/>
            強引な営業は一切しませんので、お気軽にご相談ください。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://lin.ee/XQiv5FI" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#06C755] hover:bg-[#05b54d] text-white font-bold py-4 px-12 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <MessageCircle size={24} />
              LINEで無料相談
            </a>
            <Link 
              href="/contact"
              className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-4 px-12 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <FileText size={20} />
              Webから条件を送る
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            相談目安：1分で入力完了
          </p>
        </div>
      </section>

    </div>
  );
}

// -----------------------------------------------------------------------------
// サブコンポーネント
// -----------------------------------------------------------------------------

function ServiceCard({ phase, title, items, icon: Icon, isHighlight = false }: { 
  phase: string; title: string; items: string[]; icon: React.ElementType; isHighlight?: boolean 
}) {
  return (
    <div className={`p-6 rounded-xl border ${isHighlight ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'} h-full`}>
      <div className="flex items-center justify-between mb-4">
        <span className={`text-xs font-bold px-2 py-1 rounded ${isHighlight ? 'bg-red-200 text-red-800' : 'bg-gray-100 text-gray-500'}`}>
          PHASE {phase}
        </span>
        <Icon className={isHighlight ? 'text-red-500' : 'text-gray-300'} size={24} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
            <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${isHighlight ? 'text-red-500' : 'text-gray-400'}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="font-bold text-gray-900 flex items-start gap-3 mb-2">
        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded mt-0.5">Q</span>
        {q}
      </h4>
      <p className="text-gray-600 text-sm pl-9 leading-relaxed">
        {a}
      </p>
    </div>
  );
}

// Keyアイコン用コンポーネント
function Key({ size, className }: { size?: number, className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size || 24} 
            height={size || 24} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <circle cx="7.5" cy="15.5" r="5.5"></circle>
            <path d="m21 2-9.6 9.6"></path>
            <path d="m15.5 7.5 3 3L22 7l-3-3"></path>
        </svg>
    )
}