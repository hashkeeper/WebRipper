#!/bin/python3
import sys
import os
import requests
import subprocess

# create variable storing url from bash
# & use it to grab all home page index data
url = sys.argv[1]
curprj = sys.argv[2]

os.chdir("./website scrapes/" + curprj)
curdir = os.getcwd()

index_scrape = requests.get(url).text

index_file = open('index.html', 'w')
index_file.write(index_scrape)
index_file.close()

os.chdir("../../src")
curdir = os.getcwd()

page_map = []

organize_path = 'sitemap.py'
subprocess.run(['python3', organize_path, url, curprj])

print("exiting engine.py...")
exit()