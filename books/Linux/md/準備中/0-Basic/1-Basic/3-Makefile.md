# Makefile

tags: Linux,Makefile

<!--sec data-title="前言" data-id="1" data-nopdf="true" data-collapse=false ces-->

$?
$@
$<
$*
CC = gcc
INCLUDE =
CFLAGS = -g -Wall -ansi
OBJS = main.o haha.o sin_value.o cos_value.o
LIBS = -lm
> -Wall : 顯示所有的警告訊息

ZMQOPTS='-lzmq -lczmq'

LDADD is used by NetBSD in the bsd.prog.mk Makefile, which is used to build programs of the base distribution and some of the programs in pkgsrc.

LDLIBS is used by NetBSD in the sys.mk Makefile, which is used for implicit rules.

LDLIBS is also used by GNU Make.

LIBS is used by the GNU ./configure scripts.

<!--endsec-->