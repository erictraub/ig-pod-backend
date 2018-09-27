'use strict';
const router = require('express').Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
module.exports = router;


router.get('/', function (req, res, next) {
    Post.find({}).exec()
    .then(function(posts) {
        res.status(200).send(posts);
    })
    .catch(next);
});

router.post('/new-post-to-like', function(req, res, next) {
    Post.create(req.body)
    .then(function(newPost) {
        console.log('NEW POST: ', newPost);
        res.status(201).send(newPost);
        // next: send out via sockets
    })
    .catch(next);
});
