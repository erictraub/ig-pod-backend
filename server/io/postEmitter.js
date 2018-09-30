const EventEmitter = require('events');

class PostEmitter extends EventEmitter {
	emitPostToLikeToClients(post) {
		this.emit('post to like', post);
	};
};

const postEmitter = new PostEmitter();

module.exports = postEmitter;