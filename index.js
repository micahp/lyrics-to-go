var res;

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
        // Remove current results
        $('.results').children().remove();
        $('.results').append(document.createElement('p').innerHTML = "<h2>Results</h2>" +
            "<p>Retreiving results...</p>");

        $('.results').show();
        let searchTerm = $(this).val();
        searchGeniusLyrics(searchTerm);
    }
}

// Query genius API, extracting useful info
function searchGeniusLyrics(searchTerm) {
    console.log('searching for \"' + searchTerm + '\"...');
    let parameters = { search: searchTerm };
    $.get('/search?search='+searchTerm, function(response) {
        console.log('hi');
        $('.results p').html('');
        res = JSON.parse(response);
        console.log(res)
        var responses = res.response.sections[0]['hits'];
        console.log(responses);
        for (var response of responses) {
            var lyric_snippet = response.highlights[0].value;
            var song_title_artist = response.result.full_title;
            var url = response.result.url;

            var result = document.createElement('div');
            result.className = "result";
            var innerHTML = ('<a href=' + url + ' target="__blank">' + song_title_artist + '</a>' +
                '<br/><br/>' + lyric_snippet);
            result.innerHTML = innerHTML;
            $('.results').append(result);

            console.log(response);
            // console.log(song_title_artist + ':');
            // console.log(lyric_snippet);
            // console.log();
        }
    }).fail(function(err) {
        console.log('error: ' + err.message);
    });

}
