import json
import requests
import xmltodict
from my_info import *

ENC_KEY = ENC_KEY_wkwk28054
DEC_KEY = DEC_KEY_wkwk28054

program_url = 'http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02/getProgramSttusDetailInfoList02'
person_url = 'http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02/getAceptncNmprDetailInfoItem02'
facility_url = 'http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02/getInsttSttusDetailInfoItem02'
staff_url = 'http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02/getStaffSttusDetailInfoItem02'
normal_url = 'http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02/getGeneralSttusDetailInfoItem02'
etc_url = 'http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02/getInsttEtcDetailInfoItem02'


def error_handler(path, url, file_name):
    with open(path, 'r', encoding='utf8') as f:
        data = json.load(f)
        errors = data[-1]['errors']
        result = []
        err = []
        for row in errors:
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
        with open(f'{file_name}_errors.json', 'w', encoding='utf8') as f2:
            json.dump(result, f2, ensure_ascii=False, indent=4)


def facility_error_handler():
    facilities = [
        'facility_limit_9000_offset_9000.json',
        'facility_limit_9000_offset_18000.json',
        'facility_limit_9000_offset_27000.json',
        'facility_limit_9000_offset_63000.json'
    ]
    for facility in facilities:
        error_handler(f'../error/{facility}', facility_url, facility)


def person_error_handler():
    people = [
        'person_limit_9000_offset_0.json',
        'person_limit_9000_offset_63000.json',
        'person_limit_9000_offset_72000.json',
        'person_limit_9000_offset_81000.json',
        'person_limit_9000_offset_90000.json'
    ]
    for person in people:
        error_handler(f'../error/{person}', person_url, person)


def program_error_handler():
    programs = [
        'program_limit_9000_offset_63000.json',
        'program_limit_9000_offset_72000.json',
        'program_limit_9000_offset_81000.json',
        'program_limit_9000_offset_90000.json',
    ]
    for program in programs:
        error_handler(f'../error/{program}', program_url, program)


def staff_error_handler():
    staffs = [
        # 'staff_limit_9000_offset_0.json',
        # 'staff_limit_9000_offset_9000.json',
        # 'staff_limit_9000_offset_18000.json',
        # 'staff_limit_9000_offset_27000.json',
        'staff_limit_9000_offset_63000.json'
    ]
    for staff in staffs:
        error_handler(f'../error/{staff}', staff_url, staff)


def normal_error_handler():
    normals = [
        'normal_limit_9000_offset_9000.json',
        'normal_limit_9000_offset_18000.json',
        'normal_limit_9000_offset_27000.json',
    ]
    for normal in normals:
        error_handler(f'../error/{normal}', normal_url, normal)


def etc_error_handler():
    etcs = [
        'etc_limit_9000_offset_9000.json',
        'etc_limit_9000_offset_18000.json',
        'etc_limit_9000_offset_27000.json',
        'etc_limit_9000_offset_63000.json'
    ]
    for etc in etcs:
        error_handler(f'../error/{etc}', etc_url, etc)


def main():
    staff_error_handler()
    # program_error_handler()
    # facility_error_handler()
    # person_error_handler()
    # etc_error_handler()


main()
