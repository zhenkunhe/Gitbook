# 什麼是 mininet

[toc]

## 什麼是 mininet

- **mininet**是一個用`python`寫的一個**Process**

- 這個**Process**是一個`網路模擬器(network emulator)`

- 或者更精確的說：`網路拓樸模擬器(network emulation orchestration system)`

>既然叫**拓樸模擬器**，代表它模擬了一整個:**終端主機(end-hosts)**,**路由器(router)**,**交換器(switches)**的集成系統

## 模擬網路系統可以做什麼？

- 通常透過**mininet**模擬的架構,會與實際透過硬體架設的結果一致，因此可做為`實體配線前的臨摹`

- **mininet**模擬的host行為跟真的一樣：你可以**SSH(Secure Shell)**進去並運行任意程式，也可以`運行server`

- 你也可以送出封包，就像透過真的**乙太網路**出去，有link speed & delay，可以`觀察封包`來往的狀況

- 可以輕易的製作支援`SDN`的區域網路 (後面會介紹什麼是SDN)，事實上，**mininet**是很適合作為一個輕量級的`SDN仿真工具`
