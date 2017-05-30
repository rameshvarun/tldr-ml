import os
import glob
import yaml
import json

index = {}
index['terms'] = {}
index['aliases'] = {}
for term_file in glob.iglob("terms/**/*.yml", recursive=True):
    id = os.path.splitext(os.path.basename(term_file))[0]
    with open(term_file, 'r') as file:
        doc = yaml.load(file)
    index['terms'][id] = doc

    index['aliases'][doc['term'].lower()] = id
    if 'aliases' in doc:
        for alias in doc['aliases']:
            index['aliases'][alias.lower()] = id

with open("index.json", 'w') as out:
    out.write(json.dumps(index))
