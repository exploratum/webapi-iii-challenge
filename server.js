const express = require('express');

const server = express();

server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});



//custom middleware

/*********************************************/
/*            Logs user requests             */
/*********************************************/

function logger(req, res, next) {
  console.log(`Method: ${req.method} requested on url:${req.url} at ${new Date().toISOString()}`);
  next();
};






module.exports = server;
