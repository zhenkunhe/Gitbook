# 什麼是 mininet

<!--sec data-title="什麼是 mininet" data-id="1" data-nopdf="true" data-collapse=false ces-->

- mininet是一個用`python`寫的，跑在你的你電腦的一個`Process`
- 這個`Process`是一個`網路模擬器(network emulator)`，或者更精確的說：`網路拓樸模擬器(network emulation orchestration system)`

{% hint style='info' %}
既然叫`拓樸模擬器`，代表它模擬了一整個:
`終端主機(end-hosts)`
`路由器(router)`
`交換器(switches)`的集成系統
{% endhint %}

<!--endsec-->

<!--sec data-title="模擬網路系統可以幹嘛？" data-id="2" data-nopdf="true" data-collapse=false ces-->

- 通常透過mininet模擬的架構,會與實際透過硬體架設的結果一致，因此可做為`實體配線前的臨摹`

- mininet模擬的host行為跟真的一樣：你可以SSH(Secure Shell)進去並運行任意程式，也可以`運行server`

- 你也可以送出封包，就像透過真的乙太網路出去，有link speed & delay，可以`觀察封包`來往的狀況

- 可以輕易的製作支援SDN的區域網路 (後面會介紹什麼是SDN)，事實上，mininet是很適合作為一個輕量級的`SDN仿真工具`

<!--endsec-->
