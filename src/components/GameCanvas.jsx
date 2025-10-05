import { useRef, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { useGameLoop } from '../game/gameLoop';
import { sprites, loadSprite } from '../game/sprites';

export default function Canvas() {
    const canvasRef = useRef();
    useGameLoop();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvasRef.current.getContext('2d');

        loadSprite().then(() => {
            console.log("Sprites loaded!");
            draw();
        });

        function handleClick(e) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Pause/Resume button
            if (x >= 250 && x <= 350 && y >= 10 && y <= 40) {
                useGameStore.getState().togglePause();
            }
            // Restart button
            if (useGameStore.getState().state.gameOver &&
                x >= 250 && x <= 350 && y >= 50 && y <= 80) {
                useGameStore.getState().reset();
            }
        }

        function draw() {
            const state = useGameStore.getState().state;
            
            ctx.clearRect(0, 0, 800, 600);
            // Background
            ctx.fillStyle = "black";
            ctx.drawImage(sprites.backgroundImg, 0, 0, 800, 600);

            // draw Player
            ctx.fillStyle = 'blue';
            ctx.drawImage(sprites.player, state.player.x, state.player.y, 64, 64);

            // draw bullets
            ctx.fillStyle = 'yellow';
            state.bullets.forEach((b) => 
                ctx.drawImage(sprites.bullet, b.x, b.y, b.width, b.height)
            );
            // draw explosions
            state.explosions.forEach((exp) => {
                const frameX = Math.floor(exp.frame) * exp.size; // choose frame
                ctx.drawImage(
                    sprites.explosions, // full sprite sheet
                    frameX, 0, exp.size, exp.size, // source rectangle
                    exp.x, exp.y, exp.size, exp.size // destination
                );
            });
            
            // draw Enemies
            ctx.fillStyle = 'red';
            state.enemies.forEach((e) => ctx.drawImage(sprites.enemy, e.x, e.y, e.width, e.height));

            // HUD score and lives
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.fillText(`Score: ${state.score}`, 10, 20);
            ctx.fillText(`Lives: ${state.lives}`, 10, 40);

            //Pause and Resume button
            ctx.fillStyle = "grey";
            ctx.fillRect(250, 10, 100, 30);
            ctx.fillStyle = "black";
            ctx.font = "16px Arial";
            ctx.fillText(state.paused ? "Resume" : "Pause", 275, 30);

            //Restart game button
            if (state.gameOver) {
                ctx.fillStyle = "grey";
                ctx.fillRect(250, 50, 100, 30);
                ctx.fillStyle = "black";
                ctx.font = "16px Arial";
                ctx.fillText("Restart", 280, 70);
            }
            
            // if game over
            if (state.gameOver) {
                ctx.fillStyle = "white";
                ctx.font = "40px Arial";
                ctx.fillText("GAME OVER", 180, 300);
            }
            if (state.paused && !state.gameOver) {
                ctx.fillStyle = "white";
                ctx.font = "40px Arial";
                ctx.fillText("PAUSED", 220, 300);
            }
            requestAnimationFrame(draw);
            state.enemies.forEach((e) => {
                console.log(e.y);
            })
        }
        canvas.addEventListener('click', handleClick);
        
        return () => canvas.removeEventListener('click', handleClick);
    }, []);

    
    return <canvas ref={canvasRef} width={800} height={600} />;
};

