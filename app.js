var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
var request = require('request');
//
// app.all('/', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/search', function(req, res) {
    let searchTerm = req.query.search || '';
    console.log('SEARCH TERM IS: ' + searchTerm);
    request({
        url: 'https://api.genius.com/search/lyrics?q=' + searchTerm + '&access_token=P9RU-wDrwHTeg5qsi6uiyXMSe64z6zVgYjcWqK697VMrOTRfzsPQYXE0HiFCjEsH'
    }, function(error, response, body) {
        console.log('got response');
        if (error) {
            console.log("Error: " + error);
        }
        console.log('Response: ' + response);
        res.send(response);
    });
});

app.use(express.static('.'));

app.listen('8080');