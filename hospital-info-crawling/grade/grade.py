import pymysql
import requests
import xmltodict
import json
from my_info import *

ENC_KEY = ENC_KEY_naver
DEC_KEY = DEC_KEY_naver
limit = 9000
offset = 63000


def common_api(url, sql):
    conn = pymysql.connect(host='localhost', port=3306, user='root', passwd='1234', charset='utf8', db='open_api_data')
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute(sql)
    table: list[dict] = cursor.fetchall()
    result = []
    err = []
    for row in table:
        try:
            row.update({'serviceKey': DEC_KEY})
            data = requests.get(url=url, params=row)
            data_dict = xmltodict.parse(data.text)
            print(data_dict)
            res = data_dict['response']['body']
            if type(res) is dict:
                if res.get('item') is not None:
                    result.append(res)
                    print(res)
                elif res.get('items') is not None:
                    result.append(res)
                    print(res)
        except Exception as e:
            print('error', row, e)
            row.pop('serviceKey')
            row.pop('numOfRows')
            err.append(row)
    result.append({'errors': err})
    cursor.close()
    conn.close()
    return result


url = 'http://apis.data.go.kr/B551182/exclInstHospAsmInfoService/getExclInstHospAsmInfo'
sql = 'select encrypted_nursing_code as ykiho from nursing_hospital_info'
result = common_api(url, sql)
with open(f'grade.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=4)
