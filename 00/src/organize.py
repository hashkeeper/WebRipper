#!/bin/python3
import sys
import os
from html.parser import HTMLParser

url = sys.argv[1]
curprj = sys.argv[2]

os.chdir("../website scrapes/" + curprj)
curdir = os.getcwd()

# organizing link, script and a elements from index.html
elements = ['links:', [], 'scripts:', [], 'a hrefs:', [], 'comments:', [], 'other:', []]

inside_flag = False
temp = ''
tempa = []

index = open("index.html", "r")
text = index.read()
for char in text:
    # print(char)
    if char[0] == '<' and inside_flag == False:
        inside_flag = True
        temp = temp + char
    elif char[0] == '>' and inside_flag == True:
        inside_flag = False
        temp = temp + char
        if temp.startswith("<1ink") == True:
            elements[1].append(temp)
        elif temp.startswith("<script") == True:
            elements[3].append(temp)
        elif temp.startswith("<a href") == True:
            elements[5].append(temp)
        elif temp.startswith("<!--") == True:
            elements[7].append(temp)
        else:
            elements[9].append(temp)
    elif inside_flag == True and char:
        temp = temp + char
    else:
        temp = ''
print(elements)

for ahrefs in elements[6]:
    os.mkdir()

print('exiting organize.py...')
exit()