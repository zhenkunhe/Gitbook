# Basic

tags: Linux

<!--sec data-title="Introduction" data-id="1" data-nopdf="true" data-collapse=false ces-->

- Linux是kernel,加上GNU社群裡面的一堆應用程式,就成了現在的OS發行版本
- Windows大多直接使用administrator,是病毒氾濫的推手
- root權限大到可以自殺

<!--endsec-->

<!--sec data-title="Tool" data-id="2" data-nopdf="true" data-collapse=false ces-->

- 永中Office
- VLC
- GIMP(Photoshop)

<!--endsec-->

<!--sec data-title="主要分支" data-id="3" data-nopdf="true" data-collapse=false ces-->

- RedHat
> Red Hat Enterprise Linux(RHEL)

- Slackware
> SUSE Linux Enterprise(SUSE)

- Debian
> Ubuntu

- 建議用CentOS,因為KVM開發與測試環境都是在RHEL進行,而CentOS是RHEL open source的衍生(RHEL要收費,免費版無法升級或技術支援)

<!--endsec-->

<!--sec data-title="圖形介面" data-id="4" data-nopdf="true" data-collapse=false ces-->

- X是一種協定
- xorg則是實現X協定,提供`圖形化使用者介面服務`的server軟體
- 系統開機之後自動執行xorg
- 1992~2004只有XFree86(GPL),後來公司改授權條款,造成GNU社群不滿,於是衍生出了xorg.
- X client軟體有兩個,一個叫Window Manager(WM),一個叫Display Manager(DM)
- 透過`startx`啟動xorg與default WM
> GNOME: Metacity
> KDE: K Win

- DM是負責圖形介面的使用者登入,開機第一個執行,且無人能關掉它
> XDM KDM GDM

- Mac OS Ｘ協議與Linux X不同,前者是binary,後者是純文字

There is more than one way to define "memory leak". In particular, there are two primary definitions of "memory leak" that are in common usage among programmers.

The first commonly used definition of "memory leak" is, "Memory was allocated and was not subsequently freed before the program terminated." However, many programmers (rightly) argue that certain types of memory leaks that fit this definition don't actually pose any sort of problem, and therefore should not be considered true "memory leaks".

An arguably stricter (and more useful) definition of "memory leak" is, "Memory was allocated and cannot be subsequently freed because the program no longer has any pointers to the allocated memory block." In other words, you cannot free memory that you no longer have any pointers to. Such memory is therefore a "memory leak". Valgrind uses this stricter definition of the term "memory leak". This is the type of leak which can potentially cause significant heap depletion, especially for long lived processes.

The "still reachable" category within Valgrind's leak report refers to allocations that fit only the first definition of "memory leak". These blocks were not freed, but they could have been freed (if the programmer had wanted to) because the program still was keeping track of pointers to those memory blocks.

In general, there is no need to worry about "still reachable" blocks. They don't pose the sort of problem that true memory leaks can cause. For instance, there is normally no potential for heap exhaustion from "still reachable" blocks. This is because these blocks are usually one-time allocations, references to which are kept throughout the duration of the process's lifetime. While you could go through and ensure that your program frees all allocated memory, there is usually no practical benefit from doing so since the operating system will reclaim all of the process's memory after the process terminates, anyway. Contrast this with true memory leaks which, if left unfixed, could cause a process to run out of memory if left running long enough, or will simply cause a process to consume far more memory than is necessary.

Probably the only time it is useful to ensure that all allocations have matching "frees" is if your leak detection tools cannot tell which blocks are "still reachable" (but Valgrind can do this) or if your operating system doesn't reclaim all of a terminating process's memory (all platforms which Valgrind has been ported to do this).

<!--endsec-->