# Network Namespace

Linux Network Namespace機制更是Mininet軟體架構的基石

其實Linux Network Namespace在OpenStack和Docker等開源項目中也廣泛應用。

Mininet如何使用網絡命名空間技術？

Mininet使用Linux Network Namespaces來創建虛擬節點，默認情況下，在仿真網絡中Mininet會為每一個host創建一個新的網絡命名空間，

同時在root Namespace（根進程命名空間）運行交換機和控制器的進程，因此這兩個進程就共享同一個網絡命名空間。

由於每個主機都有各自獨立的網絡命名空間，我們就可以進行個性化的網絡配置和網絡程序部署。

由於命名空間的虛擬技術沒有提供類似於虛擬機的持久化能力，所以在Mininet關閉時不能保存所有的配置。

Mininet使用網絡命名空間來讓不同的Host進程擁有獨立的網絡上下文。

在如下的示例中，兩個虛擬主機H1和H2連接到交換機S1，通過Bash來模擬H1和H2，交換機S1運行在Linux內核運行的root namespace

。H1和H2就擁有自己的網絡命名空間以及私有網絡接口h1-eth0和h2-eth0。

交換機S1有兩個埠s1-eth0和s1-eth1，通過veth pair與對應的主機接口相連，這樣H1和H2就可以通過S1進行通信。

s1-eth0和s1-eth1間的數據包轉發通過軟體交換機完成，它運行在root namespace並使用物理接口eth0，等待控制器的指令。

其實基於Linux Network Namespace就可以原生支持作業系統層級的虛擬化，就可以被用來進行網絡仿真。

而Mininet工具使用Python語言對網絡仿真過程所涉及的節點、拓撲、鏈路等進行了封裝抽象，便於科研人員迅速開展仿真工作。

Mininet創建的Network namespace是nameless的，所以通過ip netns list命令是查看不到的，

而通過ip netns add命令創建的namespace是帶name的，這是兩者最明顯的區別之處。

Mininet可以不再關心底層系統實現，而聚焦在上層實驗邏輯上。
