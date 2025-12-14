import { useRef, useState, useMemo } from 'react';
import { useCalculatorStore } from '../../store/useCalculatorStore';

import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import Confetti from 'react-confetti';
import clsx from 'clsx';
import { analytics } from '../../firebase';
import { logEvent } from "firebase/analytics";

export default function ReceiptPaper() {
    const { menuItems, members, roundingUnit, roundingMethod, bankName, accountNumber, accountHolder, theme } = useCalculatorStore();
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
        <div className="flex flex-col items-center gap-6 w-full max-w-md">
            {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}

            <button
                onClick={handleDownload}
                className="group flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all font-bold z-10"
            >
                <Download size={20} className="group-hover:animate-bounce" />
                영수증 저장하기
            </button>

            {/* Receipt Container */}
            {/* Use padding for drop shadow wrapper */}
            <div className="p-4 rounded-xl relative">
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
