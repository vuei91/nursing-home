# 엑셀파일을 데이터베이스에 등록
# 사용 할 api
# 프로그램운영사항 목록 조회(프로그램종류, 제목, 대상, 주기, 장소)
# http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02/getProgramSttusDetailInfoList02
# 일반현황조회(주소, 전화번호, 기관지정일, 설치신고일)
# http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02/getGeneralSttusDetailInfoItem02
# 시설 현황 조회(침실, 특수침실, 의료 및 간호사실, 작업 및 일상동작훈련실, 화장실 등)
# http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02/getInsttSttusDetailInfoItem02
# 기타 상세 정보조회(홈페이지주소, 교통편, 주차시설)
# http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02/getInsttEtcDetailInfoItem02
# 입소인원 상세 정보조회(정원, 현원, 대기인원)
# http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02/getAceptncNmprDetailInfoItem02
# 복지용구현황 목록 조회(신고내역, 장비명, 제조사, 모델명, 용도, 기타)
# http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02/getWlfareToolDetailInfoList02

import pymysql
import requests
import xmltodict
import json
from my_info import *

ENC_KEY = ENC_KEY_kakao
DEC_KEY = DEC_KEY_kakao
limit = 9000
offset = 72000
# sql = f'select 장기요양기관코드 as longTermAdminSym, 기관유형코드 as adminPttnCd from 장기요양기관_인원현황 where 장기요양기관코드 not in (select a.장기요양기관코드 from 장기요양기관_일반현황 a)'


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
            row.update({'numOfRows': 1000})
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

# 프로그램
def program_api():
    url = 'http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02/getProgramSttusDetailInfoList02'
    sql = f'select 장기요양기관코드 as longTermAdminSym, 기관유형코드 as adminPttnCd from 장기요양기관_인원현황 limit {limit} offset {offset}'
    result = common_api(url, sql)
    with open(f'program_limit_{limit}_offset_{offset}.json', 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=4)

# 일반
def normal_api():
    url = 'http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02/getGeneralSttusDetailInfoItem02'
    sql = f'select 장기요양기관코드 as longTermAdminSym, 기관유형코드 as adminPttnCd from 장기요양기관_인원현황 limit {limit} offset {offset}'
    result = common_api(url, sql)
    with open(f'normal_limit_{limit}_offset_{offset}.json', 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=4)

#기타
def etc_api():
    url = 'http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02/getInsttEtcDetailInfoItem02'
    sql = f'select 장기요양기관코드 as longTermAdminSym, 기관유형코드 as adminPttnCd from 장기요양기관_인원현황 limit {limit} offset {offset}'
    result = common_api(url, sql)
    with open(f'etc_limit_{limit}_offset_{offset}.json', 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=4)

# 입소현황
def person_api():
    url = 'http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02/getAceptncNmprDetailInfoItem02'
    sql = f'select 장기요양기관코드 as longTermAdminSym, 기관유형코드 as adminPttnCd from 장기요양기관_인원현황 limit {limit} offset {offset}'
    result = common_api(url, sql)
    with open(f'person_limit_{limit}_offset_{offset}.json', 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=4)

# 시설현황
def facility_api():
    url = 'http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02/getInsttSttusDetailInfoItem02'
    sql = f'select 장기요양기관코드 as longTermAdminSym, 기관유형코드 as adminPttnCd from 장기요양기관_인원현황 limit {limit} offset {offset}'
    result = common_api(url, sql)
    with open(f'facility_limit_{limit}_offset_{offset}.json', 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=4)

# 복지용구
def tool_api():
    url = 'http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02/getWlfareToolDetailInfoList02'
    sql = f'select 장기요양기관코드 as longTermAdminSym from 장기요양기관_일반현황 limit {limit} offset {offset}'
    result = common_api(url, sql)
    with open(f'tool_limit_{limit}_offset_{offset}.json', 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=4)


# 스탭
def staff_api():
    url = 'http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02/getStaffSttusDetailInfoItem02'
    sql = f'select 장기요양기관코드 as longTermAdminSym, 기관유형코드 as adminPttnCd from 장기요양기관_인원현황 limit {limit} offset {offset}'
    result = common_api(url, sql)
    with open(f'staff_limit_{limit}_offset_{offset}.json', 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=4)


def main():
    program_api()
    normal_api()
    facility_api()
    etc_api()
    # tool_api()
    person_api()
    staff_api()


main()

