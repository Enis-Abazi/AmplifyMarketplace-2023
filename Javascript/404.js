const blogNotFound = document.querySelector('.blogNotFound');
let backgroundPosition = 0
const speed = 3;

function moveBackground() {
    backgroundPosition -= speed;

    blogNotFound.style.backgroundPosition = `${backgroundPosition}px 0`;

    if (backgroundPosition < -blogNotFound.offsetWidth) {
        backgroundPosition = 0;
    }

    requestAnimationFrame(moveBackground);
}
moveBackground();