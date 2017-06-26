var express = require('express');
var cors = require('cors');

// Create our app
var app = express();
const PORT = process.env.PORT || 3000;

app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();  
  }
});

app.options('*', cors())
app.use(express.static(__dirname + '/public'));

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});
