import { posts } from '@/data/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function PostPage({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-6">
        {new Date(post.date).toLocaleDateString('pt-BR')}
      </p>
      <p className="whitespace-pre-line text-gray-800">{post.content}</p>
      <Link href="/blog" className="text-blue-700 hover:underline block mt-8">
        Voltar ao blog
      </Link>
    </div>
  );
}
