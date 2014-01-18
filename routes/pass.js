
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

	var authentication = req.headers.authorization.replace("ApplePass ", "");

	var params = {
		deviceLibraryID: req.params.deviceLibraryID,
		passTypeID: req.params.passTypeID,
		serialNumber: req.params.serialNumber,
		pushToken: req.body.pushToken,
		authentication: authentication
	};

	request.post({
		url: url+'/addPushToken',
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
		if(err) {
			console.log(err);
			res.send(err, 500);
		} else {
			console.log(body)
			var file = 'http://createpassbook.cloudapp.net:3003/passdata/'+body+'.pkpass';
			var filestream = fs.createReadStream(file),
				filename = path.basename(file),
				mimetype = 'application/vnd.apple.pkpass';
			res.setHeader('Content-disposition', 'attachment; filename=' + filename);
			res.setHeader('Content-type', mimetype);
			filestream.on('data', function(chunk) {
				res.write(chunk);
			});
			filestream.on('end', function() {
				res.end();
			});
		}
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

