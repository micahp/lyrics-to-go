var express = require('express');
var util = require('util');
var stringify = require('json-stringify-safe');
var request = require('request');
var app = express();

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/search', function(req, res) {
    let searchTerm = req.query['search'] || '';
    console.log('SEARCH TERM IS: ' + searchTerm);
    request({
        url: 'https://api.genius.com/search/lyrics?q=' + searchTerm + '&access_token=P9RU-wDrwHTeg5qsi6uiyXMSe64z6zVgYjcWqK697VMrOTRfzsPQYXE0HiFCjEsH'
    }, function(error, response, body) {
        console.log('got response');
        if (error) {
            console.log("Error: " + error);
        }
        //console.log('Response: ' + stringify(response));
        res.send(stringify(response));
        console.log('SENT RESPONSE')
    });
});

app.use(express.static('.'));

app.listen('8080');