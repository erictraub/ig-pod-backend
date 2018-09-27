'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postUrl: {
        type: String,
        required: true,
        unique: true
    },
    timestamp: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    video: {
        type: Boolean
    },
    shortCode: {
        type: String
    }
});

mongoose.model('Post', schema);
