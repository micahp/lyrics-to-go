var res;

const BHT_MAP = {
    "syn": 'synonyms',
    "ant": 'antonyms,',
    "rel": 'related terms',
    "sim": 'similar terms',
    "usr": 'user suggestions'
}

// Setup
$(document).ready(function() {
    $('#searchBar').focus();
    $('#searchBar').on('keydown', searchBarOnEnter);

    $('#searchBar').val('grey goose');
    var press = $.Event('keydown');
    press.keyCode = 13;
    press.ctrlKey = false;
//    $('#searchBar').trigger(press);
});

// Gather necessary info to search Genius API
function searchBarOnEnter(e) {
    if (e.keyCode === 13) { // ENTER pressed
        $('#definition').html('')
        $('#synonyms').html('')
        // Remove current genius results
        $('#genius').children().remove();
        $('#genius').append(document.createElement('p').innerHTML = "<h2>Searching...</h2>");
        $('#genius').show();

        let searchTerm = $(this).val();

        searchGeniusLyrics(searchTerm);
        searchOED(searchTerm);
        searchBigHugeThesaurus(searchTerm);
    }
}

function createElementString(element, innerHTML) {
    return '<' + element + '>' + innerHTML + '<' + element + '/>'
}

// Query Big Huge Thesaurus for synonyms
function searchBigHugeThesaurus(term) {
    console.log('searching big huge thesaurus for ', term)
    $.get('/synonyms?term=' + term, function(response) {
        $synonyms = $('#thesaurus')
        $synonyms.html('<h2>Thesaurus</h2>')
        // console.log(response)
        if (!response || Object.keys(response).length === 0) {
            $synonyms.append(createElementString('span', 'No results to display.'))
        } else {
            for (let partOfSpeech in response) {
                $synonyms.append(createElementString('h3', partOfSpeech))
                let types = response[partOfSpeech]
                for (let type in types) {
                    let typeText = BHT_MAP[type]
                    $synonyms.append(createElementString('h4', typeText))
                    let words = types[type]
                    let wordString = words.join(', ')
                    $synonyms.append(createElementString('p', wordString))
                }
            }
        }
    }).fail(function(err) {
        console.log('error: ' + err.message);
        $synonyms.html('<h2>Thesaurus</h2>')
        $('#thesaurus').append(createElementString('span', 'No results to display.'))
    })
}

// Query Oxford English Dictionary API
function searchOED(term) {
    // console.log('searching OED for ' + term)
    $.get('/definitions?term='+term, function(response) {
        // console.log(response)
        if (!response || Object.keys(response).length === 0) {
            $('#definition').append(createElementString('span', 'No results to display.'))
        } else {
            let definition = response.results[0]['lexicalEntries'][0]['entries'][0]['senses'][0]['definitions'][0]
            // console.log('Definition: ', definition)
            $('#definition').html('<h2>Definition</h2><p>' + definition + '</p>')
        }
    }).fail(function(err) {
        console.log('error: ' + err.message);
        $('#definition').html('<h2>Definition</h2>')
        $('#definition').append(createElementString('span', 'No results to display.'))
    })
}

// Query genius API, extracting useful info
function searchGeniusLyrics(searchTerm) {
    // console.log('searching genius for \"' + searchTerm + '\"...');
    $('#genius').html('<h2>Lyrics</h2><p></p>')
    let parameters = { search: searchTerm };
    $.get('/search?search='+searchTerm, function(response) {
        $('.lyrics p').html('');
        // console.log(response)
        if (!response || Object.keys(response).length === 0) {
            $('#genius').append(createElementString('span', 'No results to display.'))
        } else {
            var responses = response.response.sections[0]['hits'];
            // console.log(responses);
            for (var response of responses) {
                var lyric_snippet = response.highlights[0].value;
                var song_title_artist = response.result.full_title;
                var url = response.result.url;

                var result = document.createElement('div');
                result.className = "result";
                var innerHTML = ('<a href=' + url + ' target="__blank">' + song_title_artist + '</a>' +
                    '<br/><br/>' + lyric_snippet);
                result.innerHTML = innerHTML;
                $('#genius').append(result);

                // console.log(response);
                // console.log(song_title_artist + ':');
                // console.log(lyric_snippet);
                // console.log();
            }
        }
    }).fail(function(err) {
        console.log('error: ' + err.message);

        $('#genius').append(createElementString('span', 'No results to display.'))
    });

}
