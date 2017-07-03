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

/* Initiate twitter login request */
app.get('/twitter/get-request-token', function(req, res) {
  twitter.getRequestToken((err, requestToken, requestSecret) => {
        if(err) {
          res.status(500).send(err);
        }else {
          req.theSession.requestSecret = requestSecret;
          var data = JSON.stringify("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
          res.header('Content-Length', data.length);
          res.send(data);
        }
      });
});

/* Twitter callback function to verify user */
app.get('/twitter/authentication/callback', function(req, res) {
  var requestToken = req.query.oauth_token,
      verifier = req.query.oauth_verifier,
      requestSecret = req.theSession.requestSecret;
  req.theSession.requestSecret = undefined;

  twitter.getAccessToken(requestToken, requestSecret, verifier, (err, accessToken, accessSecret) => {
    if(err) {
      res.status(500).send(err);
    }else {
      req.theSession.accessToken = accessToken;
      req.theSession.accessSecret = accessSecret;
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

/* Get tweets from homeline */
app.get('/twitter/get-user-homeline', function(req, res) {
  var params = {};
  twitter.getTimeline('home_timeline', params, req.theSession.accessToken, req.theSession.accessSecret, (err, data, response) => {
      if(err) {
        res.status(500).send(err);
      }else {
        if(response.statusCode === 200) {
          var data = JSON.stringify({
            tweetArray: data,
            status: 200,
            message: 'Data was fetched correctly'
          });
          
        }else {
          var data = JSON.stringify({
            tweetArray: undefined,
            status: 404,
            message: 'Could not fetch data'
          });
        } 

        res.send(data);
      }
  });
});

/* Check if session isset */
app.get('/check/valid/session', function(req, res) {
  if(req.theSession.loggedIn === undefined){
    var data = JSON.stringify({
      loggedIn: false,
      user: undefined
    })
    res.send(data);
  }else {
    var data = JSON.stringify({
      loggedIn: true,
      user: req.theSession.user
    })
    res.send(data);
  }
});

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});
