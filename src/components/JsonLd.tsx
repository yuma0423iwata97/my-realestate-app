// components/JsonLd.tsx
import Image from 'next/image'; 
export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent", // 不動産エージェントとして定義
    "name": "CityClubHouse",
    "image": "/cch-logo.JPEG", // 実際のロゴ画像のURLに書き換えてください
    "@id": "https://cityclubhouse.net",
    "url": "https://cityclubhouse.net",
    "telephone": "+81-080-2449-2111", // お問い合わせ電話番号があれば記載
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bangkok",
      "addressCountry": "TH"
    },
    "description": "バンコクの日本人向け賃貸物件・コンドミニアム検索サイト。プロンポン・トンローなど人気エリアの物件を紹介。",
    "areaServed": {
      "@type": "City",
      "name": "Bangkok"
    },
    "priceRange": "฿฿" // 価格帯の目安
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}