# Stress test tools using guide V1.0

[TOC]

## 0. Open console

1. Log in to the operating system and click the upper left corner `Search your computer`
![Alt text||400x300](images/Selection_002.png)

2. Enter `terminal` then select the icon
![Alt tex||400x300](images/Selection_003.png)

> - If any command notify you to enter the root password,enter `deepcam`
> - Example: `sudo`
> ![Alt text](images/1506433654481.png)

## 1. Memory

1. Click the icon on Desktop
![Alt text](images/1506430690020.png)
2. Click `OK` to ignore the error message.
![Alt text](images/1506430755054.png)
3. Click the icon
![Alt text||400x300](images/1506431263865.png)
4. Check `RAM` then click OK.
![Alt text||400x300](images/1506431936053.png)

5. Running by click the icon that hidden the block.
![Alt text||400x300](images/1506431523263.png)

6. Click OK
![Alt text](images/1506431599339.png)

7. Click Stop if you want.

![Alt text](images/1506431621151.png)

## 2. CPU

1. Enter `stress --cpu 5`  on the console that you open in Step 0.
![Alt text](images/1506432550943.png)
2. Open a new console and enter `top`,you can see the stress process filled the CPU.
![Alt text](images/1506432698865.png)
3. Type `Ctrl+C` to close `top` and `stress --cpu 5` if you want to stop.

## 3. Camera

1.Enter `/home/deepcam/camera/CAM_dual_mode_preview_1.sh` first to open h264 codec video stream.
![Alt text](1506433230444.png)

2. Open a new console and enter`/home/deepcam/camera/CAM_dual_mode_preview_2.sh`to open mjpeg codec video stream.
![Alt text](images/1506433334675.png)

## 4. Audio Play

- Just click the `Notify.wav` on the Desktop

![Alt text](images/1506432906221.png)
