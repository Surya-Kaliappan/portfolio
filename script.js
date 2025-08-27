window.addEventListener('DOMContentLoaded', () => {

    const gsap = window.gsap;

    // Loading Animation
    function initLoader() {
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

    // Initial Animation of the Hero Section and other sections
    function initAnimation() {
        gsap.to(".nav", {
            y: 0,
            duration: 1,
            ease: "power3.out",
        });

        const t1 = gsap.timeline();
        t1.to(".hero-info-title", {
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
            .to(".info-section", {
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
    if (window.innerWidth > 768) {
        const cursor = document.querySelector(".cursor");
        const cursorFollower = document.querySelector(".cursor-follower");
        document.addEventListener("mousemove", (e) => {
            gsap.to(cursor, {
                x: e.clientX - 5,
                y: e.clientY - 5,
                duration: 0.1,
            })

            gsap.to(cursorFollower, {
                x: e.clientX - 15,
                y: e.clientY - 15,
                duration: 0.2,
            })
        });
    }

    // scroll to View
    function scrollto(e, type) {
        const link = e.target.closest(type);
        if (!link) return;

        e.preventDefault();

        const targetId = link.getAttribute('data-target'); // get the value of clicked opiton
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            }); // smooth scroll to the section
        }
    }
    document.querySelectorAll('.nav-link a').forEach((navLink) => {
        navLink.addEventListener('click', (e) => scrollto(e, 'a[data-target]')); // Same as in the nav bar options
    });
    document.querySelector('.hero-info-btn').addEventListener('click', (e) => {
        scrollto(e, 'a[data-target]')
    });

    // Active Link on Scroll
    const desktopNavLinks = document.querySelectorAll('header .nav-link a');
    const sidebarNavLinks = document.querySelectorAll('.sidebar .nav-link a');
    const allNavLinks = [...desktopNavLinks, ...sidebarNavLinks]; // Combine node lists for simplicity

    const navObserverCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                allNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-target') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const navObserverOptions = {
        rootMargin: "-45% 0px -45% 0px"
    };

    const navObserver = new IntersectionObserver(navObserverCallback, navObserverOptions);

    const uniqueTargets = new Set();
    allNavLinks.forEach(link => {
        uniqueTargets.add(link.getAttribute('data-target'));
    });

    uniqueTargets.forEach(targetId => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            navObserver.observe(targetElement);
        }
    });


    // Sidebar 
    const sidebar = document.querySelector(".sidebar");
    const toggle = document.querySelector(".toggle");

    function sidebarShow() {
        const isClosed = sidebar.classList.contains("close-sidebar");
        sidebar.classList.toggle("close-sidebar", !isClosed);
        sidebar.classList.toggle("open-sidebar", isClosed);
        toggle.classList.toggle("bx-menu", !isClosed);
        toggle.classList.toggle("bx-x", isClosed);
    }
    toggle.addEventListener("click", sidebarShow);
    document.querySelectorAll('.sidebar .nav-link a').forEach(link => {
        link.addEventListener('click', sidebarShow);
    });

    // Reveal on Scroll Animation
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // this make animate only once
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% visible
    });

    document.querySelectorAll('.autoDisplay, .fadein-left, .Designer, .coder').forEach(i => revealObserver.observe(i));

    // Top scroll button
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (scrollToTopBtn) {
        window.onscroll = function () {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        };
        scrollToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Contact form process
    const form = document.getElementById("contact-form");
    if (form) {
        const formStatus = document.getElementById("form-status");
        async function handleSubmit(event) {
            event.preventDefault();
            const data = new FormData(event.target);

            fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    formStatus.innerHTML = "Thanks for your submission! I'll get back to you soon.";
                    formStatus.classList.add('success');
                    form.reset();
                    form.style.display = "none";
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            formStatus.innerHTML = "Oops! There was a problem submitting your form.";
                        }
                        formStatus.classList.add('error');
                    })
                }
            }).catch(error => {
                formStatus.innerHTML = "Oops! There was a problem submitting your form.";
                formStatus.classList.add('error');
            });
        }
        form.addEventListener("submit", handleSubmit);
    }

});

// Project Disclaimer alert
function disclaimer() {
    alert("This may take some while to open or work because of hosting. you can check the working in console or ignore.")
}