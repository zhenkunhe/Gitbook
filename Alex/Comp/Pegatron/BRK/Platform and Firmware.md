# Platform and Firmware

[TOC]

## Sensor Hub

- 無camera
- 俱備運算能力
- 類似gateway

## Schedule

- Kick Off 2019/4/22
- EVT 2019/7
- DVT 2019/8/16
- PVT 2019/11
- 11月re:Invent發表
- Production Release 2019/12/2

## Target

- Outdoor Camera
- 邊緣運算
- IP6X防護能力
- camera無轉動結構
- wall-mounted type

## Hardware

- Pressing 10 seconds - factory reset
- The WDT will be disabled for the first 60 seconds
after a hardware reset so that the operating system
can start. When enabled, the WDT requires the SW to
pat it at least every second, or else it will reset the
CPU. When it resets, it will also set a flag so SW can
identify that the reset was caused by the WDT.
- RJ-45 (100 Base-T)
- 2x2 Wi-Fi 802.11ac,
- Bluetooth 4.1
- Ambarella CV22S66
- 64GB eMMC +16GB eMMC

### 其他SOC

| Vendor      |     SOC |   編解碼器  |Camera|Video |CPU|GPU|Bluetooth|Wi-Fi|Product|
| :--------: | :--------:| :------: | :------: | :------: | :------: | :------: | :------: | :------: | :------: |
|  Qualcomm   | APQ8009   |  H.265（HEVC）H.264（AVC）| 1600萬像素| 720p |4x ARM Cortex A7 ,1.3 GHz|Qualcomm®Adreno™304 GPU|Bluetooth 4.1|Wi-Fi 5
|  Qualcomm   | APQ8016E   | H.264（AVC）| 1300萬像素| 1080p,30FPS |4x ARM Cortex A53 ,1.2 GHz|Qualcomm®Adreno™306 GPU|Bluetooth 4.1|Wi-Fi 4
|  Qualcomm   | APQ8053   |  H.265（HEVC）H.264（AVC）| 2400萬像素| 4K,30FPS |8x ARM Cortex A53 ,1.8 GHz|Qualcomm®Adreno™506 GPU|Bluetooth 4.1|Wi-Fi 5
|  Qualcomm   | APQ8096SG   |  H.265（HEVC）H.264（AVC）| 2800萬像素| 4K,60FPS |4x Qualcomm®Kryo™ ,2.34 GHz|Qualcomm®Adreno™530 GPU|Bluetooth 4.2|Wi-Fi 5
|  Qualcomm   | QCS603   |  H.265（HEVC）H.264（AVC）| 2400萬像素| 4K,30FPS |4x Qualcomm®Kryo™300 ,1.7 GHz|Qualcomm® Adreno™ 615 GPU|Bluetooth 5.0|Wi-Fi 5
|  Qualcomm   | QCS605   |  H.265（HEVC）H.264（AVC）| 3200萬像素| 4K,60FPS |8x Qualcomm®Kryo™300 ,2.5 GHz|Qualcomm® Adreno™ 615 GPU|Bluetooth 5.0|Wi-Fi 5
|  Ambarella   | S2Lm   |  H.264（AVC）| | 1080p,30FPS |ARM Cortex-A9 CPU|||小蟻智能攝像機,HIKVISION camera
|  VATICS   | M3C   |  H.264（AVC）| | 1080p,30FPS |ARM926EJ 600MHz|||amiccom outdoor securit
|  HiSilicon   | Hi3518   |  H.264（AVC）|720萬像素 | 720,30FPS |ARM9@Max 440MHz|||Zmodo Wireless Security Camera System

## Software

- BSP
  - WIFI
  - Bluetooth
  - SW source code and packages.
  - version control
- Driver
  - LED
- Linux
- Secure boot
- Secure file system
- Integration of ODM SW components with AWS SW components
- Test
  - BSP
  - target OS
  - filesystem
  - device on/off
  - power management
  - WIFI connectivity
  - Secure boot
  - Secure FS
  - secure and fully updated
