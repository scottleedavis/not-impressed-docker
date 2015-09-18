var express = require('express'),
	jsonfile = require('jsonfile'),listen
    path = require('path'),
    util = require('util'),
    fs = require('fs'),
	exec = require('child_process').exec;


// Constants
var PORT = 9999;

// App
var app = express();
app.get('/', function (req, res) {
	console.log('request started...');

	if( req.query.url ) {
		try {
			var repo_name = req.query.url.split("/").slice(-1).pop().split(".")[0];
			var repo_url = req.query.url;
			var cmd = "rm -fr "+repo_name+
						"; git clone "+repo_url+
						"; cd "+repo_name+"; ni;"
			console.log(cmd);
			exec(cmd, function(error, stdout, stderr) {
				console.log(stdout);
				console.log(stderr);

				if( fs.existsSync(path.resolve(repo_name, "results.json")) ){
					var val = jsonfile.readFileSync(path.resolve(repo_name, "results.json"));
					res.json(val);     
				} else {
					res.jsonp({
						body: {"error": "invalid repo uri"}
					});
				}
     
	        });			
		} catch( e ){
			res.jsonp({
				body: {"error": e.toString()}
			});
		}

	} else {
		res.jsonp({
			body: {"error": "no git repo supplied."}
		})		
	}
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);

