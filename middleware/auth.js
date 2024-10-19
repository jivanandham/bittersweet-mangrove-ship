// Ensure the user is authenticated before accessing a route
exports.ensureAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/login');
};
