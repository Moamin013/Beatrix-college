const player = document.getElementById('player');
const powerUp = document.getElementById('powerUp');
const gameContainer = document.getElementById('gameContainer');

let playerSpeed = 5;
let jumpStrength = 10;
let gravity = 0.5;
let isJumping = false;
let velocityY = 0;
let hasPowerUp = false;

// Beweging en Sprong Functies
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        player.style.left = `${player.offsetLeft + playerSpeed}px`;
    } else if (event.key === 'ArrowLeft') {
        player.style.left = `${player.offsetLeft - playerSpeed}px`;
    } else if (event.key === ' ' && !isJumping) {
        isJumping = true;
        velocityY = -jumpStrength;
    }
});

// Jump mechanisme met zwaartekracht
function gameLoop() {
    if (isJumping) {
        player.style.top = `${player.offsetTop + velocityY}px`;
        velocityY += gravity;
        
        if (player.offsetTop >= gameContainer.offsetHeight - player.offsetHeight) {
            isJumping = false;
            player.style.top = `${gameContainer.offsetHeight - player.offsetHeight}px`;
        }
    }

    // Controleer voor Power-up Pickup
    if (detectCollision(player, powerUp) && !hasPowerUp) {
        hasPowerUp = true;
        activatePowerUp();
        powerUp.style.display = 'none';
    }

    requestAnimationFrame(gameLoop);
}

// Power-up Activering
function activatePowerUp() {
    player.style.backgroundColor = 'blue';
    setTimeout(() => {
        player.style.backgroundColor = 'red';
        hasPowerUp = false;
        resetPowerUp();
    }, 5000);
}

// Reset de Power-up
function resetPowerUp() {
    powerUp.style.display = 'block';
    powerUp.style.left = `${Math.random() * (gameContainer.offsetWidth - powerUp.offsetWidth)}px`;
    powerUp.style.top = `${Math.random() * (gameContainer.offsetHeight - 100)}px`;
}

// Detectie van Collision (botsing)
function detectCollision(rect1, rect2) {
    const rect1Bounds = rect1.getBoundingClientRect();
    const rect2Bounds = rect2.getBoundingClientRect();

    return !(
        rect1Bounds.top > rect2Bounds.bottom ||
        rect1Bounds.bottom < rect2Bounds.top ||
        rect1Bounds.left > rect2Bounds.right ||
        rect1Bounds.right < rect2Bounds.left
    );
}

// Start de Game Loop
gameLoop();
