'use strict';
var socketio = require('socket.io');
var postEmitter = require('./postEmitter');
var chalk = require('chalk');
var socketFuncs = require('./socketFunctions');
var io = null;

module.exports = function (server) {
	let socketIdsObj = {};

    if (io) return io;
    io = socketio(server);

    io.sockets.on('connection', function (socket) {
        console.log(chalk.magenta('+ Connection made to socket: ', socket.id));
        socketFuncs.saveSocketId(socket.id, socketIdsObj);
        console.log(socketIdsObj);

		postEmitter.on('post to like', function(post, err) {
			// START: figure out who posted the new posts socket ID somehow
			// const ownerSocket 
			const randNums = socketFuncs.generateRandomNumsArray(20, 300, );
			const numClients = io.engine.clientsCount;
			socket.emit('new post to like', post);
		});

	    socket.on('disconnect', function () {
	        console.log(chalk.magenta('- Disconnected from socket: ', socket.id));
	        socketFuncs.deleteSocketId(socket.id, socketIdsObj);
	    });
    });

    
    return io;
};





