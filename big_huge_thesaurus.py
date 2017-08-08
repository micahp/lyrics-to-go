import sys
import json
import requests
from pprint import pprint
from rauth import OAuth2Service

def get_synonyms(word):
	api_key = 'd7c12b894d2cae529549f8633ae718d0'
	base_url = 'http://words.bighugelabs.com/api/2/d7c12b894d2cae529549f8633ae718d0/'
	rest = '/json'

	url = base_url + word + rest

	response = requests.get(url)
	tree = json.loads(response.text)
	pprint(tree)
	return tree

if __name__ == '__main__':
	get_synonyms('savage')