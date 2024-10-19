const admin = require('../config/firebaseConfig');
const User = require('../models/User');

// Handle login using Firebase ID token
exports.firebaseAuth = async (req, res) => {
  const idToken = req.body.idToken;

  try {
    // Verify the ID token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Check if the user already exists in your database
    let user = await User.findOne({ firebaseUID: uid });
    if (!user) {
      // If the user does not exist, create a new user
      user = new User({
        firebaseUID: uid,
        username: decodedToken.name || decodedToken.email,
        email: decodedToken.email,
        role: 'user',
      });
      await user.save();
    }

    // Store the user in session or create a session token
    req.session.user = user;

    res.json({ success: true });
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    res.status(401).json({ success: false, error: 'Authentication failed' });
  }
};

// Handle logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};
