import React from 'react';
import { ShieldCheck, Mail, Lock } from 'lucide-react';

export const metadata = {
  title: 'プライバシーポリシー | CITY CLUB HOUSE',
  description: 'City Club Houseにおける個人情報の取扱いについて定めたプライバシーポリシーです。',
};

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans text-gray-800">
      
      {/* ヘッダー */}
      <section className="bg-white border-b border-gray-100 pt-12 pb-16">
        <div className="container-base text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold mb-4">
            <ShieldCheck size={14} />
            PRIVACY POLICY
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            プライバシーポリシー
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            お客様の個人情報を適切に取り扱い、保護することは、<br className="hidden sm:block"/>
            私たちにとって重要な責務であると考えています。
          </p>
        </div>
      </section>

      {/* 本文エリア */}
      <div className="container-base max-w-4xl -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-10">
          
          <div className="leading-relaxed text-gray-600">
            <p>
              City Club House（以下、「当サイト」といいます）は、提供するサービス（以下、「本サービス」といいます）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます）を定めます。
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <span className="text-red-600">1.</span> 個人情報の収集方法
            </h2>
            <p className="text-gray-600 leading-relaxed">
              当サイトは、ユーザーが問い合わせフォームを利用する際、氏名、電話番号、メールアドレス、LINE ID、希望物件条件などの個人情報をお尋ねすることがあります。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <span className="text-red-600">2.</span> 個人情報を収集・利用する目的
            </h2>
            <p className="text-gray-600 mb-3">当サイトが個人情報を収集・利用する目的は、以下のとおりです。</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 bg-gray-50 p-6 rounded-xl">
              <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
              <li>ユーザーが希望する不動産物件情報の提供、および関連する生活サポートサービスの提供のため</li>
              <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
              <li>利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をお断りするため</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <span className="text-red-600">3.</span> 個人情報の第三者提供
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              当サイトは、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法、タイ個人情報保護法（PDPA）、その他の法令で認められる場合を除きます。
            </p>
            <ul className="list-decimal list-inside space-y-3 text-gray-600 pl-4">
              <li>人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</li>
              <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</li>
              <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <span className="text-red-600">4.</span> 個人情報の開示・訂正・利用停止等
            </h2>
            <p className="text-gray-600 leading-relaxed">
              ユーザー本人から個人情報の開示、訂正、追加、削除、利用停止のご希望があった場合には、ご本人であることを確認させていただいた上で、速やかに対応いたします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <span className="text-red-600">5.</span> セキュリティ対策
            </h2>
            <p className="text-gray-600 leading-relaxed flex items-start gap-3">
              <Lock className="shrink-0 mt-1 text-gray-400" size={20} />
              <span>
                当サイトは、お預かりした個人情報の正確性を保ち、不正アクセス・紛失・破壊・改ざん・漏洩などを防止するため、適切な情報セキュリティ対策を講じます。
              </span>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <span className="text-red-600">6.</span> お問い合わせ窓口
            </h2>
            <p className="text-gray-600 mb-4">
              本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。
            </p>
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl flex items-start gap-4">
              <div className="bg-white p-2 rounded-full text-blue-600 shadow-sm shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">City Club House (CCH)</h3>
                <p className="text-sm text-gray-600 mb-2">個人情報保護担当</p>
                <a href="mailto:Cityclubhouse.jp@gmail.com" className="text-blue-600 font-bold hover:underline break-all">
                  Cityclubhouse.jp@gmail.com
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}