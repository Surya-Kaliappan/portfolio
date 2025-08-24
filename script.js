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
    
    const targetId = link.getAttribute('data-target');  // get the value of clicked opiton
    const targetElement = document.getElementById(targetId);
    
    if(targetElement){
        targetElement.scrollIntoView({behavior: 'smooth'});  // smooth scroll to the section
    }
}
document.querySelectorAll('.nav-link').forEach((navLink) => {
    navLink.addEventListener('click', (e) => scrollto(e, 'a[data-target]')); // Same as in the nav bar options
});
document.querySelector('.hero-info-btn').addEventListener('click', (e)=>{scrollto(e, 'a[data-target]')});

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
        observer.unobserve(entry.target); // animate only once
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

function disclaimer(){
    alert("This may take some while to open or work because of hosting. you can check the working in console or ignore.")
}

// Top scroll button
let scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
scrollToTopBtn.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scroll
  });
});

// Get the form and the status message div
var form = document.getElementById("contact-form");
var formStatus = document.getElementById("form-status"); // Changed variable name from "status" to "formStatus"

// This function will be called when the form is submitted
async function handleSubmit(event) {
    // Prevent the form from reloading the page
    event.preventDefault();
    
    var data = new FormData(event.target);

    // Send the form data to Formspree
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        // If the submission was successful
        if (response.ok) {
            formStatus.innerHTML = "Thanks for your submission! I'll get back to you soon."; // Use new variable name
            formStatus.classList.add('success'); // Use new variable name
            form.reset(); // Clear the form fields
            form.style.display = "none"; // Hide the form
        } else {
            // If there was a server error
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    formStatus.innerHTML = "Oops! There was a problem submitting your form.";
                }
                formStatus.classList.add('error'); // Use new variable name
            })
        }
    }).catch(error => {
        // If there was a network error
        formStatus.innerHTML = "Oops! There was a problem submitting your form.";
        formStatus.classList.add('error'); // Use new variable name
    });
}

// Add the submit event listener to the form
form.addEventListener("submit", handleSubmit);