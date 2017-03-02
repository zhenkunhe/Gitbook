# 跟 OpenFlow 的關係

OpenFlow協定目前也是實現SDN架構最主流的技術。

實現SDN網路控制技術標準化的傳輸協定「OpenFlow」,說明控制器與交換器之間溝通方式

讓控制層能夠和轉送層互動

但它只是整體SDN架構的一部分，而且也並非唯一可用的協定

OpenFlow技術將封包傳送的路徑看成是一條「Flow」，就好像是專屬的傳輸路徑，

網管人員可依據企業政策或是服務層級協議（Service Level Agreement，SLA）在控制器軟體上設定各項網管功能以及預先建立邏輯網路，來決定封包傳輸方式

例如經過哪些交換器，需要多少的網路頻寬，再將傳輸路徑設定成OpenFlow路由表（Flow Table）。

接著在控制層和資料層之間利用SSL加密技術建立起安全的傳輸通道，控制器會將設定好的OpenFlow路由表透過傳輸通道傳送給資料層的網路設備來進行封包派送。

OpenFlow是SDN的一部分，但SDN不是只有OpenFlow

Openflow.org網站來分享OpenFlow的相關軟體及技術文件
