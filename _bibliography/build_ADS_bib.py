# import the requests package and set your token in a variable for later use
import requests
import json

# import pprint
# from bs4 import BeautifulSoup
import re


def replace_journal_abbreviation(text, j_mac, j_full):
    """
    Replaces the journal abbreviation with the full journal name in the given text.

    Args:
        text (str): The text containing the journal entry.
        j_mac (str): The journal abbreviation to be replaced.
        j_full (str): The full journal name to replace the abbreviation with.

    Returns:
        str: The updated text with the journal abbreviation replaced by the full journal name.
    """
    # Use regex to match the exact pattern and replace it
    pattern = re.compile(rf"journal\s*=\s*{{\s*{re.escape(j_mac)}\s*}}")
    replacement = f"journal = {{{j_full}}}"
    updated_text = pattern.sub(replacement, text)
    return updated_text


def read_aas_macro_file(file_path):
    """
    Reads the AAS_macro.txt file and returns the two columns of data.

    Args:
        file_path (str): The path to the AAS_macro.txt file.

    Returns:
        tuple: A tuple containing the column names and a list of tuples with the data.
               (column_names, data)
               column_names: A list of column names.
               data: A list of tuples, where each tuple contains the TeX macro and Journal name.
    """
    with open(file_path, "r") as file:
        lines = file.readlines()

    # Extract column names from the first line
    # column_names = lines[0].strip().split()

    # Extract data from the subsequent lines
    data = []
    for line in lines[2:]:
        if line.strip():
            parts = line.split()
            if len(parts) >= 2:
                tex_macro = parts[0]
                journal_name = " ".join(parts[1:])
                data.append((tex_macro, journal_name))

    return data  # , column_names


rows = 100  # fetch 50 records at a time
start = 0  # start at the first record

# set the base URLs for the API calls we use
base_url = "https://api.adsabs.harvard.edu/v1/biblib"
bibtex_base_url = "https://api.adsabs.harvard.edu/v1/export/bibtex"
journal_url = "https://api.adsabs.harvard.edu/v1/journals/summary"
text_macro_url = "http://cdsads.u-strasbg.fr/abs_doc/aas_macros.html"

# Get the needed tex macros and journal names
file_path = "AAS_macros.txt"
data = read_aas_macro_file(file_path)
# for macro, journal in data:
#     print(f"{macro}: {journal}")

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
    tmp_lib = requests.get(
        f"{base_url}/libraries/{library['id']}?rows={rows}&start={start}",
        headers={"Authorization": "Bearer " + token},
    )
    bibcodes = tmp_lib.json()["documents"]

    # create a dictionary with the payload values
    payload = {"bibcode": bibcodes}
    # the json library offers an easy way to convert between JSON or dictionaries and their serialized strings
    serialized_payload = json.dumps(payload)
    bibtex = requests.post(
        bibtex_base_url,
        headers={"Authorization": "Bearer " + token},
        data=serialized_payload,
    )

    # print(bibtex.json()["export"])

    # text = bibtex.json()["export"]
    # # on the line in the text variable, grab the line that reads journal = {something} and return the {something}
    # journal = text[
    #     text.find("journal = {")
    #     + len("journal = {") : text.find("}", text.find("journal = {"))
    # ]

    # check if the journal is a AAS macro
    # if journal[0] == "\\":
    #     j_mac = journal[1:]
    #     # in the data list, find the journal name that matches the macro
    #     for macro, j in data:
    #         if j_mac == macro:
    #             j_full = j
    # # print(j_full)

    # updated_text = replace_journal_abbreviation(text, j_mac, j_full)
    # print(updated_text)

    # # in text, find the line read journal = {something} and replace it with journal = {journal}
    # text = text.replace(f"journal = {{{j_mac}}}", f"journal = {{{j_full}}}")

    # print(text)
    # print(f"journal = {{{j_mac}}}", f"journal = {{{j_full}}}")

    # for item in bibtex.json():
    #     print(item)

    # write the line below to a text file
    with open(f"{library['name']}.bib", "w") as f:
        f.write(bibtex.json()["export"])
        print(f"Exported {len(bibcodes)} documents to {library['name']}.bib")
