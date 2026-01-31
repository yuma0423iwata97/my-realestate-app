import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const upstream = process.env.SHEET_API_URL; // GASの公開URL
  if (!upstream) {
    console.error("[properties] MISSING PROPERTIES_API env");
    return NextResponse.json({ data: [], error: "Missing SHEET_API_URL" }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(req.url);
    // 必要なら送るパラメータだけ拾う（GASがbounds非対応なら一旦送らない）
    const q = new URLSearchParams();
    // ★ bedroom, bathroom を許可リストに追加
    for (const k of ["north","south","east","west","area","station","page","perPage","q","sort","bedroom","bathroom"]) {
      const v = searchParams.getAll(k);
      v.forEach((vv) => q.append(k, vv));
    }

    const url = `${upstream}?${q.toString()}`;
    const r = await fetch(url, { cache: "no-store" });
    const text = await r.text();

    if (!r.ok) {
      console.error("[properties] upstream error", r.status, url, text?.slice(0,200));
      // 一旦 200 + 空配列で返してフロント落ちないように
      return NextResponse.json({ data: [], upstream: { status: r.status } }, { status: 200 });
    }

    // 空/非JSONでも落ちない
    const json = text.trim() ? JSON.parse(text) : { data: [] };
    // レスポンスが配列だけ返す場合の吸収
    const normalized = Array.isArray(json) ? { data: json } : json;
    return NextResponse.json(normalized, { status: 200 });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    console.error("[properties] route exception", errorMessage);
    return NextResponse.json({ data: [], error: errorMessage }, { status: 200 });
  }
}