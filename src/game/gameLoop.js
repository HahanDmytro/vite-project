import {useEffect, useRef} from 'react';
import {useGameStore} from '../store/gameStore';
import {updateGame} from './gameEngine';
import {spawnEnemy} from './gameEngine';

export function useGameLoop() {
    const update = useGameStore((s) => s.update);
    const togglePause = useGameStore((s) => s.togglePause);
    const requestRef = useRef();
    const lastSpawn = useRef(0);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key.toLowerCase() === "k") {
                togglePause();
            }
            };

            window.addEventListener("keydown", handleKeyDown);
        const loop = (time) => {
            
            const state = useGameStore.getState().state;
            if (!state.paused) {
                update(updateGame)
                // Spawn enemies every two second
                if (time - lastSpawn.current > 2000 && !state.gameOver) {
                    update(spawnEnemy);
                    lastSpawn.current = time;
                }
            }
            requestRef.current = requestAnimationFrame(loop);
        };
        requestRef.current = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(requestRef.current);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [update, togglePause]);
}