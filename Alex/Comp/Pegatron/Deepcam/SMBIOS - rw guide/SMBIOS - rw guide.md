# SMBIOS - r/w guide

[TOC]

## 1. Try to read/write UUID from/to SMBIOS

### 1.1. Read UUID

- `sudo ./h2osde-lx64 -SU`

>![Alt text](images/1505460614120.png)

- You can see the UUID

> ![Alt text](images/1505460669845.png)

### 1.2. Write UUID

- `sudo ./h2osde-lx64 -SU <<UUID>>`

> ![Alt text](images/1505460242384.png)

- Then got a write reject error message.

>![Alt text](images/1505460353886.png)

## 2. Close the write protect for SMBIOS

### 2.1. Switch to root

- `su root`

> ![Alt text](images/1505459681949.png)

### 2.2. Check the exist efi variables

- `ls /sys/firmware/efi/efivars/`

> ![Alt text](images/1505460460046.png)

### 2.3. Add the special efi variable and check

- `printf "\x07\x00\x00\x00\x00" > /sys/firmware/efi/efivars/<variable>`

> ![Alt text](images/1505460551119.png)

- You can also check it by using `efivar` tool.
- `efivar --name=<GUID>-<Name>`

> ![Alt text](images/1505461030519.png)

## 3. Try to write UUID to SMBIOS again

### 3.1. Write UUID

- `sudo ./h2osde-lx64 -SU <UUID>`

> ![Alt text](images/1505460242384.png)

- Got the write success message

> ![Alt text](images/1505460775699.png)

### 3.2. Read UUID just for check

- `sudo ./h2osde-lx64 -SU`

> ![Alt text](images/1505460614120.png)

- Got the new UUID

> ![Alt text](images/1505460840279.png)

## 4. Open the write protect for SMBIOS

### 4.1. Remove the special efi variable

- `chattr -i /sys/firmware/efi/efivars/<variable>`
- `rm /sys/firmware/efi/efivars/<variable>`

> ![Alt text](images/1505461108213.png)

### 4.2. Check the variable not exist

- `efivar --name=<GUID>-<Name>`

> ![Alt text](images/1505461164085.png)

## 5. Write UUID for check SMBIOS be protected again

- `sudo ./h2osde-lx64 -SU <UUID>`

> ![Alt text](images/1505460242384.png)

- Then got a write reject error message.

> ![Alt text](images/1505460353886.png)

## Appendix

### A. read/write Serial number / UUID / SSID / Password
>
> - **Serial number** using:`-SS`
>EX:`./h2osde-lx64 -SS <Serial number>`
> - **UUID** using:`-SU`
>EX:`./h2osde-lx64 -SU <UUID>`
> - **SSID** using:`-CS`
>EX:`./h2osde-lx64 -CS <SSID>`
> - **password** using:`-CA`
>EX:`./h2osde-lx64 -CA <Password>`

### B. SMBIOS mapping table

**Type 1: System Serial Number**
Serial number:`echo /sys/class/dmi/id/product_serial`

**Type 1:System UUID**
UUID:`echo /sys/class/dmi/id/product_uuid`

**Type 3:Chassis Serial Number**
SSID:`echo /sys/class/dmi/id/chassis_serial`

**Type 3:Chassis Tag**
Password:`echo /sys/class/dmi/id/shassis_asse`
</span>
