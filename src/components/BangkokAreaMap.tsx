"use client";

import Link from "next/link";
import { useState } from "react";

export default function BangkokAreaMap() {
  // 現在のURLからアクティブなエリア判定を行いたい場合はここでロジックを調整
  // 例: /properties?area=SUK の場合 "SUK" を取得など
  const activeArea = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('area');
  
  const [hoverId, setHoverId] = useState<string | null>(null);

  // 元画像の実寸（px）に合わせる
  const W = 1280;
  const H = 720;
  const TITLE_W = 360;   // カード幅(px)
  const TITLE_H = 110;   // カード高さ(px)
  const TITLE_M = 24;    // 右上からのマージン(px)
  const BORDER = 5;      // 枠の太さ

  const isOn = (id: string) => hoverId === id || activeArea === id;

  return (
    <section className="mx-auto max-w-screen-xl px-4 py-8">
      <svg
        className="block w-full h-auto"
        viewBox={`-${BORDER/2} -${BORDER/2} ${W + BORDER} ${H + BORDER}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="バンコクエリアマップ"
      >
        {/* 背景画像 */}
        <image href="/AreaMap.jpg" x="0" y="0" width={W} height={H} />
        <rect
          x="0" y="0" width={W} height={H}
          fill="none"
          stroke="#111827"
          strokeWidth={BORDER}
        />
        
        <defs>
          <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.18"/>
          </filter>
        </defs>

        {/* 右上タイトルカード */}
        <g transform={`translate(${W - TITLE_W - TITLE_M}, ${TITLE_M})`}>
          <rect width={TITLE_W} height={TITLE_H} rx="14" ry="14"
                fill="white" opacity="0.92" filter="url(#cardShadow)" />
          <text x={TITLE_W/2} y={TITLE_H/2 + 12}
                textAnchor="middle"
                fontSize="40" fontWeight="800" fill="#111827"
                style={{ paintOrder: "stroke", stroke: "white", strokeWidth: 3 }}>
            エリアから探す
          </text>
        </g>

        {/* ============ クリック可能エリア（Linkで囲む） ============ */}
        
        {/* トンブリー */}
        <Link href="/properties?area=TB">
          <polygon
            points="11,395 113,395 113,568 245,575 245,616 375,618 377,709 17,709"
            className={`cursor-pointer transition-opacity duration-150 
              ${isOn("TB") ? "fill-white/10 stroke-blue-500 opacity-100" : "fill-transparent stroke-transparent hover:fill-white/10 hover:stroke-blue-400 opacity-100"}`}
            strokeWidth={3}
            onMouseEnter={() => setHoverId("TB")}
            onMouseLeave={() => setHoverId(null)}
          >
            <title>トンブリー</title>
          </polygon>
        </Link>

        {/* 1: チャトゥチャック */}
        <Link href="/properties?area=CHA">
          <rect
            x={219} y={2} width={589 - 219} height={132 - 2}
            className={`cursor-pointer transition-opacity duration-150 
              ${isOn("CHA") ? "fill-white/10 stroke-blue-500" : "fill-transparent stroke-transparent hover:fill-white/10 hover:stroke-blue-400"}`}
            strokeWidth={3}
            onMouseEnter={() => setHoverId("CHA")}
            onMouseLeave={() => setHoverId(null)}
          >
            <title>チャトゥチャック</title>
          </rect>
        </Link>

        {/* 2: サイアム */}
        <Link href="/properties?area=SIAM">
          <rect
            x={260} y={158} width={440 - 260} height={382 - 158}
            className={`cursor-pointer transition-opacity duration-150 
              ${isOn("SIAM") ? "fill-white/10 stroke-blue-500" : "fill-transparent stroke-transparent hover:fill-white/10 hover:stroke-blue-400"}`}
            strokeWidth={3}
            onMouseEnter={() => setHoverId("SIAM")}
            onMouseLeave={() => setHoverId(null)}
          >
            <title>サイアム</title>
          </rect>
        </Link>

        {/* 3: エアポートレールリンク */}
        <Link href="/properties?area=AIR">
          <rect
            x={455} y={154} width={1265 - 455} height={267 - 154}
            className={`cursor-pointer transition-opacity duration-150 
              ${isOn("AIR") ? "fill-white/10 stroke-blue-500" : "fill-transparent stroke-transparent hover:fill-white/10 hover:stroke-blue-400"}`}
            strokeWidth={3}
            onMouseEnter={() => setHoverId("AIR")}
            onMouseLeave={() => setHoverId(null)}
          >
            <title>エアポートレールリンク</title>
          </rect>
        </Link>

        {/* 4: スクンビット */}
        <Link href="/properties?area=SUK">
          <rect
            x={476} y={286} width={1048 - 476} height={520 - 286}
            className={`cursor-pointer transition-opacity duration-150 
              ${isOn("SUK") ? "fill-white/10 stroke-blue-500" : "fill-transparent stroke-transparent hover:fill-white/10 hover:stroke-blue-400"}`}
            strokeWidth={3}
            onMouseEnter={() => setHoverId("SUK")}
            onMouseLeave={() => setHoverId(null)}
          >
            <title>スクンビット</title>
          </rect>
        </Link>

        {/* 5: オンヌット周辺 */}
        <Link href="/properties?area=ONN">
          <rect
            x={1070} y={284} width={1259 - 1070} height={693 - 284}
            className={`cursor-pointer transition-opacity duration-150 
              ${isOn("ONN") ? "fill-white/10 stroke-blue-500" : "fill-transparent stroke-transparent hover:fill-white/10 hover:stroke-blue-400"}`}
            strokeWidth={3}
            onMouseEnter={() => setHoverId("ONN")}
            onMouseLeave={() => setHoverId(null)}
          >
            <title>オンヌット周辺</title>
          </rect>
        </Link>

        {/* 6: タニヤ周辺 */}
        <Link href="/properties?area=TA">
          <rect
            x={217} y={399} width={463 - 217} height={523 - 399}
            className={`cursor-pointer transition-opacity duration-150 
              ${isOn("TA") ? "fill-white/10 stroke-blue-500" : "fill-transparent stroke-transparent hover:fill-white/10 hover:stroke-blue-400"}`}
            strokeWidth={3}
            onMouseEnter={() => setHoverId("TA")}
            onMouseLeave={() => setHoverId(null)}
          >
            <title>タニヤ周辺</title>
          </rect>
        </Link>
      </svg>
    </section>
  );
}