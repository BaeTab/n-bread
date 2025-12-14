[Role Definition] 당신은 UI 인터랙션과 상태 관리(State Management)에 특화된 시니어 프론트엔드 개발자입니다. 서버나 DB 없이, 오직 브라우저 상에서 동작하는 **"N빵 영수증 생성기 (Dutch Pay Receipt Maker)"**를 React로 구축해야 합니다. 이 프로젝트는 Firebase Hosting을 통해 정적 웹사이트로 배포될 예정입니다.

[Project Goal] 복잡한 더치페이 계산(누가 무엇을 먹었는지)을 클라이언트 사이드에서 완벽하게 수행하고, 이를 감성적인 영수증 디자인으로 시각화하여 이미지로 저장해 주는 "유틸리티 웹 앱" 개발.

[Tech Stack]

Core: React (Vite), JavaScript (or TypeScript)

State Management: Zustand (새로고침 시 데이터 유지를 위해 persist 미들웨어 사용 필수)

Styling: Tailwind CSS, clsx

Libraries:

html2canvas: 영수증 영역 캡처

qrcode.react: 계좌번호를 QR코드로 변환 (단순 텍스트 인코딩)

react-confetti: 저장 성공 시 시각적 피드백

lucide-react: UI 아이콘

[Core Functional Requirements (Client-Side Only)]

1. 스마트 정산 로직 (In-Memory Logic)

참여자 관리: 이름 추가/삭제 (예: 김철수, 이영희).

메뉴별 상세 정산 (Itemized Split):

메뉴명 / 가격 입력.

"먹은 사람 선택" 기능: 각 메뉴마다 참여자 중 누구누구가 먹었는지 체크박스로 선택 (Multi-select).

알고리즘: (메뉴 가격 ÷ 선택된 인원수)를 계산하여 각 개인별 청구서에 자동 합산.

최소 화폐 단위 처리: 1원 단위 지저분한 금액을 방지하기 위해 "10원/100원 단위 올림/버림" 옵션 토글 제공.

2. 정적 QR 코드 생성 (No Payment Gateway)

사용자가 자신의 "은행명 + 계좌번호" 텍스트를 입력.

영수증 하단에 해당 텍스트 정보를 담은 QR 코드를 실시간 렌더링 (qrcode.react 사용).

목적: 친구가 카메라로 찍으면 계좌번호를 복사할 수 있게 하기 위함 (결제 연동 아님).

3. 감성적인 영수증 디자인 (CSS Only)

Pure CSS Zigzag Border: 이미지 에셋을 쓰지 말고, CSS radial-gradient 혹은 mask-image 기법을 사용하여 영수증 상하단의 찢어진 종이 질감을 구현.

3가지 테마 (Theme):

Basic: 흰 종이 + 검정 글씨 (영수증의 정석).

BluePrint: 파란색 배경 + 흰색 글씨 (청사진 느낌).

Eco: 재생지(베이지색) 배경 + 초록색 포인트.

4. 이미지 저장 최적화

사용자가 "이미지 저장" 버튼 클릭 시, 렌더링된 영수증 DOM을 캡처.

모바일 환경(iOS/Android)에서도 저장이 원활하도록 <a> 태그 다운로드 트리거 로직 구현.

고해상도 저장을 위해 scale: 3 설정.

[Component Structure]

/src/store/useCalculatorStore.js:

참여자 배열, 메뉴 배열, 정산 결과 상태 관리.

Zustand persist를 사용하여 브라우저를 껐다 켜도 입력하던 내용이 localStorage에 남아있도록 구현.

/src/components/InputSection/:

MemberInput.jsx: 참여자 태그 추가/삭제 UI.

MenuInput.jsx: 메뉴 추가 및 "먹은 사람 선택" 모달/드롭다운 UI.

/src/components/Receipt/:

ReceiptPaper.jsx: 실제 영수증 모양 컴포넌트 (테마 적용, 찢어진 효과).

ReceiptItem.jsx: 영수증 내부 리스트 아이템.

StaticQRCode.jsx: 계좌번호 QR 렌더링.

[Instruction for AI] 서버가 없으므로 모든 계산은 즉시 반응해야 합니다(Reactive). 특히 **"메뉴별로 먹은 사람이 다를 때의 N빵 계산 로직"**이 정확하게 작동하도록 useCalculatorStore의 코드를 꼼꼼하게 작성해 주세요. 디자인은 Tailwind CSS를 활용해 "요즘 유행하는 영수증 사진기" 느낌이 나도록 스타일링 코드를 작성해 주세요.