// =============================================================
// PROJECT DATA — 5 Projects × 6 Screenshots Each
// =============================================================
const projectsData = [{
    id: 'luxora',
    name: 'Luxora — E-Commerce Store',
    shortDesc: 'Modern e-commerce fashion store with curated collections and seamless shopping.',
    desc: 'A full-featured fashion e-commerce platform with product browsing, filtering, quick-add carts, and a premium brand experience. Built with modern UI/UX principles.',
    url: 'https://e-commerce-store-tcjo.vercel.app',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    thumb: 'all projects pictures/1ss luxora.png',
    screenshots: [
        'all projects pictures/1ss luxora.png',
        'all projects pictures/2nd ss luxora.png',
        'all projects pictures/3rd ss luxora.png',
        'all projects pictures/4ry ss luxora.png',
        'all projects pictures/5th ss luxora.png',
        'all projects pictures/6th ss luxora.png'
    ]
}, {
    id: 'ember-ivy',
    name: 'Ember & Ivy — Restaurant',
    shortDesc: 'Contemporary grill with fire-kissed ingredients and unforgettable dining.',
    desc: 'A premium restaurant website showcasing signature dishes, menu exploration, online reservations, and a vibrant brand identity for a contemporary grill in downtown New York.',
    url: 'https://ember-ivy-resturent.vercel.app',
    tech: ['React', 'Next.js', 'CSS Modules', 'Framer Motion'],
    thumb: 'all projects pictures/1st ss ember-ivy-resturent.png',
    screenshots: [
        'all projects pictures/1st ss ember-ivy-resturent.png',
        'all projects pictures/2nd ss ember-ivy-resturent.png',
        'all projects pictures/3nd ss ember-ivy-resturent.png',
        'all projects pictures/4nd ss ember-ivy-resturent.png',
        'all projects pictures/5nd ss ember-ivy-resturent.png',
        'all projects pictures/6nd ss ember-ivy-resturent.png'
    ]
}, {
    id: 'taskflow',
    name: 'TaskFlow — Dashboard',
    shortDesc: 'Collaborative task management with workspace productivity tracking.',
    desc: 'A full-featured task management dashboard with project boards, team directories, calendar views, notifications, and real-time productivity analytics for modern teams.',
    url: 'https://taskflow-dashboard-mu-woad.vercel.app',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    thumb: 'all projects pictures/1st ss taskflow.png',
    screenshots: [
        'all projects pictures/1st ss taskflow.png',
        'all projects pictures/2st ss taskflow.png',
        'all projects pictures/3st ss taskflow.png',
        'all projects pictures/4st ss taskflow.png',
        'all projects pictures/5st ss taskflow.png',
        'all projects pictures/6st ss taskflow.png'
    ]
}, {
    id: 'medicarex',
    name: 'MedicareX — Healthcare',
    shortDesc: 'Healthcare platform connecting patients with trusted doctors and specialists.',
    desc: 'A comprehensive healthcare platform that helps patients find the right doctors, compare specialties, read reviews, and schedule appointments with ease across multiple cities.',
    url: 'https://medicarex-omega.vercel.app',
    tech: ['React', 'Node.js', 'TypeScript', 'Tailwind'],
    thumb: 'all projects pictures/1ss medicarex.png',
    screenshots: [
        'all projects pictures/1ss medicarex.png',
        'all projects pictures/2ss medicarex.png',
        'all projects pictures/3ss medicarex.png',
        'all projects pictures/4ss medicarex.png',
        'all projects pictures/5ss medicarex.png',
        'all projects pictures/6ss medicarex.png'
    ]
}, {
    id: 'propertyhub',
    name: 'PropertyHub — Real Estate',
    shortDesc: 'Marketplace for discovering exceptional homes and investment opportunities.',
    desc: 'A modern real estate marketplace with property listings, advanced search filters, saved shortlists, agent profiles, and a clean user dashboard for home seekers and investors.',
    url: 'https://propertyhub-liard.vercel.app',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    thumb: 'all projects pictures/1ss propertry hub.png',
    screenshots: [
        'all projects pictures/1ss propertry hub.png',
        'all projects pictures/2ss propertry hub.png',
        'all projects pictures/3ss propertry hub.png',
        'all projects pictures/4ss propertry hub.png',
        'all projects pictures/5ss propertry hub.png',
        'all projects pictures/6ss propertry hub.png'
    ]
}];

// =============================================================
// RENDER PROJECT CARDS
// =============================================================
const grid = document.getElementById('projectsGrid');

projectsData.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    if (idx === 1) card.classList.add('delay-1');
    if (idx === 2) card.classList.add('delay-2');

    card.innerHTML = `
        <div class="project-image-wrap">
            <img src="${p.thumb}" alt="${p.name}" loading="lazy" />
            <span class="project-badge">Project ${idx + 1}</span>
        </div>
        <div class="project-meta">
            <h3>${p.name}</h3>
            <p>${p.shortDesc}</p>
            <div class="project-tech">
                ${p.tech.map(t => `<span>${t}</span>`).join('')}
            </div>
            <div class="project-actions">
                <button class="btn-sm" data-project="${p.id}">View Gallery</button>
                <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="btn-sm outline">Live Demo →</a>
            </div>
        </div>
    `;

    card.querySelector('[data-project]').addEventListener('click', (e) => {
        e.stopPropagation();
        openGallery(p.id);
    });

    card.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        openGallery(p.id);
    });

    grid.appendChild(card);
});

// =============================================================
// GALLERY LOGIC
// =============================================================
let currentProject = null;
let currentIndex = 0;

const modal = document.getElementById('projectModal');
const track = document.getElementById('modalTrack');
const title = document.getElementById('modalTitle');
const desc = document.getElementById('modalDesc');
const counter = document.getElementById('modalCounter');
const prevBtn = document.getElementById('modalPrev');
const nextBtn = document.getElementById('modalNext');
const closeBtn = document.getElementById('modalCloseBtn');
const liveLink = document.getElementById('modalLiveLink');

function openGallery(projectId) {
    const proj = projectsData.find(p => p.id === projectId);
    if (!proj) return;

    currentProject = proj;
    currentIndex = 0;
    renderGallery(proj);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    updateControls();
}

function closeGallery() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function renderGallery(proj) {
    title.textContent = proj.name;
    desc.textContent = proj.desc;
    liveLink.href = proj.url;

    track.innerHTML = '';
    proj.screenshots.forEach((src) => {
        const slide = document.createElement('div');
        slide.className = 'modal-slide';
        const img = document.createElement('img');
        img.src = src;
        img.alt = proj.name + ' screenshot';
        img.loading = 'lazy';
        slide.appendChild(img);
        track.appendChild(slide);
    });

    currentIndex = 0;
    updateTrack();
    updateControls();
}

function updateTrack() {
    const slides = track.querySelectorAll('.modal-slide');
    if (slides.length === 0) return;
    track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
    counter.textContent = (currentIndex + 1) + ' / ' + slides.length;
}

function updateControls() {
    const slides = track.querySelectorAll('.modal-slide');
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === slides.length - 1;
}

function goPrev() {
    if (currentIndex > 0) {
        currentIndex--;
        updateTrack();
        updateControls();
    }
}

function goNext() {
    const slides = track.querySelectorAll('.modal-slide');
    if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateTrack();
        updateControls();
    }
}

prevBtn.addEventListener('click', goPrev);
nextBtn.addEventListener('click', goNext);
closeBtn.addEventListener('click', closeGallery);

modal.addEventListener('click', function(e) {
    if (e.target === modal) closeGallery();
});

document.addEventListener('keydown', function(e) {
    if (!modal.classList.contains('show')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
});

// =============================================================
// NAVBAR SCROLL
// =============================================================
var navbar = document.getElementById('navbar');

function handleNavbar() {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
}
window.addEventListener('scroll', handleNavbar);
handleNavbar();

// =============================================================
// MOBILE MENU
// =============================================================
var menuBtn = document.getElementById('menuBtn');
var navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('open');
    menuBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        menuBtn.textContent = '☰';
    });
});

// =============================================================
// SCROLL REVEAL
// =============================================================
var revealElements = document.querySelectorAll('.reveal');
var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
revealElements.forEach(function(el) { revealObserver.observe(el); });

// =============================================================
// SKILL BARS
// =============================================================
var progressBars = document.querySelectorAll('.progress-bar');
var skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            var bar = entry.target;
            var width = bar.getAttribute('data-width');
            if (width) bar.style.width = width;
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.4 });
progressBars.forEach(function(bar) { skillObserver.observe(bar); });

// =============================================================
// CUSTOM CURSOR
// =============================================================
var cursor = document.getElementById('cursor');
if (cursor && window.innerWidth > 650) {
    var mouseX = 0,
        mouseY = 0,
        currentX = 0,
        currentY = 0;
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        currentX += (mouseX - currentX) * 0.15;
        currentY += (mouseY - currentY) * 0.15;
        cursor.style.left = currentX + 'px';
        cursor.style.top = currentY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .service, .skill, .platform, .hobby, .edu-card, .about-card, .project-card')
        .forEach(function(el) {
            el.addEventListener('mouseenter', function() { cursor.classList.add('hover'); });
            el.addEventListener('mouseleave', function() { cursor.classList.remove('hover'); });
        });
}

// =============================================================
// SMOOTH SCROLL
// =============================================================
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
        var targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;
        var target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        var offset = navbar ? navbar.offsetHeight : 0;
        var pos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
    });
});

// =============================================================
// ACTIVE NAV
// =============================================================
var sections = document.querySelectorAll('main section[id]');
var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
var activeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute('id');
        navAnchors.forEach(function(link) {
            link.classList.toggle('active-link', link.getAttribute('href') === '#' + id);
        });
    });
}, { rootMargin: '-30% 0px -60% 0px' });
sections.forEach(function(s) { activeObserver.observe(s); });

// =============================================================
// CONTACT FORM
// =============================================================
var contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = contactForm.querySelector('button');
    var original = btn.innerHTML;
    btn.innerHTML = '✓ Message Sent!';
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.8';
    contactForm.reset();
    setTimeout(function() {
        btn.innerHTML = original;
        btn.style.pointerEvents = 'auto';
        btn.style.opacity = '1';
    }, 2800);
});

// =============================================================
// 3D TILT
// =============================================================
var tiltCards = document.querySelectorAll('.service, .platform, .hobby, .edu-card, .project-card, .contact-info-card');
if (window.innerWidth > 900) {
    tiltCards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var cx = rect.width / 2;
            var cy = rect.height / 2;
            var rx = ((y - cy) / cy) * -4;
            var ry = ((x - cx) / cx) * 4;
            card.style.transform =
                'translateY(-6px) perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) scale(1.01)';
        });
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
}

// =============================================================
// PARALLAX (subtle)
// =============================================================
var pElements = document.querySelectorAll(
    '.about-card, .edu-card, .service, .skill, .platform, .hobby, .project-card, .contact-info-card');
var pTimeout;

function handleParallax() {
    pElements.forEach(function(el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            var yPos = (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.02;
            if (window.innerWidth > 900 && !el.classList.contains('contact-info-card')) {
                el.style.transform = 'translateY(' + (yPos * 0.3) + 'px)';
            }
        }
    });
}
window.addEventListener('scroll', function() {
    clearTimeout(pTimeout);
    pTimeout = setTimeout(handleParallax, 10);
});

// =============================================================
// LOADER
// =============================================================
setTimeout(function() {
    var loader = document.getElementById('loader');
    if (loader) loader.classList.add('hide');
}, 1000);

console.log('%c🚀 Portfolio Loaded — 5 Projects, 30 Screenshots Mapped!', 'color:#42e17b; font-size:14px;');