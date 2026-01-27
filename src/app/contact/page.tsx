'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  MessageCircle, 
  MapPin, 
  Send, 
  CheckCircle2, 
  ChevronRight,
  HelpCircle
} from 'lucide-react';

// 環境変数からGASのURLを取得
const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_CONTACT_FORM_URL || "";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    // 環境変数が設定されていない場合のガード句
    if (!GOOGLE_SCRIPT_URL) {
      console.error('Configuration Error: NEXT_PUBLIC_CONTACT_FORM_URL is not set.');
      setFormStatus('error');
      return;
    }

    // フォームの値を取得
    const form = e.target as HTMLFormElement;
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      line: (form.elements.namedItem('line') as HTMLInputElement).value,
      category: (form.elements.namedItem('category') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      // GASへ送信
      // mode: 'no-cors' は重要です（これがないとGASへの送信でエラーになります）
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(formData),
      });

      // no-corsモードではレスポンスの中身が見れないため、エラーが出なければ成功とみなします
      setFormStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      form.reset(); // フォームをクリア

    } catch (error) {
      console.error('送信エラー:', error);
      setFormStatus('error');
    }
  };

  // フォーム位置へのスクロール関数
  const scrollToForm = () => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans text-gray-800">
      
      {/* ----------------------------------------------------------------------
          ヘッダーセクション
      ---------------------------------------------------------------------- */}
      <section className="bg-white border-b border-gray-100 pt-12 pb-16">
        <div className="container-base text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold mb-4">
            <Mail size={14} />
            CONTACT US
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            お問い合わせ
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            お部屋探しのご相談、内見のご予約、入居後のサポートまで。<br className="hidden sm:block"/>
            バンコク生活のパートナーとして、どんな小さなことでもお気軽にご連絡ください。
          </p>
        </div>
      </section>

      <div className="container-base max-w-5xl -mt-8 relative z-10">
        
        {/* ----------------------------------------------------------------------
            お問い合わせ方法の選択
        ---------------------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* LINE Card */}
          <div className="bg-[#06C755] rounded-2xl p-8 text-white shadow-lg relative overflow-hidden group transition-transform hover:-translate-y-1">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <MessageCircle size={40} className="fill-white" />
                <span className="bg-white text-[#06C755] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Recommended
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">LINEで相談する</h2>
              <p className="text-green-50 text-sm mb-8 leading-relaxed">
                チャットで気軽に相談できます。<br/>
                新着物件の画像もスムーズに受け取れます。<br/>
                <span className="font-bold border-b border-green-200">平均返信時間：30分以内</span>
              </p>
              <a 
                href="https://lin.ee/XQiv5FI" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-white text-[#06C755] font-bold text-center py-4 rounded-xl hover:bg-green-50 transition-colors shadow-sm"
              >
                友だち追加して相談する
              </a>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>

          {/* Web Form Card Info */}
          <button 
            onClick={scrollToForm}
            className="bg-white rounded-2xl p-8 text-gray-900 shadow-sm border border-gray-100 flex flex-col justify-between text-left hover:border-red-200 hover:shadow-md transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <Mail size={40} className="text-red-600" />
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                  <ChevronRight size={20} className="rotate-90 md:rotate-0" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2 group-hover:text-red-600 transition-colors">お問い合わせフォームで送る</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                条件をしっかり書きたい方や、<br/>
                メールでの連絡をご希望の方はこちら。<br/>
                24時間以内に担当者からご連絡いたします。
              </p>
            </div>
          </button>
        </div>

        {/* ----------------------------------------------------------------------
            メインフォームエリア
        ---------------------------------------------------------------------- */}
        <div id="contact-form" className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden scroll-mt-24">
          
          {/* 送信完了画面 */}
          {formStatus === 'success' ? (
            <div className="p-16 text-center">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">お問い合わせありがとうございます</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                メッセージが正常に送信されました。<br/>
                担当者が内容を確認し、通常24時間以内にメールまたはLINEにてご連絡いたします。
              </p>
              <button 
                onClick={() => setFormStatus('idle')}
                className="text-red-600 font-bold hover:underline"
              >
                トップページへ戻る
              </button>
            </div>
          ) : (
            // 入力フォーム
            <div className="flex flex-col lg:flex-row">
              
              {/* 左側：入力欄 */}
              <div className="flex-1 p-8 md:p-12">
                <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                  <span className="w-1 h-6 bg-red-600 rounded-full"></span>
                  お問い合わせフォーム
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* エラーメッセージ */}
                  {formStatus === 'error' && (
                     <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm mb-4">
                       送信中にエラーが発生しました。時間を置いて再度お試しいただくか、LINEにてご連絡ください。
                     </div>
                  )}

                  {/* お名前 & メールアドレス */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-bold text-gray-700">
                        お名前 <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        id="name" 
                        required
                        placeholder="例：山田 太郎"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none bg-gray-50 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-bold text-gray-700">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        id="email" 
                        required
                        placeholder="example@email.com"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none bg-gray-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* LINE ID (任意) */}
                  <div className="space-y-2">
                    <label htmlFor="line" className="text-sm font-bold text-gray-700 flex items-center justify-between">
                      <span>LINE ID</span>
                      <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded">任意</span>
                    </label>
                    <input 
                      type="text" 
                      name="line"
                      id="line" 
                      placeholder="LINEでの連絡をご希望の場合"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none bg-gray-50 focus:bg-white"
                    />
                  </div>

                  {/* お問い合わせ種類 */}
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-bold text-gray-700">
                      ご相談内容 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select 
                        id="category"
                        name="category"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                      >
                        <option value="">選択してください</option>
                        <option value="物件を探してほしい">物件を探してほしい</option>
                        <option value="内見を予約したい">内見を予約したい</option>
                        <option value="オーナー様・管理会社様">オーナー様・管理会社様</option>
                        <option value="その他のお問い合わせ">その他のお問い合わせ</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <ChevronRight className="rotate-90" size={18} />
                      </div>
                    </div>
                  </div>

                  {/* メッセージ本文 */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-gray-700">
                      詳細・ご要望 <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      id="message" 
                      name="message"
                      required
                      rows={5}
                      placeholder="ご希望のエリア、予算、入居時期など、詳細をご記入いただけるとスムーズです。"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none bg-gray-50 focus:bg-white resize-none"
                    ></textarea>
                  </div>

                  {/* 送信ボタン */}
                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={formStatus === 'submitting'}
                      className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2
                        ${formStatus === 'submitting' 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-red-600 hover:bg-red-700 hover:-translate-y-0.5'
                        }`}
                    >
                      {formStatus === 'submitting' ? (
                        <>送信中...</>
                      ) : (
                        <>
                          <Send size={20} /> 内容を送信する
                        </>
                      )}
                    </button>
                    <p className="text-xs text-center text-gray-400 mt-4">
                      送信することで、<a href="/privacy" className="underline hover:text-red-600">プライバシーポリシー</a>に同意したものとみなされます。
                    </p>
                  </div>

                </form>
              </div>

              {/* 右側：サイド情報（FAQなど） */}
              <div className="bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-100 p-8 md:p-12 lg:w-96">
                <div className="sticky top-24">
                  <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <HelpCircle className="text-red-600" size={20} />
                    よくあるご質問
                  </h4>
                  
                  {/* アコーディオン形式のFAQ */}
                  <div className="space-y-2 mb-10">
                    <FAQItem 
                      question="Q. 仲介手数料はかかりますか？"
                      answer={
                        <>
                          <span className="font-bold block mb-2">かかりません。</span>
                          CCHの物件紹介・内見・契約サポートは、原則すべて無料です。<br/>
                          私たちはオーナー様・管理会社様からのコミッションで運営しているため、お客様から仲介手数料をいただくことはありません。<br/>
                          <span className="text-xs text-gray-500 mt-1 block">※一部特殊条件（短期契約など）の場合は、事前に必ずご説明します。</span>
                        </>
                      }
                    />
                    <FAQItem 
                      question="Q. 内見の予約は必要ですか？"
                      answer={
                        <>
                          <span className="font-bold block mb-2">はい、原則として事前予約が必要です。</span>
                          内見はオーナー・管理会社との調整が必要なため、ご希望日時を事前にお知らせください。<br/>
                          LINEでご連絡いただければ、最短で当日〜翌日の内見手配が可能です。
                        </>
                      }
                    />
                    <FAQItem 
                      question="Q. 日本からオンライン内見はできますか？"
                      answer={
                        <>
                          <span className="font-bold block mb-2">可能です。</span>
                          日本にいながら、<br/>
                          ・ビデオ通話によるリアルタイム内見<br/>
                          ・室内・共用部の詳細な映像確認<br/>
                          ができます。<br/>
                          現地スタッフが実際に物件を歩きながらご案内するため、写真だけでは分からない点まで確認できます。
                        </>
                      }
                    />
                    <FAQItem 
                      question="Q. 入居後のトラブル対応はしてもらえますか？"
                      answer={
                        <>
                          <span className="font-bold block mb-2">はい、入居後も継続してサポートします。</span>
                          水回り・エアコン・設備不良などのトラブルがあった場合も、日本語でCCHにご連絡ください。<br/>
                          現地タイ人スタッフと連携し、管理会社・オーナーへの連絡や現地対応を行います。<br/>
                          「連絡がつかない」「たらい回しにされる」といった心配はありません。
                        </>
                      }
                    />
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h5 className="font-bold text-gray-800 text-sm mb-3">オフィス所在地</h5>
                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                      123 Sukhumvit Road, Khlong Tan Nuea, Watthana, Bangkok 10110<br/>
                      (BTS Phrom Phong駅 直結)
                    </p>
                    <a href="https://maps.google.com/?q=123+Sukhumvit+Road+Bangkok" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-red-600 flex items-center gap-1 hover:underline">
                      <MapPin size={14} /> Google Mapsで見る
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// サブコンポーネント：アコーディオン式FAQアイテム
function FAQItem({ question, answer }: { question: string; answer: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-start justify-between w-full py-3 text-left group"
      >
        <span className={`text-sm font-bold transition-colors ${isOpen ? 'text-red-600' : 'text-gray-700 group-hover:text-red-600'}`}>
          {question}
        </span>
        <ChevronRight
          size={16}
          className={`shrink-0 mt-0.5 ml-2 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-90 text-red-600' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}
      >
        <div className="text-sm text-gray-600 leading-relaxed pl-2 border-l-2 border-red-100 ml-1">
          {answer}
        </div>
      </div>
    </div>
  );
}