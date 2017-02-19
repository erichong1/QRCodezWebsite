const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

const mongoose = require('mongoose');
mongoose.connect('mongodb://qrcodes:Hz9D39kurs7ra4qrQhMgiO5aVfh7WoEbtc3yGSet0szf0bd1KeI6QyT0irihfoUGsZrkCNuPQur11XhtXPaKeA==@qrcodes.documents.azure.com:10250/?ssl=true');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("we're connected to mongo!");
});

app.get("/", function(req,res){
	var code = req.query.code
	if (code) {
		console.log(code)
		request.post({
	  	headers: {'content-type' : 'application/x-www-form-urlencoded'},
	  	url:     'https://www.linkedin.com/oauth/v2/accessToken',
	 	form:    {'code': code,
			'grant_type': 'authorization_code',
			'client_id': '861z9z5wdgrd9g',
			'client_secret': 'nU8lQziKw3tE24vM'}
		}, function(error, response, body){
		 	console.log(body);
		});
	} else {
		res.sendFile(__dirname + "/public/index.html")
	}
});

app.get("/person/:username", function(req,res) {
	username = req.params.username;
	res.send(username);
});

app.get("/ad/:adname", function(req,res) {
	adname = req.params.adname;
});

app.post("/register", function(req, res) {
	res.send(req.body.first_name);
});

var request = require("request")
var access_token = 'AQXSg6sQ4h8kwaeoXypYZdmCZTXsRGv48KaaJVAV_QhgLoApIuPc9lKsE4F06BU4Ahq9_--gwky2EUc-aen1HPTAzYdN6xlut1PUBqzexhjaJDJ_6yQT9U3qhCnLDN2l7t_Tu5L9Aw2zS6GN8i5sLiLG39L5cMQXvdMxjKi5YsEYwnCbegY'
app.get("/linkedin", function(req,res) {
	request.get({
		url: 'https://api.linkedin.com/v1/people/PWwdtOR_AC' + '?format=json',
		headers: {'Authorization': 'Bearer ' + access_token}
	}, function(err, response, body) {
		res.send(body)
	})
})

// app.get("/linkedin", function(req, res) {
	request.post({
	  	headers: {'content-type' : 'application/x-www-form-urlencoded'},
	  	url:     'https://www.linkedin.com/oauth/v2/accessToken',
	 	form:    {'code': 'AQT7rnqFH-vKNeVFQmCZdpRoEeFJWEubtDD31LKOV9KrSfzwL3UlChXhL4IffKeOHdAZZ5-sj2VcmnTuJxRRVFFRwbEIEy33YQJJrNXMIDB4wMzcmX4',
	 'grant_type': 'authorization_code',
	 'redirect_uri': 'http://qrcodez.azurewebsites.net/',
	 'client_id': '861z9z5wdgrd9g',
	 'client_secret': 'nU8lQziKw3tE24vM'}
	}, function(error, response, body){
	 	console.log(body);
	});
// })
// https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=861z9z5wdgrd9g&redirect_uri=http%3A%2F%2Fqrcodez.azurewebsites.net%2F&state=987654321

// http://qrcodez.azurewebsites.net/?code=AQT-CjceW-ZgLk0TenXEVP--l4YYl9lbwPCgenoGhCZ-MblzGrVcoxPhQUyFk7W-DngXD10Aj8goRcSiVI5yqEZCCttzQznbl-wO9JYQJfAdLTm8Lt8&state=987654321
// AQT-CjceW-ZgLk0TenXEVP--l4YYl9lbwPCgenoGhCZ-MblzGrVcoxPhQUyFk7W-DngXD10Aj8goRcSiVI5yqEZCCttzQznbl-wO9JYQJfAdLTm8Lt8

app.listen(port);