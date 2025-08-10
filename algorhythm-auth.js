/**
 * AlgoRhythm Enhanced Authentication System
 * Modern 2025 Design with Advanced Animations
 */

class AlgoRhythmAuth {
    constructor() {
        this.container = document.querySelector('.container');
        this.loadingScreen = document.getElementById('loadingScreen');
        this.registerBtns = document.querySelectorAll('.register-btn');
        this.loginBtns = document.querySelectorAll('.login-btn');
        this.forms = document.querySelectorAll('form');
        this.inputs = document.querySelectorAll('.modern-input');
        this.passwordToggles = document.querySelectorAll('.password-toggle');
        
        this.isTransitioning = false;
        this.particleSystem = new ParticleSystem();
        this.soundSystem = new SoundSystem();
        
        this.init();
    }
    
    async init() {
        this.showLoadingScreen();
        await this.preloadAssets();
        
        this.setupEventListeners();
        this.setupCursorSystem();
        this.setupMatrixEnhancement();
        this.setupFormEnhancements();
        this.setupAnimations();
        
        await this.delay(2000);
        this.hideLoadingScreen();
    }
    
    preloadAssets() {
        return new Promise((resolve) => {
            // Simulate asset loading
            setTimeout(resolve, 1500);
        });
    }
    
    showLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.remove('hidden');
        }
    }
    
    hideLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('hidden');
            setTimeout(() => {
                this.loadingScreen.remove();
            }, 500);
        }
    }
    
    setupEventListeners() {
        // Form toggle buttons
        this.registerBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchToRegister();
            });
        });
        
        this.loginBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchToLogin();
            });
        });
        
        // Form submissions
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        });
        
        // Password toggles
        this.passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.togglePassword(toggle);
            });
        });
        
        // Social buttons
        document.querySelectorAll('.social-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSocialAuth(btn);
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                const activeForm = document.querySelector('.form-box:not([style*="visibility: hidden"]) form');
                if (activeForm) {
                    activeForm.dispatchEvent(new Event('submit'));
                }
            }
        });
    }
    
    switchToRegister() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.container.classList.add('active');
        this.particleSystem.createTransitionEffect('register');
        this.soundSystem.playTransition();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 1000);
    }
    
    switchToLogin() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.container.classList.remove('active');
        this.particleSystem.createTransitionEffect('login');
        this.soundSystem.playTransition();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 1000);
    }
    
    setupCursorSystem() {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            document.documentElement.style.setProperty('--mouse-x', mouseX + 'px');
            document.documentElement.style.setProperty('--mouse-y', mouseY + 'px');
        });
        
        // Smooth cursor following
        const updateCursor = () => {
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;
            
            document.documentElement.style.setProperty('--mouse-x', currentX + 'px');
            document.documentElement.style.setProperty('--mouse-y', currentY + 'px');
            
            requestAnimationFrame(updateCursor);
        };
        
        updateCursor();
    }
    
    setupMatrixEnhancement() {
        const columns = document.querySelectorAll('.matrix-column');
        const symbols = ['0', '1', '{', '}', '(', ')', '<', '>', '/', '\\', '♪', '♫', '♬', '🎵', '🎶', 'fn', 'if', '==', '=>'];
        
        columns.forEach((column, index) => {
            this.enhanceMatrixColumn(column, symbols, index);
        });
    }
    
    enhanceMatrixColumn(column, symbols, index) {
        const chars = [];
        const charCount = 20;
        
        for (let i = 0; i < charCount; i++) {
            const char = document.createElement('span');
            char.style.cssText = `
                position: absolute;
                top: ${i * 30}px;
                left: 0;
                font-family: 'JetBrains Mono', monospace;
                font-size: 12px;
                color: ${i % 4 === 0 ? '#F59E0B' : i % 4 === 1 ? '#8B5CF6' : i % 4 === 2 ? '#06B6D4' : '#10B981'};
                opacity: ${Math.random() * 0.8 + 0.2};
                transform: translateY(0);
                transition: all 0.3s ease;
            `;
            
            column.appendChild(char);
            chars.push(char);
        }
        
        // Animate characters
        setInterval(() => {
            chars.forEach((char, i) => {
                if (Math.random() < 0.1) {
                    char.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                    char.style.opacity = Math.random() * 0.8 + 0.2;
                    
                    // Random glow effect
                    if (Math.random() < 0.05) {
                        char.style.textShadow = '0 0 10px currentColor';
                        setTimeout(() => {
                            char.style.textShadow = 'none';
                        }, 500);
                    }
                }
            });
        }, 150);
    }
    
    setupFormEnhancements() {
        this.inputs.forEach(input => {
            this.enhanceInput(input);
        });
        
        // Real-time validation
        this.setupValidation();
    }
    
    enhanceInput(input) {
        const container = input.closest('.input-container');
        
        input.addEventListener('focus', () => {
            container.classList.add('focused');
            this.particleSystem.createInputEffect(container);
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                container.classList.remove('focused');
            }
        });
        
        input.addEventListener('input', () => {
            this.validateInput(input);
        });
        
        // Enhanced typing effect
        input.addEventListener('keydown', (e) => {
            if (e.key.length === 1) {
                this.soundSystem.playKeypress();
            }
        });
    }
    
    setupValidation() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
        
        this.validationRules = {
            email: (value) => emailRegex.test(value),
            password: (value) => passwordRegex.test(value),
            name: (value) => value.trim().length >= 2,
            confirmPassword: (value, form) => {
                const password = form.querySelector('input[type="password"]:not([placeholder*="Confirm"])');
                return password && value === password.value;
            }
        };
    }
    
    validateInput(input) {
        const type = input.type;
        const placeholder = input.placeholder.toLowerCase();
        const container = input.closest('.input-container');
        const value = input.value;
        const form = input.closest('form');
        
        let isValid = true;
        let validationType = type;
        
        if (placeholder.includes('name')) validationType = 'name';
        if (placeholder.includes('confirm')) validationType = 'confirmPassword';
        
        if (this.validationRules[validationType]) {
            isValid = this.validationRules[validationType](value, form);
        }
        
        container.classList.toggle('valid', isValid && value.length > 0);
        container.classList.toggle('invalid', !isValid && value.length > 0);
        
        return isValid;
    }
    
    togglePassword(toggle) {
        const input = toggle.closest('.input-container').querySelector('input');
        const icon = toggle.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            input.type = 'password';
            icon.className = 'fas fa-eye';
        }
        
        this.soundSystem.playClick();
    }
    
    async handleFormSubmit(form) {
        const submitBtn = form.querySelector('.primary-button');
        const isRegisterForm = form.closest('.register');
        
        // Validate all inputs
        const inputs = form.querySelectorAll('.modern-input');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateInput(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showNotification('Please check your input fields', 'error');
            return;
        }
        
        // Show loading state
        this.setButtonLoading(submitBtn, true);
        
        try {
            // Simulate API call
            await this.simulateAuth(form, isRegisterForm ? 'register' : 'login');
            
            // Success animation
            this.showSuccessAnimation(isRegisterForm ? 'Account created successfully!' : 'Welcome back!');
            
            // Redirect after delay
            setTimeout(() => {
                this.redirectToApp();
            }, 3000);
            
        } catch (error) {
            this.showNotification(error.message, 'error');
            this.setButtonLoading(submitBtn, false);
        }
    }
    
    simulateAuth(form, type) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const email = form.querySelector('input[type="email"]').value;
                
                // Simulate some validation
                if (email === 'error@test.com') {
                    reject(new Error('Invalid credentials. Please try again.'));
                } else if (email === 'exists@test.com' && type === 'register') {
                    reject(new Error('Email already exists. Please sign in instead.'));
                } else {
                    resolve({ success: true, user: { email } });
                }
            }, 2500);
        });
    }
    
    setButtonLoading(button, isLoading) {
        const text = button.querySelector('.button-text');
        
        if (isLoading) {
            button.disabled = true;
            text.innerHTML = `
                <svg class="loading-spinner" width="20" height="20" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="31.416" stroke-dashoffset="31.416">
                        <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                        <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                    </circle>
                </svg>
                <span style="margin-left: 8px;">Processing...</span>
            `;
        } else {
            button.disabled = false;
            const originalText = button.classList.contains('register-form-btn') ? 'Create Account' : 'Sign In';
            text.textContent = originalText;
        }
    }
    
    handleSocialAuth(button) {
        const provider = button.classList.contains('github-btn') ? 'GitHub' : 'Google';
        
        this.setButtonLoading(button, true);
        this.soundSystem.playClick();
        
        // Simulate social auth
        setTimeout(() => {
            this.setButtonLoading(button, false);
            this.showNotification(`${provider} authentication coming soon!`, 'info');
        }, 1500);
    }
    
    showSuccessAnimation(message) {
        const overlay = document.createElement('div');
        overlay.className = 'success-overlay';
        overlay.innerHTML = `
            <div class="success-content">
                <div class="success-icon">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="11" stroke="#10B981" stroke-width="2"/>
                        <path d="M7 12l3 3 7-7" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
                <h2>${message}</h2>
                <p>Redirecting to your dashboard...</p>
                <div class="success-particles"></div>
            </div>
        `;
        
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(6, 182, 212, 0.8));
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            opacity: 0;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(overlay);
        
        // Animate in
        overlay.animate([
            { opacity: 0, transform: 'scale(0.8)' },
            { opacity: 1, transform: 'scale(1)' }
        ], {
            duration: 500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards'
        });
        
        // Create success particles
        this.particleSystem.createSuccessEffect(overlay.querySelector('.success-particles'));
        this.soundSystem.playSuccess();
    }
    
    redirectToApp() {
        // Simulate redirect
        console.log('Redirecting to application...');
        window.location.href = '/dashboard'; // Uncomment when ready
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        const colors = {
            success: '#10B981',
            error: '#EF4444',
            warning: '#F59E0B',
            info: '#3B82F6'
        };
        
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">${icons[type]}</div>
                <div class="notification-message">${message}</div>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 16px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10002;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            max-width: 400px;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        const autoRemove = setTimeout(() => {
            this.removeNotification(notification);
        }, type === 'error' ? 5000 : 3000);
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            clearTimeout(autoRemove);
            this.removeNotification(notification);
        });
        
        this.soundSystem.playNotification(type);
    }
    
    removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
    
    setupAnimations() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('[class*="reveal"], .code-terminal, .feature-item, .stat-item').forEach(el => {
            observer.observe(el);
        });
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/**
 * Enhanced Particle System
 */
class ParticleSystem {
    constructor() {
        this.particles = [];
    }
    
    createTransitionEffect(type) {
        const symbols = type === 'register' ? 
            ['🎵', '♪', '♫', '🎶', '{', '}', '(', ')'] : 
            ['💻', '⚡', '</>', '{ }', '[ ]', '=>'];
        
        for (let i = 0; i < 20; i++) {
            this.createParticle(symbols[Math.floor(Math.random() * symbols.length)], {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0.8 + Math.random() * 0.4,
                rotation: Math.random() * 360,
                duration: 1500 + Math.random() * 1000
            });
        }
    }
    
    createInputEffect(container) {
        const rect = container.getBoundingClientRect();
        const symbols = ['✨', '⭐', '💫'];
        
        for (let i = 0; i < 5; i++) {
            this.createParticle(symbols[Math.floor(Math.random() * symbols.length)], {
                x: rect.left + Math.random() * rect.width,
                y: rect.top + Math.random() * rect.height,
                scale: 0.3 + Math.random() * 0.2,
                duration: 800
            });
        }
    }
    
    createSuccessEffect(container) {
        const symbols = ['🎉', '✨', '🌟', '💫', '⭐'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                this.createParticle(symbols[Math.floor(Math.random() * symbols.length)], {
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    scale: 0.5 + Math.random() * 0.5,
                    duration: 2000 + Math.random() * 1000
                });
            }, i * 100);
        }
    }
    
    createParticle(content, options) {
        const particle = document.createElement('div');
        particle.textContent = content;
        particle.style.cssText = `
            position: fixed;
            font-size: 20px;
            pointer-events: none;
            z-index: 9998;
            user-select: none;
            left: ${options.x}px;
            top: ${options.y}px;
            transform: scale(${options.scale}) rotate(${options.rotation || 0}deg);
            transition: all ${options.duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;
        
        document.body.appendChild(particle);
        
        // Animate
        requestAnimationFrame(() => {
            particle.style.transform = `
                scale(0) 
                rotate(${(options.rotation || 0) + 360}deg)
                translateY(-${100 + Math.random() * 100}px)
            `;
            particle.style.opacity = '0';
        });
        
        // Clean up
        setTimeout(() => {
            particle.remove();
        }, options.duration);
    }
}

/**
 * Sound System (Web Audio API)
 */
class SoundSystem {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.enabled = true;
        
        this.initAudio();
    }
    
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.createSounds();
        } catch (e) {
            console.log('Web Audio API not supported');
            this.enabled = false;
        }
    }
    
    createSounds() {
        // Create different tones for different actions
        this.sounds = {
            keypress: { frequency: 800, duration: 0.1 },
            click: { frequency: 600, duration: 0.15 },
            transition: { frequency: 400, duration: 0.3 },
            success: { frequency: 523.25, duration: 0.5 },
            error: { frequency: 220, duration: 0.4 },
            notification: { frequency: 440, duration: 0.2 }
        };
    }
    
    playTone(frequency, duration, type = 'sine') {
        if (!this.enabled || !this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
    
    playKeypress() {
        const sound = this.sounds.keypress;
        this.playTone(sound.frequency + Math.random() * 100 - 50, sound.duration);
    }
    
    playClick() {
        const sound = this.sounds.click;
        this.playTone(sound.frequency, sound.duration);
    }
    
    playTransition() {
        const sound = this.sounds.transition;
        this.playTone(sound.frequency, sound.duration, 'sawtooth');
    }
    
    playSuccess() {
        const sound = this.sounds.success;
        // Play a chord
        this.playTone(sound.frequency, sound.duration);
        this.playTone(sound.frequency * 1.25, sound.duration);
        this.playTone(sound.frequency * 1.5, sound.duration);
    }
    
    playNotification(type) {
        const sound = this.sounds[type] || this.sounds.notification;
        this.playTone(sound.frequency, sound.duration);
    }
}

// Enhanced CSS Animations
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-icon {
        font-size: 18px;
        flex-shrink: 0;
    }
    
    .notification-message {
        flex: 1;
        font-weight: 500;
        font-size: 14px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 18px;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: background 0.2s ease;
        flex-shrink: 0;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .success-content {
        text-align: center;
        color: white;
        position: relative;
    }
    
    .success-content h2 {
        font-size: 2rem;
        margin: 1rem 0 0.5rem;
        font-weight: 700;
    }
    
    .success-content p {
        font-size: 1.1rem;
        opacity: 0.9;
        margin: 0;
    }
    
    .success-icon svg {
        stroke-dasharray: 100;
        stroke-dashoffset: 100;
        animation: drawCheck 1s ease-out 0.5s forwards;
    }
    
    @keyframes drawCheck {
        to {
            stroke-dashoffset: 0;
        }
    }
    
    .loading-spinner {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: none !important;
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .input-container.valid .modern-input {
        border-color: #10B981;
        background: rgba(16, 185, 129, 0.1);
    }
    
    .input-container.invalid .modern-input {
        border-color: #EF4444;
        background: rgba(239, 68, 68, 0.1);
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .input-container.valid .input-icon {
        color: #10B981;
    }
    
    .input-container.invalid .input-icon {
        color: #EF4444;
    }
`;

document.head.appendChild(enhancedStyles);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AlgoRhythmAuth();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AlgoRhythmAuth;
}
