
/*
 * POST passbook data.
 */

var request = require('request');
var url = "http://fy11-dev.cloudapp.net/hoge";

exports.sendData = function(req, res) {
	console.log(req);
	console.log(req.params);
	console.log(req.url);
	console.log(req.headers);
	console.log(req.body);

	var params = req.params;
	//params["token"] = req.body.pushToken;

	request.post({
		url: url,
		form: {
			params: params
		}
	}, function(err, response, body) {
 		res.send("respond with a resource");
	});
};
