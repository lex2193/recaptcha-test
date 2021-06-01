const path = require('path'),
  googleRecaptcha = require('google-recaptcha'),
  express = require('express'),
  app = express();

const googleRecaptchaSecret = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe',
  recaptchaVerifier = new googleRecaptcha({ secret: googleRecaptchaSecret });

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post('/check', async (req, res) => {
  recaptchaVerifier.verify({ response: req.body['g-recaptcha-response'] }, error => res.redirect(`/#${error ? 'Invalid' : 'Valid'}`));
});

app.listen(process.env.PORT || 8080);
