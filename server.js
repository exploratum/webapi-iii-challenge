const express = require('express');
const server = express();

const userRouter = require('./users/userRouter.js')


server.use(express.json());
server.use(logger);



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.use('/users', userRouter);




//custom middleware

/*********************************************/
/*            Logs user requests             */
/*********************************************/

function logger(req, res, next) {
  console.log(`Method: ${req.method} requested on url:${req.url} on ${new Date().toISOString()}`);
  next();
};






module.exports = server;
