import { create } from 'zustand';

interface EditingState {
    isEditing: boolean;
    toggleEditing: () => void;
    setEditing: (value: boolean) => void;
}

export const useIsEditing = create<EditingState>((set) => ({
    isEditing: false,
    toggleEditing: () => set((state) => ({ isEditing: !state.isEditing })),
    setEditing: (value) => set({ isEditing: value }),
}));
