

import { useControlsStore } from "../store/controlsStore";

export function updateGame(state) {
    if (state.gameOver) return state;

    const keys = useControlsStore.getState().keys;
    

    // Player movement
    let playerX = state.player.x;
    if (keys["ArrowLeft"]) playerX = Math.max(0, state.player.x - 10);
    if (keys["ArrowRight"]) playerX = Math.min(736, state.player.x + 10);

    let bullets = [...state.bullets];
    let lastShotTime = state.lastShotTime;

    // Shoot bullets continuously if Space is held
    // Shooting
    //if (keys[" "] || keys["Space"]) {
    if (Date.now() - lastShotTime > 300) {
        bullets.push({
            x: playerX + 24,
            y: state.player.y,
            width: 16,
            height: 32,
        });
    lastShotTime = Date.now();
    }
    //}
    bullets = bullets.map((b) => ({ ...b, y: b.y - 8 })).filter((b) => b.y > 0);

    // Moving enemies
    const enemies = state.enemies.map((e) => ({ ...e, y: e.y + 2 + Math.random() * 2})).filter((e) => e.y < 800);
        

    // Collision detection
    let score = state.score;
    let lives = state.lives;
    const remainingEnemies = [];

    let explosions = state.explosions;

    explosions.forEach((exp, i) => {
        exp.frame += 0.3; // speed of animation
        if (exp.frame >= exp.maxFrames) {
            explosions.splice(i, 1); // remove after animation ends
        }
    });

    for (let e of enemies) {
        let hit = bullets.find(
            (b) => 
                b.x < e.x + e.width &&
                b.x + b.width > e.x &&
                b.y < e.y + e.height &&
                b.y + b.height > e.y
        );
        if (hit) {
            score += 10;
            explosions.push({
                x: e.x,
                y: e.y,
                size: 64,
                frame: 0,
                maxFrame: 5,
            });
        } else if (e.y > 550) {
            // Enemy reached the bottom
            lives--;
            if (lives <= 0) {
                return { ...state, bullets, enemies: [], score, lives: 0, gameOver: true, lastShotTime };
            }
        }
        else {
            remainingEnemies.push(e);
        }
    }
    return {
        ...state,
        player: { ...state.player, x: playerX },
        bullets,
        enemies: remainingEnemies,
        explosions,
        score,
        lives,
        lastShotTime,
    };
}

export function spawnEnemy(state) {
    return {
        ...state,
        enemies: [
        ...state.enemies,
            {
                x: Math.random() * 736,
                y: 0,
                width: 64,
                height: 64,
            },
        ],
    };
}
