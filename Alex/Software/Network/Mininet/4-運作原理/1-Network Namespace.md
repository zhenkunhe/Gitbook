# Network Namespace

[toc]

## Mininet虛擬化的核心機制是？

- `Linux Network Namespace`是**Mininet**軟體架構的基石，用其創建虛擬節點
  > 需要先了解[Linux Namespace](https://zhenkunhe.github.io/Gitbook/Linux/md/Namespace/%E7%B0%A1%E4%BB%8B.html) 之中的  [Network Namespaces](https://zhenkunhe.github.io/Gitbook/Linux/md/Namespace/Network%20namespaces/%E4%BB%80%E9%BA%BC%E6%98%AFNetwork%20Namespace.html)

- 預設情況下，**Mininet**會為每一個**host**創建一個新的`Network Namespaces`
  > 由於每個**host**都有各自獨立的`Network Namespaces`，我們就可以進行個性化的網路配置和程式佈署

- **Switch**和**Controller**運行在`root Namespace`，因此兩個Processes共享同一個**Network Namespaces**

- 由於**Linux Namespace**的虛擬技術沒有提供類似於**VM**的持久化能力，所以在Mininet`關閉時不能保存所有設定`

- **Mininet**建立的**Network namespace**是`nameless`的，所以透過`ip netns list是查看不到的`

  > 而透過**ip netns add**建立的**Network Namespace**是帶name的，這是兩者最明顯的區別之處  
  > [Discussions](https://mailman.stanford.edu/pipermail/mininet-discuss/2014-January/003796.html)

>**Linux Network Namespace**在**OpenStack**和**Docker**等開源項目中也廣泛應用
主要用於**作業系統層級的虛擬化**，包含**虛擬網路**

## 解釋一下，上一個的範例與namespace的關聯

- 範例中**Host H1**和**Host H2**連接到運行在Kernel的**root namespace**的**Switch S1**

- **H1**和**H2**擁有自己的網路`匿名命名空間`以及私有網路接口`h1-eth0`和`h2-eth0`

- **S1**有兩個埠`s1-eth1`和`s1-eth2`，通過`veth pair`與Host接口相連，這樣**H1**和**H2**就可以透過**S1**進行交流

- **s1-eth0**和**s1-eth1**間的data轉發透過**S1**完成，並使用實體接口`eth0`，等待`Controller`的指令

![Example1](images/Example1.jpeg)
