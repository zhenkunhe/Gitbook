# Check secure boot, BIOS lock and TCO lock

[TOC]

## 1. Check secure boot enabled

- Open the BIOS menu and select `Boot from file > <Unsigned.efi>`. If the secure boot has been enabled, it will show the message below.
![Alt text|center|500x80](images/./1524825511535.png)

## 2. Check BIOS Lock enable bits

- Open the BIOS menu and select `Boot from file > RU_signed_amazon_new.efi`

- Press <kbd>F6</kbd> and select `PCI bus 0, device 13, Function 2`.
![Alt text|center|400x250](images/1524122492164.png)

- Press <kbd>F7</kbd> twice to switch the display from byte to word.

- Locate the address to offset **0xDC**, `InSMM.STS[5]` and `Lock Enable[1]` have been set.

![Alt text|center|400x250](images/1525252022815.png)

> Reference
>
> - **Intel Apollo Lake Platform Secure Configuration Specification**
>   - Document Number: **567596**
> ![Alt text|center|500x250](images/./1525229182824.png)
> - **Intel® Pentium® and Celeron® Processor N- and J- Series External Design Specification Volume 3 of 3**
>   - Document Number: **557557**
>![Alt text|center|500x20](images/1525320012977.png)
>![Alt text|center|500x30](images/1525320026819.png)
>![Alt text|center|500x110](images/1525319940849.png)
>![Alt text|center|500x70](images/1525319994713.png)

## 3. Check TCO SMI enabled and locked

- Open the BIOS menu and select `Boot from file > RU_signed_amazon_new.efi`

- Press <kbd>Alt</kbd>+<kbd>4</kbd> and type `0400` to AcpiBase.
![Alt text|center|400x250](images/1525231989643.png)

- Locate the address to offset **0x40**, `GBL_SMI_EN[0]` and `TCO_EN[13]` have been set.

![Alt text|center|400x250](images/1525232213160.png)

- Locate the address to offset **0x68**, `TCO_LOCK[12]` has been set.
![Alt text|center|400x250](images/1525232346255.png)

- Press <kbd>Alt</kbd>+<kbd>7</kbd> and type `FE043024` to GEN_PMCON2.
![Alt text|center|400x250](images/1525232655040.png)

- Locate the address to offset **0x00**, `SMI_LOCK[4]` has been set.
![Alt text|center|400x250](images/1525232711943.png)

> Reference
>
> - **Intel Apollo Lake Platform Secure Configuration Specification**
>   - Document Number: **567596**
> ![Alt text|center|500x250](images/./1525229874731.png)

> - PMC **(B0:D13:F1)** base address locate memory **FE042000**  from BAR 1(offset **0x10**)
>![Alt text|center|500x250](images/1525232976266.png)

> - **Intel Apollo Lake SoC External Design Specification (EDS) Volume 2 of 3**
>   - Document Number: **557556**
> ![Alt text](images/./1525233380719.png)
> ![Alt text](images/1525339240373.png)

## 4. Check DCI mode is disabled

- Open the BIOS menu and select `Boot from file > RU_signed_amazon_new.efi`

- Press <kbd>Alt</kbd>+<kbd>7</kbd> and type `D0A80004` to ECTRL.
![Alt text|center|400x250](images/1525342783506.png)

- Locate the address to offset **0x00**, `HOST_EXI_EN[4]` has been set and `HOST_EXI_EN_LOCK[0]` has been clean.
![Alt text|center|400x250](images/1525342754284.png)

> Reference
>
> - **Intel® Pentium® and Celeron® Processor N- and J- Series (Formerly Apollo Lake) Intel Architecture Firmware Specification (Volume 2 of 2)**
>   - Document Number: **559811**
> ![Alt text](images/1525339726885.png)
> ![Alt text](images/1525339830962.png)
> - **Intel® Pentium® and Celeron® Processor N- and J- Series External Design Specification Volume 3 of 3**
>   - Document Number: **557557**
>![Alt text](images/1525339999674.png)
>![Alt text](images/1525340010043.png)
>![Alt text](images/1525340026878.png)
>![Alt text](images/1525340043143.png)
> - IOSF-SB  **(B0:D13:F0)** base address locate memory **D0000000**  from BAR 1(offset **0x10**)
>   - EXI port ID **0xA8**
>![Alt text](images/1525340266478.png)
>![Alt text](images/1525340244288.png)
>![Alt text|center](images/1525340286889.png)

## 5. Check xDCI is disabled

- Open the BIOS menu and select `Boot from file > RU_signed_amazon_new.efi`

- Press <kbd>F6</kbd> and check `PCI bus 0, device 21, Function 1` is **not** exist.
![Alt text|center|400x250](images/1525343131607.png)

> - `PCI bus 0, device 21, Function 1` is exist when xDCI is enabled.
> ![Alt text|center|400x250](images/1525343066733.png)
