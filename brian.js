document.addEventListener('DOMContentLoaded', () => {
    // Handle Sign-Up
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Store user data in localStorage
            const userData = { username, email, password, downloadedMovies: [], watchedMovies: [] };
            localStorage.setItem('userData', JSON.stringify(userData));

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
            const storedData = JSON.parse(localStorage.getItem('userData'));

            // Check if credentials match
            if (storedData && username === storedData.username && password === storedData.password) {
                // Store login status
                localStorage.setItem('loggedIn', 'true');
                // Redirect to content page
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password. Please try again.');
            }
        });
    }

    // Handle Content Page
    if (window.location.pathname.endsWith('profile.html')) {
        if (localStorage.getItem('loggedIn') === 'true') {
            const profileUsername = document.getElementById('profile-username');
            const profileEmail = document.getElementById('profile-email');
            const downloadedMovies = document.getElementById('downloaded-movies');
            const watchedMovies = document.getElementById('watched-movies');

            // Retrieve user data from localStorage
            const storedData = JSON.parse(localStorage.getItem('userData'));

            // Display user profile information
            if (profileUsername && storedData) {
                profileUsername.textContent = storedData.username;
                profileEmail.textContent = storedData.email;
                

                // Display downloaded movies
                storedData.downloadedMovies.forEach(movie => {
                    addMovieToList(downloadedMovies, movie);
                });

                // Display watched movies
                storedData.watchedMovies.forEach(movie => {
                    addMovieToList(watchedMovies, movie);
                });
            }

            // Function to add movie to list
            const addMovieToList = (listElement, movie) => {
                const li = document.createElement('li');
                li.textContent = movie;
                listElement.appendChild(li);
            };

            // Handle View Now and Download Buttons
            const viewNowButtons = document.querySelectorAll('.view-now');
            const downloadButtons = document.querySelectorAll('.download');

            viewNowButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const url = event.target.getAttribute('data-url');
                    const movieName = event.target.parentElement.querySelector('h3').textContent;
                    window.open(url, '_blank'); // Opens the URL in a new tab
                    storedData.watchedMovies.push(movieName); // Add to watched movies
                    localStorage.setItem('userData', JSON.stringify(storedData)); // Update localStorage
                    addMovieToList(watchedMovies, movieName); // Add to watched movies list in the UI
                });
            });

            downloadButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const url = event.target.getAttribute('data-url');
                    const movieName = event.target.parentElement.querySelector('h3').textContent;
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = ''; // The browser will infer the file name from the URL
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    storedData.downloadedMovies.push(movieName); // Add to downloaded movies
                    localStorage.setItem('userData', JSON.stringify(storedData)); // Update localStorage
                    addMovieToList(downloadedMovies, movieName); // Add to downloaded movies list in the UI
                });
            });

            // Handle Sign Out
            const signOutButton = document.getElementById('sign-out');
            if (signOutButton) {
                signOutButton.addEventListener('click', () => {
                    localStorage.setItem('loggedIn', 'false');
                    window.location.href = 'login.html'; // Redirect to login page
                });
            }

            // Handle Profile Image Button
            const profileButton = document.getElementById('profile.hmtl');
            if (profileButton) {
                profileButton.addEventListener('click', () => {
                    document.getElementById('profile.html').scrollIntoView({ behavior: 'smooth' });
                });
            }
        } else {
            // Redirect to login page if not logged in
            window.location.href = 'login.html';
        }
    }
});