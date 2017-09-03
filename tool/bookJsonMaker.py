#!/usr/bin/env python
# -*- coding: utf-8 -*-　　
import os
import fileinput
import sys
import json
reload(sys)
sys.setdefaultencoding('utf8')

with open("ref/book.json", "r") as jsonFile:
    data = json.load(jsonFile)

data["root"] = "./books/"+sys.argv[1]
data["pluginsConfig"]["editlink"]["base"]="https://github.com/zhenkunhe/Gitbook/edit/master/books/"+sys.argv[1]

with open("book.json", "w") as jsonFile:
    json.dump(data, jsonFile,indent=4)
