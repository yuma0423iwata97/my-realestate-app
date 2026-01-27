"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type Props = {
	page: number;            // 現在ページ
	perPage?: number;        // 1ページ毎件数
	totalPages?: number;     // 総ページ数
	hasPrev?: boolean;       // 
	hasNext?: boolean;       // 
	labelPrev?: string;      // ★ 追加
	labelNext?: string;      // ★ 追加
};

export default function ChangeButton({
	page,
	perPage = 20,
	totalPages,
	hasPrev,
	hasNext,
	labelPrev = "← 前の20件",
	labelNext = "次の20件 →",
}: Props) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// クエリを維持しつつ page を更新
	const buildHref = (nextPage: number) => {
		const q = new URLSearchParams(searchParams.toString());
		q.set("page", String(nextPage));
		q.set("perPage", String(perPage)); // perPage を固定
		return `${pathname}?${q.toString()}`;
	};

	// 前/次の可否（未指定なら推測）
	const _hasPrev = useMemo(() => {
		if (typeof hasPrev === "boolean") return hasPrev;
		return page > 1;
		}, [hasPrev, page]);

		const _hasNext = useMemo(() => {
			if (typeof hasNext === "boolean") return hasNext;
			if (typeof totalPages === "number") return page < totalPages;
			return true; // 総ページ数が不明なら一旦 true（押して空表示なら戻る等で判断）
		}, [hasNext, totalPages, page]);

		// 件数表示のための値
		const startIdx = (page - 1) * perPage + 1;
		// 厳密な total は Props に無いので、totalPages があれば概算表示
		const totalApprox = typeof totalPages === "number" ? totalPages * perPage : undefined;
		const endIdx = Math.min(page * perPage, totalApprox ?? page * perPage);

		// 番号ナビ（先頭/末尾は常に表示、間は ... で省略）
		const sibling = 1;
		const pagesForNav = useMemo<(number | "...")[]>(() => {
			if (typeof totalPages !== "number" || totalPages <= 1) return [page];
			const arr: (number | "...")[] = [];
			const start = Math.max(2, page - sibling);
			const end = Math.min(totalPages - 1, page + sibling);
			arr.push(1);
			if (start > 2) arr.push("...");
			for (let p = start; p <= end; p++) arr.push(p);
			if (end < totalPages - 1) arr.push("...");
			arr.push(totalPages);
			return arr;
		}, [page, totalPages]);

		return (
		<div className="mt-6 space-y-3">
			{/* 上段：合計＆表示範囲 */}
			<div className="flex flex-wrap items-center gap-3">
				{/* 合計バッジ（totalPages があるときのみ表示） */}
				{typeof totalApprox === "number" && (
					<span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
						<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" aria-hidden="true">
							<path d="M4 6h16M4 12h16M4 18h16" strokeWidth="1.6" strokeLinecap="round"/>
						</svg>
						合計 <strong className="mx-1">{totalApprox.toLocaleString()}</strong> 件
					</span>
				)}

				{/* 表示範囲（常に表示） */}
				<span className="text-sm text-gray-600">
					{startIdx.toLocaleString()}–{endIdx.toLocaleString()} 件を表示中
				</span>
			</div>

			{/* 中段：ページ番号ナビ */}
			{typeof totalPages === "number" && totalPages > 1 && (
				<nav className="flex flex-wrap items-center gap-2" aria-label="ページナビゲーション">
					{/* 先頭 / 前へ */}
					<Link
					href={buildHref(1)}
					className={`px-3 py-1.5 rounded-md border ${page === 1 ? "pointer-events-none opacity-40" : "hover:bg-gray-50"}`}
					aria-disabled={page === 1}
					>
						« 最初
					</Link>
					<Link
					href={buildHref(Math.max(1, page - 1))}
					className={`px-3 py-1.5 rounded-md border ${page === 1 ? "pointer-events-none opacity-40" : "hover:bg-gray-50"}`}
					aria-disabled={page === 1}
					>
						← 前
					</Link>

					{/* 番号 */}
					{pagesForNav.map((p, i) =>
						p === "..." ? (
						<span key={`e-${i}`} className="px-2 text-gray-400 select-none">…</span>
						) : (
						<Link
						key={p}
						href={buildHref(p)}
						aria-current={p === page ? "page" : undefined}
						className={`px-3 py-1.5 rounded-md border min-w-10 text-center ${
							p === page ? "bg-gray-900 text-white border-gray-900" : "hover:bg-gray-50"
						}`}
						>
							{p}
						</Link>
						)
					)}

					{/* 次へ / 最後 */}
					<Link
					href={buildHref(Math.min(totalPages, page + 1))}
					className={`px-3 py-1.5 rounded-md border ${page === totalPages ? "pointer-events-none opacity-40" : "hover:bg-gray-50"}`}
					aria-disabled={page === totalPages}
					>
						次 →
					</Link>
					<Link
					href={buildHref(totalPages)}
					className={`px-3 py-1.5 rounded-md border ${page === totalPages ? "pointer-events-none opacity-40" : "hover:bg-gray-50"}`}
					aria-disabled={page === totalPages}
					>
						最後 »
					</Link>
				</nav>
			 )}

			{/* 下段：前/次（テキストボタン） */}
			<div className="flex items-center justify-between">
				{_hasPrev ? (
					<Link
					href={buildHref(page - 1)}
					className="px-3 py-2 rounded-md border hover:bg-gray-50"
					aria-label="前のページへ"
					>
						{labelPrev.replace(/\d+件/, `${perPage}件`)}
					</Link>
				) : <span />}

				{typeof totalPages === "number" ? (
					<span className="text-sm text-gray-500">ページ {page} / {totalPages}</span>
					) : (
					<span className="text-sm text-gray-500">ページ {page}</span>
				)}

				{_hasNext ? (
					<Link
					href={buildHref(page + 1)}
					className="px-3 py-2 rounded-md border hover:bg-gray-50"
					aria-label="次のページへ"
					>
						{labelNext.replace(/\d+件/, `${perPage}件`)}
					</Link>
				) : <span />}
			</div>
		</div>
		);
	}