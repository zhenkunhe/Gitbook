# 簡介

tags: Namespace

<!--sec data-title="什麼是Namespace？" data-id="1" data-nopdf="true" data-collapse=false ces-->
命名空間就是在**大箱子(`Kerne`)**裏面再裝一堆**小箱子(`Kernel Namespace`)**
<!--endsec-->

<!--sec data-title="為什麼要這麼做？" data-id="2" data-nopdf="true" data-collapse=false ces-->

- 因為如果我們想在箱子裏面放兩個外觀一模一樣的**蘋果(`Process`)**，到時候一定會無法區分

- 不如就放在**A箱子**裡面的蘋果，叫作**A蘋果**；放在**B箱子**裡面的蘋果，叫作**B蘋果**

<!--endsec-->

<!--sec data-title="命名空間有幾種？" data-id="3" data-nopdf="true" data-collapse=false ces-->

- **Linux 2.6.24**版的Kernel開始,提供了`6種`不同類型的`Namespace`

- 分別是：
  - `程序間通信(IPC)命名空間`
  - `程序命名空間`
  - `網絡命名空間`
  - `掛載命名空間`
  - `UTS命名空間`
  - `用戶命名空間`

- 所以有人說**Namespaces**是一種`資源隔離方案`，使得PID、Network、IPC等系統資源，**不再屬於全域設定**，而是某個特定的**Namespace**的資源

<!--endsec-->

<!--sec data-title="還有其他好處嘛？" data-id="4" data-nopdf="true" data-collapse=false ces-->

- 通過**Namespace**技術使得用戶創建的**程序**能夠`與系統分離`得更加徹底，從而`不需要使用更多的底層(硬體支援)`虛擬化技術
> 因為**Namespaces**是用**純軟體劃分**出來的概念

<!--endsec-->

<!--sec data-title="Namespace之間有關聯嘛？" data-id="5" data-nopdf="true" data-collapse=false ces-->

- **Namespace**之間的`資源互相隔離`、不可見的
- 因此在**作業系統的層面**上看，就會出現多個相同`pid`的Process

<!--endsec-->

<!--sec data-title="User要怎麼看待Namespace" data-id="6" data-nopdf="true" data-collapse=false ces-->

- 在**用戶層面**上只能看到**屬於用戶自己Namespace下的資源**

> 例如使用`ps`命令只能列出自己**Namespace**下的程序 

- 使用者角度來看,每個Namespace看上去**就像一個單獨的Linux系統**

<!--endsec-->

![Linux的命名空間技術架構](../image/Linux的命名空間技術架構.jpg)
