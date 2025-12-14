

export default function SeoContent() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-6 text-gray-600 space-y-12 border-t border-gray-200 mt-12 bg-gray-50/50 rounded-xl">

            {/* Service Introduction */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">N-BREAD: 가장 쉬운 더치페이 영수증 계산기</h2>
                <p className="leading-relaxed">
                    N-BREAD(엔빵)는 복잡한 모임 정산을 간편하고 센스있게 해결해주는 무료 온라인 도구입니다.
                    친구들과의 여행, 회식, 파티 후에 "누가 얼마를 내야 하지?" 고민하지 마세요.
                    이름과 메뉴만 입력하면 자동으로 개인별 분담금을 계산하고,
                    SNS 공유에 최적화된 <strong>'감성 영수증 이미지'</strong>를 생성해 줍니다.
                </p>
            </section>

            {/* How to Use */}
            <section className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800">사용 방법 가이드</h3>
                <ul className="list-disc list-inside space-y-2 ml-2">
                    <li><strong>참여자 입력:</strong> 정산에 참여할 사람들의 이름을 추가하세요.</li>
                    <li><strong>메뉴 추가:</strong> 영수증에 들어갈 항목명과 가격을 입력합니다.</li>
                    <li><strong>먹은 사람 선택:</strong> 해당 메뉴를 함께 먹은 사람들을 체크하면 자동으로 1/N 계산됩니다.</li>
                    <li><strong>옵션 설정:</strong> 10원 단위 절사, 올림/버림 등을 설정하여 깔끔한 금액을 만드세요.</li>
                    <li><strong>QR 코드:</strong> 내 계좌번호를 입력하면 입금용 QR코드가 자동으로 생성됩니다.</li>
                    <li><strong>이미지 저장:</strong> '영수증 저장하기' 버튼을 눌러 갤러리에 저장하고 카카오톡으로 공유하세요.</li>
                </ul>
            </section>

            {/* Tips */}
            <section className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800">센스 있는 총무의 더치페이 꿀팁</h3>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
                    <div>
                        <h4 className="font-semibold text-indigo-600 mb-1">1. 1원 단위는 과감하게 절사!</h4>
                        <p className="text-sm">
                            33,333원 처럼 떨어지면 입금하는 사람도 번거롭습니다. 설정 패널에서 '10원 단위' 혹은 '100원 단위' 올림을 선택해 보세요.
                            남는 차액은 모임 회비로 적립하거나 다음 만남의 간식비로 쓰면 모두가 행복해집니다.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-indigo-600 mb-1">2. QR코드로 계좌번호 묻지 않게 하기</h4>
                        <p className="text-sm">
                            "계좌번호 좀 다시 보내줘" 라는 말을 듣지 않으려면, 영수증 하단에 계좌번호와 함께 QR코드를 박아서 공유하세요.
                            카메라만 켜면 바로 복사가 가능해 입금 속도가 2배 빨라집니다.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-indigo-600 mb-1">3. 투명한 정산 내역 공유</h4>
                        <p className="text-sm">
                            단순히 "인당 3만원 보내줘" 보다는, 누가 어떤 메뉴를 먹어서 이 금액이 나왔는지 상세 내역이 담긴
                            N-BREAD 영수증을 공유하면 신뢰도가 올라갑니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800">자주 묻는 질문 (FAQ)</h3>
                <div className="space-y-4">
                    <details className="group p-4 bg-white rounded-lg border border-gray-200 cursor-pointer">
                        <summary className="font-medium flex justify-between items-center list-none">
                            <span>Q. 제 계좌번호 정보가 서버에 저장되나요?</span>
                            <span className="transition group-open:rotate-180">⌄</span>
                        </summary>
                        <p className="text-sm mt-3 pt-3 border-t text-gray-500">
                            아니요. N-BREAD는 <strong>서버가 없는 클라이언트 기반 서비스</strong>입니다.
                            입력하신 이름, 금액, 계좌번호 등 모든 정보는 오직 사용자의 브라우저 내부에만 임시 저장되며,
                            새로고침 시 편의를 위해 사용자의 로컬 스토리지(LocalStorage)에만 남습니다.
                            개발자는 귀하의 데이터를 절대 볼 수 없습니다.
                        </p>
                    </details>
                    <details className="group p-4 bg-white rounded-lg border border-gray-200 cursor-pointer">
                        <summary className="font-medium flex justify-between items-center list-none">
                            <span>Q. 앱을 설치해야 하나요?</span>
                            <span className="transition group-open:rotate-180">⌄</span>
                        </summary>
                        <p className="text-sm mt-3 pt-3 border-t text-gray-500">
                            아니요. 별도의 앱 설치나 회원가입 없이 웹 브라우저(Chrome, Safari 등)에서 바로 사용할 수 있습니다.
                            자주 사용하신다면 '홈 화면에 추가' 기능을 통해 앱처럼 쓰실 수 있습니다.
                        </p>
                    </details>
                    <details className="group p-4 bg-white rounded-lg border border-gray-200 cursor-pointer">
                        <summary className="font-medium flex justify-between items-center list-none">
                            <span>Q. 모바일에서도 영수증 저장이 되나요?</span>
                            <span className="transition group-open:rotate-180">⌄</span>
                        </summary>
                        <p className="text-sm mt-3 pt-3 border-t text-gray-500">
                            네, 가능합니다. 아이폰(iOS)과 안드로이드 모두 지원합니다.
                            혹시 저장이 안 된다면 내장 브라우저 대신 크롬이나 사파리 앱으로 접속해 보세요.
                        </p>
                    </details>
                </div>
            </section>

        </div>
    );
}
