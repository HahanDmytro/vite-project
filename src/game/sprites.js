export function loadSprite() {
    return new Promise((resolve) => {
        let loaded = 0;
        const all = [bulletImg, playerImg, enemyImg];

        all.forEach((img) => {
            img.onload = () => {
                loaded++;
                if (loaded === all.length) {
                    resolve();
                }
            }
        })
    });
} 

// game/sprites.js
const playerImg = new Image();
playerImg.src = "/sprites/Player1.png"; // place in public/sprites/

const bulletImg = new Image();
bulletImg.src = "/sprites/bullets1.png";

const enemyImg = new Image();
enemyImg.src = "/sprites/enemies1.png";

const explosionImg = new Image();
explosionImg.src = "/sprites/explotion.png";

const backgroundImg = new Image();
backgroundImg.src = "/space.png";

export const sprites = {
  player: playerImg,
  bullet: bulletImg,
  enemy: enemyImg,
  explosions: explosionImg,
  backgroundImg: backgroundImg,
};
