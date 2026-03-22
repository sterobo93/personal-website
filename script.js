// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        const icon = mobileBtn.querySelector('i');
        if (mobileNav.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });
}

// Form Submission Simulation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Original button text
        const originalText = submitBtn.innerText;

        // Simulate loading state
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;

            // Show success message
            if (formSuccess) formSuccess.style.display = 'block';

            // Hide success message after 5 seconds
            setTimeout(() => {
                if (formSuccess) formSuccess.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}

// Scroll Reveal Animation Builder
const revealElements = document.querySelectorAll('section > .container > div, .service-card, .grid-img');

// Add reveal class to elements
revealElements.forEach(el => {
    // Exclude hero container elements and the contact section from auto-reveal to prevent scroll-jump/clipping
    if (!el.parentElement.classList.contains('hero-container') && !el.classList.contains('bg-glow') && !el.closest('.contact')) {
        el.classList.add('reveal');
    }
});

// Intersection Observer for scroll animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing once revealed
            // revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px"
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Services Interactivity
const servicesData = [
    {
        id: 0,
        title: "Facebook & LinkedIn Ads",
        desc: "Drive targeted traffic and generate leads with highly optimised Facebook and LinkedIn advertising campaigns tailored to your specific business goals.",
        icon: "fa-bullseye",
        tags: ["Targeted Traffic", "Lead Generation", "Campaign Optimisation"]
    },
    {
        id: 1,
        title: "Social Media Management",
        desc: "Build a loyal following and increase brand awareness through engaging organic content and consistent community management across your social media profiles.",
        icon: "fa-users",
        tags: ["Community Building", "Content Creation", "Brand Awareness"]
    },
    {
        id: 2,
        title: "Digital PR Campaigns",
        desc: "Secure high-authority backlinks and press coverage in top-tier publications to build brand credibility, improve search engine rankings, and drive qualified referral traffic.",
        icon: "fa-globe",
        tags: ["Media Coverage", "Brand Authority", "Quality Backlinks"]
    },
    {
        id: 3,
        title: "Content Strategy & Copywriting",
        desc: "Establish industry authority and engage your target audience with compelling, SEO-optimised blog content and a clear, unified brand voice across all your digital channels.",
        icon: "fa-pen-nib",
        tags: ["Brand Voice", "SEO Optimised", "Conversion Copy"]
    },
    {
        id: 4,
        title: "Website Creation",
        desc: "Are you looking for a professional brochure or lead-generation website? I specialise in helping local businesses create custom, bespoke websites tailored to fit your budget and needs.",
        icon: "fa-laptop-code",
        tags: ["Custom Design", "Fully Responsive", "Modern Layout"]
    },
    {
        id: 5,
        title: "Video Editing",
        desc: "Capture your audience with high-quality video tailored to any platform. I specialise in high-impact short-form content for TikTok, Reels, and Shorts, alongside polished long-form production for YouTube.",
        icon: "fa-video",
        tags: ["Short-Form", "Long-Form", "Platform Optimised"]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const serviceItems = document.querySelectorAll('.service-item');
    const detailCard = document.getElementById('serviceDetailsCard');
    const detailTitle = document.getElementById('serviceDetailTitle');
    const detailDesc = document.getElementById('serviceDetailDesc');
    const detailIcon = document.getElementById('serviceIcon');
    const detailTags = document.getElementById('serviceTags');

    if(serviceItems.length > 0) {
        serviceItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all
                serviceItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked
                this.classList.add('active');
                
                const id = parseInt(this.getAttribute('data-id'));
                const data = servicesData[id];

                // Animate Out
                detailCard.classList.remove('fade-in');
                detailCard.classList.add('fade-out');

                setTimeout(() => {
                    // Update Content
                    detailTitle.textContent = data.title;
                    detailDesc.textContent = data.desc;
                    detailIcon.innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
                    
                    // Update Tags
                    detailTags.innerHTML = '';
                    data.tags.forEach(tag => {
                        const span = document.createElement('span');
                        span.className = 'tag';
                        span.textContent = tag;
                        detailTags.appendChild(span);
                    });

                    // Animate In
                    detailCard.classList.remove('fade-out');
                    detailCard.classList.add('fade-in');

                    // Scroll to card on mobile
                    if (window.innerWidth <= 860) {
                        const y = detailCard.getBoundingClientRect().top + window.scrollY - 100;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                }, 200);
            });
        });
    }
// About Text Read More Toggle
    const aboutReadMoreBtn = document.getElementById('aboutReadMoreBtn');
    const aboutTextMore = document.getElementById('aboutTextMore');

    if (aboutReadMoreBtn && aboutTextMore) {
        aboutReadMoreBtn.addEventListener('click', () => {
            aboutTextMore.classList.toggle('expanded');
            
            if (aboutTextMore.classList.contains('expanded')) {
                aboutReadMoreBtn.innerHTML = 'Read Less <i class="fa-solid fa-chevron-up ms-1"></i>';
            } else {
                aboutReadMoreBtn.innerHTML = 'Read More <i class="fa-solid fa-chevron-down ms-1"></i>';
            }
        });
    }
    // Testimonial Toggle
    const testimonialBtns = document.querySelectorAll('.testimonial-read-more');
     testimonialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.previousElementSibling;
            if (content && content.classList.contains('testimonial-content')) {
                content.classList.toggle('expanded');
                btn.textContent = content.classList.contains('expanded') ? 'Read less' : 'Read more';
            }
        });
    });

    // Results Section Tab Switching
    const tabBtns = document.querySelectorAll('.results-tab-btn');
    const grids = document.querySelectorAll('.results-grid');

    if(tabBtns.length > 0 && grids.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                grids.forEach(grid => grid.classList.remove('active'));
                
                const targetId = btn.getAttribute('data-tab');
                const targetGrid = document.getElementById(targetId);
                if(targetGrid) {
                    targetGrid.classList.add('active');
                }
            });
        });
    }
});
