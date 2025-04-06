# Eclipse

tags: IDE,Eclipse,Software

[TOC]

<!--sec data-title="快捷鍵" data-id="1" data-nopdf="true" data-collapse=false ces-->

ctrl+o：快速outline
 F3: 打开申明（Open declaration）
Ctrl+Shift+F 格式化当前代码
Ctrl + Shift + O: 引入imports语句
ALT+/ 提示
Alt+←】、【Alt+→】 后退历史记录和前进历

Ctrl+M窗口最大化和还原
Ctrl + D : 删除本行
Ctrl + / : 注释本行

 cmake -G"Eclipse CDT4 - Unix Makefiles" -D CMAKE_BUILD_TYPE=Debug  -D CMAKE_ECLIPSE_VERSION=4.6 .

<!--endsec-->

<!--sec data-title="Initializer" data-id="2" data-nopdf="true" data-collapse=false ces-->
Format(line wrapping) constructor initializer list in Eclipse CDT

Click on:
Window -> Preferences

Go to:
C/C++ -> Code Style -> Formatter

Here, as first thing you have to create a new profile.

Select tab:
Line Wrapping

Go to:
Function declarations -> Constructor initializer list

On the bottom, you have to set:

Line wrapping policy: Wrap all elements, every element on a new line.
check "Force split, even if line is shorter than maximum"
Indentation policy: indent on column

<!--endsec-->