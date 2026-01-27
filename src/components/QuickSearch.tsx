// src/components/QuickSearch.tsx

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const TYPES     = ['賃貸', '販売'];
const DISTRICTS = ['Bang Kapi',
  'Bang Na',
  'Bang Phlat',
  'Bang Phli District',
  'Bang Rak',
  'Bang Sao Thong District',
  'Bang Sue',
  'Chatuchak',
  'Din Daeng',
  'Huai Khwang',
  'Khlong San',
  'Khlong Toei',
  'Lak Si',
  'Mueang Samut Prakan District',
  'Pathum Wan',
  'Phasi Charoen',
  'Phara Khanong',
  'Prawet',
  'Ratchathewi',
  'Sathon',
  'Suan Luang',
  'Thon Buri',
  'Watthana',
  'Yan Nawa',]; // ← 必要なら動的取得

export default function QuickSearch() {
  const router = useRouter();

  // --- ローカル状態 ---
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [type, setType] = useState('');
  const [district, setDistrict] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sp = new URLSearchParams();
    if (min)      sp.set('min', min);
    if (max)      sp.set('max', max);
    if (type)     sp.set('type', type);
    if (district) sp.set('district', district);
    // /properties へクエリ付きで遷移
    router.push(`/properties?${sp.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {/* 価格下限 */}
      <input
        type="number"
        placeholder="Min ¥"
        value={min}
        onChange={e => setMin(e.target.value)}
        className="border rounded px-3 py-2"
      />

      {/* 価格上限 */}
      <input
        type="number"
        placeholder="Max ¥"
        value={max}
        onChange={e => setMax(e.target.value)}
        className="border rounded px-3 py-2"
      />

      {/* 種別 */}
      <select
        value={type}
        onChange={e => setType(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">Type</option>
        {TYPES.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      {/* エリア */}
      <select
        value={district}
        onChange={e => setDistrict(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">District</option>
        {DISTRICTS.map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      {/* 検索ボタン（モバイルでは全幅にして下に回す） */}
      <button
        type="submit"
        className="col-span-2 md:col-span-4 bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
      >
        検索
      </button>
    </form>
  );
}
