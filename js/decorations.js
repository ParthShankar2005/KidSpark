/**
 * KidSpark Decorations
 * Handles hanging emojis and flying insects (butterflies and bees)
 */

(function () {
    const HANGING_EMOJIS = ["🎈", "🌟", "☁️", "🍎", "🍩", "🧸", "🪁"];
    const FLYING_BUGS = ["🦋", "🐝", "🐞"];
    const MAX_HANGING = 7;
    const MAX_FLYING = 8;

    let decorationLayer;

    function init() {
        decorationLayer = document.createElement("div");
        decorationLayer.className = "decoration-layer";
        document.body.prepend(decorationLayer);

        spawnHanging();
        setInterval(spawnFlying, 8000);
        // Initial batch of flying
        for (let i = 0; i < 2; i++) {
            setTimeout(spawnFlying, i * 3000);
        }
    }

    function spawnHanging() {
        for (let i = 0; i < MAX_HANGING; i++) {
            const emoji = document.createElement("div");
            emoji.className = "hanging-emoji";
            emoji.textContent = HANGING_EMOJIS[Math.floor(Math.random() * HANGING_EMOJIS.length)];

            const left = (i + 1) * (100 / (MAX_HANGING + 1));
            emoji.style.left = `${left}%`;

            const delay = Math.random() * 2;
            const duration = 3 + Math.random() * 2;
            emoji.style.animationDelay = `${delay}s`;
            emoji.style.animationDuration = `${duration}s`;

            decorationLayer.appendChild(emoji);
        }
    }

    function spawnFlying() {
        if (document.querySelectorAll(".flying-bug").length >= MAX_FLYING) return;

        const bug = document.createElement("div");
        bug.className = "flying-bug";
        bug.textContent = FLYING_BUGS[Math.floor(Math.random() * FLYING_BUGS.length)];

        const startY = 20 + Math.random() * 60; // 20% to 80% height
        const endY = startY + (Math.random() * 20 - 10);
        const duration = 10 + Math.random() * 10;
        const direction = Math.random() > 0.5 ? 1 : -1;

        bug.style.top = `${startY}vh`;

        if (direction === 1) {
            bug.style.left = "-50px";
            bug.style.transition = `left ${duration}s linear, top ${duration}s linear`;
            setTimeout(() => {
                bug.style.left = "calc(100vw + 50px)";
                bug.style.top = `${endY}vh`;
            }, 100);
        } else {
            bug.style.left = "calc(100vw + 50px)";
            bug.style.transform = "scaleX(-1)";
            bug.style.transition = `left ${duration}s linear, top ${duration}s linear`;
            setTimeout(() => {
                bug.style.left = "-50px";
                bug.style.top = `${endY}vh`;
            }, 100);
        }

        decorationLayer.appendChild(bug);

        // Remove bug after animation
        setTimeout(() => {
            bug.remove();
        }, duration * 1000 + 500);
    }

    // Wait for DOM to be ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
