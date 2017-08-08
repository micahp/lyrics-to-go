import sys
import json
import requests
from pprint import pprint
from rauth import OAuth2Service
from oed import get_definition
from genius import run_genius_query
from big_huge_thesaurus import get_synonyms

# Genius API
genius_base_url = 'https://api.genius.com/search/lyrics?q='
query_param = ' '.join(sys.argv[1:]) or 'lyrics to go'
sketchy_headers = {'Authorization': 'Bearer 2OtW_klZF32VFLgUyu4Mwerg67Z0FaznQcmvSKWGs4nTaVv6fyH9aSc6elLqniWY'}

def get_word_list(filename):
    wordlist = []
    f = open(filename, 'r')
    for line in f.readlines():
	    wordlist.append(line.rstrip())
    return wordlist

if __name__ == '__main__':
	filename = sys.argv[1]
	wordlist = get_word_list(filename)
	print('Wordlist: ' + str(wordlist))
	print ''

	for word in wordlist:
		outfile = open('words/' + word, 'w')

		# Get definition from OED API
		definition = get_definition(word)
		outfile.write('DEFINITION\n')
		outfile.write(word + ' - ' + definition + '\n\n\n')

		# Get synonyms for word
		outfile.write('SYNONYMS\n')
		part_of_speech_to_synonyms = get_synonyms(word)
		for part_of_speech in part_of_speech_to_synonyms:
			synonyms = []
			for synomym in part_of_speech_to_synonyms[part_of_speech]['syn']:
				synonyms.append(synomym)
			outfile.write(part_of_speech + ': ' + ', '.join(synonyms))
		outfile.write('\n\n\n')

		# Get results from Genius API
		results = run_genius_query(word, genius_base_url, sketchy_headers)

		outfile.write('EXAMPLES\n')
		for result in results:
			outfile.write(result['title_by_artist'] + ':\n')
	  		outfile.write(str(result['lyric_snippet']) + '\n\n')
