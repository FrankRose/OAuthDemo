const router = require('express').Router();
const passport = require('passport');
module.exports = router;

router.get('/', passport.authenticate('google', { scope: 'email' }));

router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/',
  })
);
