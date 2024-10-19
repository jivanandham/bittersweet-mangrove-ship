const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
require('dotenv').config();

// Firebase admin setup
const admin = require('./config/firebaseConfig');
const authRoutes = require('./routes/authRoutes'); // Example routes for auth

const app = express();

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
  })
);

// Middleware to make user object available in all views
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Routes
app.use('/', authRoutes);

// Home Route
app.get('/', (req, res) => {
  res.render('login');
});

// Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
