'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    igUsername: {
        type: String,
        required: true
    },
    chromeId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String
    },
    mostRecentPost: {
        type: Number,
        default: 0
    },
    postsSubmittedForLike: {
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: 'Post',
        default: null
    },
    batchNumber: {
        type: Number, // 0 - 100
        required: true
    }
});

schema.statics.findOneOrCreate = function findOneOrCreate(params) {
    const self = this;
    return self.findOne(params)
    .then(user => {
        if (!user) {
            params.batchNumber = Math.floor(Math.random() * 100) + 1;
            return self.create(params)
            .then(newUser => {
                return { message: 'New user created.', user: newUser };
            });
        }
        else {
            return { message: 'User found.', user: user };
        }
    });
}

mongoose.model('User', schema);
