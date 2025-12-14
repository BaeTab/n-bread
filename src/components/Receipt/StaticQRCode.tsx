
import { QRCodeSVG } from 'qrcode.react';

interface Props {
    value: string;
}

export default function StaticQRCode({ value }: Props) {
    if (!value) return null;

    return (
        <div className="flex flex-col items-center gap-2 mt-6">
            <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                <QRCodeSVG value={value} size={90} level="M" />
            </div>
            <p className="text-[10px] text-gray-400 text-center break-all w-full max-w-[180px] font-mono leading-tight">
                {value}
            </p>
        </div>
    );
}
