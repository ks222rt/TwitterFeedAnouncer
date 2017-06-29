var express = require('express');
var cors = require('cors');
var Twitter = require('node-twitter-api');
var config = require('./config/dev.config.json');
var clientSessions = require("client-sessions");

// Create our app
var app = express();
const PORT = process.env.PORT || 3001;

/* Instantiate the Twitter class */
var twitter = new Twitter({
    consumerKey: config.CONSUMER_KEY,
    consumerSecret: config.CONSUMER_SECRET,
    callback: config.CALLBACK_URL
});

var _requestSecret = undefined;

app.use(cors());
/*app.all('*', function(req, res, next) {
  console.log('Trying to reach: ' + req.originalUrl);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Max-Age', '1000');
  res.header('Access-Control-Allow-Headers', 'x-requested-with, Content-Type, origin, authorization, accept, client-security-token');
  next();
});*/

app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();  
  }
});

/* Instatiate the session */
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
          //_requestSecret = requestSecret;
          req.theSession.requestSecret = requestSecret;
          var data = JSON.stringify("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
          res.header('Content-Length', data.length);
          res.send(data);
          //res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
        }
      });
});

app.get('/twitter/authentication/callback', function(req, res) {
  var requestToken = req.query.oauth_token,
      verifier = req.query.oauth_verifier,
      requestSecret = req.theSession.requestSecret;
  req.theSession.requestSecret = undefined;

  twitter.getAccessToken(requestToken, requestSecret, verifier, (err, accessToken, accessSecret) => {
    if(err) {
      res.status(500).send(err);
    }else {
      twitter.verifyCredentials(accessToken, accessSecret, (err, user) => {
        if(err) {
          res.status(500).send(err);
        }else {
          req.theSession.user = user;
          req.theSession.loggedIn = true;
          res.redirect('/#/check/twitter/authentication');
        }
      });
    }
  });
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
