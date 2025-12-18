
import { Link } from 'react-router-dom';
import { Calculator, BookOpen, FileText, ChevronRight } from 'lucide-react';
import SeoContent from '../components/Footer/SeoContent';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Hero Section */}
            <section className="bg-white border-b border-gray-100 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                        더치페이 정산,<br className="md:hidden" />
                        <span className="text-indigo-600">N-BREAD</span>로 깔끔하게
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        복잡한 모임 정산, 이제 영수증 하나로 해결하세요.<br />
                        친구들과의 여행, 회식, 파티 정산을 가장 스마트하게 하는 방법.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link
                            to="/calculator"
                            className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-lg shadow-gray-200"
                        >
                            <Calculator size={20} />
                            정산 시작하기
                        </Link>
                        <Link
                            to="/guide"
                            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                        >
                            <BookOpen size={20} />
                            사용 가이드
                        </Link>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-16 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                            <Calculator size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">자동 1/N 계산</h3>
                        <p className="text-gray-500 leading-relaxed">
                            메뉴별로 먹은 사람만 쏙쏙 골라 체크하면 복잡한 수식 없이 자동으로 개인별 금액을 계산해드립니다.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
                            <FileText size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">감성 영수증 이미지</h3>
                        <p className="text-gray-500 leading-relaxed">
                            딱딱한 엑셀 캡쳐 대신, 인스타그램 감성의 깔끔한 영수증 이미지로 정산 내역을 공유해보세요.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                            <BookOpen size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">클라이언트 보안</h3>
                        <p className="text-gray-500 leading-relaxed">
                            서버에 그 어떤 개인정보도 저장하지 않습니다. 오직 당신의 브라우저에서만 동작하여 안전합니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* Blog Preview Area */}
            <section className="py-16 px-6 bg-white border-y border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">최신 블로그 글</h2>
                        <Link to="/blog" className="text-indigo-600 font-semibold flex items-center hover:underline">
                            전체보기 <ChevronRight size={16} />
                        </Link>
                    </div>
                    <div className="grid gap-6">
                        {/* This will be populated dynamically later, for now just a link */}
                        <Link to="/blog" className="block p-6 rounded-xl border border-gray-100 hover:border-indigo-200 transition-colors">
                            <span className="text-sm text-indigo-600 font-medium mb-2 block">Tip</span>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">센스있는 총무가 되는 3가지 방법</h3>
                            <p className="text-gray-500">모임 정산시 발생할 수 있는 곤란한 상황들을 현명하게 대처하는 노하우를 공개합니다.</p>
                        </Link>
                        <Link to="/blog" className="block p-6 rounded-xl border border-gray-100 hover:border-indigo-200 transition-colors">
                            <span className="text-sm text-indigo-600 font-medium mb-2 block">Guide</span>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">카카오페이 송금 vs 계좌이체</h3>
                            <p className="text-gray-500">더치페이할 때 수수료 아끼는 방법과 상황별 최적의 송금 방식을 알아봅니다.</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* SEO Content (Bottom) */}
            <SeoContent />
        </div>
    );
}
