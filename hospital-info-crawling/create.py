import json

import requests

with open("hospitals2.json", 'r') as f:
    filters = json.load(f)

for filter in filters:
    requests.post("http://localhost:8080/hospital/", json=filter, headers={'Content-Type': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYXZlcl9uanhDTnlLN2VVbGtOQiIsImlhdCI6MTcxODAxNTYwMSwiZXhwIjoxNzE4MDE5MjAxfQ.OBzTPj6EeGDE3oc9pB-qNAtPFt8GNF_1ITvpL9b0Sro'})


































