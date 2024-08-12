# import the requests package and set your token in a variable for later use
import requests
import json
import pprint

rows = 50 # fetch 50 records at a time

# set the base URL for the API
base_url = "https://api.adsabs.harvard.edu/v1/biblib"
bibtex_base_url = "https://api.adsabs.harvard.edu/v1/export/bibtex"

# set token equal to the first line of ADS_token.txt as a string
with open("ADS_token.txt", "r") as f:
    token = f.readline().strip()
print(f"Using token: {token}")

# First we want to get list of my ADS libraries
# When a library is returned, we will get a list of the library's contents
# {
# 'name': 'Mikesell-peer-reviewed',
# 'id': '2xPvCd9BSHKpZtiqPsgexQ',
# 'description': 'My ADS library',
# 'num_documents': 44,
# 'date_created': '2024-08-12T14:39:54.258195',
# 'date_last_modified': '2024-08-12T14:42:33.191957',
# 'permission': 'owner',
# 'public': False,
# 'num_users': 1,
# 'owner': 'dylan.mikesell'
# }

# /libraries: create or view all libraries for a given user; GET or POST methods allowed
results = requests.get(
    f"{base_url}/libraries", headers={"Authorization": "Bearer " + token}
)
print(f"Found {len(results.json()["libraries"])} libraries")

# Process each library to get bibcode of each document
for library in results.json()["libraries"]:
    print(f"Processing library: {library['name']}")
    # /libraries/<library_id>: view a specific library; GET method is allowed
    tmp_lib = requests.get(f"{base_url}/libraries/{library['id']}?rows={rows}", \
                           headers={'Authorization': 'Bearer ' + token})
    bibcodes = tmp_lib.json()['documents']

    # create a dictionary with the payload values
    payload = {'bibcode': bibcodes}
    # the json library offers an easy way to convert between JSON or dictionaries and their serialized strings
    serialized_payload = json.dumps(payload)
    bibtex = requests.post(bibtex_base_url, 
                            headers={'Authorization': 'Bearer ' + token},
                            data=serialized_payload)

    # write the line below to a text file
    with open(f"{library['name']}.bib", "w") as f:
        f.write(bibtex.json()['export'])
        print(f"Exported {len(bibcodes)} documents to {library['name']}.bib")
