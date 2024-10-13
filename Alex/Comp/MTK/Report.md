# Report
[TOC]

## Task
### Week 1
- Android graphic system 
	- [Android Deeper(01) - Graphic Architecture - 胡凱](http://hukai.me/android-deeper-graphics-architecture/)
	- [圖解Android - Android GUI 系統(1) - 概論- 漫天塵沙- 博客園](https://www.cnblogs.com/samchen2009/p/3364327.html)
- OpenGL ES 2.0
	- fixed-pipeline
	- programmable-pipeline
- An Introduction to EGL
- Android EGL, OpenGL ES Wrapper

### Week 2
- Gralloc & trace code
- SurfaceFlinger Client APIs and concept 
	- 了解 Android Window System & EGL
- opengl/tests/*
- Android gralloc HAL
- color space (RGB/YUV, 601, 709, 2020..)

### Week 3
- OpenGL ES 2.0/3.X Programming Guide
	- Android EGL Wrapper   
- An Introduction to Device Drivers
	- kernel modules, insmod, ioctl, workqueue, interrupt, /proc/ … etc
- Building and Running Modules
- Char Drivers
- Debugging Techniques
- Concurrency and Race Conditions
- Advanced Char Driver Operations
- Time, Delays, and Deferred Work
- Allocating Memory
- Communicating with Hardware
- Interrupt Handling
- Device Tree / 3D Kernel Driver initlization flow
	- Device tree (.dts file)
	- device/driver register
	- probe
- Other kernel functions
	- debugging (add a debugging node, /d/... )
	- dump_stack() -> vmlinux -> gdb
	- how to add a file node for purpose of debugging
	- race condition (mutex, spinlock ...)
	- interrupt handle (workqueue, tasklet, ...)

### Week 4
- GLES Examples
	- Familiar GL | ES APIs 

## Android P (9) 
### Surfaceflinger
- Android的Graphic System主要工作是將所有希望顯示在螢幕上的畫面收集起來
	- 並依據不同的位置與圖層疊合在一起，最後再輸出給display device做顯示。
- SurfaceFlinger可以說是整個Graphic System的匯流所在
	- 他將所有要顯示到螢幕上的畫面集合成一組Layer
	- 透過硬體協助加速
	- 將所有圖層疊合
	- 輸出給display device

