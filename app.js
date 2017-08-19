var express = require('express');
var util = require('util');
var stringify = require('json-stringify-safe');
var request = require('request');
var app = express();

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

let sketchy_headers = {'Authorization': 'Bearer 2OtW_klZF32VFLgUyu4Mwerg67Z0FaznQcmvSKWGs4nTaVv6fyH9aSc6elLqniWY'}

app.get('/search', function(req, res) {
    console.log('get request to /search')
    let searchTerm = req.query['search'] || '';
    console.log('SEARCH TERM IS: ' + searchTerm);
    let options = {
        url: 'https://api.genius.com/search/lyrics?q=' + searchTerm,
        headers: sketchy_headers
    }
    request(options, function(error, response, body) {
        console.log('got response');
        if (error) {
            console.log("Error: " + error);
        }
        res.send(body);
        console.log('SENT RESPONSE')
    });
});

app.use(express.static('.'));

app.listen('8080');