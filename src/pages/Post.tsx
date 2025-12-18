
import { useParams, Link, Navigate } from 'react-router-dom';
import { posts } from '../data/posts';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import SeoContent from '../components/Footer/SeoContent';

export default function Post() {
    const { id } = useParams();
    const post = posts.find(p => p.id === id);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            <div className="max-w-3xl mx-auto pt-12 px-6">
                <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 font-medium">
                    <ArrowLeft size={18} className="mr-2" /> 목록으로 돌아가기
                </Link>

                <article className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
                    <header className="mb-10 border-b border-gray-100 pb-8">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <span className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-medium">
                                <Tag size={13} /> {post.category}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar size={13} /> {post.date}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                            {post.title}
                        </h1>
                    </header>

                    <div
                        className="prose prose-indigo prose-lg max-w-none text-gray-700 headings:font-bold headings:text-gray-900"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>

                <div className="mt-12">
                    <SeoContent />
                </div>
            </div>
        </div>
    );
}
