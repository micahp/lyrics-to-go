'''
OED API Info
- 60 requests/minutes
- 3k requests per month
'''

import sys
import requests
import pprint
import json

def get_definition(search_term):
	base_url = 'https://od-api.oxforddictionaries.com/api/v1/entries/en/'
	app_id = 'f207aa32'
	app_keys = ['71b56d3a8f09990710fda0799bf8757f', '87948c46b785f96e912cd796917e022e']
	headers = {'app_id': app_id,
		  'app_key': app_keys[0]}

	r = requests.get(base_url + search_term, headers=headers)
	tree = json.loads(r.text)
	results = tree['results']
	definition = results[0]['lexicalEntries'][0]['entries'][0]['senses'][0]['definitions'][0].encode('utf-8').strip()
	print(search_term + ': ' + definition)
	return definition


if __name__ == '__main__':
	word = 'abduct'
	get_definition(word)