const admin = require('firebase-admin');
const serviceAccount = require('../firebaseconfig.json'); // Update the path to your actual service account JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://networks-final-6cf13-default-rtdb.firebaseio.com/"
});

module.exports = admin;
