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

		// postEmitter.on('post to like', function(post, err) {
		// 	console.log('FOR THIS SOCKET: ', socket.id);
		// 	const numAllowedLikes = 20;
		// 	const ownerSocket = post.socketId;
		// 	console.log('ownerSocket: ', ownerSocket);
		// 	const socketsArray = Array.prototype.slice.call(Object.keys(socketIdsObj));
		// 	console.log('socketsArray: ', socketsArray);
		// 	const ownerSocketIndex = socketsArray.indexOf(ownerSocket);
		// 	console.log('ownerSocketIndex: ', ownerSocketIndex);
		// 	const randNumsArray = socketFuncs.generateRandomNumsArray(numAllowedLikes, 300, ownerSocketIndex);
		// 	console.log('randNums: ', randNumsArray);
		// 	socket.emit('new post to like', post);
		// });

	    socket.on('disconnect', function () {
	        console.log(chalk.magenta('- Disconnected from socket: ', socket.id));
	        socketFuncs.deleteSocketId(socket.id, socketIdsObj);
	    });
    });

	postEmitter.on('post to like', function(post, err) {
		// console.log('FOR THIS SOCKET: ', socket.id);
		const numAllowedLikes = 20;
		const ownerSocket = post.socketId;
		console.log('ownerSocket: ', ownerSocket);
		const socketsArray = Array.prototype.slice.call(Object.keys(socketIdsObj));
		console.log('socketsArray: ', socketsArray);
		const ownerSocketIndex = socketsArray.indexOf(ownerSocket);
		console.log('ownerSocketIndex: ', ownerSocketIndex);
		const randNumsArray = socketFuncs.generateRandomNumsArray(numAllowedLikes, 300, ownerSocketIndex);
		console.log('randNums: ', randNumsArray);
		io.emit('new post to like', post);
	});

    
    return io;
};





