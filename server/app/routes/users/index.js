'use strict';
const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
module.exports = router;


router.get('/', function (req, res, next) {
    User.find({}).exec()
    .then(function(users) {
        res.status(200).send(users);
    })
    .catch(next);
});

router.post('/', function(req, res, next) {
    User.create(req.body)
    .then(function(newUser) {
        res.status(201).send(newUser);
    })
    .catch(next);
});

router.post('/find-or-create', function(req, res, next) {
    User.findOneByChromeIdOrCreate(req.body)
    .then(user => {
        res.status(200).send(user);
    });
});