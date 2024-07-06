document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript Loaded');

    const viewNowButtons = document.querySelectorAll('.view-now');
    const downloadButtons = document.querySelectorAll('.download');

    viewNowButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const url = event.target.getAttribute('data-url');
            window.open(url, '_blank'); // Opens the URL in a new tab
        });
    });

    downloadButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const url = event.target.getAttribute('data-url');
            const a = document.createElement('a');
            a.href = url;
            a.download = ''; // The browser will infer the file name from the URL
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Handle Sign-Up
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Store user data in localStorage
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            // Redirect to login page
            window.location.href = 'login.html';
        });
    }

    // Handle Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            // Retrieve user data from localStorage
            const storedUsername = localStorage.getItem('username');
            const storedPassword = localStorage.getItem('password');

            // Check if credentials match
            if (username === storedUsername && password === storedPassword) {
                // Redirect to content page
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password. Please try again.');
            }
        });
    }

    // Handle View Now and Download Buttons
    const viewNowButtons = document.querySelectorAll('.view-now');
    const downloadButtons = document.querySelectorAll('.download');

    viewNowButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const url = event.target.getAttribute('data-url');
            window.open(url, '_blank'); // Opens the URL in a new tab
        });
    });

    downloadButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const url = event.target.getAttribute('data-url');
            const a = document.createElement('a');
            a.href = url;
            a.download = ''; // The browser will infer the file name from the URL
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    });
});