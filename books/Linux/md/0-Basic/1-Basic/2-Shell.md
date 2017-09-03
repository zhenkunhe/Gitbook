# Shell

tags: Linux,Shell

<!--sec data-title="Command" data-id="1" data-nopdf="true" data-collapse=false ces-->

readelf -d -t iothub_client_sample_http
find ~~~ | xargs rm
diff
$(readlink $(which sh))

xxd
readlink -f /proc/20361/fd/1
tee
lsof
md5sum
stty -a 
ctrl+w = alt+back
ctrl+<
ctrl+r
ctrl+q
ack
agi
agr
pygrep
pyfind
j
jo
cp -av : soft link 如果是相對位置的時候用

cp --parent

echo "${PWD##*/}" = basename ${PWD}

tr -d '\n' 

ldd 
nm

This happens to me a lot, too, and this thread is one of the top results when googling for "restart cinnamon". Unfortunately, the instructions don't work for me (only because the display number is wrong!). For future visitors, here's what I do that always helps me.

`How do I restart Cinnamon from the tty?`
Cinnamon freezes
Switch tty. I usually go to tty6, Ctrl+Alt+F6
If you need to login first, do so.
Type w (yes, just the letter) and press enter. This commands does a lot of different things, but you need it to figure out the number of the display you are using. The display number is in the column FROM. Mine is :0 (yes, including the colon).
Assuming that cinnamon is already dead (which you would notice by the windows lacking titles and that you can't move different windows around, and perhaps even not being able to use the keyboard), you type export DISPLAY=:0; cinnamon &, and don't forget the colon. I add the ampersand (&) only not to keep that tty busy.
This always works for me, and I don't lose open windows. Also, I keep these instructions in a file called restartcinnamon, which is just a text file. I keep the file in my Dropbox folder, so no matter what machine I am on I can just type cat ~/Dropbox/restartcinnamon if I need to be reminded of how to do it.

sed -i '/speech_language/s/value=\".*\"/value="zh-TW"/'  alextext.launch

查看进程pid
(1) ps ux | grep prog_name
(2) pgrep prog_name 
查看线程tid
(1) ps -efL | grep prog_name
(2) ls /proc/pid/task

 系統如何判斷 32bits / 64bits
在嘿嘿星期四的討論學到, Mat: 用 `file /bin/bash`, 結果非常淺顯易懂. 

sudo service network-manager restart

<!--endsec-->