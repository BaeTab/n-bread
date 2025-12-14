import React, { useState } from 'react';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { Trash2, Plus, Utensils, Check } from 'lucide-react';
import clsx from 'clsx';

export default function MenuInput() {
    const { menuItems, members, addMenuItem, removeMenuItem, updateMenuItem } = useCalculatorStore();
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!itemName.trim() || !itemPrice) return;

        addMenuItem({
            name: itemName,
            price: Number(itemPrice),
            sharedBy: members.map(m => m.id) // Default to all members
        });
        setItemName('');
        setItemPrice('');
    };

    const toggleMemberShare = (itemId: string, memberId: string, currentShared: string[]) => {
        if (currentShared.includes(memberId)) {
            updateMenuItem(itemId, { sharedBy: currentShared.filter(id => id !== memberId) });
        } else {
            updateMenuItem(itemId, { sharedBy: [...currentShared, memberId] });
        }
    };

    const selectAll = (itemId: string) => {
        updateMenuItem(itemId, { sharedBy: members.map(m => m.id) });
    };

    const deselectAll = (itemId: string) => {
        updateMenuItem(itemId, { sharedBy: [] });
    }

    return (
        <div className="space-y-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                <Utensils size={20} /> 메뉴 및 정산
            </h2>

            {/* Add New Item Form */}
            <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-2 items-end">
                <div className="flex-1 w-full">
                    <label className="text-xs text-gray-500 mb-1 block">메뉴명</label>
                    <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-300"
                        placeholder="예: 엽기떡볶이"
                        value={itemName}
                        onChange={e => setItemName(e.target.value)}
                    />
                </div>
                <div className="w-full sm:w-32">
                    <label className="text-xs text-gray-500 mb-1 block">가격 (원)</label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-300"
                        placeholder="0"
                        value={itemPrice}
                        onChange={e => setItemPrice(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    disabled={!itemName.trim() || !itemPrice}
                    className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed h-[38px] flex items-center justify-center transition-colors"
                >
                    <Plus size={16} /> <span className="ml-1 sm:hidden md:inline">추가</span>
                </button>
            </form>

            {/* List */}
            <div className="space-y-4">
                {menuItems.map(item => (
                    <div key={item.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-white animate-in slide-in-from-top-2 duration-200">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <div className="font-semibold text-gray-900">{item.name}</div>
                                <div className="text-indigo-600 font-bold">{Number(item.price).toLocaleString()}원</div>
                                {item.sharedBy.length === 0 && (
                                    <div className="text-xs text-red-500 mt-1">⚠️ 먹은 사람을 선택해주세요</div>
                                )}
                            </div>
                            <button onClick={() => removeMenuItem(item.id)} className="text-gray-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>

                        {/* Shared By Selectors */}
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-500 mb-2 flex justify-between items-center">
                                <span className="font-medium">함께 먹은 사람 ({item.sharedBy.length}명)</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => selectAll(item.id)}
                                        className="text-xs text-indigo-500 hover:text-indigo-700 hover:underline"
                                    >
                                        전체선택
                                    </button>
                                    <span className="text-gray-300">|</span>
                                    <button
                                        onClick={() => deselectAll(item.id)}
                                        className="text-xs text-gray-400 hover:text-gray-600 hover:underline"
                                    >
                                        해제
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {members.map(member => {
                                    const isSelected = item.sharedBy.includes(member.id);
                                    return (
                                        <button
                                            key={member.id}
                                            onClick={() => toggleMemberShare(item.id, member.id, item.sharedBy)}
                                            className={clsx(
                                                "px-2 py-1 rounded-md text-xs border transition-all flex items-center gap-1",
                                                isSelected
                                                    ? "bg-indigo-100 border-indigo-200 text-indigo-700 font-medium shadow-sm"
                                                    : "bg-white border-gray-200 text-gray-400 hover:border-gray-300 opacity-70 hover:opacity-100"
                                            )}
                                        >
                                            {member.name}
                                            {isSelected && <Check size={10} />}
                                        </button>
                                    )
                                })}
                                {members.length === 0 && <span className="text-xs text-gray-400">참여자가 없습니다.</span>}
                            </div>
                        </div>
                    </div>
                ))}
                {menuItems.length === 0 && (
                    <div className="text-center text-gray-400 py-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                        메뉴를 추가하면 이곳에 표시됩니다.
                    </div>
                )}
            </div>
        </div>
    );
}
