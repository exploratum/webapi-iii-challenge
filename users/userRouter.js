const userDb = require('./userDb.js')
const postDb = require("../posts/postDb.js")


const express = require ('express');
const router = express.Router();

/*********************************************/
/*            Create a New user              */
/*********************************************/
router.post('/', validateUser, async (req, res) => {
    try {
        saveduser = await userDb.insert(req.body);
        res.status(201).json({saveduser});
    } catch {
        res.status(500).json({"errorMessage": "Could not add new user"});
    }
});

/*********************************************/
/*           Add a post for a user           */
/*********************************************/

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
    try {
        const post = {"user_id": req.params.id, "text": req.body.text };
        const savedPost = await postDb.insert(post);
        res.status(201).json(savedPost);
    } catch {
        res.status(500).json({"errorMessage": "Could not save new post in database"})
    }
});


/*********************************************/
/*            Get all users                  */
/*********************************************/
router.get('/', async (req, res) => {
    try {
        const users = await userDb.get();
        res.status(200).json(users);
    } catch {
        res.status(500).json({"errorMessage": "Could not get users informations"})
    }
});


/*********************************************/
/*            Get user By Id                 */
/*********************************************/
router.get('/:id', validateUserId, async (req, res) => {
    try {
        console.log('req.params.id: ', req.params.id);
        const user = await userDb.getById(req.params.id);
        res.status(200).json(user);
    } catch {
        res.status(500).json({"errorMessage": "Could not get user from database"});
    }
});

/*********************************************/
/*            Get posts of a User            */
/*********************************************/
router.get('/:id/posts', validateUserId, async (req, res) => {
    try {
        console.log(req.params.id);
        const posts = await postDb.getById(req.params.id);
        res.status(200).json(posts);

    } catch {
        res.status(500).json({"errorMessage": "Could not get posts from database for this user"})
    }

});

/*********************************************/
/*              Delete a User                */
/*********************************************/
router.delete('/:id', validateUserId, async (req, res) => {
    try {
        count = await userDb.remove(req.params.id);
        res.status(200).json({"message": `${count} user(s) deleted from database`})
    } catch {
        res.status(500).json({"errorMessage": "Could not delete user from database"})
    }
});

/*********************************************/
/*            Update a User name             */
/*********************************************/
router.put('/:id', validateUserId, validateUser, async (req, res) => {
    try {
        const count = await userDb.update(req.params.id, {"name": req.body.name});
        res.status(200).json({"message": `${count} change(s) completed in the database`})
    } catch {
        res.status(500).json({"errorMessage": "Could not update user in database"})
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////
//                                          custom middleware                                 //
///////////////////////////////////////////////////////////////////////////////////////////////

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

/*********************************************/
/*            Validate User name             */
/*********************************************/
async function validateUser(req, res, next) {
    if(req.body.name) {
            next();
    }
    else {
      res.status(400).json({ message: "missing user name data" })
    }
};

/*********************************************/
/*            Validate Post                   */
/*********************************************/
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
