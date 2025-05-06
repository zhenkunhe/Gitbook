# Basic

[TOC]

## non-trivial designated initializers not supported

This does not work with g++. You are essentially using C constructs with C++. Couple of ways to get around it.

1) Remove the “.” and change “=” to “:” when initializing.

## 關件詞

- POD
  - Trivial Copyable
  - Standard ( !delete )

@import "csv/1.csv"

- direct (explicit) initial
  - Data d{15}
  - Data d = Data{15}
  - Data d()
- copy initial
  - Data d = 15
  - Data d = {15}

## Dlopen

libA.so + libB.so -> libC.so

- different
  - static in A
  - static in B
- same
  - static in C
  - static in C’s class
  - static in C’s class function
- Unique
  - static in C’s class inline function
  - load A: c.printInline()
  - load B: c.printInline()
  - unload B：成功
  - unload A：要看有沒有2被A抓住,有則是不成功，沒有則成功

## lib

[https://gcc.gnu.org/onlinedocs/gcc-5.2.0/gcc/Link-Options.html#Link-Options](https://gcc.gnu.org/onlinedocs/gcc-5.2.0/gcc/Link-Options.html#Link-Options)

這句話翻譯過來的意思就是說，如果你的庫在連結時安排的順序是：
foo.o -lz bar.o

那麼gcc的連結器先搜索庫foo，然後是z庫，然後是bar庫。

這樣就帶來一個問題，如果庫bar調用了庫z裡面的函數，但是連結器是先搜索的庫z，這時候並沒有發現庫bar調用庫z啊，所以就不會把庫z中的這部分函數體挑出來進行連結。
而是只把庫z中，被foo庫調用的函數體挑出來。

- 越是被別人調用的越底層的庫，就越放在後面
- 越是調用別人的越上層的庫，就越放在前面。
- `lc`
  - libc
    - Linux 下的 ANSI C 函数库
    - 包含了 C 语言最基本的库函数
    - stdio.h
  - glibc
    - Linux 下的 GUN C 函数库
  - libc.so
  - libc.a
- `lgcc`
  - libgcc
    - gcc
    - soft float
    - 部分整形/浮點運算
    - 異常處理
    - 雜項函數
  - libgcc.a
  - libgcc.so
- `lstdc++`
  - gcc for C++
  - libstdc++.so
- `lc++`
  - clang
  - libc++.so
- glib
  - GNOME
  - gobjetct
- `lm`
  - math
- 一般link順序
- lm -lgcc -lc
