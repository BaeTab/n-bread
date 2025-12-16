import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Member {
    id: string;
    name: string;
}

export interface MenuItem {
    id: string;
    name: string;
    price: number;
    sharedBy: string[]; // member IDs
}

export type RoundingUnit = 1 | 10 | 100;
export type RoundingMethod = 'ceil' | 'floor';

export type Theme = 'basic' | 'blueprint' | 'eco';

interface CalculatorState {
    members: Member[];
    menuItems: MenuItem[];
    roundingUnit: RoundingUnit;
    roundingMethod: RoundingMethod;
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    theme: Theme;

    // Actions
    addMember: (name: string) => void;
    removeMember: (id: string) => void;
    updateMemberName: (id: string, name: string) => void;

    addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
    removeMenuItem: (id: string) => void;
    updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;

    setRoundingUnit: (unit: RoundingUnit) => void;
    setRoundingMethod: (method: RoundingMethod) => void;
    setBankName: (name: string) => void;
    setAccountNumber: (number: string) => void;
    setAccountHolder: (name: string) => void;
    setTheme: (theme: Theme) => void;

    reset: () => void;

    isAdUnlocked: boolean;
    unlockAd: () => void;
}

export const useCalculatorStore = create<CalculatorState>()(
    persist(
        (set) => ({
            members: [
                { id: '1', name: '참석자1' },
                { id: '2', name: '참석자2' },
            ],
            menuItems: [],
            roundingUnit: 10,
            roundingMethod: 'ceil',
            bankName: '',
            accountNumber: '',
            accountHolder: '',
            theme: 'basic',

            addMember: (name) => set((state) => ({
                members: [...state.members, { id: crypto.randomUUID(), name }]
            })),
            removeMember: (id) => set((state) => ({
                members: state.members.filter((m) => m.id !== id),
                menuItems: state.menuItems.map(item => ({
                    ...item,
                    sharedBy: item.sharedBy.filter(mid => mid !== id)
                }))
            })),
            updateMemberName: (id, name) => set((state) => ({
                members: state.members.map((m) => m.id === id ? { ...m, name } : m)
            })),

            addMenuItem: (item) => set((state) => ({
                menuItems: [...state.menuItems, { ...item, id: crypto.randomUUID() }]
            })),
            removeMenuItem: (id) => set((state) => ({
                menuItems: state.menuItems.filter((i) => i.id !== id)
            })),
            updateMenuItem: (id, updates) => set((state) => ({
                menuItems: state.menuItems.map((i) => i.id === id ? { ...i, ...updates } : i)
            })),

            setRoundingUnit: (unit) => set({ roundingUnit: unit }),
            setRoundingMethod: (method) => set({ roundingMethod: method }),
            setBankName: (name) => set({ bankName: name }),
            setAccountNumber: (number) => set({ accountNumber: number }),
            setAccountHolder: (name) => set({ accountHolder: name }),
            setTheme: (theme) => set({ theme: theme }),

            reset: () => set({
                members: [],
                menuItems: [],
                bankName: '',
                accountNumber: '',
                accountHolder: '',
            }),

            isAdUnlocked: false,
            unlockAd: () => set({ isAdUnlocked: true }),
        }),
        {
            name: 'dutch-pay-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
