const signUpButton = document.getElementById('sign-up-btn');
const signInButton = document.getElementById('sign-in-btn');
const container = document.querySelector('.container');

// 3D Hover Effects
const forms = document.querySelectorAll('.form-box');
forms.forEach(form => {
    form.addEventListener('mousemove', (e) => {
        const rect = form.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        form.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    form.addEventListener('mouseleave', () => {
        form.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Form Toggle Animation
signUpButton.addEventListener('click', () => {
    container.classList.add('sign-up-mode');
    createParticleEffect();
});

signInButton.addEventListener('click', () => {
    container.classList.remove('sign-up-mode');
    createParticleEffect();
});

// Particle Effect on Transition
function createParticleEffect() {
    const particles = [];
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#667eea';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        document.body.appendChild(particle);
        
        // Animate particle
        particle.animate([
            { transform: 'scale(0) rotate(0deg)', opacity: 1 },
            { transform: 'scale(1) rotate(180deg)', opacity: 0.8 },
            { transform: 'scale(0) rotate(360deg)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            particle.remove();
        };
    }
}

// Input Focus Effects
const inputs = document.querySelectorAll('.input-group input');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Dynamic Background Animation
function animateBackground() {
    const background = document.querySelector('.animated-background');
    const hue = Date.now() * 0.01;
    background.style.background = `linear-gradient(135deg, 
        hsl(${hue % 360}, 70%, 60%) 0%, 
        hsl(${(hue + 60) % 360}, 70%, 60%) 100%)`;
    
    requestAnimationFrame(animateBackground);
}

animateBackground();

// Form Submission with Loading Effect
const authButtons = document.querySelectorAll('.auth-btn');
authButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Loading animation
        const originalText = button.textContent;
        button.textContent = 'Processing...';
        button.style.background = 'linear-gradient(45deg, #999, #666)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            
            // Success effect
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        }, 2000);
    });
});
