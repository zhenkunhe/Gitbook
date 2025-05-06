# Python

[TOC]

## 型態

### List

#### Method

- `append(x)`：在list尾端增加一個成員。
- `count(x)`：傳回在整個list裡面， x 出現了多少次。
- `index(x)`：傳回第一個其值相等於 x 的成員之位置(index)。
- `remove(x)`：拿掉第一個其值相等於 x. 的成員。
- `insert(i,x)`：在某個特定的位置加入一個成員。
- `sort()`：針對 list 裡面的成員做排序。
- `reverse()`：反轉整個 list 裡面成員的位置。

#### Function

- `max(L)`
- `min(L)`
- `len(L)`
- `cmp(L1,L2)`：若值都一樣,return 0，不然return -1。

``` python
my_list = []
my_list.append(1) 
my_list.append(2) 

my_list2 = [55.55,"Hi",3,99,222,222]
my_list2[0]=333.333

print len(my_list)
print sum(my_list)

print my_list2.count(222)
print my_list2[0]
print my_list2[-1]
print my_list2[1:3]
print my_list2[2:]
```

>Output
`
2
3
2
333.333
222
['Hi', 3]
[3, 99, 222, 222]
`

### Dictionary

- `keys`
- `get`

``` python
# encoding: utf-8

passwd={'Mars':00000,'Mark':56680}
passwd['Happy']=9999     
passwd['Smile']=123456

del passwd['Mars']
passwd['Mark']=passwd['Mark']+1

print passwd
print passwd.keys()
print passwd.get('Tony')
```

>Output
`{'Happy': 9999, 'Smile': 123456, 'Mark': 56681}
['Happy', 'Smile', 'Mark']
None`

### Set

- `add`

``` python
# encoding: utf-8

admins = set()
users = {'Smile', 'Tony','Happy','Sherry','Allen','Andy', 'Mars'}
admins.add('ihc')
admins.add('Mars')

print admins & users
print admins | users
print admins ^ users
print admins - users
print users - admins
```

>Output
`set(['Mars'])
set(['Allen', 'Andy', 'Smile', 'Mars', 'Tony', 'ihc', 'Happy', 'Sherry'])
set(['Andy', 'Allen', 'Tony', 'Smile', 'Happy', 'ihc', 'Sherry'])
set(['ihc'])
set(['Sherry', 'Andy', 'Allen', 'Tony', 'Smile', 'Happy'])`

### String

- `len`
- `split`
- `decode`
- `repr()`是将一个对象转成字符串显示，注意只是显示用，有些对象转成字符串没有直接的意思。如list,dict使用str()是无效的，但使用repr可以，这是为了看它们都有哪些值，为了显示之用。

``` python
# encoding: utf-8

s = "Hello"  
s += 'World'
s1 = "HelloWorld".replace("ll","1")
s2 = "Hello"[0]+"i" 
print s,s1,s2,len(s) 
```

>Output:
`HelloWorld He1oWorld Hi 10`

``` python
s3 = "This is a sentence."
s3_split=s3.split(' ')
print s3_split
```

>Output:
`['This', 'is', 'a', 'sentence.']`

``` python
s="台灣"
u = s.decode('utf8')

print '台',s[0],u[0]
print u[0]==u'台'

```

>Output:
`台 ? 台` #沒有解碼過的s是顯示不出來每一個"中文字"的
`True`

``` python
data = [{'a':"A",'b':(2,4),'c':3.0}] 
print "DATA:",repr(data)
```

>Output
`DATA: [{'a':'A','c':3.0,'b':(2,4)}]`

### Tuples

- `List`可以修改，而`tuple`不能修改。

### Json

- encoding：把一个Python对象编码转换成Json字符串

>json.dumps(data)

- decoding：把Json格式字符串解码转换成Python对象

>json.loads(data_string)

- `indent`是縮排，增加可讀性
- `sort_keys`

``` python
import json
data1 = {'b':789,'c':456,'a':123}
d1 = json.dumps(data1,sort_keys=True,indent=4)
print d1
```

>Output
`{
    "a": 123,
    "b": 789,
    "c": 456
}`

EmployeeList =  [u'1001', u'Karick', u'14-12-2020', u'1$']

to this:

EmployeeList =  ['1001', 'Karick', '14-12-2020', '1$']

``` python
[x.encode('UTF8') for x in EmployeeList]

or

[str(x) for x in EmployeeList]
```

``` python
def convert_keys_to_string(dictionary):
    """Recursively converts dictionary keys to strings."""
    if not isinstance(dictionary, dict):
        return dictionary
    return dict((str(k), convert_keys_to_string(v))
        for k, v in dictionary.items())

DATA = { u'spam': u'eggs', u'foo': frozenset([u'Gah!']), u'bar': { u'baz': 97 },
         u'list': [u'list', (True, u'Maybe'), set([u'and', u'a', u'set', 1])]}

print convert_keys_to_string(DATA)
```

``` python
import collections

def convert(data):
    if isinstance(data, basestring):
        return data.encode('UTF8') 
    elif isinstance(data, dict):
        return dict(map(convert, data.iteritems()))
    elif isinstance(data, collections.Iterable):
        return type(data)(map(convert, data))
    else:
        return data

DATA = { u'spam': u'eggs', u'foo': frozenset([u'Gah!']), u'bar': { u'baz': 97 },
         u'list': [u'list', (True, u'Maybe'), set([u'and', u'a', u'set', 1])]}
print convert(DATA)
```

``` python
import json
s={ u'spam': u'eggs', u'foo': frozenset([u'Gah!']), u'bar': { u'baz': 97 },
         u'list': [u'list', (True, u'Maybe'), set([u'and', u'a', u'set', 1])]}
print str(distance_matrix_result).decode("unicode-escape").encode("utf-8")
print json.dumps(s, encoding="UTF-8", ensure_ascii=False)

 print os.getcwd()
 print os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
```

## 編碼

- `coding: utf-8`
- `coding: cp950`
- `# encoding: utf-8`

``` python
#-*- coding: utf-8 -*-
#使用 utf-8 編碼

#-*- coding: cp950 -*-　
#使用 Big5 編碼（windows 下使用） 
total = 1 + 1
print " 一加一等於", total #總和
```

>Output
`一加一等於 2`

## Math

- `ceil`
- `floor`
- `round`
- `pow`

``` python
#-*- coding: utf-8 -*-
#使用 utf-8 編碼

#-*- coding: cp950 -*-　
#使用 Big5 編碼（windows 下使用
import math
a = 1.1
print a, " 無條件進位 =", math.ceil(a) 
print a, " 無條件捨去 =",  math.floor(a)
print a, " 四捨五入 =", round(a)
print "5 的平方 = 5 ** 2 = ", 5**2
print  "5 的平方 = math.pow(5,2) = ", math.pow(5,2)
print "5 的平方根 = 5 ** (0.5) = ", 5**(0.5)
print  "5 的平方根 = math.pow(5,0.5) = ", math.pow(5,0.5)
```

>Output
`1.1  無條件進位 = 2.0
1.1  無條件捨去 = 1.0
1.1  四捨五入 = 1.0
5 的平方 = 5 ** 2 =  25
5 的平方 = math.pow(5,2) =  25.0
5 的平方根 = 5 ** 0.5 =  2.2360679775
5 的平方根 = math.pow(5,0.5) =  2.2360679775
`

## 迴圈

``` python
for i in range(10, 0, -1):
    print(i)

i = 10 # 設定控制變數
while i > 0:
    print(i)
    i=i-1
```

>Output
``

## 控制 & 邏輯

- `and`
- `or`
- `not`

``` python
if 3 > 5: 
elif 4 > 5:
else:
```

>Output
``

## Function

``` python
def my_function(x,y):
    return x-10,y+10
x,y = my_function(10,20)
print x,y
```

>Output
`0 30`

## 類別Class

- `__init__`

``` python
class Student:  
    def __init__(self, name, grade, age=26):  
        self.name = name  
        self.grade = grade  
        self.age = age  
    def set_name(self, name):  
        self.name = name  

student_objects=[]
student_objects.append( Student('john', 'B', 15) )
student_objects.append( Student('dave', 'A', 12) )
student_objects.append( Student('jane', 'A', 10) )
student_objects[0].set_name('John')

for i in student_objects:
    print i.name,i.grade,i.age 
```

>Output
`John B 15
dave A 12
jane A 10`

## 導入外部資源

``` python
import sys
"""插入sys檔案中所有函式，使用sys檔中的write函式前須加檔名"""
from time import time 
"""從time檔案插入time()函式，使用time()前不需要加檔名"""
sys.stdout.write( str(time()) + "\n" )
```

>Output
`1409796132.99` #當下的time

## File

``` python
# encoding: utf-8

import sys
file_in = file('db.txt','r')
file_out = file('copy.txt','w')
for line in file_in:
    for i in range(0,len(line)):
        if line[i]!="\n":
            sys.stdout.write(line[i]+',')
        else:
            sys.stdout.write(line[i])
        file_out.write(line[i])

sys.stdout.write("\n")
file_in.close()
file_out.close()

"""
# db.txt
1111
2222
ssss
wwww
5555
"""
```

>Output
`1,1,1,1,
2,2,2,2,
s,s,s,s,
w,w,w,w,
5,5,5,5,`

## 排序

- `lambda`是簡易型函式，只能回傳一個值
- `attrgetter`如果需要兩個值以上的排列順序，會用attrgetter

``` python
# encoding: utf-8

class Student:  
    def __init__(self, name, grade, age):  
        self.name = name  
        self.grade = grade  
        self.age = age  
    def set_name(self, name):  
        self.name = name  

student_objects=[]
student_objects.append( Student('john', 'B', 15) )
student_objects.append( Student('dave', 'A', 12) )
student_objects.append( Student('jane', 'A', 10) )

student_objects.sort(key=lambda i: i.grade) 
for i in student_objects:
    print i.name,i.grade,i.age 
print

from operator import attrgetter 

student_objects.sort(key=attrgetter('grade', 'age'),reverse=True)  
for i in student_objects:
    print i.name,i.grade,i.age 
print
```

>Output
`dave A 12
jane A 10
john B 15`

`john B 15
dave A 12
jane A 10`

``` python
"""
str = "Nearest Pension Am Park is at Sophie-Charlotten 57, Berlin"
print (any(char.isdigit() for char in str))
print [int(s) for s in "Nearest Pension Am Park is at Sophie-Charlotten 57, Berlin".split() if s.isdigit()]
"""

import re
import number

text = "Nearest aas 23 12 Pension Am Park is at Sophie-Charlotten 57, Berlin"
p = re.compile('(\d+)')
group = p.split(text)
d = ""
for i in group:
    if i.isdigit() :
        i = number.tranNumToEng(i)
    d = d + i

print d

"""
print p.findall(text)
print p.split(text)

match = p.search(text)
if match:
    print match.group()

match = p.match(text)
if match:
    print match.group()

iterator = p.finditer(text)
for match in iterator:
    print match.span()
"""
#([0-9]+) = (\d+) != \d+

```

这里介绍一下python执行shell命令的四种方法：

1、os模块中的os.system()这个函数来执行shell命令
1
2
3

```python
os.system('ls')
anaconda-ks.cfg  install.log  install.log.syslog  send_sms_service.py  sms.py
0
```

注，这个方法得不到shell命令的输出。

2、popen()#这个方法能得到命令执行后的结果是一个字符串，要自行处理才能得到想要的信息。
1
2
3
4
5

```python
import os
str = os.popen("ls").read()
a = str.split("\n")
for b in a:
    print b
```

这样得到的结果与第一个方法是一样的。

3、commands模块#可以很方便的取得命令的输出（包括标准和错误输出）和执行状态位
1
2
3
4
5
6
7
8
9
10
11
12

import commands
a,b = commands.getstatusoutput('ls')
a是退出状态
b是输出的结果。

```python
import commands
a,b = commands.getstatusoutput('ls')
print a
0
print b
```

anaconda-ks.cfg
install.log
install.log.syslog

commands.getstatusoutput(cmd)返回（status,output)

commands.getoutput(cmd)只返回输出结果

commands.getstatus(file)返回ls -ld file 的执行结果字符串，调用了getoutput，不建议使用这个方法。

4、subprocess模块

使用subprocess模块可以创建新的进程，可以与新建进程的输入/输出/错误管道连通，并可以获得新建进程执行的返回状态。使用subprocess模块的目的是替代os.system()、os.popen*()、commands.*等旧的函数或模块。

import subprocess

1、subprocess.call(command, shell=True)

会直接打印出结果。

2、subprocess.Popen(command, shell=True) 也可以是subprocess.Popen(command, stdout=subprocess.PIPE, shell=True) 这样就可以输出结果了。

如果command不是一个可执行文件，shell=True是不可省略的。

shell=True意思是shell下执行command

这四种方法都可以执行shell命令。
