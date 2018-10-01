const socketFuncs = {};

socketFuncs.saveSocketId = function(socketId, idsObj) {
	idsObj[socketId] = true;
	return socketId;
};

socketFuncs.deleteSocketId = function(socketId, idsObj) {
	delete idsObj[socketId];
	return idsObj;
};

socketFuncs.generateRandomNumsArray = function(randNumsCount, totalConnections, excludeNum) {
	const numsArray = [];
	while (numsArray.length < randNumsCount) {
		var randNum = Math.floor(Math.random() * totalConnections) + 1;
		if (numsArray.indexOf(randNum) === -1 && randNum !== excludeNum) numsArray.push(randNum);
	};
	return numsArray;
};

module.exports = socketFuncs;