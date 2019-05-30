const express = require('express');

const router = express.Router();

// const userDb = require('./userDb.js')
const postDb = require("../posts/postDb.js")


router.get('/', async (req, res) => {
    try {
        const posts = await postDb.get();
        res.status(200).json(posts);
    } catch {
        res.status(500).json({"errorMessage": "Could not get posts from database"})

    }
});

router.get('/:id', validatePostId, async (req, res) => {
    try {
        const post = await postDb.getById(req.params.id);
        res.status(200).json(post);
    } catch {
        res.status(500).json({"errorMessage": "Could not get post with that id in database"})
    }
});

router.delete('/:id', validatePostId, async (req, res) => {
    try {
        count = await postDb.remove(req.params.id);
        res.status(200).json({"message": `${count} delete(s) completed in the database`})
    } catch {
        res.status(500).json({"errorMessage": "Could not delete post in database"})
    }
});

router.put('/:id', validatePostId, validatePost, async (req, res) => {
    
    try {
        const count = await postDb.update(req.params.id, {"text": req.body.text });
        res.status(200).json({"message": `${count} update(s) completed in the database`})
    } catch {
        res.status(500).json({"errorMessage": "Could not update post in database"})
    }
});

// custom middleware

async function validatePostId(req, res, next) {
    const id = req.params.id;

    if(id) {
        const post = await postDb.getById(id);

        if(post) {
            next();
        }
        else {
            res.status(400).json({"message": "invalid user id"});
        }
    }

    else {
        res.status(400).json({"message": "need user id"});
    }
};

async function validatePost(req, res, next) {
    if(req.body.text) {
            next();
    }
    else {
        res.status(400).json({"errorMessage": "need text information for post"});
    }
};

module.exports = router;