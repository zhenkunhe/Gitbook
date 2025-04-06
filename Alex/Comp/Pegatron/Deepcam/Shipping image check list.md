# Shipping image check list

[TOC]

- [ ] /etc/systemd/system/emergency.service.d/notail.conf
- [ ] /etc/update-manager/release-upgrades -> Prompt=never
- [ ] sudo rm /root/key_script.sh
- [ ] sudo apt install fail2ban mplayer apt
- [ ] sudo rm /boot/vmlinuz*
- [ ] sudo rm /boot/initrd*
- [ ] sudo rm /boot/System*
- [ ] sudo rm /boot/config*
- [ ] sudo rm /boot/abi*
- [ ] sudo rm -r /boot/grub
- [ ] sudo rm /boot/efi/EFI/ubuntu/mmx*
- [ ] sudo rm /boot/efi/EFI/ubuntu/grub*
- [ ] sudo rm /boot/efi/EFI/ubuntu/shim*
- [ ] sudo rm /boot/mem*
- [ ] sudo rm -rf /lib/modules/4.10*
- [ ] sudo rm /etc/ssh/ssh_host_*
- [ ] sudo rm /initrd*
- [ ] sudo rm /vmlinuz*
- [ ] sudo rm -r /var/log/*
- [ ] Check /etc/apt/source.list
- [ ] Check user auto login off
- [ ] Check luks slot 0
- [ ] Check 6 fwupdate debs
- [ ] 清空垃圾桶
- [ ] Change systemd that signed with the key of Amazon.
- [ ] Change the modules of kernel that signed with the key of Amazon.
- [ ] Change fwupx64.efi that signed with the key of Amazon.
- [ ] sudo chage -d 0 aws_cam
- [ ] cat /dev/null > ~/.bash_history && history -c && exit
