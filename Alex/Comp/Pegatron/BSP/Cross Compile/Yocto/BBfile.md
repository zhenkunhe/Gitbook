# BBfile

[TOC]

## T1

source build/conf/set_bb_env.sh
cat pega.sh 裡面有描述 export MACHINE=apq8009
rebake boost
rebake azure-iot-sdk

merlot/oe-core/build/downloads
oe-core/build/tmp-glibc/work/armv7a-vfp-neon-oe-linux-gnueabi

repo forall vendor/pega/voiced/ -c git branch -r

TOPDIR = 所在的meta目錄
WORKDIR =  xxx/1.0-r0/
sbindir = /usr/sbin
CFLAGS = makefile 的CFLAGS
LDFLAGS = makefile 的LDFLAGS
PN = BBfile Name
S = 要將src cp 到的位置 ,以下稱為S(source). 與之相對的為D
D = WORKDIR/image/
License=build/conf/local.conf
