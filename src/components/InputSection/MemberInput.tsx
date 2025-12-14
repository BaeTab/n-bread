import React, { useState } from 'react';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { X, Plus, Users } from 'lucide-react';

export default function MemberInput() {
    const { members, addMember, removeMember } = useCalculatorStore();
    const [newName, setNewName] = useState('');

    const handleAdd = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (newName.trim()) {
            addMember(newName.trim());
            setNewName('');
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                <Users size={20} /> 참여자 관리
            </h2>
            <form onSubmit={handleAdd} className="flex gap-2">
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="이름 입력 (예: 김철수)"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <button
                    type="submit"
                    disabled={!newName.trim()}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
                >
                    <Plus size={16} /> <span className="ml-1 hidden sm:inline">추가</span>
                </button>
            </form>

            <div className="flex flex-wrap gap-2">
                {members.map((m) => (
                    <div key={m.id} className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full flex items-center gap-2 text-sm border border-gray-200 shadow-sm animate-in fade-in zoom-in duration-200">
                        <span className="font-medium">{m.name}</span>
                        <button
                            onClick={() => removeMember(m.id)}
                            className="text-gray-400 hover:text-red-500 p-0.5 rounded-full hover:bg-red-50 transition-colors"
                            aria-label={`Remove ${m.name}`}
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
                {members.length === 0 && (
                    <p className="text-gray-400 text-sm italic py-2">참여자를 추가해주세요.</p>
                )}
            </div>
        </div>
    );
}
