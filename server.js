const http = require('http');
const request = require('request');
require('dotenv').config();

const clientId = process.env.REACT_APP_CLIENT_ID;
const secretKey = process.env.REACT_APP_CLIENT_KEY; 
const port = process.env.PORT || 5002;
console.log(`started server on port ${port}`);

http.createServer((req, res) => {
  var code = req.url.split("=")[1];
  if (code) {
    request.post('https://github.com/login/oauth/access_token', {
      form: {
        client_id: clientId,
        client_secret: secretKey,
        code: code
      }
    }, (err, r, body) => {
      res.writeHead(301, {
        // 'Location': 'http://localhost:3000?' + body
        'Location': 'https://gitowl.glitch.me?' + body
        // 'Location': 'https://gitowl.netlify.app?' + body
      });
      res.end();
    })
    
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(port);