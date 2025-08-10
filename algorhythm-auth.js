// Enhanced authentication page with proper signup button functionality
class AlgoRhythmAuth {
    constructor() {
        this.container = document.querySelector('.container');
        this.signUpBtn = document.getElementById('sign-up-btn'); // Toggle panel button
        this.signInBtn = document.getElementById('sign-in-btn'); // Toggle panel button
        this.signupForm = document.querySelector('.signup form'); // Actual signup form
        this.signinForm = document.querySelector('.signin form'); // Actual signin form
        this.cursorFollower = document.querySelector('.cursor-follower');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupCursorFollower();
        this.setupRevealAnimations();
        this.setupFormValidation();
        this.setupLoadingStates();
        
        // Set initial state based on URL
        this.checkInitialState();
    }
    
    setupEventListeners() {
        // Toggle panel buttons (switch between forms)
        this.signUpBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchToSignUp();
        });
        
        this.signInBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchToSignIn();
        });
        
        // Form submissions (actual signup/signin)
        this.signupForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup(e.target);
        });
        
        this.signinForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignin(e.target);
        });
        
        // Enhanced form interactions
        this.setupFormInteractions();
    }
    
    // Handle actual signup form submission
    handleSignup(form) {
        const formData = new FormData(form);
        const data = {
            name: formData.get('name') || form.querySelector('input[type="text"]')?.value,
            email: formData.get('email') || form.querySelector('input[type="email"]')?.value,
            password: formData.get('password') || form.querySelector('input[type="password"]')?.value,
            confirmPassword: formData.get('confirmPassword') || form.querySelectorAll('input[type="password"]')[1]?.value
        };
        
        // Validate signup data
        if (!this.validateSignupData(data)) {
            return;
        }
        
        // Show loading state
        const submitButton = form.querySelector('.btn-primary');
        this.showLoadingState(submitButton, 'Creating Account...');
        
        // Simulate API call for signup
        this.simulateSignupAPI(data)
            .then(() => {
                this.showSuccessMessage('Account created successfully! Welcome to AlgoRhythm!');
                this.transitionToWelcome();
            })
            .catch((error) => {
                this.showErrorMessage(error.message);
                this.resetButtonState(submitButton, 'Create Account');
            });
    }
    
    // Handle actual signin form submission
    handleSignin(form) {
        const formData = new FormData(form);
        const data = {
            email: formData.get('email') || form.querySelector('input[type="email"]')?.value,
            password: formData.get('password') || form.querySelector('input[type="password"]')?.value
        };
        
        // Validate signin data
        if (!this.validateSigninData(data)) {
            return;
        }
        
        // Show loading state
        const submitButton = form.querySelector('.btn-primary');
        this.showLoadingState(submitButton, 'Signing In...');
        
        // Simulate API call for signin
        this.simulateSigninAPI(data)
            .then(() => {
                this.showSuccessMessage('Welcome back to AlgoRhythm!');
                this.transitionToDashboard();
            })
            .catch((error) => {
                this.showErrorMessage(error.message);
                this.resetButtonState(submitButton, 'Sign In');
            });
    }
    
    // Validate signup form data
    validateSignupData(data) {
        if (!data.name || data.name.trim().length < 2) {
            this.showErrorMessage('Please enter a valid name (at least 2 characters)');
            return false;
        }
        
        if (!this.isValidEmail(data.email)) {
            this.showErrorMessage('Please enter a valid email address');
            return false;
        }
        
        if (!data.password || data.password.length < 8) {
            this.showErrorMessage('Password must be at least 8 characters long');
            return false;
        }
        
        if (data.password !== data.confirmPassword) {
            this.showErrorMessage('Passwords do not match');
            return false;
        }
        
        return true;
    }
    
    // Validate signin form data
    validateSigninData(data) {
        if (!this.isValidEmail(data.email)) {
            this.showErrorMessage('Please enter a valid email address');
            return false;
        }
        
        if (!data.password || data.password.length < 1) {
            this.showErrorMessage('Please enter your password');
            return false;
        }
        
        return true;
    }
    
    // Email validation helper
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Simulate signup API call
    simulateSignupAPI(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate some validation
                if (data.email === 'test@test.com') {
                    reject(new Error('Email already exists. Please use a different email.'));
                } else {
                    resolve({ success: true, user: data });
                }
            }, 2000);
        });
    }
    
    // Simulate signin API call  
    simulateSigninAPI(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate authentication
                if (data.email === 'wrong@email.com') {
                    reject(new Error('Invalid email or password. Please try again.'));
                } else {
                    resolve({ success: true, user: data });
                }
            }, 1500);
        });
    }
    
    // Transition animations after successful signup/signin
    transitionToWelcome() {
        this.createSuccessTransition(() => {
            // Redirect to welcome page or dashboard
            console.log('Redirecting to welcome page...');
            // window.location.href = '/welcome';
        });
    }
    
    transitionToDashboard() {
        this.createSuccessTransition(() => {
            // Redirect to dashboard
            console.log('Redirecting to dashboard...');
            // window.location.href = '/dashboard';
        });
    }
    
    // Create success transition effect
    createSuccessTransition(callback) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'success-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #F59E0B, #D97706);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
        `;
        
        // Create success content
        const content = document.createElement('div');
        content.innerHTML = `
            <div style="text-align: center; color: white;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
                <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">Success!</h2>
                <p style="font-size: 1.2rem; opacity: 0.9;">Welcome to AlgoRhythm</p>
            </div>
        `;
        
        overlay.appendChild(content);
        document.body.appendChild(overlay);
        
        // Animate overlay in
        overlay.style.pointerEvents = 'all';
        overlay.animate([
            { opacity: 0, transform: 'scale(0.8)' },
            { opacity: 1, transform: 'scale(1)' }
        ], {
            duration: 500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards'
        });
        
        // Execute callback after animation
        setTimeout(() => {
            if (callback) callback();
            
            // Remove overlay
            setTimeout(() => {
                overlay.animate([
                    { opacity: 1 },
                    { opacity: 0 }
                ], {
                    duration: 300,
                    easing: 'ease-out'
                }).onfinish = () => overlay.remove();
            }, 1500);
        }, 1000);
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
        wrapper?.classList.add('focused');
        this.createInputParticles(wrapper);
    }
    
    handleInputBlur(e) {
        const wrapper = e.target.closest('.input-wrapper');
        if (!e.target.value) {
            wrapper?.classList.remove('focused');
        }
    }
    
    handleInputChange(e) {
        const input = e.target;
        if (input.type === 'email') {
            this.validateEmailInput(input);
        } else if (input.type === 'password') {
            this.validatePasswordInput(input);
        }
    }
    
    validateEmailInput(input) {
        const isValid = this.isValidEmail(input.value);
        this.updateInputValidation(input, isValid);
    }
    
    validatePasswordInput(input) {
        const isValid = input.value.length >= 8;
        this.updateInputValidation(input, isValid);
    }
    
    updateInputValidation(input, isValid) {
        const wrapper = input.closest('.input-wrapper');
        wrapper?.classList.toggle('valid', isValid);
        wrapper?.classList.toggle('invalid', !isValid && input.value.length > 0);
    }
    
    createInputParticles(wrapper) {
        if (!wrapper) return;
        
        const rect = wrapper.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
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
            
            particle.animate([
                { transform: 'scale(0) translateY(0px)', opacity: 1 },
                { transform: 'scale(1) translateY(-20px)', opacity: 0.8 },
                { transform: 'scale(0) translateY(-40px)', opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => particle.remove();
        }
    }
    
    createTransitionEffect() {
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
            
            particle.animate([
                { transform: 'scale(0) rotate(0deg)', opacity: 0 },
                { transform: 'scale(1) rotate(180deg)', opacity: 1 },
                { transform: 'scale(0) rotate(360deg)', opacity: 0 }
            ], {
                duration: 1500,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => particle.remove();
        }
    }
    
    setupCursorFollower() {
        if (!this.cursorFollower) return;
        
        document.addEventListener('mousemove', (e) => {
            document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
            document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
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
        
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom')
            .forEach(el => observer.observe(el));
    }
    
    setupFormValidation() {
        // This is now handled in individual form submit handlers
    }
    
    setupLoadingStates() {
        // This is now handled in form submission methods
    }
    
    showLoadingState(button, text = 'Processing...') {
        if (!button) return;
        
        button.dataset.originalText = button.innerHTML;
        button.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-current inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="relative z-10">${text}</span>
        `;
        button.disabled = true;
        button.style.opacity = '0.8';
    }
    
    resetButtonState(button, text) {
        if (!button) return;
        
        button.innerHTML = button.dataset.originalText || text;
        button.disabled = false;
        button.style.opacity = '1';
    }
    
    showSuccessMessage(message) {
        this.showNotification(message, 'success');
    }
    
    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
        
        notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-sm`;
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                    ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
                </div>
                <div class="flex-1">
                    <p class="text-sm font-medium">${message}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        notification.animate([
            { transform: 'translateX(100%)', opacity: 0 },
            { transform: 'translateX(0)', opacity: 1 }
        ], {
            duration: 300,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        // Remove after delay
        const delay = type === 'error' ? 5000 : 3000;
        setTimeout(() => {
            notification.animate([
                { transform: 'translateX(0)', opacity: 1 },
                { transform: 'translateX(100%)', opacity: 0 }
            ], {
                duration: 300,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => notification.remove();
        }, delay);
    }
    
    updateURL(mode) {
        const url = new URL(window.location);
        url.searchParams.set('mode', mode);
        window.history.pushState({}, '', url);
    }
    
    checkInitialState() {
        const urlParams = new URLSearchParams(window.location.search);
        const mode = urlParams.get('mode');
        
        if (mode === 'signup') {
            this.container.classList.add('sign-up-mode');
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AlgoRhythmAuth();
});

// Add CSS for spinner animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .animate-spin {
        animation: spin 1s linear infinite;
    }
    
    .input-wrapper.valid .auth-input {
        border-color: #10B981;
        background: rgba(16, 185, 129, 0.1);
    }
    
    .input-wrapper.invalid .auth-input {
        border-color: #EF4444;
        background: rgba(239, 68, 68, 0.1);
    }
`;
document.head.appendChild(style);
