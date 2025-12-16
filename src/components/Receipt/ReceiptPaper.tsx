import { useRef, useState, useMemo } from 'react';
import { useCalculatorStore } from '../../store/useCalculatorStore';

import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import Confetti from 'react-confetti';
import clsx from 'clsx';
import { analytics } from '../../firebase';
import { logEvent } from "firebase/analytics";

export default function ReceiptPaper() {
    const { menuItems, members, roundingUnit, roundingMethod, bankName, accountNumber, accountHolder, theme, isAdUnlocked, unlockAd } = useCalculatorStore();
    const receiptRef = useRef<HTMLDivElement>(null);
    const [showConfetti, setShowConfetti] = useState(false);

    // Calculate Logic
    const calculateData = useMemo(() => {
        const memberTotals: Record<string, { total: number; details: { name: string; amount: number; share: string }[] }> = {};

        // Initialize
        members.forEach(m => {
            memberTotals[m.id] = { total: 0, details: [] };
        });

        let grandTotal = 0;

        menuItems.forEach(item => {
            grandTotal += item.price;
            const count = item.sharedBy.length;
            if (count === 0) return;

            const pricePerPerson = item.price / count;

            item.sharedBy.forEach(mid => {
                if (memberTotals[mid]) {
                    memberTotals[mid].total += pricePerPerson;
                    memberTotals[mid].details.push({
                        name: item.name,
                        amount: pricePerPerson,
                        share: `1/${count}`
                    });
                }
            });
        });

        // Apply rounding
        Object.keys(memberTotals).forEach(mid => {
            const raw = memberTotals[mid].total;
            let rounded = raw;
            if (roundingMethod === 'ceil') {
                rounded = Math.ceil(raw / roundingUnit) * roundingUnit;
            } else {
                // floor
                rounded = Math.floor(raw / roundingUnit) * roundingUnit;
            }
            memberTotals[mid].total = rounded;
        });

        return { memberTotals, grandTotal };
    }, [menuItems, members, roundingUnit, roundingMethod]);

    const { memberTotals, grandTotal } = calculateData;

    const handleDownload = async () => {
        if (!receiptRef.current) return;
        try {
            // Wait for images/fonts if needed, but here mostly text
            const canvas = await html2canvas(receiptRef.current, {
                scale: 3, // High Res
                useCORS: true,
                backgroundColor: null // transparent background for canvas itself, but receipt has bg
            });

            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `receipt-${new Date().toISOString().slice(0, 10)}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setShowConfetti(true);

            // Log Download Event
            logEvent(analytics, 'receipt_download', {
                total_amount: grandTotal,
                member_count: members.length,
                item_count: menuItems.length,
                theme: theme
            });

            setTimeout(() => setShowConfetti(false), 5000);
        } catch (err) {
            console.error("Save failed", err);
            alert("이미지 저장에 실패했습니다.");
        }
    };

    const themeClasses: Record<string, string> = {
        basic: "bg-white text-gray-900",
        blueprint: "bg-[#003366] text-white",
        eco: "bg-[#e8dec0] text-[#2c3e2c]"
    };

    const borderColor = theme === 'blueprint' ? 'border-white/30' : 'border-black/10';
    const dashedBorder = theme === 'blueprint' ? 'border-dashed border-white/40' : 'border-dashed border-gray-400';

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-md relative">
            {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}

            {/* Ad Lock Overlay */}
            {!isAdUnlocked && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md bg-white/30 rounded-xl border border-white/50 shadow-lg">
                    <div className="bg-white/90 p-8 rounded-2xl shadow-xl border border-gray-100 max-w-sm w-full space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-2 text-white shadow-lg animate-pulse">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">결과 잠금 해제</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            아래 링크를 클릭해서 광고를 확인해주시면<br />
                            <span className="font-semibold text-indigo-600">상세 영수증 결과</span>가 보입니다!
                        </p>
                        <a
                            href="https://deg.kr/799c1ba"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                                // Unlock after short delay to ensure click is registered
                                setTimeout(() => unlockAd(), 500);
                            }}
                            className="block w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all transform hover:scale-[1.02] shadow-md hover:shadow-lg text-sm"
                        >
                            광고 보고 결과 확인하기 &rarr;
                        </a>
                        <p className="text-xs text-gray-400 mt-2">
                            * 한 번만 클릭하면 계속 이용 가능합니다.
                        </p>
                    </div>
                </div>
            )}

            <button
                onClick={handleDownload}
                disabled={!isAdUnlocked}
                className={clsx(
                    "group flex items-center gap-2 px-8 py-3 rounded-full shadow-xl transition-all font-bold z-10",
                    isAdUnlocked
                        ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:shadow-2xl hover:scale-105 cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                )}
            >
                <Download size={20} className={clsx(isAdUnlocked && "group-hover:animate-bounce")} />
                영수증 저장하기
            </button>

            {/* Receipt Container */}
            {/* Use padding for drop shadow wrapper */}
            {/* If locked, blur the receipt a bit */}
            <div className={clsx("p-4 rounded-xl relative transition-all duration-500", !isAdUnlocked && "blur-[8px] opacity-60 select-none grayscale-[0.5]")}>
                {/* The main receipt */}
                <div
                    ref={receiptRef}
                    className={clsx(
                        "w-[340px] px-8 py-10 relative font-mono shadow-2xl skew-1 transition-colors duration-300",
                        themeClasses[theme]
                    )}
                    style={{
                        filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))',
                    }}
                >
                    {/* Zigzag Top Decoration (Absolute) */}
                    <div
                        className="absolute top-0 left-0 w-full h-4"
                        style={{
                            backgroundImage: `linear-gradient(-45deg, transparent 8px, ${theme === 'blueprint' ? '#003366' : theme === 'eco' ? '#e8dec0' : '#ffffff'} 8px), linear-gradient(45deg, transparent 8px, ${theme === 'blueprint' ? '#003366' : theme === 'eco' ? '#e8dec0' : '#ffffff'} 8px)`,
                            backgroundSize: '16px 16px',
                            backgroundRepeat: 'repeat-x',
                            transform: 'translateY(-8px) rotate(180deg)'
                        }}
                    />

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black uppercase tracking-widest border-b-4 border-current pb-2 inline-block mb-2">Receipt</h1>
                        <div className="text-xs uppercase tracking-widest opacity-60">Dutch Pay Receipt</div>
                        <div className="text-xs mt-1 opacity-70">{new Date().toLocaleString('ko-KR')}</div>
                    </div>

                    {/* Items List */}
                    <div className={clsx("space-y-3 text-sm pb-6 mb-6", dashedBorder, "border-b-2")}>
                        <div className="flex justify-between text-[10px] opacity-50 uppercase tracking-wider mb-2">
                            <span>Item</span>
                            <span>Price</span>
                        </div>
                        {menuItems.map(item => (
                            <div key={item.id} className="flex justify-between items-start leading-snug">
                                <span className="font-medium mr-2 max-w-[200px] break-words">{item.name}</span>
                                <span className="opacity-90">{item.price.toLocaleString()}</span>
                            </div>
                        ))}
                        {menuItems.length === 0 && <div className="text-center opacity-30 italic py-2">-- No Items --</div>}

                        <div className={clsx("flex justify-between font-bold text-lg pt-4 mt-2 border-t", borderColor)}>
                            <span>TOTAL</span>
                            <span>{grandTotal.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Members Split */}
                    <div className="space-y-6">
                        {members.map(m => {
                            const data = memberTotals[m.id];
                            if (!data || data.total <= 0) return null; // Hide if 0

                            return (
                                <div key={m.id} className="text-sm">
                                    <div className="flex justify-between items-end font-bold mb-2 bg-black/5 p-1 rounded">
                                        <span className="pl-1">{m.name}</span>
                                        <span className="text-lg leading-none pr-1">{data.total.toLocaleString()}</span>
                                    </div>
                                    <div className="opacity-70 text-[11px] pl-3 border-l-2 border-current ml-1 space-y-1">
                                        {data.details.map((d, idx) => (
                                            <div key={idx} className="flex justify-between">
                                                <span>{d.name} <span className="opacity-50 text-[10px]">({d.share})</span></span>
                                                <span>{Math.round(d.amount).toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* QR & Footer */}
                    {/* Account Info */}
                    {(accountNumber || members.length > 0) && (
                        <div className={clsx("flex flex-col items-center justify-center mt-10 pt-8", dashedBorder, "border-t-2")}>
                            {accountNumber ? (
                                <div className="text-center w-full">
                                    <div className="uppercase text-[10px] tracking-widest mb-3 opacity-60">Bank Account</div>
                                    <div className="bg-white/10 p-4 rounded-lg border border-current/20 w-FULL">
                                        <div className="text-lg font-bold mb-1 opacity-90">{bankName}</div>
                                        <div className="text-xl font-mono font-black mb-2 tracking-wider break-all leading-none">{accountNumber}</div>
                                        <div className="text-sm opacity-80 mt-1 flex justify-center items-center gap-1">
                                            <span className="text-[10px] opacity-60 uppercase tracking-widest">Holder</span>
                                            <span className="font-bold border-b border-current">{accountHolder}</span>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-[10px] opacity-40">Please send your share to this account</div>
                                </div>
                            ) : (
                                <div className="text-[10px] opacity-40">No Account Info</div>
                            )}
                        </div>
                    )}

                    <div className="mt-8 text-center text-[10px] opacity-40 uppercase tracking-[0.2em] font-sans">
                        Generated by<br />N-Bread Receipt
                    </div>

                    {/* Zigzag Bottom Decoration (Absolute) */}
                    <div
                        className="absolute bottom-0 left-0 w-full h-4"
                        style={{
                            backgroundImage: `linear-gradient(-45deg, transparent 8px, ${theme === 'blueprint' ? '#003366' : theme === 'eco' ? '#e8dec0' : '#ffffff'} 8px), linear-gradient(45deg, transparent 8px, ${theme === 'blueprint' ? '#003366' : theme === 'eco' ? '#e8dec0' : '#ffffff'} 8px)`,
                            backgroundSize: '16px 16px',
                            backgroundRepeat: 'repeat-x',
                            transform: 'translateY(8px)'
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
