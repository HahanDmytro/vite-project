import {create} from 'zustand';

export const useControlsStore = create((set) => ({
    keys: {},
    setKey: (key, isPressed) => set((s) => ({
        keys: {...s.keys, [key]: isPressed},
    })),
}));