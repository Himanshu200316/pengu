gsap.registerPlugin(ScrollTrigger);

// ============================================
// LENIS SMOOTH SCROLL - Award-winning smoothness
// ============================================
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
});

// Integrate Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ============================================
// CUSTOM CURSOR - Premium feel
// ============================================
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

// Smooth cursor following with lerp
function animateCursor() {
    const speed = 0.15;
    const followerSpeed = 0.08;

    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    followerX += (mouseX - followerX) * followerSpeed;
    followerY += (mouseY - followerY) * followerSpeed;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Magnetic hover effect for interactive elements
const magneticElements = document.querySelectorAll('a, .menu-toggle, .hero-title, .client-item');
magneticElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(follower, {
            scale: 2.5,
            backgroundColor: "rgba(255,255,255,0.1)",
            border: "2px solid #fff",
            mixBlendMode: "difference",
            duration: 0.4,
            ease: "power2.out"
        });
    });

    el.addEventListener('mouseleave', () => {
        gsap.to(follower, {
            scale: 1,
            backgroundColor: "transparent",
            border: "1px solid #fff",
            mixBlendMode: "normal",
            duration: 0.4,
            ease: "power2.out"
        });
    });

    // Magnetic pull effect
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    el.addEventListener('mouseleave', () => {
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)"
        });
    });
});

// ============================================
// HERO PARALLAX - Depth effect on scroll
// ============================================
const heroVideo = document.querySelector('.hero-bg video');
if (heroVideo) {
    gsap.to(heroVideo, {
        yPercent: 30,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
}

// ============================================
// PREMIUM SECTION REVEALS
// ============================================
const sections = document.querySelectorAll('section:not(#hero)');

sections.forEach((section, index) => {
    // Scale and fade in effect
    gsap.fromTo(section,
        {
            opacity: 0,
            scale: 0.95,
        },
        {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "top 50%",
                toggleActions: "play none none reverse"
            }
        }
    );

    // Staggered content reveal
    const texts = section.querySelectorAll('.reveal-text');
    const delayed = section.querySelectorAll('.reveal-text-delay');

    if (texts.length > 0) {
        gsap.fromTo(texts,
            {
                y: 80,
                opacity: 0,
                rotationX: -15,
            },
            {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }

    if (delayed.length > 0) {
        gsap.fromTo(delayed,
            {
                y: 50,
                opacity: 0,
                filter: "blur(10px)"
            },
            {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1,
                delay: 0.4,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }
});

// ============================================
// HERO ENTRANCE - Cinematic load animation
// ============================================
window.addEventListener('load', () => {
    document.body.classList.remove('loading');

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Staggered hero text with 3D rotation
    const heroLines = document.querySelectorAll('#hero .reveal-text');

    tl.fromTo(heroLines,
        {
            y: 120,
            opacity: 0,
            rotationX: -40,
            transformOrigin: "center bottom"
        },
        {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1.4,
            stagger: 0.2
        }
    );

    // Fade in CTA with blur
    const heroCta = document.querySelectorAll('#hero .reveal-text-delay');
    tl.fromTo(heroCta,
        {
            y: 40,
            opacity: 0,
            filter: "blur(15px)"
        },
        {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2
        },
        "-=0.8"
    );
});

// ============================================
// 1820-STYLE IMAGE TRAIL EFFECT
// Images spawn at cursor position as you move
// ============================================

const btsSection = document.getElementById('bts');
const trailContainer = document.getElementById('image-trail-container');

if (btsSection && trailContainer) {
    // Your rejection/failure images
    const trailImages = [
        'rejection_1.png',
        'rejection_2.png',
        'rejection_3.png',
        'rejection_4.png',
        'rejection_5.png',
        'rejection_6.png',
        'rejection_7.png',
        'rejection_8.png',
        'rejection_9.png',
        'rejection_10.png',
        'rejection_11.png',
        'rejection_12.png',
        'rejection_13.png'
    ];

    let currentImageIndex = 0;
    let lastX = 0;
    let lastY = 0;
    const distanceThreshold = 80; // Pixels to move before spawning new image
    const maxImages = 12; // Max images on screen at once
    let imageCount = 0;

    function getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    function spawnImage(x, y) {
        // Create new image element
        const img = document.createElement('img');
        img.src = trailImages[currentImageIndex];
        img.className = 'trail-image';
        img.style.left = x + 'px';
        img.style.top = y + 'px';

        // Add slight random rotation for organic feel
        const rotation = (Math.random() - 0.5) * 20;
        img.style.transform = `translate(-50%, -50%) scale(0.8) rotate(${rotation}deg)`;

        // Append to container
        trailContainer.appendChild(img);
        imageCount++;

        // Cycle through images
        currentImageIndex = (currentImageIndex + 1) % trailImages.length;

        // Remove image after animation completes (1.5s)
        setTimeout(() => {
            if (img.parentNode) {
                img.parentNode.removeChild(img);
                imageCount--;
            }
        }, 1500);

        // Limit max images on screen
        if (imageCount > maxImages) {
            const oldImages = trailContainer.querySelectorAll('.trail-image');
            if (oldImages.length > 0) {
                oldImages[0].remove();
                imageCount--;
            }
        }
    }

    btsSection.addEventListener('mousemove', (e) => {
        const rect = btsSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const distance = getDistance(x, y, lastX, lastY);

        // Only spawn if moved enough distance
        if (distance > distanceThreshold) {
            spawnImage(x, y);
            lastX = x;
            lastY = y;
        }
    });

    // Reset position when entering section
    btsSection.addEventListener('mouseenter', (e) => {
        const rect = btsSection.getBoundingClientRect();
        lastX = e.clientX - rect.left;
        lastY = e.clientY - rect.top;
    });
}

// ============================================
// CODE RAIN EFFECT - Coding symbols falling
// ============================================

const codeRainCanvas = document.getElementById('code-rain-canvas');

if (codeRainCanvas) {
    const ctx = codeRainCanvas.getContext('2d');

    // Coding symbols
    const symbols = '{}[]()<>=+-*/;:.,"\'\\|!@#$%^&_~`?0123456789abcdefABCDEF';

    let columns = [];
    let fontSize = 16;

    function initCodeRain() {
        // Set canvas size to match section
        const section = codeRainCanvas.parentElement;
        codeRainCanvas.width = section.offsetWidth;
        codeRainCanvas.height = section.offsetHeight;

        // Calculate columns
        const columnCount = Math.floor(codeRainCanvas.width / fontSize);
        columns = [];
        for (let i = 0; i < columnCount; i++) {
            columns[i] = Math.random() * codeRainCanvas.height / fontSize;
        }
    }

    function drawCodeRain() {
        // Semi-transparent black to create trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, codeRainCanvas.width, codeRainCanvas.height);

        // White text
        ctx.fillStyle = '#fff';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < columns.length; i++) {
            // Random symbol
            const char = symbols[Math.floor(Math.random() * symbols.length)];
            const x = i * fontSize;
            const y = columns[i] * fontSize;

            ctx.fillText(char, x, y);

            // Reset column when it goes off screen
            if (y > codeRainCanvas.height && Math.random() > 0.975) {
                columns[i] = 0;
            }

            columns[i]++;
        }
    }

    // Initialize and start animation
    initCodeRain();
    setInterval(drawCodeRain, 50);

    // Reinitialize on resize
    window.addEventListener('resize', initCodeRain);
}

// ============================================
// FLOATING PARTICLES - Network effect
// ============================================

const particlesCanvas = document.getElementById('particles-canvas');

if (particlesCanvas) {
    const pCtx = particlesCanvas.getContext('2d');
    let particles = [];
    const particleCount = 50;
    const connectionDistance = 150;

    function initParticles() {
        const section = particlesCanvas.parentElement;
        particlesCanvas.width = section.offsetWidth;
        particlesCanvas.height = section.offsetHeight;

        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * particlesCanvas.width,
                y: Math.random() * particlesCanvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    function drawParticles() {
        pCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

        // Draw connections
        pCtx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        pCtx.lineWidth = 1;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    pCtx.beginPath();
                    pCtx.moveTo(particles[i].x, particles[i].y);
                    pCtx.lineTo(particles[j].x, particles[j].y);
                    pCtx.stroke();
                }
            }
        }

        // Draw and update particles
        pCtx.fillStyle = '#fff';
        for (let p of particles) {
            pCtx.beginPath();
            pCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            pCtx.fill();

            // Update position
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges
            if (p.x < 0 || p.x > particlesCanvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > particlesCanvas.height) p.vy *= -1;
        }

        requestAnimationFrame(drawParticles);
    }

    initParticles();
    drawParticles();
    window.addEventListener('resize', initParticles);
}

// ============================================
// WAVE ANIMATION - Steps/Progress effect
// ============================================

const waveCanvas = document.getElementById('wave-canvas');

if (waveCanvas) {
    const wCtx = waveCanvas.getContext('2d');
    let waveOffset = 0;

    function initWave() {
        const section = waveCanvas.parentElement;
        waveCanvas.width = section.offsetWidth;
        waveCanvas.height = section.offsetHeight;
    }

    function drawWave() {
        wCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);

        // Draw multiple wave lines
        const waveCount = 5;

        for (let w = 0; w < waveCount; w++) {
            wCtx.beginPath();
            wCtx.strokeStyle = `rgba(255, 255, 255, ${0.1 + w * 0.05})`;
            wCtx.lineWidth = 2;

            const baseY = waveCanvas.height * 0.3 + w * 60;
            const amplitude = 30 + w * 10;
            const frequency = 0.008 - w * 0.001;
            const speed = waveOffset * (1 + w * 0.2);

            for (let x = 0; x < waveCanvas.width; x++) {
                const y = baseY + Math.sin(x * frequency + speed) * amplitude;

                if (x === 0) {
                    wCtx.moveTo(x, y);
                } else {
                    wCtx.lineTo(x, y);
                }
            }

            wCtx.stroke();
        }

        waveOffset += 0.02;
        requestAnimationFrame(drawWave);
    }

    initWave();
    drawWave();
    window.addEventListener('resize', initWave);
}
