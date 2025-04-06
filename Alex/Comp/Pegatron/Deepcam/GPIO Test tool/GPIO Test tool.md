# GPIO Test tool

[TOC]

## 0. OS user and password

User:`deepcam`
Password:`deepcam`

## 1. H2 Test GPIO - LED

1. Log in to the operating system and click the upper left corner `Search your computer`
![Alt text||400x300](images//Selection_002.png)

2. Enter `terminal` then select the icon
![Alt tex||400x300](images//Selection_003.png)

3. Type `cd Tool` to change location and `ls` to show the documents.

![Alt text|400x300](images//Selection_004.png)

4. Type `sudo ./led_control.sh 1`and press enter key after key in the password `deepcam`.

![Alt text||400x300](images//Selection_005.png)

5. Then you will see the LED lit.
![Alt tex||400x300](images//IMG_6829.JPG)

6. Type `sudo ./led_control.sh 0`,
![Alt text||400x300](images//Selection_006.png)

7. You can see the led light off.
![Alt text||400x300](images//IMG_6830.jpg)

8. Type `sudo ./led_control.sh 2`, then you can see the led lights blinking in turn.
    Util you press `ctrl + C` to exit the test script.

![Alt textt||400x300](images//Selection_009.png)

![Alt text||400x300](images//IMG_6828.jpg)

![Alt text||400x300](images//IMG_6832.jpg)

## 2. H2 Test GPIO - Button

1. After step 1-3, run the button test script by typing`./btn_monitor.sh`
![Alt text||400x300](images//Selection_008.png)

2. If you do not press the button,then you can see the output `1`,otherwise you will see output `0`.
![Alt text||400x300](images//IMG_6831.jpg)

## 3. H2 monitor package temperatures

1. After step 1-3, run the test script by typing`./detectTemp.sh`
![Alt text||400x300](images//Selection_007.png)
