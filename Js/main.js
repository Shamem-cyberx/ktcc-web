document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.display = 'none';
        });
    }

    // Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuBtn.innerHTML = nav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Logo Click to Home Page
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '/'; // Adjust to 'index.html' if needed
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }

    //---------------------------- Services navbar-Dropdown Toggle for Mobile-----------------//
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Prevent default navigation for toggle
                const dropdown = toggle.parentElement;
                const isActive = dropdown.classList.contains('active');
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown').forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active', !isActive);
            }
        });
    });

    // Close mobile menu when clicking on a non-dropdown link
    const navLinks = document.querySelectorAll('nav ul li a:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
                // Close all dropdowns
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 90,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Hero Section Video Lazy Load
    const videos = document.querySelectorAll('.hero-video, .card-video');
    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const videoElement = entry.target;
                videoElement.play();
                observer.unobserve(videoElement);
            }
        });
    }, { threshold: 0.1 });

    videos.forEach(video => videoObserver.observe(video));





    //------------------------- PROJECT HOMEPAGE SECTION SLIDER------------------------------------------------//
    const projectSlider = document.querySelector('.project-slider');
    const projectSlides = document.querySelectorAll('.project-slide');
    const projectPrev = document.querySelector('.project-prev');
    const projectNext = document.querySelector('.project-next');
    const projectDotsContainer = document.querySelector('.project-dots');
    
    if (projectSlider && projectSlides.length > 0) {
        projectSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('project-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            projectDotsContainer.appendChild(dot);
        });
        
        const projectDots = document.querySelectorAll('.project-dot');
        let currentSlide = 0;
        
        function goToSlide(slideIndex) {
            projectSlides.forEach((slide, index) => {
                slide.style.transform = `translateX(-${slideIndex * 100}%)`;
                projectDots[index].classList.remove('active');
            });
            projectDots[slideIndex].classList.add('active');
            currentSlide = slideIndex;
        }
        
        if (projectNext) {
            projectNext.addEventListener('click', () => {
                if (currentSlide === projectSlides.length - 1) {
                    goToSlide(0);
                } else {
                    goToSlide(currentSlide + 1);
                }
            });
        }
        
        if (projectPrev) {
            projectPrev.addEventListener('click', () => {
                if (currentSlide === 0) {
                    goToSlide(projectSlides.length - 1);
                } else {
                    goToSlide(currentSlide - 1);
                }
            });
        }
        
        setInterval(() => {
            if (currentSlide === projectSlides.length - 1) {
                goToSlide(0);
            } else {
                goToSlide(currentSlide + 1);
            }
        }, 5000);
    }






    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    const testimonialDotsContainer = document.querySelector('.testimonial-dots');
    
    if (testimonialSlider && testimonialSlides.length > 0) {
        testimonialSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToTestimonialSlide(index);
            });
            testimonialDotsContainer.appendChild(dot);
        });
        
        const testimonialDots = document.querySelectorAll('.testimonial-dot');
        let currentTestimonialSlide = 0;
        
        function goToTestimonialSlide(slideIndex) {
            testimonialSlides.forEach((slide, index) => {
                slide.style.transform = `translateX(-${slideIndex * 100}%)`;
                testimonialDots[index].classList.remove('active');
            });
            testimonialDots[slideIndex].classList.add('active');
            currentTestimonialSlide = slideIndex;
        }
        
        if (testimonialNext) {
            testimonialNext.addEventListener('click', () => {
                if (currentTestimonialSlide === testimonialSlides.length - 1) {
                    goToTestimonialSlide(0);
                } else {
                    goToTestimonialSlide(currentTestimonialSlide + 1);
                }
            });
        }
        
        if (testimonialPrev) {
            testimonialPrev.addEventListener('click', () => {
                if (currentTestimonialSlide === 0) {
                    goToTestimonialSlide(testimonialSlides.length - 1);
                } else {
                    goToTestimonialSlide(currentTestimonialSlide - 1);
                }
            });
        }
        
        setInterval(() => {
            if (currentTestimonialSlide === testimonialSlides.length - 1) {
                goToTestimonialSlide(0);
            } else {
                goToTestimonialSlide(currentTestimonialSlide + 1);
            }
        }, 6000);
    }




  //---------------------------------------------------------------------------------------------------//
    // Mini Contact CTA Animation
function animateCTAWords() {
    const words = document.querySelectorAll('.cta-word');
    if (words.length > 0) {
        words.forEach((word, index) => {
            word.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    animateCTAWords();
    
    // Add hover effect to CTA button
    const ctaBtn = document.querySelector('.btn-cta');
    if (ctaBtn) {
        const icon = ctaBtn.querySelector('i');
        if (icon) {
            ctaBtn.addEventListener('mouseenter', function() {
                icon.style.transform = 'translateX(5px)';
            });
            
            ctaBtn.addEventListener('mouseleave', function() {
                icon.style.transform = 'translateX(0)';
            });
        }
    }
});




















    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will contact you soon.');
            this.reset();
        });
    }

    // Team Section Animation
    const teamMembers = document.querySelectorAll('.team-member');
    const teamObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.2 }
    );
    teamMembers.forEach((member) => {
        teamObserver.observe(member);
    });



    
    //------------------------- Service Cards in HOMEPAGE Tilt Effect--------------------//
const serviceCards = document.querySelectorAll('.service-card');

// Check if device supports touch (mobile)
const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

serviceCards.forEach(card => {
    if (!isTouchDevice()) {
        // Apply mousemove effect only on non-touch devices
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const xAxis = (rect.width / 2 - (e.clientX - rect.left)) / 20;
            const yAxis = (rect.height / 2 - (e.clientY - rect.top)) / 20;
            card.style.transform = `translateY(-15px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.2s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'all 0.5s ease';
            card.style.transform = 'translateY(-15px) rotateY(0deg) rotateX(0deg)';
        });
    }
});

// Animate Service Highlights on Scroll
const animateServiceHighlights = () => {
    const highlights = document.querySelectorAll('.service-highlights span');
    highlights.forEach((highlight, index) => {
        setTimeout(() => {
            highlight.style.transform = 'translateY(0)';
            highlight.style.opacity = '1';
        }, index * 100); // Reduced delay for faster mobile animation
    });
};

const servicesSection = document.querySelector('.services');
if (servicesSection) {
    const servicesObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateServiceHighlights();
            servicesObserver.unobserve(entries[0].target);
        }
    }, { threshold: 0.5 }); // Increased threshold for mobile
    servicesObserver.observe(servicesSection);

    const serviceHighlights = document.querySelectorAll('.service-highlights span');
    serviceHighlights.forEach(highlight => {
        highlight.style.transform = 'translateY(30px)';
        highlight.style.opacity = '0';
        highlight.style.transition = 'all 0.6s ease';
    });
}
    
    //----------------------------------- Client Testimonials Section------------------//
    const clientTrack = document.querySelector('.client-track');
    const clientLogos = document.querySelectorAll('.client-logo');
    let isPaused = false;
    
    if (clientTrack && clientLogos.length > 0) {
        clientLogos.forEach(logo => {
            const clone = logo.cloneNode(true);
            clientTrack.appendChild(clone);
        });
        
        clientTrack.addEventListener('mouseenter', () => {
            isPaused = true;
            clientTrack.style.animationPlayState = 'paused';
        });
        
        clientTrack.addEventListener('mouseleave', () => {
            isPaused = false;
            clientTrack.style.animationPlayState = 'running';
        });
    }

    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.nav-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    if (dotsContainer && testimonialCards.length > 0) {
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToTestimonial(index);
            });
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.dot');
        
        function goToTestimonial(index) {
            testimonialCards.forEach(card => card.classList.remove('active'));
            testimonialCards[index].classList.add('active');
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            currentIndex = index;
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
                goToTestimonial(currentIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % testimonialCards.length;
                goToTestimonial(currentIndex);
            });
        }
        
        setInterval(() => {
            if (!isPaused) {
                currentIndex = (currentIndex + 1) % testimonialCards.length;
                goToTestimonial(currentIndex);
            }
        }, 6000);
    }

    if (clientLogos.length > 0) {
        clientLogos.forEach(logo => {
            logo.addEventListener('mousemove', (e) => {
                if (isPaused) {
                    const rect = logo.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const angleX = (y - centerY) / 10;
                    const angleY = (centerX - x) / 10;
                    logo.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
                }
            });
            
            logo.addEventListener('mouseleave', () => {
                logo.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    const animateClientsSection = () => {
        const clientLogos = document.querySelectorAll('.client-logo');
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        
        clientLogos.forEach((logo, index) => {
            setTimeout(() => {
                logo.style.opacity = '1';
                logo.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        testimonialCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200 + 500);
        });
    };
    
    const clientsSection = document.querySelector('.clients-section');
    if (clientsSection) {
        const clientsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateClientsSection();
                clientsObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.2 });
        clientsObserver.observe(clientsSection);
        
        clientLogos.forEach(logo => {
            logo.style.opacity = '0';
            logo.style.transform = 'translateY(30px)';
            logo.style.transition = 'all 0.5s ease';
        });
        
        testimonialCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.5s ease';
        });
    }







    // Initialize Wow.js for animations
    new WOW().init();
});




//----------------------------------------------INSIDE PROJECTS PAGE----------------------//
// Inside Projects Filter Functionality - Corrected Version
document.addEventListener('DOMContentLoaded', function() {
    const insideFilterButtons = document.querySelectorAll('.inside-filter-btn');
    const insideProjectCards = document.querySelectorAll('.inside-project-card');

    // Filter Functionality
    insideFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            insideFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            insideProjectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'flex';
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Initialize with all projects visible
    if (insideFilterButtons[0]) {
        insideFilterButtons[0].click();
    }

    // Project Card Animation on Scroll
    const insideProjectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || '0s';
                entry.target.style.animationDelay = delay;
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    insideProjectCards.forEach(card => {
        insideProjectObserver.observe(card);
    });

    // Touch Interaction for Mobile
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice()) {
        insideProjectCards.forEach(card => {
            card.addEventListener('touchstart', function(e) {
                // Prevent default to avoid immediate link follow on first tap
                e.preventDefault();
                
                // Remove touched class from all cards
                insideProjectCards.forEach(otherCard => otherCard.classList.remove('touched'));
                
                // Toggle touched class on tapped card
                this.classList.toggle('touched');
                
                // Allow link follow-through on second tap
                const link = this.querySelector('.inside-project-link');
                if (link && this.classList.contains('touched')) {
                    // Store the touch position to check if it's a true tap
                    const touch = e.touches[0];
                    const startX = touch.clientX;
                    const startY = touch.clientY;

                    const touchEndHandler = (endEvent) => {
                        const endTouch = endEvent.changedTouches[0];
                        const endX = endTouch.clientX;
                        const endY = endTouch.clientY;

                        // Check if touch moved significantly (to avoid swipes)
                        if (Math.abs(endX - startX) < 10 && Math.abs(endY - startY) < 10) {
                            // If already touched, follow link on second tap
                            if (this.classList.contains('touched')) {
                                link.click();
                            }
                        }
                        this.removeEventListener('touchend', touchEndHandler);
                    };
                    
                    this.addEventListener('touchend', touchEndHandler);
                }
            });
        });
    }
});




//----------------------------------------------INSIDE SERVICES PAGE----------------------//

        document.addEventListener('DOMContentLoaded', function() {
            // Category Switching
            const categoryBtns = document.querySelectorAll('.inside-category-btn');
            const serviceContents = document.querySelectorAll('.inside-service-content');

            categoryBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const category = this.dataset.category;
                    
                    // Update active category button
                    categoryBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Show corresponding content
                    serviceContents.forEach(content => {
                        content.classList.remove('active');
                        if (content.id === `${category}-content`) {
                            content.classList.add('active');
                        }
                    });
                });
            });

            // Initialize all sliders
            const sliders = document.querySelectorAll('.inside-service-slider');
            
            sliders.forEach(slider => {
                const track = slider.querySelector('.slider-track');
                const slides = slider.querySelectorAll('.slider-slide');
                const dots = slider.querySelectorAll('.slider-dot');
                const prevBtn = slider.querySelector('.prev');
                const nextBtn = slider.querySelector('.next');
                
                let currentIndex = 0;
                const slideCount = slides.length;
                
                // Set initial positions
                updateSlider();
                
                // Dot navigation
                dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        currentIndex = index;
                        updateSlider();
                    });
                });
                
                // Arrow navigation
                if (prevBtn) {
                    prevBtn.addEventListener('click', () => {
                        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slideCount - 1;
                        updateSlider();
                    });
                }
                
                if (nextBtn) {
                    nextBtn.addEventListener('click', () => {
                        currentIndex = (currentIndex < slideCount - 1) ? currentIndex + 1 : 0;
                        updateSlider();
                    });
                }
                
                // Auto-advance
                let autoSlide = setInterval(() => {
                    currentIndex = (currentIndex < slideCount - 1) ? currentIndex + 1 : 0;
                    updateSlider();
                }, 5000);
                
                // Pause on hover
                slider.addEventListener('mouseenter', () => {
                    clearInterval(autoSlide);
                });
                
                slider.addEventListener('mouseleave', () => {
                    autoSlide = setInterval(() => {
                        currentIndex = (currentIndex < slideCount - 1) ? currentIndex + 1 : 0;
                        updateSlider();
                    }, 5000);
                });
                
                function updateSlider() {
                    // Update track position
                    track.style.transform = `translateX(-${currentIndex * 100}%)`;
                    
                    // Update dots
                    dots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === currentIndex);
                    });
                }
            });

            // Floating shapes animation
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach(shape => {
                const duration = Math.random() * 5 + 5;
                shape.style.animationDuration = `${duration}s`;
            });
        });