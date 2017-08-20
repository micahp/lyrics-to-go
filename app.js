// IMPORTS
// Import libraries
var express = require('express');
var util = require('util');
var stringify = require('json-stringify-safe');
var request = require('request');
var app = express();


// DEFINE CONSTANTS
// Genius default credential
const GENIUS_SKETCHY_HEADERS = {'Authorization': 'Bearer 2OtW_klZF32VFLgUyu4Mwerg67Z0FaznQcmvSKWGs4nTaVv6fyH9aSc6elLqniWY'}
// OED Credentials
const OED_BASE_URL = 'https://od-api.oxforddictionaries.com/api/v1/entries/en/'
const OED_APP_ID = 'f207aa32'
const OED_APP_KEYS = ['71b56d3a8f09990710fda0799bf8757f', '87948c46b785f96e912cd796917e022e']
const OED_HEADERS = {
    'app_id': OED_APP_ID,
    'app_key': OED_APP_KEYS[0]
}
// Big Huge Thesaurus Credentials
const BHT_API_KEY = 'd7c12b894d2cae529549f8633ae718d0'
const BHT_BASE_URL = 'http://words.bighugelabs.com/api/2/d7c12b894d2cae529549f8633ae718d0/'


// API METHODS
// Default shows index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Search for a query string [GET]
app.get('/search', function(req, res) {
    console.log('get request to /search')
    let searchTerm = req.query['search'] || '';
    console.log('SEARCH TERM IS: ' + searchTerm);
    let options = {
        url: 'https://api.genius.com/search/lyrics?q=' + searchTerm,
        headers: GENIUS_SKETCHY_HEADERS
    }
    request(options, function(error, response, body) {
        console.log('got response');
        if (error) {
            res.code(400)
            res.send(error)
        } else {
            if (body)
                res.send(JSON.parse(body))
            else
                res.json()
        }
        console.log('SENT RESPONSE')
    });
});

// Get definition of a word/phrase
app.get('/definitions', function(req, res) {
    console.log('get request to /definition')
    let term = req.query.term
    let options = {
        url: OED_BASE_URL + term,
        headers: OED_HEADERS
    }
    request.get(options, function(error, response, body) {
        if (error) {
            res.code(400)
            res.send(error)
        } else {
            if (body)
                res.send(JSON.parse(body))
            else
                res.json({})
        }
    })
})

// Get synonyms for word/phrase
app.get('/synonyms', function(req, res) {
    let term = req.query.term
    let options = {
        url: BHT_BASE_URL + term + '/json'
    }
    request.get(options, function(error, response, body) {
        if (error) {
            res.code(400)
            res.send(error)
        } else {
            if (body)
                res.send(JSON.parse(body))
            else
                res.json({})
        }
    })
})

// SETUP
app.use(express.static('.'));
app.listen('8080');