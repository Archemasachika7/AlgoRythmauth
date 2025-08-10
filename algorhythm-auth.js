// Enhanced authentication page with AlgoRhythm theming
class AlgoRhythmAuth {
    constructor() {
        this.container = document.querySelector('.container');
        this.signUpBtn = document.getElementById('sign-up-btn');
        this.signInBtn = document.getElementById('sign-in-btn');
        this.cursorFollower = document.querySelector('.cursor-follower');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupCursorFollower();
        this.setupRevealAnimations();
        this.setupFormValidation();
        this.setupLoadingStates();
    }
    
    setupEventListeners() {
        this.signUpBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchToSignUp();
        });
        
        this.signInBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchToSignIn();
        });
        
        // Enhanced form interactions
        this.setupFormInteractions();
    }
    
    setupFormInteractions() {
        const inputs = document.querySelectorAll('.auth-input');
        
        inputs.forEach(input => {
            input.addEventListener('focus', this.handleInputFocus.bind(this));
            input.addEventListener('blur', this.handleInputBlur.bind(this));
            input.addEventListener('input', this.handleInputChange.bind(this));
        });
    }
    
    handleInputFocus(e) {
        const wrapper = e.target.closest('.input-wrapper');
        wrapper.classList.add('focused');
        
        // Add particle effect
        this.createInputParticles(wrapper);
    }
    
    handleInputBlur(e) {
        const wrapper = e.target.closest('.input-wrapper');
        if (!e.target.value) {
            wrapper.classList.remove('focused');
        }
    }
    
    handleInputChange(e) {
        const input = e.target;
        if (input.type === 'email') {
            this.validateEmail(input);
        } else if (input.type === 'password') {
            this.validatePassword(input);
        }
    }
    
    validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(input.value);
        this.updateInputValidation(input, isValid);
    }
    
    validatePassword(input) {
        const isValid = input.value.length >= 8;
        this.updateInputValidation(input, isValid);
    }
    
    updateInputValidation(input, isValid) {
        const wrapper = input.closest('.input-wrapper');
        wrapper.classList.toggle('valid', isValid);
        wrapper.classList.toggle('invalid', !isValid && input.value.length > 0);
    }
    
    createInputParticles(wrapper) {
        const rect = wrapper.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'input-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #F59E0B;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
            `;
            
            document.body.appendChild(particle);
            
            // Animate particle
            particle.animate([
                { 
                    transform: 'scale(0) translateY(0px)', 
                    opacity: 1 
                },
                { 
                    transform: 'scale(1) translateY(-20px)', 
                    opacity: 0.8 
                },
                { 
                    transform: 'scale(0) translateY(-40px)', 
                    opacity: 0 
                }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => particle.remove();
        }
    }
    
    switchToSignUp() {
        this.container.classList.add('sign-up-mode');
        this.createTransitionEffect();
        this.updateURL('signup');
    }
    
    switchToSignIn() {
        this.container.classList.remove('sign-up-mode');
        this.createTransitionEffect();
        this.updateURL('signin');
    }
    
    createTransitionEffect() {
        // Create code particles during transition
        const particles = [];
        const codeSymbols = ['{', '}', '(', ')', '[', ']', '<', '>', '/', '\\'];
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.textContent = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
            particle.style.cssText = `
                position: fixed;
                font-family: 'JetBrains Mono', monospace;
                font-size: 16px;
                color: #F59E0B;
                pointer-events: none;
                z-index: 9999;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
            `;
            
            document.body.appendChild(particle);
            particles.push(particle);
            
            // Animate particle
            particle.animate([
                { 
                    transform: 'scale(0) rotate(0deg)', 
                    opacity: 0 
                },
                { 
                    transform: 'scale(1) rotate(180deg)', 
                    opacity: 1 
                },
                { 
                    transform: 'scale(0) rotate(360deg)', 
                    opacity: 0 
                }
            ], {
                duration: 1500,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => particle.remove();
        }
    }
    
    setupCursorFollower() {
        if (!this.cursorFollower) return;
        
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Update CSS variables for cursor follower
            document.documentElement.style.setProperty('--mouse-x', mouseX + 'px');
            document.documentElement.style.setProperty('--mouse-y', mouseY + 'px');
        });
    }
    
    setupRevealAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                }
            });
        }, observerOptions);
        
        // Observe all reveal elements
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom')
            .forEach(el => observer.observe(el));
    }
    
    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        });
    }
    
    setupLoadingStates() {
        const authButtons = document.querySelectorAll('.btn-primary');
        
        authButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (e.target.closest('form')) {
                    this.showLoadingState(button);
                }
            });
        });
    }
    
    showLoadingState(button) {
        const originalText = button.innerHTML;
        button.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="relative z-10">Processing...</span>
        `;
        button.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            this.showSuccessMessage();
        }, 2000);
    }
    
    showSuccessMessage() {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        notification.textContent = 'Success! Welcome to AlgoRhythm!';
        
        document.body.appendChild(notification);
        
        // Animate in
        notification.animate([
            { transform: 'translateX(100%)', opacity: 0 },
            { transform: 'translateX(0)', opacity: 1 }
        ], {
            duration: 300,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.animate([
                { transform: 'translateX(0)', opacity: 1 },
                { transform: 'translateX(100%)', opacity: 0 }
            ], {
                duration: 300,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => notification.remove();
        }, 3000);
    }
    
    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Here you would typically send data to your backend
        console.log('Form submitted:', data);
        
        // Trigger loading state on submit button
        const submitButton = form.querySelector('.btn-primary');
        if (submitButton) {
            this.showLoadingState(submitButton);
        }
    }
    
    updateURL(mode) {
        // Update URL without page reload
        const url = new URL(window.location);
        url.searchParams.set('mode', mode);
        window.history.pushState({}, '', url);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AlgoRhythmAuth();
    
    // Check URL for initial mode
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    
    if (mode === 'signup') {
        document.querySelector('.container').classList.add('sign-up-mode');
    }
});

// Enhanced matrix rain effect
function enhanceMatrixRain() {
    const columns = document.querySelectorAll('.matrix-column');
    const codeChars = ['0', '1', '{', '}', '(', ')', '<', '>', '/', '\\', 'fn', 'if', '=='];
    
    columns.forEach(column => {
        const chars = [];
        for (let i = 0; i < 20; i++) {
            const char = document.createElement('span');
            char.textContent = codeChars[Math.floor(Math.random() * codeChars.length)];
            char.style.cssText = `
                position: absolute;
                top: ${i * 30}px;
                left: 0;
                color: #F59E0B;
                font-family: 'JetBrains Mono', monospace;
                font-size: 12px;
                opacity: ${Math.random() * 0.8 + 0.2};
            `;
            column.appendChild(char);
            chars.push(char);
        }
        
        // Animate characters
        setInterval(() => {
            chars.forEach(char => {
                if (Math.random() < 0.1) {
                    char.textContent = codeChars[Math.floor(Math.random() * codeChars.length)];
                    char.style.opacity = Math.random() * 0.8 + 0.2;
                }
            });
        }, 100);
    });
}

// Initialize matrix rain enhancement
setTimeout(enhanceMatrixRain, 1000);
