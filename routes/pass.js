
/*
 * POST passbook data.
 */

var request = require('request');
var url = "http://fy11-dev.cloudapp.net";

// Passを追加したときの処理
exports.createData = function(req, res) {
	console.log(req);
	console.log(req.params);
	console.log(req.url);
	console.log(req.headers);
	console.log(req.body);

	var authorization = req.headers.authorization.replace("ApplePass ", "");

	var params = {
		deviceLibraryID: req.params.deviceLibraryID,
		passTypeID: req.params.passTypeID,
		serialNumber: req.params.serialNumber,
		pushToken: req.body.pushToken,
		authorization: authorization
	};

	request.post({
		url: url+'/receivePass',
		form: params
	}, function(err, response, body) {
 		res.send("respond with a resource");
	});
};

// Passを更新したときの処理
exports.updateData = function(req, res) {
	var authorization = req.headers.authorization.replace("ApplePass ", "");

	var params = {
		passTypeID: req.params.passTypeID,
		serialNumber: req.params.serialNumber,
		authorization: authorization
	};

	request.post({
		url: url+':3003/passUpdate',
		form: params
	}, function(err, response, body) {
		res.send("respond with a resource");
	});
};

// log処理
exports.logData = function(req, res) {
	res.send("Passがサーバと通信しています。");
};

// Passを削除したときの処理
exports.deleteData = function() {
	var authorization = req.headers.authorization.replace("ApplePass ", "");
	
	var params = {
		deviceLibraryID: req.params.deviceLibraryID,
		passTypeID: req.params.passTypeID,
		serialNumber: req.params.serialNumber,
		pushToken: req.body.pushToken,
		authorization: authorization
	};

	request.post({
		url: url+'/passDelete',
		form: params
	}, function(err, response, body) {
 		res.send("respond with a resource");
	});
};

