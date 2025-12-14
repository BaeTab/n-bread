

export default function LegalFooter() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-12 py-12">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">

                <div className="flex flex-col gap-1 items-center md:items-start">
                    <span className="font-bold text-gray-600">N-BREAD (엔빵)</span>
                    <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
                </div>

                <div className="flex gap-6">
                    <a href="#" className="hover:text-gray-600 transition-colors">이용약관</a>
                    <a href="#" className="hover:text-gray-600 transition-colors">개인정보처리방침</a>
                    <a href="mailto:support@n-bread.com" className="hover:text-gray-600 transition-colors">문의하기</a>
                </div>

                <div className="text-xs text-center md:text-right max-w-xs">
                    본 서비스는 사용자의 기기에서 모든 연산이 이루어지며,
                    어떠한 개인 금융 정보도 별도 서버로 전송하거나 저장하지 않습니다.
                </div>

            </div>
        </footer>
    );
}
