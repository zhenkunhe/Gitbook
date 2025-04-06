# Update Kernel

[TOC]

## 1. Prepare in the device

- Install the latest *BKC* packages in device.
- Find all **.ko** file in device and copy them to **/tmp**.

```bash
mkdir -p /tmp/lib/modules/<latest kernel>
cd /lib/modules/<latest kernel>
find . -iname "*.ko" | xargs -i cp --parents {} /tmp/lib/modules/<latest kernel>
```

- Sign them by Amazon.
- Generate **systemd-boot** efi file with the *latest kernel* and *initramfs*.
- Sign it by Amazon.

## 2. Create debian package

- Copy the **BOOTX64.EFI.signed**, **fwupx64.efi.signed** and the signed **.ko** to the debian package directory.

```bash
mkdir -p systemd-boot-0.0.2/tmp
cp BOOTX64.EFI.signed systemd-boot-0.0.2/tmp
cp fwupx64.efi.signed systemd-boot-0.0.2/tmp
cp -r /tmp/lib systemd-boot-0.0.2
```

- Create  **systemd-boot-0.0.2/DEBIAN** directory.

```bash
mkdir systemd-boot-0.0.2/DEBIAN
```

- Create configuration files under the **systemd-boot-0.0.2/DEBIAN** directory

`changelog`

```bash
systemd-boot (0.0.2) unstable; urgency=medium

  * Initial release

 -- Alex Hoh <Alex_Hoh@pegatroncorp.com>  Mon, 2 July 2018 14:31:11 +0800
```

`compat`

```bash
10
```

`control`

```bash
Source: systemd-boot
Version: 0.0.2
Section: system
Priority: optional
Maintainer: Alex Hoh <Alex_Hoh@pegatroncorp.com>
Standards-Version: 3.9.6
Package: systemd-boot
Architecture: all
Depends: libfwup1 (>= 9-1), fwupdate-signed (>= 1.13), libsmbios2v5 (>= 2.3.1), awscam (>= 1.3.3), linux-image-extra-4.13.0-1007-deeplens (>= 4.13.0-1007.7), audio-setup (>= 1.1-1), config (>= 1.0-1), deepcam (>= 1.12-1), intel-audio (>= 1.1-1), lsb2-release (>= 1.0-1), pcie8997btwififirmware (>= 3.1.1), srb5 (>= 1.0-1), watchdog (>= 5.14-3ubuntu0.16.04.2), sys-utility (>= 1.0-1), system-init (>= 1.0-1), pega-package (>= 3.1-1), dldt (>= 1.0.5853-1)
Description: Change bootloader to systemd.
```

`postinst`

```bash
#!/bin/bash

UBUNTU_PATH="/boot/efi/EFI/ubuntu"
FWUP_FILE="fwupx64.efi"
ESP_FWUP="$UBUNTU_PATH/$FWUP_FILE"
SIGNED_FWUP="/tmp/$FWUP_FILE.signed"

BOOT_PATH="/boot/efi/EFI/Boot"
SYSD_FILE="BOOTX64.EFI"
ESP_SYSD="$BOOT_PATH/$SYSD_FILE"
SIGNED_SYSD="/tmp/$SYSD_FILE.signed"

GRUB_FILE="$UBUNTU_PATH/grubx64.efi"
SHIM_FILE="$UBUNTU_PATH/shimx64.efi"

# If /boot/efi/EFI/ubuntu/fwupx64.efi exist then remove it.
if [ -f "$ESP_FWUP" ]; then
    rm -f "$ESP_FWUP"
# If /boot/efi/EFI/ubuntu does not exist then create it.
elif [ ! -d "$UBUNTU_PATH" ]; then
    mkdir -p "$UBUNTU_PATH"
fi

echo "Installing $FWUP_FILE to EFI system partition."
cp "$SIGNED_FWUP" "$ESP_FWUP"

# If /boot/efi/EFI/Boot/BOOTX64.EFI exist then remove it.
if [ -f "$ESP_SYSD" ]; then
    rm -f "$ESP_SYSD"
# If /boot/efi/EFI/Boot does not exist then create it.
elif [ ! -d "$BOOT_PATH" ]; then
    mkdir -p "$BOOT_PATH"
fi

echo "Installing $SYSD_FILE to EFI system partition."
cp "$SIGNED_SYSD" "$ESP_SYSD"

# If /boot/efi/EFI/ubuntu/grubx64.efi exist then remove it.
if [ -f "$GRUB_FILE" ]; then
    rm $GRUB_FILE
fi

# If /boot/efi/EFI/ubuntu/shimx64.efi exist then remove it.
if [ -f "$SHIM_FILE" ]; then
    rm $SHIM_FILE
fi

sync
```

- Create the debian package

```bash
dpkg -b systemd-boot-0.0.2
```

## 3. Install debian package

- Put the **.deb** to the target and install.

```bash
sudo dpkg -i --force-all systemd-boot-0.0.2.deb
```

- Reboot.
