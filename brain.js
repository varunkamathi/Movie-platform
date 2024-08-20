document.addEventListener('DOMContentLoaded', () => {
     // Fetch movie data from JSON file
     fetch('movies.json')
     .then(response => response.json())
     .then(movies => {
         const movieContainer = document.getElementById('movie-container');
         
         movies.forEach(movie => {
             // Create elements for movie
             const movieElement = document.createElement('div');
             movieElement.className = 'movie';

             const title = document.createElement('h3');
             title.textContent = movie.title;

             const description = document.createElement('p');
             description.textContent = movie.description;

             const viewButton = document.createElement('button');
             viewButton.textContent = 'View Now';
             viewButton.className = 'view-now';
             viewButton.setAttribute('data-url', movie.viewUrl);

             const downloadButton = document.createElement('button');
             downloadButton.textContent = 'Download';
             downloadButton.className = 'download';
             downloadButton.setAttribute('data-url', movie.downloadUrl);

             // Append elements to movieElement
             movieElement.appendChild(title);
             movieElement.appendChild(description);
             movieElement.appendChild(viewButton);
             movieElement.appendChild(downloadButton);

             // Append movieElement to movieContainer
             movieContainer.appendChild(movieElement);
         });

         // Re-add event listeners after dynamic content is loaded
         addMovieEventListeners();
     })
     .catch(error => console.error('Error fetching movies:', error));

 const addMovieEventListeners = () => {
     const watchedMovies = document.getElementById('watched-movies');
     const downloadedMovies = document.getElementById('downloaded-movies');

     const addMovieToList = (listElement, movie) => {
         const li = document.createElement('li');
         li.textContent = movie;
         listElement.appendChild(li);
     };

     const viewNowButtons = document.querySelectorAll('.view-now');
     const downloadButtons = document.querySelectorAll('.download');

     viewNowButtons.forEach(button => {
         button.addEventListener('click', (event) => {
             const url = event.target.getAttribute('data-url');
             const movieName = event.target.parentElement.querySelector('h3').textContent;
             window.open(url, '_blank'); // Opens the URL in a new tab
             addMovieToList(watchedMovies, movieName); // Add to watched movies
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
             addMovieToList(downloadedMovies, movieName); // Add to downloaded movies
         });
     });
 };
    // Handle Sign-Up
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Store user data in localStorage
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
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
                // Store login status
                localStorage.setItem('loggedIn', 'true');
                // Redirect to content page
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password. Please try again.');
            }
        });
    }

    if (localStorage.getItem('loggedIn') === 'true') {
        const profileUsername = document.getElementById('profile-username');
        const profileEmail = document.getElementById('profile-email');
        const downloadedMovies = document.getElementById('downloaded-movies');
        const watchedMovies = document.getElementById('watched-movies');
    
        // Display user profile information
        if (profileUsername && profileEmail) {
            profileUsername.textContent = localStorage.getItem('username');
            profileEmail.textContent = localStorage.getItem('email');
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
                addMovieToList(watchedMovies, movieName); // Add to watched movies
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
                addMovieToList(downloadedMovies, movieName); // Add to downloaded movies
            });
        });
    
        // Handle Sign Out
        const signOutButton = document.getElementById('sign-out');
        if (signOutButton) {
            signOutButton.addEventListener('click', () => {
                localStorage.setItem('loggedIn', 'false');
                window.location.href = 'login.html'; // Redirect to login page on sign out
            });
        }
    } else {
        // Redirect to login page if not logged in
        window.location.href = 'login.html';
    }

   

});
