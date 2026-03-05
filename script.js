document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const surpriseBtn = document.getElementById('surprise-btn');
    const replayBtn = document.getElementById('replay-btn');
    const bgMusic = document.getElementById('bg-music');
    const sections = ['hero', 'memories', 'message', 'final-surprise'];
    const balloonsContainer = document.getElementById('balloons-container');

    // 1. Remove Loader
    window.onload = () => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);

        // Initial Confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
        });
    };

    // 2. Generate Floating Balloons
    function createBalloons() {
        const balloonCount = 15;
        for (let i = 0; i < balloonCount; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.left = `${Math.random() * 100}vw`;
            balloon.style.animationDelay = `${Math.random() * 5}s`;
            balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
            balloonsContainer.appendChild(balloon);
        }
    }
    createBalloons();

    // 3. Handle Surprise Click
    surpriseBtn.addEventListener('click', () => {
        // Play Music
        bgMusic.play().catch(e => console.log("Music play blocked by browser. Interaction required."));

        // Transition through sections
        showSection('memories');

        // After some time, show message
        setTimeout(() => {
            showSection('message');
        }, 15000);

        // Finally show surprise
        setTimeout(() => {
            showSection('final-surprise');
            finalCelebration();
        }, 25000);
    });

    replayBtn.addEventListener('click', () => {
        location.reload();
    });

    function showSection(sectionId) {
        const section = document.getElementById(sectionId);
        section.classList.remove('hidden');
        section.classList.add('fade-in');

        // Scroll to section
        section.scrollIntoView({ behavior: 'smooth' });
    }

    function finalCelebration() {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    }
});
