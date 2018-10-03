const EventEmitter = require('events');

class PostEmitter extends EventEmitter {
	emitPostToLikeToClients(post) {
		console.log('called post emitter ===>');
		this.emit('post to like', post);
	};
};

const postEmitter = new PostEmitter();

module.exports = postEmitter;