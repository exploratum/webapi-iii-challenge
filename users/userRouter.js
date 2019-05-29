const userDb = require('./users/userDb')


const express = 'express';

const router = express.Router();

router.post('/', (req, res) => {
    
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

/*********************************************/
/*            Validate User Id               */
/*********************************************/

async function validateUserId (req,res,next) {
    const id = req.params.id;
    if(id) {
      const user = await userDb.getById(id);
      if (user) {
        req.user = user;
        next();
      }
      else {
        res.status(400).json({ message: "invalid user id" })
      }
    }
    else {
      res.status(400).json({ message: "invalid user id" })
    }
};

async function validateUser(req, res, next) {
    const body = req.body;
    if(body) {
        if (body.name) {
            next();
        }
        else {
            res.status(400).json({ message: "missing required name field" })
        }
    }
    else {
      res.status(400).json({ message: "missing user data" })
    }
};

function validatePost(req, res, next) {
    const body = req.body;
    if(body) {
        if (body.text) {
        next();
        }
        else {
        res.status(400).json({ message: "missing required text field" })
        }
    }
    else {
    res.status(400).json({ message: "missing user data" })
    }
};

module.exports = router;
