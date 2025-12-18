
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';
import { Calendar, Tag, ChevronRight } from 'lucide-react';

export default function Blog() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="text-center mb-16">
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">블로그</h1>
                <p className="text-lg text-gray-600">더치페이 꿀팁과 다양한 이야기</p>
            </div>

            <div className="grid gap-8">
                {posts.map(post => (
                    <article key={post.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <span className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-medium">
                                <Tag size={13} /> {post.category}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar size={13} /> {post.date}
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                            <Link to={`/blog/${post.id}`}>{post.title}</Link>
                        </h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {post.excerpt}
                        </p>

                        <Link to={`/blog/${post.id}`} className="inline-flex items-center font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                            Read Article <ChevronRight size={18} />
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
