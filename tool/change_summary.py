#!/usr/bin/env python
# -*- coding: utf-8 -*-　　
import os
import fileinput
import sys
reload(sys)
sys.setdefaultencoding('utf8')

for line in fileinput.input('books/'+sys.argv[1]+'/SUMMARY.md', inplace=True):
    line = line.rstrip()
    if line.startswith('#'):
        print line
        print 
        print "## Introduction"
        print "* [Introduction](README.md)"
    elif line.startswith('-'):
        continue
    elif line.startswith('  -'):
        print 
        print line.replace("  -", "##")
    elif line.startswith('  '):
        print line[2:]
    elif line.startswith('* [Tags]'):
        print 
        print "## Tags"
        print line
    elif line.startswith('* [SUMMARY]'):
        continue
    else:
        print line
