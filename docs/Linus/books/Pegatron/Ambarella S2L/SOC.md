<!-- slide -->
# Ambarella S2L - Overview

![soc](assets/EVK_title.png)

<!-- slide -->
# Video Input
- 4通道 `MIPI CSI` sensor interface
- 並聯 `sub-LVDS` sensor interface
- 並聯 `LVCMOS` sensor interface
- 8通道串聯`SLVS` sensor interface
- `500MHz` pixel processing rate (equivalent to 26MP @ 30fps)
- CCIR.601 video input with external sync signals
- BT.1120/CCIR.656 video input with embedded sync codes including full-data-range support

<!-- slide -->
# Video Output
- HDMI v 1.4b output including PHY with CEC support
- HDMI output channel up to 4Kp24 / 3840x2160@30fps
- LCD output channel up to 800x480@30fps
- Video DAC for 480i/576i composite PAL/NTSC output
- Full screen frame buffer on analog / digital video output

<!-- slide -->
# Video Codec
- Simultaneous H.264 and MJPEG codec
- Full frame rate codec up to 1080p75, or 5Mp30
- Encoding for up to four streams
- Codec resolution ranges from CIF to 6MPixels per frame
- Up to four resolutions at full field of view (FOV)
- Flexible to start / stop streams independently
- Graphic or text (overlay) on the streams
- Digital Pan / Tilt / Zoom (PTZ)
- Privacy mask cooperated with PTZ
- Flip and 90°clockwise rotation without sensor support (Corridor view / Portrait mode)
- YUV / motion estimation buffer dump for video analysis
- Encode duration for H264 and MJPEG
- H.264
- MJPEG

<!-- slide -->
# Image Quality
- Auto / manual white balance control
- Auto / manual exposure control using spot metering and weighted matrix metering
- Backlight compensation
- 3D noise reduction
- Slow shutter function for low light
- Image quality adjustment including color saturation / sharpness / brightness
- Support customized AAA(AE/AWB/AF) algorithms
- RAW picture capture for sensor calibration
- WB / bad pixel / lens shading calibration

<!-- slide -->
# Audio
- Audio connection to system host
- Encoding / decoding support
- - G.711 / G.726 / ADPCM encode and decode
- - AAC encode and decode
- - AC3 encode and decode
- - MP3 decode

<!-- slide -->
# System
- Single-core ARM Cortex-A9 processor
- 1-GByte maximum DRAM capacity
- 32-KByte data / 32-KByte instruction L1 cache (per core)
- 512-KByte dedicated L2 cache
- NEON SIMD engine (per core)
- Up to 1 GHz Cortex-A9 with NEON and FP
- DC power 12V supply or PoE
- Time synchronization with Real Time Clock(RTC) or Network Time Protocol (NTP)
- Real Time Clock (RTC)
- Watchdog timer (WDT)
- General purpose and interval timers (x8)
- Built-in power controller (PWC) for power-up/down sequencing
- Multiple boot options (NAND Flash, USB and eMMC Card)
- Embedded Linux OS

<!-- slide -->
# Interfaces
- Integrated Gigabit Ethernet controller
- - GMII / MII PHY interfaces and MDIO management module
- - Data transfer at 10/100/1000 Mbits per second
- - Checksum off-load for received IP and TCP/UDP packets
- - Programmable frame length to support standard or jumbo frames
- - IEEE 802.1Q VLAN tag detection
- USB 2.0 high-speed interface
- NAND Flash controller
- - Up to 4-GByte device, 512-Byte and 2-KByte page sizes
- - 8-bit flash chip data bus
- - Single loop controller (SLC) with ECC hardware and read confirm support
- - BCH error correction and increased spare area available

<!-- slide -->
# Interfaces
- SD controller (x2)
- - SD, SDIO, SDHC, SDXC, MMC and eMMC operation with UHS-II support
- - 32-GByte maximum capacity for SDHC SD Card
- - 2-TByte maximum capacity for SDXC SD Card
- - 1-bit, 4-bit and 8-bit SD modes, CRC7 for command and CRC16 for data integrity
- SSI / SPI interface (x3)
- - SSI / SPI masters (x2) that collectively control up to nine slave devices
- - Dedicated SSI / SPI slave
- - One master / slave on dedicated low-latency 64-bit bus

<!-- slide -->
# Interfaces
- UART (x4) with one interface that supports hardware flow control
- Pulse Width Modulator (PWM) (x9)
- - PWMs for motor control (x4)
- - PWMs (32-/64-bit bus options) for Optical Image Stabilization (OIS) lens control (x4)
- - PWM for LCD display

<!-- slide -->
# Software
- All built-in peripheral device drivers
- Ambarella DSP driver in binary format
Ambarella Image Audio Video (IAV) driver for image, audio and video processing
- Muxer / demuxer of MP4 and TS format
- - RTSP / TCP / UDP streaming server: unicast (max 20 clients) and multicast
