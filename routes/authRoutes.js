const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // user already has code
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

// log out
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  })

  // test authentication
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};