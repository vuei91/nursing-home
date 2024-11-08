import re
s = '9:00 - 10:00\n12:30 접수마감'
l = s.split('\n')
print(l)
for i in l:
    if re.search(r'휴게시간', i):
        print('휴게시간', i.split(' 휴게시간')[0])
        continue
    if re.search(r'접수마감', i):
        print('접수마감', i.split(' 접수마감')[0])
        continue
    print('기본', i)
