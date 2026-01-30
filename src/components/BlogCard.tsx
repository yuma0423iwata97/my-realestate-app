import Link from 'next/link';
import Image from 'next/image';
import { Clock, Tag, ChevronRight } from 'lucide-react';

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string; // 抜粋文
  category: string;
  date: string;
  thumbnail: string;
};

type Props = {
  post: BlogPost;
};

export default function BlogCard({ post }: Props) {
  return (
    <Link href={`/blog/${post.id}`} className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
      {/* サムネイル画像 */}
      <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
          {post.category}
        </div>
      </div>

      {/* 記事内容 */}
      <div className="flex-1 p-5 flex flex-col">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <Clock size={14} />
          <time>{post.date}</time>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center text-red-600 text-sm font-bold mt-auto group-hover:underline decoration-red-200 underline-offset-4">
          続きを読む <ChevronRight size={16} />
        </div>
      </div>
    </Link>
  );
}