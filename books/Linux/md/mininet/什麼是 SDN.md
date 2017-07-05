# 什麼是 SDN

<!--sec data-title="什麼是 SDN？" data-id="1" data-nopdf="true" data-collapse=false ces-->

- 全名是：`軟體定義式網路（Software defined Networking，SDN）`
- 要了解`SDN`之前，要先了解現今網路架構中，路由器除了硬體上俱備有轉送資料的能力外，
對於資料的移動控制，都是在`每一台路由器中`，實作著遵守各種傳輸協定的控制軟體
> 例如`連結層`有`擴展樹協定（Spanning Tree Protocol，STP）`來防止`封包卡在迴圈`   

> 雖然協定是共通的，但網通廠商各有各的`OS`與`實作技術`，導致一旦企業購買某一廠牌的設備，未來更新設備時就必須遷就於該廠牌的網管功能，造成`被網通廠商挾持`的情形

<!--endsec-->

<!--sec data-title="現今這樣不是沒什麼問題嘛？" data-id="2" data-nopdf="true" data-collapse=false ces-->

- 隨著隨著雲端應用及巨量資料增加，`路由表`越來越龐大，判斷轉送的過程愈來愈複雜

- 而這些判斷需要路徑上的每一台交換器或是路由器`不斷的拆分及重組封包`

- 可想而知，結果導致`傳輸效率不佳`，無法有效發揮網路頻寬

- 網路管理人員需要客製調整各種網路設定時，也必須針對每臺交換器或路由器，逐一登入command-line設定，相當麻煩
> 而且透過人工逐一設定的方式也有很高的風險，一旦網路管理人員輸入了錯誤的指令，很容易造成網路服務癱瘓

- 於是關於`控制封包`這件事情，我們需要重新思考：`真的需要每一台路由器拆開封包才能判斷嘛？`

<!--endsec-->

<!--sec data-title="所以SDN做了什麼？" data-id="3" data-nopdf="true" data-collapse=false ces-->

- 它的概念是：將網路分為`控制層（Control Plane）`與`資料層（Data Plane）`

- 將網路的管理權限交由`控制層`的`控制器（Controller）`軟體負責，採用`集中控管`的方式，同時也負責`決定傳輸路徑`

![SDN](image/SDN.png)

<!--endsec-->

<!--sec data-title="SDN帶來的好處？" data-id="4" data-nopdf="true" data-collapse=false ces-->

- 讓網路的管理變得更`集中`

- `自動`處理與`動態`因應變化

- 讓網路的設計、部署、管理、規模延展更為`容易`

- 可以減少IT服務日常維運，`減少人為出錯`

- 既然傳輸路徑已預先設定完成，交換器不需要透過不斷學習來尋找封包傳送的路徑，可大幅提升傳輸效率，`降低延遲（Latency）的時間`

- 可`節省支出`


<!--endsec-->

<!--sec data-title="所以網通廠怎麼看SDN？" data-id="5" data-nopdf="true" data-collapse=false ces-->

- SDN使得交換器的重要性將會不如以往 (功能會越來越單純，未來可能僅負責封包的傳送)

- 未來客製化的軟體就可以提供各項硬體設備的功能

- 於硬體設備廠商來說，將會是一大衝擊

<!--endsec-->

{% hint style='info' %}

臺灣企業還不了解`SDN`在未來的重要性，而且開發`SDN應用程式`的門檻較高

Google、Facebook、Yahoo、微軟等多家指標型的大企業投入了SDN架構與OpenFlow技術的發展

{% endhint %}

<!--sec data-title="我剛好像看到OpenFlow，那是什麼？ 跟SDN是什麼關係" data-id="6" data-nopdf="true" data-collapse=false ces-->

- `OpenFlow`是實現SDN架構`最主流的核心技術`，也就是`網路交換器(switch)`和`控制器(controller)`之間的`傳輸協定`

- 就像是人類的神經一樣，負責大腦與四肢的溝通

- OpenFlow技術將封包傳送的路徑看成是一條「`Flow`」，就好像是專屬的`傳輸路徑`
> 例如經過哪些交換器，需要多少的網路頻寬，再將傳輸路徑設定成`OpenFlow路由表（Flow Table）`

- `控制層`和`資料層`之間，利用`SSL`加密，建立起安全的傳輸通道

- 但它只是整體SDN架構的一部分，而且也並非唯一可用的協定
> `OpenFlow是SDN的一部分，但SDN不是只有OpenFlow`

![OpenFlow](image/Openflow.png)

<!--endsec-->
