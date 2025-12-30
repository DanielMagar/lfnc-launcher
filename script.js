// =====================
// ELEMENT REFERENCES
// =====================
const launchBtn = document.getElementById("launchBtn");
const launchScreen = document.getElementById("launchScreen");
const countdownScreen = document.getElementById("countdownScreen");
const revealScreen = document.getElementById("revealScreen");
const countNumber = document.getElementById("countNumber");
const whooshSound = document.getElementById("whooshSound");
const hallelujahSound = document.getElementById("hallelujahSound");

// =====================
// FIREWORKS CANVAS SETUP
// =====================
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// =====================
// FIREWORK PARTICLES
// =====================
let particles = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 10;
    this.vy = (Math.random() - 0.5) * 10;
    this.life = 80;
    this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05; // gravity
    this.life--;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// =====================
// FIREWORK FUNCTIONS
// =====================
function createBlast(x, y) {
  for (let i = 0; i < 120; i++) {
    particles.push(new Particle(x, y));
  }
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter(p => p.life > 0);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateFireworks);
}
animateFireworks();

// =====================
// LAUNCH SEQUENCE
// =====================
launchBtn.addEventListener("click", () => {
  launchScreen.classList.add("hidden");
  countdownScreen.classList.remove("hidden");

  let count = 10;
  countNumber.textContent = count;

  whooshSound.volume = 0.4;
  hallelujahSound.volume = 0.7;

  const interval = setInterval(() => {
    count--;
    countNumber.textContent = count;

    whooshSound.currentTime = 0;
    whooshSound.play();

    if (count === 0) {
      clearInterval(interval);

      // 🎆 FIREWORK BLASTS
      let blastCount = 0;
      const blastInterval = setInterval(() => {
        createBlast(
          Math.random() * canvas.width,
          Math.random() * canvas.height * 0.5
        );
        blastCount++;
        if (blastCount >= 6) clearInterval(blastInterval);
      }, 300);

      // ✝️ REVEAL
      
      setTimeout(() => {
  countdownScreen.classList.add("hidden");
  revealScreen.classList.remove("hidden");
  hallelujahSound.play();

  // 🔁 REDIRECT AFTER 4 SECONDS
  setTimeout(() => {
    window.location.href = "https://www.lfnc.in/";
  }, 4000);

}, 900);

    }
  }, 1000);
});
