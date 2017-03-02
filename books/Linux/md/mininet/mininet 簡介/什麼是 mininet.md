# 什麼是 mininet

- mininet是一個`網路模擬器(network emulator)`
> 或者，更精確的說：`網路拓樸模擬器(network emulation orchestration system)`

- 它模擬了一整個`終端主機(end-hosts)`、`路由器(router)`、`交換器(switches)`集成系統

- 可以輕易的製作支援SDN的區域網路

Mininet作為一個輕量級的SDN仿真工具

- 它只是跑在你的你電腦的一個`process`

- mininet模擬的host行為跟真的一樣：你可以SSH(Secure Shell)進去並運行任意程式

- 你也可以送出封包，就像透過真的乙太網路出去，有link speed & delay

- 通常透過mininet模擬的架構,會與實際透過硬體架設的結果一致
