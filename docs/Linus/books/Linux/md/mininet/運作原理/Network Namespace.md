# Network Namespace

<!--sec data-title="Mininet虛擬化的核心機制是？" data-id="1" data-nopdf="true" data-collapse=false ces-->

- `Linux Network Namespace`是Mininet軟體架構的基石，用其創建虛擬節點

> 需要先了解[Linux Namespace](https://zhenkunhe.github.io/Gitbook/Linux/md/Namespace/%E7%B0%A1%E4%BB%8B.html) 之中的  [Network Namespaces](https://zhenkunhe.github.io/Gitbook/Linux/md/Namespace/Network%20namespaces/%E4%BB%80%E9%BA%BC%E6%98%AFNetwork%20Namespace.html)

{% hint style='info' %}
其實Linux Network Namespace在OpenStack和Docker等開源項目中也廣泛應用    
主要用於作業系統層級的虛擬化，包含虛擬網路
{% endhint %}

- 預設情況下，Mininet會為每一個`host`創建一個新的`Network Namespaces`
> 由於每個`host`都有各自獨立的`Network Namespaces`，我們就可以進行個性化的網路配置和程式佈署

- 在`root Namespace`運行`switch`和`controller`Process，因此兩個Processes共享同一個`Network Namespaces`

- 由於`Linux Namespace`的虛擬技術沒有提供類似於`VM`的持久化能力，所以在Mininet`關閉時不能保存所有設定`

- Mininet創建的`Network namespace`是`nameless`的，所以透過`ip netns list`command是查看不到的
> 而透過`ip netns add`command創建的`Network Namespace`是帶name的，這是兩者最明顯的區別之處    
> [Discussions](https://mailman.stanford.edu/pipermail/mininet-discuss/2014-January/003796.html)

<!--endsec-->


{% mermaid %}
graph TD;
  subgraph Root namespace
    subgraph No name<br>namespace
      h1(Host<br>h1)
    end

    subgraph No name<br>namespace
      h2(Host<br>h2)
    end
      s1((OpenvSwitch<br>s1))
      s1 -- Two line<br>edge comment --- h1
      s1 -- Two line<br>edge comment --- h2
  end
{% endmermaid %}

在如下的示例中，兩個虛擬主機H1和H2連接到交換機S1，通過Bash來模擬H1和H2，交換機S1運行在Linux內核運行的root namespace

。H1和H2就擁有自己的網絡命名空間以及私有網絡接口h1-eth0和h2-eth0。

交換機S1有兩個埠s1-eth1和s1-eth2，通過veth pair與對應的主機接口相連，這樣H1和H2就可以通過S1進行通信。

s1-eth0和s1-eth1間的數據包轉發通過軟體交換機完成，它運行在root namespace並使用物理接口eth0，等待控制器的指令。
