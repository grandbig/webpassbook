
/*
 * GET home page.
 */

var request = require('request');
var url = "http://fy11-dev.cloudapp.net/hoge";
var params = {};

exports.index = function(req, res){

	request.post({
		url: url,
		form: {
			params: {uid: "1204263"}
		}
	}, function(err, response, body) {
		res.render('index', { title: 'Express' });
		console.log("ok");
  	});
};
