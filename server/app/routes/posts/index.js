'use strict';
const router = require('express').Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const User = mongoose.model('User');
const chalk = require('chalk');
const postEmitter = require('../../../io/postEmitter');
module.exports = router;


router.get('/', function (req, res, next) {
    Post.find({}).exec()
    .then(function(posts) {
        res.status(200).send(posts);
    })
    .catch(next);
});

router.post('/new-post-to-like', function(req, res, next) {
    let newPost = {};

    Post.findOne({ shortCode: req.body.shortCode }).exec()
    .then(foundPost => {
        if (foundPost) {
            console.log(chalk.green("Post already in DB."));
            throw "Post already in DB.";
        } else {
            console.log(chalk.green("Adding new post to DB."));
            return Post.create(req.body);
        }
    }).then(function(post) {
        newPost = post;
        return User.findOneAndUpdate({ _id: post.owner }, { $push: { postsSubmittedForLikes: post._id }, "$set": { "mostRecentPost": Number(newPost.timestamp) } }, {new: true});
    }).then(updatedUser => {
        res.send({ message: "Post created successfully.", newPost: newPost, updatedUser: updatedUser });
        // now send post out via sockets
        // var resultPost = JSON.stringify(newPost);
        // resultPost = JSON.parse(resultPost);
        // resultPost.socketId = req.body.socketId;
        postEmitter.emitPostToLikeToClients(newPost);
    }).catch(err => {
        if (err === "Post already in DB.") res.status(400).send({ error: true, errorMessage: "Post already in DB." });
        else next(err);
    });
});

