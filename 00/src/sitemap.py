import sys
import os
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


curprjpath = "../website scrapes/" + curprj
os.chdir(curprjpath)

href_counter = 0
print("which of the following a_hrefs do you want to scrape?")
with open("href_list.txt", "r") as file:
    for line in file:
        if line == '':
            continue
        elif line.startswith("/"):
            line = line.rstrip()
            qvar = str(href_counter) + ") " + curprj + line
            print(qvar)
            href_counter = href_counter + 1 
        else:
            line = line.rstrip()
            qvar = str(href_counter) + ") " + line
            print(qvar)
            href_counter = href_counter + 1 



print("exiting sitemap.py...")
exit