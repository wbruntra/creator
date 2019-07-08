const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL } = {
  GOOGLE_CLIENT_ID:
    '829775379643-lqj5odf4beug28egifu3p1d044ra94hj.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: 'e31H70Ce10idFERDI6h8EUdi',
  GOOGLE_REDIRECT_URL: 'http://localhost:3000/api/google',
};

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_REDIRECT_URL,
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function(err, user) {
        return cb(err, user);
      });
    }
  )
);
