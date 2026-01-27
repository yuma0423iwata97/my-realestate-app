import React from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Calendar, 
  CreditCard, 
  ClipboardCheck, 
  Key, 
  HeartHandshake, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle,
  Clock,
  MapPin
} from 'lucide-react';

export const metadata = {
  title: 'ご入居までの流れ | CITY CLUB HOUSE',
  description: 'バンコクでの賃貸物件探しからご契約、ご入居、退去までのステップを分かりやすく解説します。',
};

export default function GuidePage() {
  return (
    <div className="bg-gray-50 pb-20">
      
      {/* ① ヒーローセクション */}
      <section className="relative bg-white pt-16 pb-20 border-b border-gray-100 overflow-hidden">
        <div className="container-base relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-red-50 text-red-600 text-sm font-bold mb-4 tracking-wider">
            PROCESS GUIDE
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            ご入居までの流れ
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            初めてのバンコク生活でも安心。<br className="md:hidden" />
            物件探しからご入居後のサポートまで、<br />
            すべて日本語でCity Club Houseがサポートします。
          </p>
        </div>
        
        {/* 背景装飾 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
           <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-red-100 rounded-full blur-3xl" />
           <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-gray-200 rounded-full blur-3xl" />
        </div>
      </section>

      {/* ② ステップ概要（横スクロールナビ） */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="container-base py-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex items-center justify-start md:justify-center min-w-max gap-2 md:gap-4 px-2">
            {[
              { num: '01', label: 'お問い合わせ', icon: Mail },
              { num: '02', label: 'ご見学', icon: Calendar },
              { num: '03', label: '仮押さえ', icon: CreditCard },
              { num: '04', label: '入居前点検', icon: ClipboardCheck },
              { num: '05', label: 'ご契約', icon: Key },
              { num: '06', label: 'サポート', icon: HeartHandshake },
            ].map((step, i) => (
              <div key={i} className="flex items-center group cursor-default">
                <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors hover:bg-gray-50">
                  <span className="text-xs font-bold text-red-600">STEP {step.num}</span>
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <step.icon size={16} className="text-gray-400 group-hover:text-red-500" />
                    {step.label}
                  </div>
                </div>
                {i < 5 && <ArrowRight size={14} className="text-gray-300 mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ③ 詳細ステップ（タイムライン） */}
      <div className="container-base py-16 max-w-4xl">
        <div className="relative space-y-12 md:space-y-24">
          
          {/* タイムラインの縦線（PCのみ表示） */}
          <div className="absolute top-8 left-6 md:left-1/2 bottom-8 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block" />

          {/* STEP 1: お問い合わせ */}
          <StepCard 
            step="01"
            title="お問い合わせ・ヒアリング"
            icon={Mail}
            isRight={false}
          >
            <p className="text-gray-600 mb-6 leading-relaxed">
              まずはメールやLINE等でお気軽にお問い合わせください。<br/>
              お客様のご希望をヒアリングし、最適な物件リストをご提案します。
            </p>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h4 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
                <MessageCircle size={16} className="text-red-500"/>
                教えていただきたいこと
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-red-400"/> ご入居人数（単身/家族）</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-red-400"/> ご希望エリア</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-red-400"/> ご予算</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-red-400"/> 間取り（Studio〜3Bed）</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-red-400"/> ご入居希望日</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-red-400"/> ペットや家具の有無</li>
              </ul>
            </div>
          </StepCard>

          {/* STEP 2: ご見学 */}
          <StepCard 
            step="02"
            title="物件のご見学"
            icon={Calendar}
            isRight={true}
          >
            <p className="text-gray-600 mb-6 leading-relaxed">
              気になる物件が見つかったら、実際に内見へ。<br/>
              専任スタッフが専用車でご案内します。周辺環境も合わせてチェックしましょう。
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                  <Clock size={18} />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">土日祝も毎日対応</h5>
                  <p className="text-xs text-gray-500 mt-1">目安 9:00〜17:00 / 現地集合も可能です</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                <div className="p-2 bg-green-50 text-green-600 rounded-full">
                  <MapPin size={18} />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">オンライン内見対応</h5>
                  <p className="text-xs text-gray-500 mt-1">日本にいながらビデオ通話で確認できます</p>
                </div>
              </div>
            </div>
          </StepCard>

          {/* STEP 3: 仮押さえ */}
          <StepCard 
            step="03"
            title="物件の仮押さえ（予約）"
            icon={CreditCard}
            isRight={false}
          >
            <p className="text-gray-600 mb-6 leading-relaxed">
              「ここに住みたい！」が決まったら、他の方に取られないよう<br/>
              <strong className="text-gray-900">Booking（仮押さえ）</strong>を行います。
            </p>
            
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
              <h4 className="font-bold text-sm text-gray-900 mb-3 border-b border-gray-100 pb-2">必要なもの</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span>パスポートコピー</span>
                  <span className="text-gray-400 text-xs">顔写真ページ</span>
                </li>
                <li className="flex justify-between">
                  <span>予約金（Booking Fee）</span>
                  <span className="font-bold text-gray-900">20,000 THB 前後</span>
                </li>
              </ul>
              <p className="text-xs text-gray-400 mt-2 text-right">※物件により金額は異なります</p>
            </div>

            {/* 注意喚起ボックス */}
            <div className="flex gap-3 bg-red-50 border border-red-200 p-4 rounded-lg">
              <AlertTriangle className="text-red-600 shrink-0" size={20} />
              <div className="text-sm">
                <p className="font-bold text-red-700 mb-1">キャンセル時のご注意</p>
                <p className="text-red-600 leading-snug">
                  仮押さえ完了後にお客様都合でキャンセルされた場合、
                  <span className="underline decoration-red-400 underline-offset-2 font-bold">予約金は返金されません</span>。
                  条件等は事前にしっかりご説明します。
                </p>
              </div>
            </div>
          </StepCard>

          {/* STEP 4: 入居前点検 */}
          <StepCard 
            step="04"
            title="入居前点検（CCH独自）"
            icon={ClipboardCheck}
            isRight={true}
          >
            <div className="inline-block bg-black text-white text-xs font-bold px-2 py-1 rounded mb-4">
              ここがCCHの強み
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              トラブルを未然に防ぐため、ご入居前にスタッフが室内を徹底チェック。<br/>
              オーナー様へ修繕依頼を行い、万全の状態でお渡しします。
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {['傷・汚れの確認', 'エアコン・家電動作', '水漏れ・排水チェック', '鍵・家具の開閉'].map((item, i) => (
                <div key={i} className="bg-white p-3 rounded-lg border border-gray-100 text-sm text-center font-medium text-gray-700 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-2 bg-gray-100 p-3 rounded">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               入居時に写真で詳細に記録し、退去時のトラブルを防ぎます。
            </p>
          </StepCard>

          {/* STEP 5: ご契約・ご入居 */}
          <StepCard 
            step="05"
            title="ご契約・ご入居"
            icon={Key}
            isRight={false}
          >
            <p className="text-gray-600 mb-6 leading-relaxed">
              契約書の読み合わせを行い、鍵をお渡しします。<br/>
              いよいよバンコクでの新生活スタートです！
            </p>
            
            <div className="bg-gray-900 text-white rounded-xl p-5 mb-6">
              <h4 className="font-bold text-sm mb-3 text-gray-300">ご入居時の初期費用</h4>
              <div className="flex items-center gap-4">
                <div className="flex-1 text-center p-3 bg-gray-800 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">デポジット</div>
                  <div className="font-bold text-xl">2ヶ月分</div>
                </div>
                <div className="text-gray-500">+</div>
                <div className="flex-1 text-center p-3 bg-gray-800 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">前家賃</div>
                  <div className="font-bold text-xl">1ヶ月分</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">※予約金を充当して計算します</p>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-sm text-gray-900">当日の流れ</h5>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1 pl-2">
                <li>オーナー・CCH・お客様で室内最終確認</li>
                <li>電気・水道メーターの確認と撮影</li>
                <li>鍵の引き渡し</li>
              </ol>
            </div>
          </StepCard>

          {/* STEP 6: サポート */}
          <StepCard 
            step="06"
            title="入居後・退去時サポート"
            icon={HeartHandshake}
            isRight={true}
          >
            <p className="text-gray-600 mb-6 leading-relaxed">
              ご入居後の「エアコンが壊れた」「水が出ない」などのトラブルも、<br/>
              CCHがオーナー様との間に入ってサポートします。
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-green-500 mt-0.5" />
                <span className="text-sm text-gray-700"><strong>不具合対応：</strong> 管理会社・オーナーへの連絡代行</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-green-500 mt-0.5" />
                <span className="text-sm text-gray-700"><strong>退去サポート：</strong> 立ち会い、精算のサポート</span>
              </li>
            </ul>
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-xs text-yellow-800">
              <strong>デポジット返金について：</strong><br/>
              退去後、修繕費等を差し引き、約1〜2ヶ月後にお客様の口座へ返金されます。
            </div>
          </StepCard>

        </div>
      </div>

      {/* ④ CTAセクション */}
      <section className="container-base mt-12 mb-20">
        <div className="bg-red-600 rounded-2xl p-8 md:p-16 text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              まずは理想の条件をお聞かせください
            </h2>
            <p className="text-red-100 mb-8 max-w-xl mx-auto">
              まだ時期が決まっていなくても大丈夫。<br/>
              バンコクの物件事情やエリアの特徴など、なんでもご相談ください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-red-600 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <Mail size={20} />
                お問い合わせフォーム
              </Link>
              <a 
                href="https://lin.ee/XQiv5FI" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#06C755] text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-[#05b54d] transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                LINEで気軽に相談
              </a>
            </div>
          </div>
          
          {/* 背景パターン */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>
      </section>

    </div>
  );
}

// -----------------------------------------------------------------------------
// サブコンポーネント: ステップカード
// -----------------------------------------------------------------------------

function StepCard({ 
  step, 
  title, 
  icon: Icon, 
  children, 
  isRight = false 
}: { 
  step: string; 
  title: string; 
  icon: React.ElementType; 
  children: React.ReactNode; 
  isRight: boolean; 
}) {
  return (
    <div className={`relative flex flex-col md:flex-row items-center md:items-start gap-8 ${isRight ? 'md:flex-row-reverse' : ''}`}>
      
      {/* タイムラインの中央ドット (PCのみ) */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-white shadow-sm z-10 hidden md:block" />

      {/* カード本体 */}
      <div className={`w-full md:w-1/2 ${isRight ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right text-left'}`}>
        
        {/* ステップ番号とアイコン */}
        <div className={`flex items-center gap-3 mb-4 ${isRight ? 'md:justify-start' : 'md:justify-end'}`}>
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shadow-inner">
            <Icon size={24} strokeWidth={2.5} />
          </div>
          <span className="text-4xl font-black text-gray-200 tracking-tighter">STEP {step}</span>
        </div>

        {/* タイトル */}
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
          {title}
        </h3>

        {/* コンテンツ（左寄せに戻すためのラッパー） */}
        <div className={`text-left ${isRight ? '' : 'md:ml-auto md:max-w-md'}`}>
          {children}
        </div>
        
      </div>

      {/* 反対側のスペース（レイアウト調整用） */}
      <div className="w-full md:w-1/2 hidden md:block" />
    </div>
  );
}