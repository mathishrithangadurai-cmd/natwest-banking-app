// ===== LOGIN FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            // Validation
            if (!username || !password) {
                alert('Please enter both username and password');
                return;
            }
            
            if (username.length < 3) {
                alert('Username must be at least 3 characters long');
                return;
            }
            
            if (password.length < 4) {
                alert('Password must be at least 4 characters long');
                return;
            }
            
            // Store username and redirect to dashboard
            setCurrentUsername(username);
            alert('Login successful! Welcome ' + username);
            window.location.href = 'dashboard.html';
        });
    }
});

// Helper function to set username
function setCurrentUsername(username) {
    localStorage.setItem('currentUsername', username);
}