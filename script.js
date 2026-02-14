document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .achievement-item, .skill-item, .contact-card').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });

    const codeContent = document.querySelector('.code-content');
    if (codeContent) {
        const originalText = codeContent.innerHTML;
        let isTyping = false;
        
        codeContent.addEventListener('mouseenter', function() {
            if (isTyping) return;
            isTyping = true;
            
            const lines = codeContent.querySelectorAll('code');
            lines.forEach(function(line) {
                line.style.opacity = '0';
            });
            
            let delay = 0;
            lines.forEach(function(line, index) {
                setTimeout(function() {
                    line.style.transition = 'opacity 0.3s ease';
                    line.style.opacity = '1';
                    if (index === lines.length - 1) {
                        isTyping = false;
                    }
                }, delay);
                delay += 100;
            });
        });
    }

    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        window.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            
            heroVisual.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const achievementItems = document.querySelectorAll('.achievement-item');
    achievementItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            const medal = this.querySelector('.achievement-medal');
            if (medal) {
                medal.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const medal = this.querySelector('.achievement-medal');
            if (medal) {
                medal.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.project-icons');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.project-icons');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(function(btn) {
        btn.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--x', x + 'px');
            this.style.setProperty('--y', y + 'px');
        });
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        AOS.init({
            duration: 0,
            once: true,
            disable: true
        });
        
        document.querySelectorAll('.gradient-orb').forEach(function(orb) {
            orb.style.animation = 'none';
        });
    }

    console.log('%c👋 Hello, fellow developer!', 'font-size: 16px; font-weight: bold; color: #6366f1;');
    console.log('%cLooking for the source code? Check out the GitHub repo!', 'font-size: 12px; color: #a1a1aa;');
});
