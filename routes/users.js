var express = require('express');
var router = express.Router();
const { google } = require('googleapis');
const axios = require('axios');

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
} = process.env;

// {
//   GOOGLE_CLIENT_ID:
//     '829775379643-lqj5odf4beug28egifu3p1d044ra94hj.apps.googleusercontent.com',
//   GOOGLE_CLIENT_SECRET: 'e31H70Ce10idFERDI6h8EUdi',
//   GOOGLE_REDIRECT_URL: 'http://localhost:3000/api/google',
// };

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL
);

/* GET users listing. */
router.get('/', async (req, res) => {
  console.log(req.query);
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  const { access_token } = tokens;
  const profile = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
  );
  req.session.profile = profile.data;
  res.redirect(process.env.SITE_URL);
});

router.get('/link', function(req, res, next) {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'online',
    scope: scopes,
  });
  res.send({ url });
});

module.exports = router;
