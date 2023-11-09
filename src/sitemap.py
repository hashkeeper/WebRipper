import sys
import requests
import subprocess
from bs4 import BeautifulSoup

url = sys.argv[1]
curprj = sys.argv[2]

r = requests.get(url)
soup = BeautifulSoup(r.text, 'html.parser')

a_ele = []

for ele in soup.find_all('a'):
    a_ele.append(ele)

a_href = []

for ele in a_ele:
    catch = ele.get('href')
    a_href.append(catch)

for ele in a_href:
    if ele == '':
        continue
    else:
        subprocess.call(['bash', 'urlcleaner.sh', ele, curprj])

