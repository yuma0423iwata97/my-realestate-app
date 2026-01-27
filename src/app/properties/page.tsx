// src/app/properties/page.tsx

import Link from "next/link";
import Contents from "@/components/Contents";
import SearchPanel from "@/components/SearchPanel";
import Sort from "@/components/Sort";
import PropertyCard, { Property } from "@/components/Property";

const API = process.env.SHEET_API_URL as string;

interface ApiResponse {
  data: Property[];
  page: number;
  perPage: number;
  total: number;
  totalPages?: number;
}

export const dynamic = "force-dynamic";

export default async function PricePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  // 値取得ヘルパー
  const pick = (k: string) => {
    if (!params) return "";
    const v = params[k];
    return Array.isArray(v) ? v[0] : v ?? "";
  };

  const page = Number(pick("page") || "1");
  const perPage = Number(pick("perPage") || "20");

  const usp = new URLSearchParams();
  
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (Array.isArray(v)) {
        v.forEach((vv) => usp.append(k, vv));
      } else if (typeof v === "string") {
        usp.set(k, v);
      }
    }
  }

  usp.set("page", String(page));
  usp.set("perPage", String(perPage));

  let properties: Property[] = [];
  let total = 0;
  
  try {
    const res = await fetch(`${API}?${usp.toString()}`, { cache: "no-store" });
    if (!res.ok) throw new Error("API fetch error");

    const json = (await res.json()) as ApiResponse;
    properties = json.data || [];
    total = json.total || 0;
  } catch (error) {
    console.error("Fetch error:", error);
  }

  // ソート処理
  const sortParam = (pick("sort") as string) || "idAsc";
  properties.sort((a, b) => {
    if (sortParam === "priceAsc") return (a.Price ?? 0) - (b.Price ?? 0);
    if (sortParam === "priceDesc") return (b.Price ?? 0) - (a.Price ?? 0); // 追加: 高い順
    if (sortParam === "sizeDesc") return (b.Size ?? 0) - (a.Size ?? 0);
    
    // default: idAsc
    const ap = typeof a.ID === "number" ? a.ID : Number.POSITIVE_INFINITY;
    const bp = typeof b.ID === "number" ? b.ID : Number.POSITIVE_INFINITY;
    return ap - bp;
  });

  const buildHref = (nextPage: number) => {
    const q = new URLSearchParams(usp.toString());
    q.set("page", String(nextPage));
    return `?${q.toString()}`;
  };

  const maxPage = Math.ceil(total / perPage) || 1;

  return (
    <div className="mx-auto pb-20">
      <section className="mx-auto max-w-screen-lg py-1">
        <Contents />
      </section>

      <section className="mx-auto max-w-screen-xl px-4 pt-8">
        <h2 className="mb-10 text-2xl font-extrabold tracking-tight">
          <span className="inline-block border-l-4 border-red-600 pl-3">
            物件情報
          </span>
        </h2>
        <div className="mx-auto">
          <SearchPanel />
        </div>
      </section>

      <section className="p-4 min-h-screen max-w-screen-xl mx-auto">
        <Sort />
        
        <div className="flex items-center justify-between mt-6">
          {page > 1 ? (
            <Link
              href={buildHref(page - 1)}
              className="px-4 py-2 rounded-md border bg-white hover:bg-gray-50 text-sm font-bold text-gray-700"
            >
              ← 前の{perPage}件
            </Link>
          ) : (
            <span />
          )}

          <span className="text-sm text-gray-500 font-medium">
            ページ {page} / {maxPage}
          </span>

          {page < maxPage ? (
            <Link
              href={buildHref(page + 1)}
              className="px-4 py-2 rounded-md border bg-white hover:bg-gray-50 text-sm font-bold text-gray-700"
            >
              次の{perPage}件 →
            </Link>
          ) : (
            <span />
          )}
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl mt-6 border border-dashed border-gray-300">
            <p className="text-gray-500 font-bold">該当する物件が見つかりませんでした。</p>
            <p className="text-sm text-gray-400 mt-2">検索条件を変更して再度お試しください。</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 mt-6">
            {properties.map((p) => (
              <PropertyCard key={p.ID} data={p} />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-10">
          {page > 1 ? (
            <Link
              href={buildHref(page - 1)}
              className="px-4 py-2 rounded-md border bg-white hover:bg-gray-50 text-sm font-bold text-gray-700"
            >
              ← 前の{perPage}件
            </Link>
          ) : (
            <span />
          )}

          <span className="text-sm text-gray-500 font-medium">
            ページ {page} / {maxPage}
          </span>

          {page < maxPage ? (
            <Link
              href={buildHref(page + 1)}
              className="px-4 py-2 rounded-md border bg-white hover:bg-gray-50 text-sm font-bold text-gray-700"
            >
              次の{perPage}件 →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </section>
    </div>
  );
}