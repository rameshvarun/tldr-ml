import os
import glob
import yaml
import json

terms = []
for term_file in glob.iglob("terms/**/*.yml", recursive=True):
    id = os.path.splitext(os.path.basename(term_file))[0]
    with open(term_file, 'r') as file:
        doc = yaml.load(file)
    doc['id'] = id
    terms.append(doc)

with open("terms.json", 'w') as out:
    out.write(json.dumps(terms))
