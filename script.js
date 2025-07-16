// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initParticles();
    initButtonHandlers();
});

// Generate floating particles
function initParticles() {
    const particlesContainer = document.getElementById('particles-container');
    
    // Create 8 particles
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = `absolute w-1 h-1 rounded-full animate-float ${i % 2 === 0 ? 'bg-blue-400' : 'bg-orange-400'}`;
        
        // Random positioning
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${i * 0.5}s`;
        particle.style.animationDuration = `${4 + Math.random() * 2}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Handle button clicks
function initButtonHandlers() {
    const googlePlayBtn = document.getElementById('google-play-btn');
    const appStoreBtn = document.getElementById('app-store-btn');
    
    // Google Play button handler
    googlePlayBtn.addEventListener('click', function() {
        handleGooglePlay();
    });
    
    // App Store button handler
    appStoreBtn.addEventListener('click', function() {
        handleAppStore();
    });
    
    // Add hover effects for better interactivity
    addHoverEffects();
}

// Google Play store handler
function handleGooglePlay() {
    window.open("https://play.google.com/store", "_blank", "noopener,noreferrer");
}

// App Store handler
function handleAppStore() {
    window.open("https://apps.apple.com", "_blank", "noopener,noreferrer");
}

// Add enhanced hover effects
function addHoverEffects() {
    const buttons = document.querySelectorAll('#google-play-btn, #app-store-btn');
    
    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            createRippleEffect(e, button);
        });
        
        // Add subtle glow effect on hover
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Create ripple effect on button click
function createRippleEffect(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '20';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS for ripple animation
function addRippleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add mouse trail effect
function addMouseTrail() {
    let mouseTrail = [];
    const maxTrailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        const trailDot = document.createElement('div');
        trailDot.className = 'absolute w-1 h-1 rounded-full bg-blue-400/50 pointer-events-none';
        trailDot.style.left = e.clientX + 'px';
        trailDot.style.top = e.clientY + 'px';
        trailDot.style.position = 'fixed';
        trailDot.style.zIndex = '1000';
        trailDot.style.transition = 'opacity 0.5s ease-out';
        
        document.body.appendChild(trailDot);
        
        // Fade out and remove
        setTimeout(() => {
            trailDot.style.opacity = '0';
            setTimeout(() => {
                if (trailDot.parentNode) {
                    trailDot.remove();
                }
            }, 500);
        }, 100);
    });
}

// Initialize additional effects
addRippleAnimation();
addMouseTrail();

// Add smooth scrolling for any anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.hash) {
        e.preventDefault();
        const target = document.querySelector(e.target.hash);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement && (focusedElement.id === 'google-play-btn' || focusedElement.id === 'app-store-btn')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});

// Add loading animation
window.addEventListener('load', function() {
    // Add a subtle fade-in effect for the main content
    const mainContent = document.querySelector('.container');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        mainContent.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Add intersection observer for performance optimization
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all animated elements
    document.querySelectorAll('.animate-pulse, .animate-float, .animate-shimmer').forEach(el => {
        observer.observe(el);
    });
}