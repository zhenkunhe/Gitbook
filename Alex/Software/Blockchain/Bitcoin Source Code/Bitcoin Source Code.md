# Bitcoin Source Code
[TOC]
## 1. 前言

```bash
$ git clone https://github.com/bitcoin/bitcoin.git
$ git checkout 0.16
$ cd bitcoin
$ ./autogen.sh
$ ./configure --with-incompatible-bdb --enable-cxx --disable-shared --with-pic --prefix=/home/alex/alex
$ make -j$(nproc)
```