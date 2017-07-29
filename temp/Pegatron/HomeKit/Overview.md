<!-- slide -->
# HomeKit Overview
![2](assets/2.png)
![1](assets/1.png)

<!-- slide -->

# 什麼是HomeKit？

- 與家中設備通訊與控制的`framework`
- `iOS 8`引入
- 可以將設備分組,並使用Siri觸發它們

<!-- slide -->

# 設備開發商需要什麼？
- 需要跟Apple申請`MFi licensee`
- 內嵌與內建蘋果認證的`晶片`以及`韌體`
- 符合蘋果的許多規範
> Wi-Fi 或是低耗電藍牙（Bluetooth LE）裝置，必須以 3072 位元金鑰加密，還需要應用超高安全性的 Curve25519 橢圓曲線密碼學加密演算

<!-- slide -->

# 申請MFi licensee可以拿到什麼？
- 取得`HomeKit 技術規格`
- MFi Logos 與 Identity Guidelines
- Hardware 技術支援
- Testing Tools

<!-- slide -->

# HomeKit 技術規格包含哪些？
- Apple Watch Magnetic Charging Module
- Lightning and 30-pin connectors
- Authentication coprocessors
- iPod Accessory Protocol (iAP), the protocol
- AirPlay audio technology
- Wi-Fi Accessory Configuration (WAC) feature
- Headset Remote and Mic feature
- Lightning Audio Module (LAM)
- CarPlay technology
- MFi Game Controller technology
- MFi Hearing Aid technology

<!-- slide -->

# MFi要錢嘛？

- 目前不用
- 不開放個人名義申請
- 不開放以學術名義申請

<!-- slide -->

# MFi許可證有分種類嘛？

有2種類型的許可證:
- 開發許可證：開發/幫助開發，但不製造MFi設備
- 製造許可證：計劃製造MFi配件
![3](assets/3.png)

<!-- slide -->

# 用戶端要怎麼控制MFi設備？

- 透過iOS SDK開發app
> 需要用到SDK內的套件：ExternalAccessory.framework

- App與Device交換資料的協議,開發商可以自己定義
- 能夠與外部設備通訊的APP必須在Info.plist文件中表明支援的設備
>Info.plist:iOS APP開發用的一份設定檔,類似XML file

<!-- slide -->

# 開發App有哪些要求？

- 一台支援`Xcode 6`以上版本的`Mac`
- 開發App`不需要`申請`MFi`

<!-- slide -->

# App實作大致的流程是？
- `registerForLocalNotifications`：註冊有興趣控制的設備
- 若設備On,收到`EAAccessoryDidConnectNotification`訊號
- 建立`EASession`
- 取得設備物件:`EAAccessory`
- 將設備物件放置`EAAccessoryManager`
- 開始進行操作
- 收到`EAAccessoryDidDisconnectNotification`訊號
- 進行斷線處理

<!-- slide -->

# 這樣不是一堆Device就有一堆App?
- 可以寫一個`中控App`來控制這一堆App
- 中控App要用到iOS SDK
> 需要用到SDK內的套件：`HomeKit`
- 中控App要建立local DB，且與cloud DB同步
<!-- slide -->

![4](assets/4.png)

<!-- slide -->
# 開發HomeKit App有哪些要知道？
- 要有使用者登入介面
> User在自己的帳號要建立Home1,Home2的配置狀況

- `HMHome`:代表具有可控制設備的單個住宅，是top level物件
- `HMRoom`:homes內的選擇性物件，
>若User沒設定任何room會有一個default room

- `HMZone`:`HMRoom`的集合,User不一定要設定Zone
> EX:一樓的所有房間

- `HMAccessory`:可控制裝置，例如車庫門開啟器
> 每個裝置都隸屬於某個room
> 若User沒有設定隸屬,則屬於default room

<!-- slide -->

![5](assets/5.png)

<!-- slide -->

- `HMService`:裝置提供的服務,如此裝置的firmware update

- `Characteristic`:裝置的`Properties`
> 燈光:可能具有電源狀態（開/關）和亮度特性
> 風扇:可能具有速度（關，低，高）特性

<!-- slide -->

- `HMAction`:改變Characteristic的行為
> EX:打開或關閉燈

- `HMActionSet`:控制一個或多個服務
> 主動型Scene控制用
> EX:睡前場景包含 鎖定門 關燈
> 被動型Scene控制用
> EX:火災傳感器檢測到某些情況時開啟警報器與灑水裝置

- `HMTimerTrigger`:設定日期與重複動作

<!-- slide -->

![6](assets/6.png)

<!-- slide -->

- 透過`HMHomeManager`物件,從HomeKit DB獲取HMHome和相關物件
``` ObjC
self.homeManager = [[HMHomeManager alloc] init];
self.homeManager.delegate = self;
```
- 當資料下載完成時，將收到`homeManagerDidUpdateHomes`訊息
