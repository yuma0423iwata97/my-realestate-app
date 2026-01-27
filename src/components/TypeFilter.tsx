'use client';
import { useRouter, useSearchParams } from 'next/navigation';

const TYPES = ['賃貸', '販売']; // シートの Type 値と合わせる

export default function TypeFilter() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sp = new URLSearchParams(searchParams.toString());
    if (e.target.value) sp.set('type', e.target.value);
    else                sp.delete('type');      // 未選択ならパラメータ削除
    router.replace(`?${sp.toString()}`, { scroll: false });
  };

  const current = searchParams.get('type') ?? '';

  return (
    <label className="block mb-4">
      <span className="mr-2">物件種別</span>
      <select
        value={current}
        onChange={handleChange}
        className="border rounded px-2 py-1"
      >
        <option value="">すべて</option>
        {TYPES.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </label>
  );
}
