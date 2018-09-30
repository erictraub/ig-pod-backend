'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
        // Now have access to socket, wowzers!
        console.log('CONNECTION TO SOCKET MADE! ========================>>>>');
		// socket.on('chat message', function(msg){
		// 	console.log('message: ' + msg.message);
		// });

		setTimeout(function() {
			console.log('EMITTING POST TO LIKE')
			socket.emit('new post to like', { someData: 'here is the data' });
		}, 3000);
    });
    
    return io;

};
