# Lock BIOS guide

[TOC]

## Lock BIOS

1. Put all tools on root of USB device.
![Alt text|center|500x300](images/1.jpg)

2. Plugin the USB to device.

3. Boot to `efi shell`

4. Wait for 5 seconds or press any key.
![Alt text|center|](images/1508849100826.png)

5. Enter  `y` and press `Enter`
![Alt text|center](images/1508849081181.png)

6. It will reboot and login OS if success.

## Appendix A. Check lock success or not

- Before lock BIOS,`TXEManuf.efi -eol` will show an error message.
![Alt text|center|400x200](images/1508849052467.png)

- After lock BIOS,`TXEManuf.efi -eol` will show an pass message.
![Alt text|center|600x150](images/1508849271860.png)
