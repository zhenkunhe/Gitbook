# OQC

[TOC]

## 1. 預備事項

- 插入`鍵盤`與`滑鼠`至車尾USB port
![Alt text|center|200x200](images/1542014681775.png)

- 插入`USB` x2
![Alt textt|center|200x200](images/./1542003035996.png)
- 插入`SD card`
![Alt text|center|200x200](images/./1542003067325.png)
- 插入`HDMI`
![Alt text|center|200x200](images/./1542003088269.png)

- 插入`OTG`線連接至Host

| Device | Host |
| :--------: |--------|
| ![Alt text](images/./1542003105960.png)  | ![Alt text](images/./1542003115019.png) |

- 插入`電源`
![Alt text|center|200x200](images/./1542003128031.png)

## 2. 開機

- 按下`電源`按鍵
![Alt text|center|200x200](images/./1542003139630.png)

- 確定Power LED 為藍色
![Alt text|center|200x200](images/./1542003148304.png)

- 輸入Device預設密碼: `deepracer`
![Alt text|center|200x150](images/./1542003168959.png)

- 再次輸入Device預設密碼: `deepracer`
![Alt text|center|200x150](images/./1542003180643.png)

- 輸入新的密碼: `pega#1234`
![Alt text|center|200x150](images/./1542003192939.png)

- 再次輸入新的密碼: `pega#1234`
![Alt text|center|200x150](images/./1542003201274.png)

## 3. 連網

- 點擊出現的4個裝置，確定可以正常掛載
![Alt text|center|200x200](images/./1542003222553.png)

- 複製`OQC`到桌面上
![Alt text|center|200x150](images/./1542003234513.png)

- 複製`OQC/wifi-creds.txt`到**DEEPRACER**
![Alt text|center|200x150](images/./1542003281620.png)

- 拔掉Host OTG
![Alt text|center|200x150](images/./1542003291730.png)

- 等待wifi LED變為藍燈
![Alt text|center|200x200](images/./1542003302647.png)

- 執行`OQC/create_nginx_cert_and_password.sh`
![Alt text|center|200x150](images/./1542003312263.png)

- 打開在**DEEPRACER**上的`device-status.txt`
![Alt text|center|200x150](images/./1542003322818.png)

## 4. 馬達測試

- 到Host輸入IP

| Device | Host |
| :--------: |--------|
| ![Alt text](images/./1542003338176.png) | ![Alt text](images/./1542003347011.png) |

- 新增例外網站
![Alt text|center|200x200](images/./1542003356376.png)

- 輸入裝置上的密碼

- 確定Camera畫面有出現在螢幕上
![Alt text|center|300x200](images/./1542003367998.png)

- 高速 前進/後退 測試

 | 前進 | 後退 |
| :--------: |--------|
| ![Alt text](images/./1542003376697.png) | ![Alt text](images/./1542003384960.png) |

- 調整至低速
![Alt text|center|200x100](images/./1542003398434.png)

- 低速 前進/後退 測試

 | 前進 | 後退 |
| :--------: | --------|
| ![Alt text](images/./1542003376697.png) | ![Alt text](images/./1542003384960.png) |

- 左/右 轉 測試

 | 左轉 | 右轉 |
| :--------: | --------|
| ![Alt text](images/./1542004126223.png) | ![Alt text](images/./1542004131453.png) |

## 5. LED 與 Wifi

- 執行`OQC/test.sh`
![Alt text|center|300x250](images/./1542004142174.png)

- 確定Secure Boot已經開啟 (PASS)
![Alt text|center|350x200](images/./1542004148760.png)

- 確定尾燈LED`開啟`，並按下`Enter`繼續
![Alt text|center|250x250](images/./1542004157548.png)

- 確定尾燈LED`關閉`，並按下`Enter`繼續
![Alt text|center|250x250](images/./1542004167725.png)

- 確定Camera LED`開啟`，並按下`Enter`繼續
![Alt text|center|250x250](images/./1542004178236.png)

- 確定Camera LED`關閉`，並按下`Enter`繼續
![Alt text|center|250x250](images/./1542004237000.png)

- 輸入機台上的密碼(PASS)
![Alt text|center|250x250](images/./1542004262296.png)

- 確定WiFi 10 連線/斷線 10次成功(PASS)
![Alt text|center|250x250](images/./1542004270945.png)

- 按下Reset button重開機
![Alt text|center|250x250](images/./1542004284788.png)

- 關機

| Step 1 | Step 2 |
| :--------: |--------|
| ![Alt text](images/./1542004305924.png)  | ![Alt text](images/./1542004310490.png) |

- 回到shipping image

## 6. 最後

- 確定 蓋子/外殼 沒有 髒污/指紋
- 確定包裝正確
