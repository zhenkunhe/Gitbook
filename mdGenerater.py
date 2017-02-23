#!/usr/bin/env python
# -*- coding: utf-8 -*-　　
import os
import fileinput
import sys
reload(sys)
sys.setdefaultencoding('utf8')

def touch(path,title):
    basedir = os.path.dirname(path)
    if not os.path.exists(basedir):
        os.makedirs(basedir)
    if not os.path.exists(path):
        with open(path, 'a') as f:
            os.utime(path, None)
            f.write("# "+title)


def listprinter(l):
    if isinstance(l, list):
        return u'[' + u','.join([listprinter(i) for i in l]) + u']'
    elif isinstance(l, tuple):
        return u'(' + u','.join([listprinter(i) for i in l]) + u')'
    elif isinstance(l, (str, unicode)):
        return u"'" + unicode(l) + u"'"

topic =u""
subTitles = [topic]
for line in fileinput.input('books/'+sys.argv[1]+'/SUMMARY.md', inplace=True):
    line = line.rstrip()
    if line.find('## ') >= 0:
        topic = line[line.find('## ')+3:].decode('utf8')
        if 'Introduction' == topic :
            print line
            continue
        del subTitles[:]
        subTitles = [topic]
    if line.find('*') >= 0:
        if 'Introduction' == topic :
            print line
            continue
        if 'tags' == line[line.find('[')+1:line.find(']')] :
            line = line.replace( line[line.find(']')+2:line.rfind(')')], 'tags.md')
            print line
            continue
        subTitlePlace = line.find('*')/2+1
        if len(subTitles)-1 < subTitlePlace:
            subTitles.append(line[line.find('[')+1:line.find(']')].decode('utf-8'))
            del subTitles[subTitlePlace+1:]
        else:
            subTitles[subTitlePlace] = line[line.find('[')+1:line.find(']')].decode('utf-8')
            del subTitles[subTitlePlace+1:]
        #print listprinter(subTitles)

        filePath = ""
        for item in subTitles:
            filePath = filePath + '/' +item
        filePath = '/md'+filePath+'.md'
        touch('books/'+sys.argv[1]+filePath,subTitles[len(subTitles)-1])
        line = line.replace( line[line.find(']')+2:line.rfind(')')], filePath)
    print line
