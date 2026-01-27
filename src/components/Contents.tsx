import Link from 'next/link';
import { Search, FileText, Map, Info, Mail } from 'lucide-react';


export default function Contents() {
  const navItems = [
    { href: '/properties', label: '物件を探す', icon: Search },
    { href: '/flow', label: 'ご入居までの流れ', icon: FileText },
    { href: '/areas', label: 'エリア解説', icon: Map },
    { href: '/about', label: 'CCHについて', icon: Info }, // SchoolアイコンからInfoアイコンに変更し、ラベルとリンクを更新
    { href: '/contact', label: 'お問い合わせ', icon: Mail },
  ];

  return (
    <nav aria-label="主要コンテンツ" className="w-full">
      <ul className="grid grid-cols-5 divide-x divide-gray-100 border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm">
        {navItems.map((item) => (
          <li key={item.href} className="h-full">
            <Link
              href={item.href}
              className="group flex flex-col sm:flex-row items-center justify-center h-full py-3 px-1 sm:px-4 text-center hover:bg-gray-50 transition-colors duration-200"
            >
              <item.icon
                size={18}
                className="mb-1 sm:mb-0 sm:mr-2 text-gray-400 group-hover:text-red-500 transition-colors"
              />
              <span className="text-xs sm:text-sm font-bold text-gray-600 group-hover:text-gray-900 leading-tight">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}