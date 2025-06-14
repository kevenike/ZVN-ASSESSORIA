import Link from 'next/link';
import { posts } from '@/data/posts';

export const metadata = {
  title: 'Blog - ZVN Assessoria',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
      <ul className="space-y-10">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-6">
            <h2 className="text-2xl font-semibold">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {new Date(post.date).toLocaleDateString('pt-BR')}
            </p>
            <p className="mt-3 text-gray-700">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-700 hover:underline inline-block mt-2"
            >
              Leia mais
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
