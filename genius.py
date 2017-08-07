import sys
from rauth import OAuth2Service
import requests
from pprint import pprint
import json

# The keys that should work. They work for normal endpoints, but not for the lyrics endpoint
client_id = 'VCoG0ug_0-B81cRMdxd0Ooln-Ji6MiXBrvbTnIMCV5IZDS_LqRrDPvpO4r4um6Ac'
client_secret = 'qsEPWmE_th7cDvEL0Ea0_UC9IZ8-rQPb_JFVlPC5rZM9rB49phmk_zvnwdkZ34Ii6d16Dw_upmtKFS_U1Q0B1g'
access_token = 'QO1yUeueOA6jMDXfk2OVC5FlqsupKJP1YFo2mYC33MgfRdw8y7pJe4enTwps3Cef'
authorize_url = 'https://api.genius.com/oauth/authorize'
access_token_url = 'https://api.genius.com/oauth/token'
base_url = 'https://api.genius.com/search/lyrics?q='
name = 'genius'

'''
genius = OAuth2Service(
client_id = client_id,
client_secret = client_secret,
authorize_url = authorize_url,
access_token_url = access_token_url,
base_url = base_url)
'''

# They key that works for lyrics endpoint, copied from Genius API example
sketchy_access_token = '2OtW_klZF32VFLgUyu4Mwerg67Z0FaznQcmvSKWGs4nTaVv6fyH9aSc6elLqniWY'
redirect_uri = 'nishanths.github.io/spitfire-live'
client_params = {'scope': 'me',
                 'redirect_uri': redirect_uri,
                 'client_id': client_id,
                 'state': 1,
                 'response_type': 'code'}
my_params = {'redirect_uri': redirect_uri,
             'client_id': client_id,
             'token': 1,
             'client_secret': client_secret,
             'grant_type': 'authorization_code',
             'response_type': 'code'}

query_param = ' '.join(sys.argv[1:]) or 'lyrics to go'
sketchy_headers = {'Authorization': 'Bearer 2OtW_klZF32VFLgUyu4Mwerg67Z0FaznQcmvSKWGs4nTaVv6fyH9aSc6elLqniWY'}


# Run the query
def run_genius_query(query_param, base_url, headers):
    r = requests.get(base_url + query_param, headers=headers)
    tree = json.loads(r.text)
    responses = tree['response']['sections'][0]['hits']
    results = []

    print('Genius search results for query: ' + query_param)
    print '\n'
    for response in responses:
        result = {}      
        lyric_snippet = response['highlights'][0]['value'].encode('utf-8').strip()
        result['lyric_snippet'] = lyric_snippet

        song_title_artist = response['result']['full_title'].encode('utf-8').strip()
        result['title_by_artist'] = song_title_artist

        print(song_title_artist + ':')
        print(lyric_snippet)
        print '\n'

        results.append(result)

    return results

if __name__ == '__main__':
    run_genius_query(query_param, base_url, sketchy_headers)