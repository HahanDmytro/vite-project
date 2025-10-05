import {create} from 'zustand';

const initialState = {
    player: {x: 250, y: 500, width: 64, height: 64},
    bullets: [],
    enemies: [],
    explosions: [],
    score: 0,
    lives: 3,
    lastShotTime: 0,
    paused: false,
};

export const useGameStore = create((set) => ({
    state: initialState,
    reset : () => set({state: {...initialState}}),
    update: (updater) => set((s) => ({state: updater(s.state)})),
    togglePause: () => {
        set((s) => ({state: { ...s.state, paused: !s.state.paused }}));
    },
}));