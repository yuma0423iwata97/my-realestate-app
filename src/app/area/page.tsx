// src/app/area/page.tsx
import Contents from "@/components/Contents";
import BangkokAreaMap from "@/components/BangkokAreaMap";

export default async function Home() {

	return (
	<div>
		{/* メニューバー */}
		<section className="mx-auto max-w-screen-lg py-1">
			<Contents />
		</section>
		
		{/* タイトル */}
		<section className="mx-auto">
			<h1 className="text-center text-[24px] sm:text-4xl font-extrabold tracking-tight py-10">
				<span className="text-red-600">バンコク</span>
				<span className="ml-1">のコンドミニアムを地域から探す</span>
			</h1>
		</section>
		
		{/* フリーワード検索 */}
		<section className="mx-auto max-w-screen-xl px-4">
			<h2 className="mb-6 text-2xl font-extrabold tracking-tight">
				<span className="inline-block border-l-4 border-red-600 pl-3">エリアから探す</span>
			</h2>
		</section>
		<section className="mx-auto max-w-screen-xl px-4 py-2">
			<BangkokAreaMap />
		</section>
		
		
	</div>
	)
}