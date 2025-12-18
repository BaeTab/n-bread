
import MemberInput from '../components/InputSection/MemberInput';
import MenuInput from '../components/InputSection/MenuInput';
import ReceiptPaper from '../components/Receipt/ReceiptPaper';
import { useCalculatorStore } from '../store/useCalculatorStore';
import { Settings, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';
import { analytics } from '../firebase';
import { logEvent } from "firebase/analytics";
import clsx from 'clsx';
import SeoContent from '../components/Footer/SeoContent'; // Keep it here for now or move to Home? Let's keep it here for the tool page SEO heavily. Actually good to move to bottom of page.

function ConfigPanel() {
    const {
        roundingUnit, setRoundingUnit,
        roundingMethod, setRoundingMethod,
        theme, setTheme,
        bankName, setBankName,
        accountNumber, setAccountNumber,
        accountHolder, setAccountHolder,
        reset
    } = useCalculatorStore();

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-8 animate-in slide-in-from-bottom-4 duration-300 delay-100">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                <Settings size={20} /> 설정 & 디자인
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Rounding */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">단위 절사</label>
                    <div className="flex flex-wrap gap-2">
                        {[1, 10, 100].map(unit => (
                            <button
                                key={unit}
                                onClick={() => setRoundingUnit(unit as any)}
                                className={clsx(
                                    "px-3 py-1.5 text-xs font-semibold border rounded-lg transition-colors shadow-sm",
                                    roundingUnit === unit ? "bg-gray-800 text-white border-gray-800" : "bg-white text-gray-500 border-gray-200 hover:border-gray-800 hover:text-gray-800"
                                )}
                            >
                                {unit}원 단위
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                        {(['ceil', 'floor'] as const).map(m => (
                            <button
                                key={m}
                                onClick={() => setRoundingMethod(m)}
                                className={clsx(
                                    "flex-1 py-1.5 text-xs border rounded-lg font-medium transition-colors",
                                    roundingMethod === m ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-white border-gray-200 text-gray-400 hover:text-gray-600"
                                )}
                            >
                                {m === 'ceil' ? '올림' : '버림'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Theme */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">영수증 테마</label>
                    <div className="flex flex-col gap-2">
                        {['basic', 'blueprint', 'eco'].map(t => (
                            <button
                                key={t}
                                onClick={() => setTheme(t as any)}
                                className={clsx(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium border transition-all hover:scale-[1.02]",
                                    theme === t ? "ring-2 ring-offset-1 ring-blue-500 border-transparent shadow-md" : "border-gray-200 hover:bg-gray-50"
                                )}
                            >
                                <div
                                    className="w-4 h-4 rounded-full border border-black/10 shadow-inner"
                                    style={{
                                        backgroundColor: t === 'basic' ? '#ffffff' : t === 'blueprint' ? '#003366' : '#f4e4bc',
                                    }}
                                />
                                <span className="capitalize">{t}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bank Account Info */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    입금 계좌 정보
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <input
                        type="text"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="은행명 (예: 카카오뱅크)"
                        className="col-span-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-all"
                    />
                    <input
                        type="text"
                        value={accountHolder}
                        onChange={(e) => setAccountHolder(e.target.value)}
                        placeholder="예금주 (예: 홍길동)"
                        className="col-span-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-all"
                    />
                </div>
                <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="계좌번호 (하이픈 없이 입력 권장)"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-all font-mono"
                />
            </div>

            {/* Reset */}
            <div className="pt-2">
                <button
                    onClick={() => { if (window.confirm("정말 모든 데이터를 초기화하시겠습니까?")) reset(); }}
                    className="w-full flex items-center justify-center gap-2 text-red-500 text-sm hover:bg-red-50 py-2.5 rounded-lg transition-colors opacity-70 hover:opacity-100"
                >
                    <RefreshCw size={14} /> 초기화
                </button>
            </div>
        </div>
    )
}

export default function Calculator() {
    useEffect(() => {
        logEvent(analytics, 'page_view_calculator');
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column: Controls */}
                <div className="w-full lg:w-[480px] xl:w-[520px] flex flex-col gap-6 order-2 lg:order-1">

                    {/* Title Desktop */}
                    <div className="hidden lg:block mb-2">
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">🧾 N-BREAD</h1>
                        <p className="text-gray-500 mt-1">간편한 더치페이 영수증 생성 & 공유</p>
                    </div>

                    {/* 1. Members */}
                    <div className="bg-white p-6 rounded-xl shadow-sm animate-in slide-in-from-bottom-4 duration-300">
                        <MemberInput />
                    </div>

                    {/* 2. Menus */}
                    <div className="bg-white p-6 rounded-xl shadow-sm animate-in slide-in-from-bottom-4 duration-300 delay-75">
                        <MenuInput />
                    </div>

                    {/* 3. Config */}
                    <ConfigPanel />
                </div>

                {/* Right Column: Preview */}
                <div className="flex-1 flex justify-center items-start lg:sticky lg:top-8 order-1 lg:order-2 min-h-[500px] lg:h-screen lg:overflow-y-auto pb-20 no-scrollbar">
                    <div className="scale-[0.85] sm:scale-100 transform-origin-top transition-transform">
                        <ReceiptPaper />
                    </div>
                </div>
            </div>

            <SeoContent />
        </div>
    )
}
