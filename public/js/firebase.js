import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';


const firebaseConfig = {
  apiKey: "AIzaSyCNmoOjw6BoqI8z7ONzBPVuYh8kJP8VXqA",
  authDomain: "networks-final-6cf13.firebaseapp.com",
  projectId: "networks-final-6cf13",
  storageBucket: "networks-final-6cf13.appspot.com",
  messagingSenderId: "773234480597",
  appId: "1:773234480597:web:2aa5bbed11d6a40092d95c",
  measurementId: "G-W259Z6N2M3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google login function
document.getElementById('google-login').addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      user.getIdToken().then((idToken) => {
        // Send token to backend for verification
        fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idToken }),
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              window.location.href = '/dashboard';
            } else {
              alert('Authentication failed');
            }
          });
      });
    })
    .catch((error) => {
      console.error('Error during sign-in:', error);
    });
});
