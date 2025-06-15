// Authentication JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.getElementById('toggle-password');
    const toggleConfirmPassword = document.getElementById('toggle-confirm-password');
    
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            togglePasswordVisibility(passwordInput, this);
        });
    }
    
    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', function() {
            const confirmPasswordInput = document.getElementById('confirm-password');
            togglePasswordVisibility(confirmPasswordInput, this);
        });
    }
    
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Simple validation
            if (!email || !password) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            // For demo purposes, we'll use a simple check
            // In a real application, you would validate against a server
            if (email === 'admin@example.com' && password === 'password') {
                // Store login state if remember me is checked
                if (remember) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', email);
                } else {
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('userEmail', email);
                }
                
                showMessage('Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showMessage('Invalid email or password', 'error');
            }
        });
    }
    
    // Signup form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms').checked;
            
            // Simple validation
            if (!fullname || !email || !password || !confirmPassword) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showMessage('Passwords do not match', 'error');
                return;
            }
            
            if (!terms) {
                showMessage('Please agree to the terms and conditions', 'error');
                return;
            }
            
            // For demo purposes, we'll simulate account creation
            // In a real application, you would send this data to a server
            localStorage.setItem('userFullname', fullname);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('isLoggedIn', 'true');
            
            showMessage('Account created successfully! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }
    
    // Check if user is already logged in
    function checkLoginStatus() {
        const currentPage = window.location.pathname.split('/').pop();
        const isLoginPage = currentPage === 'login.html' || currentPage === 'signup.html';
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || sessionStorage.getItem('isLoggedIn') === 'true';
        
        if (isLoggedIn && isLoginPage) {
            window.location.href = 'index.html';
        } else if (!isLoggedIn && !isLoginPage && currentPage !== '') {
            window.location.href = 'login.html';
        }
    }
    
    // Run login check
    checkLoginStatus();
});

// Helper functions
function togglePasswordVisibility(inputElement, iconElement) {
    if (inputElement.type === 'password') {
        inputElement.type = 'text';
        iconElement.classList.remove('fa-eye');
        iconElement.classList.add('fa-eye-slash');
    } else {
        inputElement.type = 'password';
        iconElement.classList.remove('fa-eye-slash');
        iconElement.classList.add('fa-eye');
    }
}

function showMessage(message, type) {
    // Check if message container already exists
    let messageContainer = document.querySelector('.message-container');
    
    if (!messageContainer) {
        // Create message container if it doesn't exist
        messageContainer = document.createElement('div');
        messageContainer.className = 'message-container';
        document.body.appendChild(messageContainer);
        
        // Add styles to the message container
        messageContainer.style.position = 'fixed';
        messageContainer.style.top = '20px';
        messageContainer.style.left = '50%';
        messageContainer.style.transform = 'translateX(-50%)';
        messageContainer.style.zIndex = '1000';
        messageContainer.style.transition = 'all 0.3s ease';
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    // Add styles to the message element
    messageElement.style.padding = '12px 20px';
    messageElement.style.marginBottom = '10px';
    messageElement.style.borderRadius = '5px';
    messageElement.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    messageElement.style.backgroundColor = type === 'error' ? '#f8d7da' : '#d4edda';
    messageElement.style.color = type === 'error' ? '#721c24' : '#155724';
    messageElement.style.border = type === 'error' ? '1px solid #f5c6cb' : '1px solid #c3e6cb';
    
    // Add message to container
    messageContainer.appendChild(messageElement);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageElement.style.opacity = '0';
        setTimeout(() => {
            messageContainer.removeChild(messageElement);
            
            // Remove container if no messages left
            if (messageContainer.children.length === 0) {
                document.body.removeChild(messageContainer);
            }
        }, 300);
    }, 3000);
}