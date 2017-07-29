# 簡介
sudo docker run -it --privileged -v /dev/bus/usb:/dev/bus/usb ubuntu:14.04 /bin/bash
sudo docker exec -u root -it compassionate_snyder bash




'su' command in Docker returns 'must be run from terminal'

When you are ssh-ing in or going in via php your session is not being allocated a pty. I have used each of the following solutions:

ANSWER 3: use python to spawn a pty in your shell

Quite a cute hack :)

jenkins@e9fbe94d4c89:~$ su -
su: must be run from a terminal

$ echo "import pty; pty.spawn('/bin/bash')" > /tmp/asdf.py
$ python /tmp/asdf.py

$ su -
Password:

root@e9fbe94d4c89:~#
