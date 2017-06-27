var express = require('express');
var cors = require('cors');
var Twitter = require('node-twitter-api');
var config = require('./config/dev.config.json');
var clientSessions = require("client-sessions");

// Create our app
var app = express();
const PORT = process.env.PORT || 3000;

var twitter = new Twitter({
    consumerKey: config.CONSUMER_KEY,
    consumerSecret: config.CONSUMER_SECRET,
    callback: config.CALLBACK_URL
});

var _requestSecret = undefined;

app.use(cors());
app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();  
  }
});

app.use(clientSessions({
  cookieName: 'theSession',
  secret: 'oneBigUnforgetableCat',
  duration: 24 * 60 * 60 * 1000,
  cookie: {
    httpOnly: true
  }
}));

app.get('/twitter/get-request-token', function(req, res) {

  twitter.getRequestToken((err, requestToken, requestSecret) => {
        if(err) {
          res.status(500).send(err);
        }else{
          _requestSecret = requestSecret;
          res.redirect(301, "https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
        }
      });
});

app.get('/twitter/authentication/callback', function(req, err) {
  var requestToken = req.query.oauth_token,
      verifier = req.query.oauth_verifier;
  console.log(requestToken);
  console.log(verifier);
});

/* Check if session isset */
app.get('/check/valid/session', function(req, res) {
  if(req.theSession.loggedIn === undefined){
    res.send(false);
  }else {
    res.send(req.theSession.loggedIn);
  }
});

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});
