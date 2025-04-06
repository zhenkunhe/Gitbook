# systemd-boot and sign

[TOC]

## How to replace from GRUB2 to systemd boot and sign by your key

- Boot up to Ubuntu
- Open terminal and change root id

```bash
sudo -i
```

- Creating a script :`systemd_boot.sh`to merge systemd-boot, kernel, initramfs and sign by your key.

``` bash
#!/bin/bash

EFISTUB="/usr/lib/systemd/boot/efi/linuxx64.efi.stub"
ESP_DIR="/boot/efi"
OUT_DIR="EFI/Boot"
OUTPUT="${ESP_DIR}/${OUT_DIR}/BOOTX64.EFI"

# Configure you kernel, initramfs and option command.
IMAGE="/boot/vmlinuz-4.10.0-28-generic"
CMDLINE="root=/dev/mmcblk1p2 ro quiet splash"
CMDLINE_TMP="$(mktemp)"
INITRD="/boot/initrd.img-4.10.0-28-generic"

# Place your keys in the KEY_DIR and configure the filenames.
KEY_DIR="/home/aws_cam/key"
KEYFILE="CerTest.key"
CRTFILE="CerTest.crt"

echo -n "${CMDLINE}" > "${CMDLINE_TMP}"
mkdir -p "${ESP_DIR}/${OUT_DIR}"

objcopy \
    --add-section .osrel="/etc/os-release"  --change-section-vma .osrel=0x20000    \
    --add-section .cmdline="${CMDLINE_TMP}" --change-section-vma .cmdline=0x30000  \
    --add-section .linux="${IMAGE}"         --change-section-vma .linux=0x2000000  \
    --add-section .initrd="${INITRD}"   --change-section-vma .initrd=0x3000000 \
    "${EFISTUB}" "${OUTPUT}"

sbsign --key "${KEY_DIR}/${KEYFILE}" --cert "${KEY_DIR}/${CRTFILE}" --output "${OUTPUT}" "${OUTPUT}"

if sbverify --cert "${KEY_DIR}/${CRTFILE}" "${OUTPUT}" >/dev/null 2>&1; then
    echo "The bootload, kernel and initramfs have been signed by your key: ${KEYFILE}"
    echo "EFI file: ${OUTPUT}"
    
else
    echo "Signature verification Failed..."
fi
```

- Run the script.

```bash
chmod +x systemd_boot.sh
./systemd_boot.sh
```

- You can remove shim, grub, kernel and initramfs now.

```bash
rm -rf /boot/efi/EFI/ubuntu
rm -rf /boot/abi*
rm -rf /boot/config*
rm -rf /boot/initrd*
rm -rf /boot/memtest*
rm -rf /boot/System.map*
sync
```

- Reboot.
