// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// THREE.JS - Interactive Particle Background (optimized)
(function initThreeJS() {
    if (prefersReducedMotion) return; // Skip if user prefers reduced motion
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const particleCount = window.innerWidth < 768 ? 800 : 1500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        colors[i * 3] = 0 + Math.random() * 0.1;
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({ size: 0.03, vertexColors: true, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, sizeAttenuation: true });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 5;
    const mouse = { x: 0, y: 0 };
    document.addEventListener('mousemove', (e) => { mouse.x = (e.clientX / window.innerWidth) * 2 - 1; mouse.y = -(e.clientY / window.innerHeight) * 2 + 1; }, { passive: true });
    const clock = new THREE.Clock();
    let frameCount = 0;
    function animate() {
        requestAnimationFrame(animate);
        frameCount++;
        if (frameCount % 2 !== 0) return; // 30fps instead of 60fps for better performance
        const elapsed = clock.getElapsedTime();
        particles.rotation.y = elapsed * 0.05;
        particles.rotation.x = elapsed * 0.02;
        camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
        camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);
        const pos = particles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i += 3) { pos[i * 3 + 1] += Math.sin(elapsed + i * 0.01) * 0.001; }
        particles.geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
    }
    animate();
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, 250);
    }, { passive: true });
})();

// TYPED.JS
document.addEventListener('DOMContentLoaded', () => {
    new Typed('#typed-text', { strings: ['Full Stack Developer', 'Software Engineer', 'Cloud Architect', 'AI Enthusiast', 'IoT Developer'], typeSpeed: 60, backSpeed: 40, backDelay: 2000, loop: true, showCursor: true, cursorChar: '|' });
});

// GSAP ANIMATIONS (with reduced motion check)
gsap.registerPlugin(ScrollTrigger);
const animationConfig = prefersReducedMotion ? { duration: 0.01, ease: 'none' } : {};

ScrollTrigger.create({ start: 'top -80', onEnter: () => document.getElementById('navbar').classList.add('scrolled'), onLeaveBack: () => document.getElementById('navbar').classList.remove('scrolled') });

if (!prefersReducedMotion) {
    const heroTl = gsap.timeline({ delay: 0.3 });
    heroTl.from('#greeting', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
        .from('#hero-name', { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from('#hero-subtitle', { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .from('#hero-desc', { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' }, '-=0.2')
        .from('#social-icons a', { opacity: 0, y: 20, scale: 0.5, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.2')
        .from('#hero-cta', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, '-=0.2')
        .from('#hero-visual', { opacity: 0, x: 80, duration: 1, ease: 'power3.out' }, '-=0.8')
        .from('#scroll-indicator', { opacity: 0, y: -20, duration: 0.5, ease: 'power3.out' }, '-=0.3');

    gsap.from('#about-img', { scrollTrigger: { trigger: '#about', start: 'top 75%', toggleActions: 'play none none reverse' }, opacity: 0, x: -80, duration: 1, ease: 'power3.out' });
    gsap.from('#about-text > *', { scrollTrigger: { trigger: '#about', start: 'top 75%', toggleActions: 'play none none reverse' }, opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: 'power3.out' });

    document.querySelectorAll('.section-header').forEach((header) => {
        gsap.from(header.children, { scrollTrigger: { trigger: header, start: 'top 80%', toggleActions: 'play none none reverse' }, opacity: 0, y: 40, duration: 0.7, stagger: 0.1, ease: 'power3.out' });
    });

    gsap.from('.experience-card', { scrollTrigger: { trigger: '#experience', start: 'top 80%', toggleActions: 'play none none reverse' }, opacity: 0, y: 60, scale: 0.95, duration: 0.8, stagger: 0.15, ease: 'power3.out' });
    gsap.from('.education-card', { scrollTrigger: { trigger: '#education', start: 'top 80%', toggleActions: 'play none none reverse' }, opacity: 0, y: 60, scale: 0.95, duration: 0.8, stagger: 0.15, ease: 'power3.out' });
    gsap.from('.flip-card', { scrollTrigger: { trigger: '#certifications', start: 'top 80%', toggleActions: 'play none none reverse' }, opacity: 0, y: 60, scale: 0.95, duration: 0.8, stagger: 0.1, ease: 'power3.out' });

    document.querySelectorAll('.progress-fill').forEach((bar) => {
        ScrollTrigger.create({ trigger: bar, start: 'top 85%', onEnter: () => { gsap.to(bar, { width: bar.dataset.width, duration: 1.5, ease: 'power3.out' }); }, once: true });
    });

    document.querySelectorAll('.radial-progress').forEach((circle) => {
        ScrollTrigger.create({ trigger: circle, start: 'top 85%', onEnter: () => { gsap.to(circle, { attr: { 'stroke-dashoffset': circle.dataset.offset }, duration: 2, ease: 'power3.out' }); }, once: true });
    });

    gsap.from('#tech-skills', { scrollTrigger: { trigger: '#skills', start: 'top 75%', toggleActions: 'play none none reverse' }, opacity: 0, x: -50, duration: 0.8, ease: 'power3.out' });
    gsap.from('#pro-skills', { scrollTrigger: { trigger: '#skills', start: 'top 75%', toggleActions: 'play none none reverse' }, opacity: 0, x: 50, duration: 0.8, ease: 'power3.out', delay: 0.2 });
    gsap.from('.project-block', { scrollTrigger: { trigger: '#portfolio', start: 'top 90%', end: 'bottom 10%', toggleActions: 'play none none none' }, opacity: 0, y: 40, duration: 1, stagger: 0.3, ease: 'power3.out', clearProps: 'all' });
    gsap.from('#contact-info > *', { scrollTrigger: { trigger: '#contact', start: 'top 75%', toggleActions: 'play none none reverse' }, opacity: 0, x: -50, duration: 0.7, stagger: 0.15, ease: 'power3.out' });
    gsap.from('#contact-form', { scrollTrigger: { trigger: '#contact', start: 'top 75%', toggleActions: 'play none none reverse' }, opacity: 0, x: 50, duration: 0.8, ease: 'power3.out', delay: 0.2 });
    gsap.to('#three-canvas', { scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true }, opacity: 0.3, ease: 'none' });
}

// CURSOR GLOW
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow && !prefersReducedMotion) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }, { passive: true });
}

// ACTIVE NAV
const navLinks = document.querySelectorAll('[data-nav]');
const sections = document.querySelectorAll('section[id]');
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            let current = '';
            sections.forEach((s) => { if (scrollY >= s.offsetTop - 200) current = s.getAttribute('id'); });
            navLinks.forEach((l) => { l.classList.remove('active'); if (l.getAttribute('href') === '#' + current) l.classList.add('active'); });
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// MOBILE MENU
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); const icon = mobileMenuBtn.querySelector('i'); icon.classList.toggle('bx-menu'); icon.classList.toggle('bx-x'); });
    mobileMenu.querySelectorAll('a').forEach((link) => { link.addEventListener('click', () => { mobileMenu.classList.add('hidden'); const icon = mobileMenuBtn.querySelector('i'); icon.classList.add('bx-menu'); icon.classList.remove('bx-x'); }); });
}

// MAGNETIC HOVER (skip if reduced motion)
if (!prefersReducedMotion) {
    document.querySelectorAll('.cta-button, .social-icon').forEach((el) => {
        el.addEventListener('mousemove', (e) => { const rect = el.getBoundingClientRect(); const x = e.clientX - rect.left - rect.width / 2; const y = e.clientY - rect.top - rect.height / 2; gsap.to(el, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power2.out' }); });
        el.addEventListener('mouseleave', () => { gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' }); });
    });

    // 3D TILT
    document.querySelectorAll('.service-card, .project-card, .skill-panel, .experience-card, .education-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => { const rect = card.getBoundingClientRect(); const x = (e.clientX - rect.left) / rect.width - 0.5; const y = (e.clientY - rect.top) / rect.height - 0.5; gsap.to(card, { rotateY: x * 8, rotateX: -y * 8, transformPerspective: 800, duration: 0.4, ease: 'power2.out' }); });
        card.addEventListener('mouseleave', () => { gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' }); });
    });
}

// FLIP CARD MOBILE TAP HANDLER
document.querySelectorAll('.flip-card').forEach((card) => {
    card.addEventListener('click', function (e) {
        // On mobile/touch devices, toggle flipped class on tap
        if (window.innerWidth < 1024) {
            this.classList.toggle('flipped');
        }
    });
});

// Download Resume Handler
document.getElementById('download-resume')?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Resume download will be available soon!');
});

console.log('Portfolio loaded with Three.js + GSAP + Tailwind CSS | Performance Optimized | 3D Flip Cards Active');
