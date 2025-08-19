const gsap = window.gsap;

// Loading Animation
function initLoader(){
    const loader = document.querySelector(".loader");
    const loaderText = document.querySelector(".loader-text");
    const loaderProgress = document.querySelector(".loader-progress");

    gsap.to(loaderText, {
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
    });

    gsap.to(loaderProgress, {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.7,
                onComplete: () => {
                    loader.style.display = "none";
                    initAnimation();
                }
            });
        }
    });
    gsap.to(".back-vid", {
        opacity: 1,
        duration: 2,
        ease: "power2.inOut",
    });
}

function initAnimation() {
    gsap.to(".nav", {
        y: 0,
        duration: 1,
        ease: "power3.out",
    });

    const t1 = gsap.timeline();
    t1.to(".hero-info-title",{
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 1.2,
        ease: "power3.out",
    })
    .to(".hero-info-h1", {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 1.2,
        ease: "power3.out",
    }, "-=0.3")
    .to(".hero-info-p", {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 0.8,
        ease: "power3.out,"
    }, "-=0.3")
    .to(".hero-info-btn", {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 0.5,
        ease: "power3.out",
    }, "-=0.3")
    .to(".scroll-down", {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: "power3.out",
    }, "-=0.3")
    .to(".info-section",{
        display: 'flex'
    })
    .to(".skills-section", {
        display: 'flex',
    })
    .to(".my-project", {
        display: 'flex'
    })
    .to(".contact-section", {
        display: 'flex'
    })
    .to(".footer", {
        display: 'flex',
    })
}

// Load when Reload
window.addEventListener("load", initLoader);

// Following Cursor
if(window.innerWidth > 768){
    const cursor = document.querySelector(".cursor");
    const cursorFollower = document.querySelector(".cursor-follower");
    document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY -10,
            duration: 0.1,
        })

        gsap.to(cursorFollower, {
            x: e.clientX - 20,
            y: e.clientY - 20,
            duration: 0.2,
        })
    });
}

// scroll to View
function scrollto(e, type){
    const link = e.target.closest(type);
    if(!link) return;
    
    e.preventDefault();
    
    const targetId = link.getAttribute('data-target');
    const targetElement = document.getElementById(targetId);
    
    if(targetElement){
        targetElement.scrollIntoView({behavior: 'smooth'});
    }
}
document.querySelectorAll('.nav-link').forEach((navLink) => {
    navLink.addEventListener('click', (e) => scrollto(e, 'a[data-target]'));
});
document.querySelector('.hero-info-btn').addEventListener('click', (e)=>{scrollto(e, 'button[data-target]')});

// Sidebar 
const sidebar = document.querySelector(".sidebar");
const toggle = document.querySelector(".toggle");
const aTag = document.querySelector(".sidebar");

toggle.addEventListener("click", sidebarShow);
aTag.addEventListener("click", sidebarShow);

function sidebarShow(){
    if(sidebar.classList.contains("close-sidebar")){
        sidebar.classList.remove("close-sidebar");
        sidebar.classList.add("open-sidebar");
        toggle.classList.remove("bx-menu");
        toggle.classList.add("bx-x");
    } else {
        sidebar.classList.remove("open-sidebar");
        sidebar.classList.add("close-sidebar");
        toggle.classList.remove("bx-x");
        toggle.classList.add("bx-menu");
    }
    
}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        observer.unobserve(entry.target); // 👈 animate only once
        }
    });
}, {
    threshold: 0.2  // Trigger when 20% visible
});

const elements = document.querySelectorAll('.autoDisplay');
elements.forEach(el => observer.observe(el));

const fadeInElements = document.querySelectorAll('.fadein-left');
fadeInElements.forEach(el => observer.observe(el));

const designer = document.querySelector('.Designer');
observer.observe(designer);

const coder = document.querySelector('.coder');
observer.observe(coder);
