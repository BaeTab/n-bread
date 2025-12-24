import { CheckCircle, Smartphone, Share2, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Guide() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <SEO
                title="N-BREAD 사용 가이드 - 30초면 마스터하는 더치페이"
                description="복잡한 모임 정산, N-BREAD로 쉽고 빠르게 해결하는 방법을 알려드립니다. 참여자 등록부터 영수증 공유까지 단계별 가이드."
                keywords="더치페이 방법, 정산 가이드, N-BREAD 사용법, 모임 정산 꿀팁"
                url="/guide"
            />
            <div className="text-center mb-16">
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">📖 N-BREAD 사용 가이드</h1>
                <p className="text-lg text-gray-600">누구나 30초면 마스터하는 가장 쉬운 더치페이 정산법</p>
            </div>

            <div className="space-y-16">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <CheckCircle className="text-indigo-500" size={24} />
                            참여자 등록하기
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            먼저 정산에 참여할 사람들의 이름을 입력합니다. <br />
                            '멤버 추가' 버튼을 누르거나, 스페이스바를 눌러 빠르게 멤버를 추가할 수 있습니다.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
                            💡 <strong>Tip:</strong> 자주 만나는 모임 멤버들이라면 브라우저에 자동 저장되어 다음 번엔 입력할 필요가 없습니다.
                        </div>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <DollarSign className="text-indigo-500" size={24} />
                            메뉴 및 가격 입력
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            영수증을 보고 메뉴 이름과 가격을 입력하세요. <br />
                            그리고 해당 메뉴를 <strong>함께 먹은 사람</strong>을 체크박스로 선택합니다.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
                            💡 <strong>N분의 1:</strong> 체크된 사람 수만큼 가격이 자동으로 나누어집니다. 술을 안 마신 사람은 술 메뉴에서 체크를 해제하면 됩니다. 공평하죠?
                        </div>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Smartphone className="text-indigo-500" size={24} />
                            계좌 정보 및 QR 설정
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            설정 패널에서 돈을 받을 <strong>은행과 계좌번호</strong>를 입력하세요. <br />
                            입력과 동시에 영수증 하단에 입금용 <strong>QR코드</strong>가 생성됩니다.
                        </p>
                    </div>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">4</div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Share2 className="text-indigo-500" size={24} />
                            이미지 저장 & 공유
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            모든 입력이 끝났다면 우측(모바일은 하단) 미리보기 화면의 <strong>'영수증 저장하기'</strong> 버튼을 누르세요. <br />
                            갤러리에 저장된 이미지를 카카오톡 단톡방에 공유하면 끝!
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-20 p-8 bg-indigo-50 rounded-2xl text-center">
                <h3 className="text-xl font-bold text-indigo-900 mb-4">지금 바로 정산해보세요!</h3>
                <Link to="/calculator" className="inline-block px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition">
                    계산기 바로가기
                </Link>
            </div>
        </div>
    );
}
