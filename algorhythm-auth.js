// Simple JavaScript for smooth transitions (matching your original)
const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

// Toggle to Sign Up mode
registerBtn.addEventListener('click', () => {
    container.classList.add('active');
    createTransitionEffect();
});

// Toggle to Sign In mode
loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
    createTransitionEffect();
});

// Create particle effect during transition
function createTransitionEffect() {
    const particles = [];
    const codeSymbols = ['{', '}', '(', ')', '[', ']', '<', '>', '/', '\\', '=', '+'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.textContent = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
        particle.style.cssText = `
            position: fixed;
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            color: #F59E0B;
            pointer-events: none;
            z-index: 9999;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            opacity: 0;
        `;
        
        document.body.appendChild(particle);
        
        // Animate particle
        particle.animate([
            { transform: 'scale(0) rotate(0deg)', opacity: 0 },
            { transform: 'scale(1) rotate(180deg)', opacity: 1 },
            { transform: 'scale(0) rotate(360deg)', opacity: 0 }
        ], {
            duration: 1200,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
}

// Cursor follower
document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
    document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
});

// Form submissions with loading states
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('.btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center;">
                <svg style="animation: spin 1s linear infinite; margin-right: 8px;" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
                    <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"/>
                </svg>
                Processing...
            </div>
        `;
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Success! Welcome to AlgoRhythm!', 'success');
        }, 2000);
    });
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for spinner animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
