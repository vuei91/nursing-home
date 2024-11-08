import requests
import xmltodict
import PublicDataReader as pdr

url = ' http://apis.data.go.kr/B550928/searchLtcInsttService01/getBillGreentInsttSearchList01'
service_encode_key = 'ILPcl20x4lBb9%2BZ0vTuFydRBbNGawQ6v90TEdZmfOgfenJK%2BEe56xF8BL%2BpQk51qE%2BVmv0iCJjTGx8d6vhO%2FKg%3D%3D'
service_decode_key = 'ILPcl20x4lBb9+Z0vTuFydRBbNGawQ6v90TEdZmfOgfenJK+Ee56xF8BL+pQk51qE+Vmv0iCJjTGx8d6vhO/Kg=='
num_of_rows = 10
page_no = 1
params = dict()
params['serviceKey'] = service_decode_key
params['siDoCd'] = '11'
params['pageNo'] = page_no
params['numOfRows'] = num_of_rows
hospital = requests.get(url, params=params)
hospital_dict = xmltodict.parse(hospital.text)
print(hospital_dict['response']['body']['items']['item'])