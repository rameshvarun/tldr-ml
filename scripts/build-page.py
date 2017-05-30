import os
import glob
import yaml
import json

from jinja2 import Template
template = Template(open("scripts/index-template.html", "r").read())

terms = []
for term_file in glob.iglob("terms/**/*.yml", recursive=True):
    id = os.path.splitext(os.path.basename(term_file))[0]
    with open(term_file, 'r') as file:
        doc = yaml.load(file)
    doc['id'] = id
    terms.append(doc)

with open("terms.json", 'w') as out:
    out.write(json.dumps(terms))
with open("index.html", 'w') as out:
    out.write(template.render(terms=terms))
