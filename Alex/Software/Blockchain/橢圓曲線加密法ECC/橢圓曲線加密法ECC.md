# 橢圓曲線加密法 ECC (Elliptic Curve Cryptography)

[TOC]

## 離散對數問題 DLP

$$
G^k=K，則 k=log_GK
$$

- 這個問題很簡單，但是 $log()$又是怎麼運作
- 高中是用查表法，不久在大學就會學到泰勒級數
- 藉由電腦運算，計算越多次就能更逼近真正的結果。

### a. 離散對數問題的形式

$$
G^k = K \space mod \space p
$$

- 已知 $G,K,p$
- 通常會設定 $0≤(G,K)<p$
- 這問題的難處在於要怎麼解出 $k$
- 沒有 $log()$可以這麼迅速得知

### b. 基於離散對數的安全演算

- 基於離散對數的安全演算有 **ElGamal公鑰加解密** 和 **DSA簽名演算法**
- $p$是一個質數
  - 這是為了加密機制能保證解的回來，需要保證 **乘法反元素** 存在
- $q$是 $p-1$的質因數，這邊的 $G$看不太懂
- 私鑰 $k$是從 $[1...q-1]$中隨機取得
- 公鑰 $K = G^k \space mod \space p$

    ![Untitled.png](images/Untitled.png)

- 如果 $K$為接收者公鑰
- $k$為私鑰
- 發送者要加密訊息 $m$
- 公開資訊為 $(G,K,p)$
- 發送者需要發送
    $$
    C_1=m*K^r \space mod \space p \\
    C_2=G^r \space mod \space p
    $$

- $r$ 是發送者隨機生成的
- 接收者計算

    $$
     C_2^k \space mod \space p\\
     = G^{kr} \space mod \space p\\
     = K^r \space mod \space p
    $$

- 接受者計算 $C_1 * K^{-r}$ 則得到 $m$

## [橢圓曲線](https://zh.wikipedia.org/wiki/%E6%A4%AD%E5%9C%86%E6%9B%B2%E7%BA%BF)

$$
y^2=x^3+ax+b
$$

- 曲線上的每個點是 **非奇異(無奇點)**
  - 所謂的 **非奇異** 或 **光滑** 或 **無尖點** 的，在數學中是指曲線上任意一點都存在 **切線**

### a. 定義+運算子

- 取 $E$ 上的兩點 $P$ , $Q$

- 若兩者相異， $P + Q$ 表示穿過 $P$ 和 $Q$ 的弦和橢圓曲線相交的第三點，再經 $x軸$ 反射的鏡像點!

![_156b037f20c523.gif](images/_156b037f20c523.gif)

- 若兩者是同一點， $P+P=2P$ 表示 $P$ 的切線和橢圓曲線相交的點，再經 $x軸$ 反射的鏡像點

![a7.gif](images/a7.gif)

- `+` 運算遵守 **交換律** 和 **結合律**

- 我們可以進一步用拓展加法的方法，定義 **乘法運算子`*`**
  - 給定橢圓曲線上的點 $P$，如果 $k$ 是整數，則 $k * P = P + P + P + …+ P（k次）$

![Untitled%201.png](images/Untitled%201.png)

### b. 定義無窮遠點

- 定義0為無窮遠點
- 若 $P$和 $Q$的弦與 $y$軸平行， $P+Q=0$

    ![Untitled%202.png](images/Untitled%202.png)

- **無窮遠點0** 為 `+` 運算的單位元素

### c. 阿貝爾群

- `+`、**無窮遠點0** 和 **橢圓上所有的點** 定義了一個 上的 $E$ **交換群** 或 **阿貝爾群(Abelian group)**

## [橢圓曲線離散對數問題 ECDLP](https://zh.wikipedia.org/wiki/%E6%A4%AD%E5%9C%86%E6%9B%B2%E7%BA%BF%E5%AF%86%E7%A0%81%E5%AD%A6)

### a. mod整數有限域

- 常見的有限域是以質數 $p$ 為 $mod$ 的整數域 $F_p$
  - $p$為質數，是為了確保加密機制能保證解的回來，需要保證乘法反元素存在
  - 有限域 $F_p$ 中的元素集合為整數 $[0,1,2,···,p−1]$

$$
 y^2 = x^3 - x + 1 \space mod \space 97
$$

![Untitled%203.png](images/Untitled%203.png)

- 雖然上圖不像是EC曲線，但事實上就是
  - $A$點到 $B$ 點為不垂直的線時，穿過EC曲線會產生1個交點，且一定可以在 $x軸$ 上找到一個對稱點 $C$

![Untitled%204.png](images/Untitled%204.png)

### b. 有限域上的橢圓曲線群

在此有限域 $F_p$ 上的橢圓曲線群 $E(F_p)$

- 具有 $(x, y)$形式有理數點的阿貝爾群 $E(F_p)$
- 其中 $x$ 和 $y$ 都在 $F_p$ 中
- 定義在這條曲線上的群運算子`+`
- 然後定義第二個運算`*`

    $j*(k*P)=(j*k)*P=k*(j*P)$

### c. 有限域上的橢圓曲線群

定義ECC的不可逆對稱式金鑰：

$$
 {K = k * G}
$$

- 以一個隨機生成的 **私鑰k** 為起點
- 將其與曲線上預定的 **生成點G** 相乘，以獲得曲線上的另一點 **公鑰K**
- **生成點G** 是 **secp256k1** 標準的一部分，比特幣密鑰的生成點都是相同的：

    `G = 04 (79BE667E F9DCBBAC 55A06295 CE870B07 029BFCDB 2DCE28D9 59F2815B 16F81798 , 83ADA77 26A3C465 5DA4FBFC 0E1108A8 FD17B448 A6855419 9C47D08F FB10D4B8)`

- 因為所有比特幣用戶的生成點是相同的，一個 **私鑰k** 乘以 **G** 將得到相同的 **公鑰K**
- $k$ 和 $K$ 之間的關係是固定的，但只能單向運算，即從 $k$ 得到 $K$
  - 所以 **私鑰** 可以轉換為 **公鑰**，但 **公鑰** 不能轉換回 **私鑰**
  - 已知 **公鑰K** 來求出**私鑰k** 是非常困難的，就像去暴力試驗所有可能的 $k$ 值
  - 這就是可以把比特幣地址（ $K$ 的衍生） 與任何人共享而不會洩露私鑰（ $k$ ）的原因

    > 橢圓曲線乘法是密碼學家稱之為陷阱門功能的一種函數：<br>
    在一個方向（乘法）很容易做，而不可能在相反的方向（除法）做

## 階、子群、cofactor與生成點

### a. 階(order)

- 橢圓曲線 $E(F_p)$ 上的點的數目 $N$，稱為橢圓曲線 $E(F_p)$ 的 **階(order)**
- 如果橢圓曲線上一點 $P$，存在最小的正整數 $n$，使得 $n*P=0$ (無窮遠點)，則將 $n$ 稱為 $P$ 的階
- 若 $n$ 不存在，我們說 $P$ 是無限階

    > 事實上，在有限域上定義的橢圓曲線所有點的階$n$都是存在的

### b. 子群

- 假設

$$
Y^2 = X^3 + 2x + 3 \space mod \space 97 \\
其上一點 \space P (3, 6), n=5
$$

![Untitled%205.png](images/Untitled%205.png)

- $P$ 的加法構成了一個群 $S$
- 由於 $S \in E$，故 $S$ 是 $E$ 的 **子群**
- 此子群 $S$ 的階 $n=5$
- [拉格朗日定理](https://zh.wikipedia.org/wiki/%E6%8B%89%E6%A0%BC%E6%9C%97%E6%97%A5%E5%AE%9A%E7%90%86_%28%E7%BE%A4%E8%AB%96%29)說明了，**子群的階** 是 **群階的因數**
  - 如果 $N$ 是群的階，子群的階 $n$，則 $n \space | \space N$

- 上述給出了一個找到 **子群的階** 的方法
    1. 計算群階 $N$
    2. 找出所有 $N$ 的因數
    3. 每個 $N$ 的因數 $n$ 乘以 $P$
    4. 在3中，找出最小的 $n$，使得滿足 $nP = 0$，則這個 $n$ 是 **子群的階**

#### 例1

$$
 y^2 = x^3 - x + 3 \space mod \space 37
$$

- 顯然群階可以輕鬆算出為 $N = 42$
- 子群的階是 $n$ 可能是 $1,2,3,6,7,14,21,42$
- 設曲線上一點 $P(2, 3)$

$$
P 不等於0\\
2P 不等於0\\
3P 不等於0\\
6P 不等於0\\
7P 等於0，故 P 的階是 7
$$

- 即由 $P$ 生成的 **子群的階** 是 $7$

> 注意，**最小的** $n$ 是非常重要的
如果隨機的遍歷 $0 - 42$ ，則很有可能遍歷到 $14$ ， $14P$ 也是0，但是 $14$ 不是 $P4$ 的階

#### 例2

$$
 y^2 = x^3 - x + 1 \space mod \space 29
$$

- 橢圓曲線的階 $N=37$
- 由於 $37$ 是質數，所以其因數只有 $1$ 和 $37$

- 如果子群的階為 $1$，則顯然，該子群包含一個點，該點就是0
- 如果子群的階是 $37$，則該子群就是 **parent群**

### c. cofactor與生成點

- 在 **ECC** 算法中，我們希望找到一個 **階數較大的子群**
  - 通常我們會選擇一個橢圓曲線，然後計算它的階 $N$
  - 選擇一個較大的因數 $n$，然後找一個合適的生成點
- 怎麼找呢？
  - [拉格朗日定理](https://zh.wikipedia.org/wiki/%E6%8B%89%E6%A0%BC%E6%9C%97%E6%97%A5%E5%AE%9A%E7%90%86_%28%E7%BE%A4%E8%AB%96%29)說明， $h = N/n$ 是一個整數（由於 $n$ 是 $N$ 的因數）
  - $h$ 有一個自己的名字：**cofactor of the subgroup**
  - 首先，每個橢圓曲線上的點 $P$ ， $NP = 0$
    - 因為 $N$ 是 $P$ 的階 $n$ 的倍數
  - 我們可以寫成這樣 $n(hP) = 0$
  - 假設 $n$ 是一個 **質因數**
  - 令 $G= hP$ ，則 $G$ 就是子群的 **生成元**

    > 再次提醒： <br>
        $n$ 必須是質數，若非如此，則 $nP = 0$ 不一定表示 $n$ 是 $P$ 的階 <br>
        因為 $P$ 的階可能是 $n$ 的一個因數

- 總結一下：
    1. 計算橢圓曲線的階 $N$
    2. 選擇一個數 $n$ 當成子群的階， $n$ 應該是 $N$ 的 **質因數**
    3. 計算 $h = N/n$
    4. 隨機選擇一個點 $P$
    5. 計算 $G = hP$
    6. 如果 $G = 0$，到第4步
    7. 否則，我們找到了這個 **生成點**

## 橢圓曲線的演算法

- 公開訊息為： $( p , a , b, G , n , h )$
  - 質數 $p$, 此數定義了有限域的大小
  - $a,b$ 為橢圓方程式 $y^2=x^3+ax+b$ 的係數
  - $n$ 為生成點 $G$ 的階，也就是 **子群的階**
  - cofactor $h = N/n$

- 回顧：
    $${K = k * G}$$
  - 隨機生成的私鑰 $k$
    - 但實際上 $k$ 的範圍為 $[1,n-1]$ , $n$ 是子群的階
  - 公鑰 $K$
    > 當 $p = hn$ 時，換句話說，**有限域的大小**和**橢圓曲線母群的階**相同時，容易受到 **smart’s attack** 攻擊

### a. 橢圓曲線迪菲-赫爾曼金鑰交換算法 ECDH (Elliptic Curves Diffie-Hellman)

- 實際上是密鑰協商算法，而不是加解密算法
- Alice和Bob有私鑰 $k_A$ 和 $k_B$，公鑰是 $K_A$ 和 $K_B$
  - 那麼Alice能計算 $k_AK_B=(k_Ak_B)*G$（即自己的私鑰乘上Bob的公鑰）
  - Bob能計算同樣的值 $k_BK_A=(k_Bk_A)*G$
  - 這允許一個「秘密」值的建立
- 中間人至知道 $Ｋ_A$ 和 $K_B$，但顯然必須知道 $k_A$ 或者 $k_A$ 才能從中分離
- 現在Alice和Bob得到了共享密鑰，後續可以使用共享密鑰，進行對稱加密進行數據傳輸
  - 通常情況下，此秘密點 $(k_B*k_A)*G$ 中 $x$ 向量被作為共享密鑰

### b. 橢圓曲線加密法 ECIES (Elliptic Curve Integrated Encryption Scheme)

- Alice想加密明文 $m$ 給Bob
- Alice和Bob有私鑰 $k_A$ 和 $k_B$，公鑰是 $K_A$ 和 $K_B$
- Alice將 $m$ 編碼到 $E(F_p)$ 上的一點 $M$（編碼方法很多，這裡不作討論）
  - Alice產生隨機數 $r$
  - Alice計算 $C_1=M+r*K_B$
  - Alice計算 $C_2=r*G$
  - Alice傳送 $C_1$ 與 $C_2$給Bob
  - Bob計算 $k_BC_2 = k_B r G = rK_B$
  - Bob計算 $C_1 - k_BC_2 = C_1 - rK_B = M+(rK_B - rK_B) = M$
  - Bob將 $M$ 解碼成 $m$

### c. 橢圓曲線數位簽章演算法 ECDSA (Elliptic Curve Digital Signature Algorithm)

- Alice想要用私鑰對一個Data簽章
- Bob想要使用Alice的公鑰驗證這個簽章
- Input 是 Data 的Hash值
  - 我們把此Hash值稱為 $z$
  - 為了使得 **Hash值** 的 **bits數** 和子群的階 $n$ 的 **bits數** 一樣，**Hash** 可能會被截斷

#### Alice

1. Alice取一個範圍在 $[1, n - 1]$ 的隨機數 $r$ - **Step1**

2. Alice計算點

$$
P=rG
$$

3. Alice計算

$$
 C_1 = P_x \space mod \space n\\
C_2 = r^{-1} (z + C_1k_A) \space mod \space n\\
P_x：點 P 的 x 軸座標\\
k_A：Alice的私鑰\\
r^{-1}：r對n的乘法反元素\\
$$

- 如果 $C_1 == 0$ 或 $C_2==0$，執行 **Step1**

> $(C_1, C_2)$ 就是簽名值

> 簡單來說，我們生成一個隨機數 $r$，並將他藏在 $C_1$中，不可逆

> 再透過 $C_2$ 將 $C_1$ 跟我們的 $z$ 做綁定

> 多數人會將 $(C_1, C_2)$ 稱作 $(r,s)$

4. Alice將 $(C_1, C_2)$ 以及 $z$ 傳給Bob

#### Bob計算

1. Bob計算

$$
D_1 = C_2^{-1} z \space mod \space n\\D_2 = C_2^{-1} C_1 \space mod \space n
$$

2. Bob計算

$$
D_1G + D_2K_A\\
= D_1G + D_2k_AG\\
= (D_1 + D_2k_A) G\\
= ( C_2^{-1}z + C_2^{-1}C_1k_A)G\\
=C_2^{-1} ( z + C_1k_A)G\\
=P
$$

> 為何最後等於 $P$ ? 是由於
>

$$
C_2 = r^{-1} (z + C_1k_A)\\
rC_2^{-1}C_2 = rC_2^{-1}r^{-1} (z + C_1k_A)\\
r = C_2^{-1} (z + C_1k_A)\\
rG = C_2^{-1} (z + C_1k_A)G = P
$$

如果 $C_1 = P_x \space mod \space n$，則驗證正確

> **注意：每次簽章重新產生新的 $r$ 是非常重要的！**
>

> 如果我們對所有的簽章都採用一樣的 $r$ 或是 隨機數生成器存在可預測性，攻擊者可能會猜出私鑰
>

> Sony曾經曾犯過這個錯誤，他們在PS3上驗證一款遊戲是否經過Sony的ECDSA數位簽章
如果這款遊戲不是Sony簽章的，那麼這款遊戲將不被執行
問題是，Sony簽章時，用了一個靜態的 $r$ 值，而不是隨機生成的
>

> 怎麼獲得私鑰 $k_A$ 和隨機數 $r$?
察看方程式
>

$$
C_2 = r^{-1} (z + C_1k_A) \space mod \space n
$$

> 未知數有2個： $r$ 與 $k_A$
>

> 我們買2份Sony遊戲，簽章分別是 $(C_1 , C_2)$、 $({C_1}', {C_2}')$
由於 $r$ 一樣，故 $C_1={C_1}'$也一樣
>

$$
方程式1：C_2 = r^{-1} (z_1 + C_1k_A)\\
方程式2：{C_2}' = r^{-1} (z_2 + C_1k_A)\\
方程式1-方程式2：C_2-{C_2}' = r^{-1} (z_1 - z_2)
$$

> $z_1$ 與 $z_2$可以自己對遊戲進行Hash運算求得
>

$$
r = (C_2-{C_2}' )^{-1} (z_1 - z_2)
$$

> 再將 $r$ 代回 $方程式1$ 或 $方程式2$ 即可求得 $k_A$
>

## [secp256k1](https://en.bitcoin.it/wiki/Secp256k1)

- **secp256k1**曲線由下述函數定義

    $$
    y^2 = x^3 + 7 \space mod \space p\\
    質數p = 2^{256} - 2^{32} - 2^9 - 2^8 - 2^7 - 2^6 - 2^4 - 1
    $$

    ![Untitled%206.png](images/Untitled%206.png)

- 注意，實際上圖形為離散分佈點，並非實數範圍，曲線只是示意圖
  - 下圖為p=17
        ![Untitled%207.png](images/Untitled%207.png)

- 詳細規格下：

    ![Untitled%208.png](images/Untitled%208.png)

- 比特幣使用此曲線做為公私鑰的產生方式
- 範例點`(55066263022277343669578718895168534326250603453777594175500187360389116729240, 32670510020758816978083085130507043184471273380659243275938904335757337482424)`

## 優缺點

- ECC系統比同樣大小的 **因數分解系統** 或 **離散對數系統** 要 **慢**
- ECC系統的擁護者相信 **有限域乘法群** 上的 **橢圓曲線上的離散對數問題（ECDLP）** 比 **離散對數問題（DLP）** 或 **因數分解** 要困難的多
  - 使用ECC能用小密鑰長度來提供同等的安全，在這方面來說它確實比例如RSA之類的更快
- ECC被廣泛認為是在給定密鑰長度的情況下，最強大的非對稱演算法

## 群(Groups)環(Rings)域(Fields)

### A. 群

- 在數學中,群是一種代數結構，由一個 **集合G** 以及一個 **二元運算** $\bullet$ 所組成，並滿足以下條件：
  - **A1.運算封閉性**：若 $a,b\in G$ 則 $a \bullet b\in G$
  - **A2.運算單位元素**：有 $e \in G$ 使得 $G$ 中任意元素 $a$ 滿足 $a \bullet e ≡ e \bullet a ≡ a$
  - **A3.運算結合律**：若 $a,b,c \in G$ 則 $(a \bullet b) \bullet c ≡ a \bullet (b \bullet c)$
  - **A4.運算反元素**：若 $a \in G$ 則存在 $a' \in G$ 使得 $a \bullet a' ≡ a' \bullet a ≡ e$
- 有限/無限群
  - 群的元素是有限
  - 元數個數稱為 **階** 或 **序**
  - 反之，群的數量是無限的，則稱為無限群
- (有限/無限)阿貝爾群
  - 也稱為 **交換群（commutative group）** 或 **可交換群**
  - **A5.運算交換律**：若$a,b \in G$則$a \bullet b = b \bullet a$
  - 不滿足交換律的群被稱為「非阿貝爾群」，或「非交換群」

### B. 環

- 具有 $(+,*)$ 2個二元運算子
  - $(+)$滿足A1-A5的特性，單位元素為$0$，反元素寫作 $-a$
  - **M1. 乘法封閉性**：若 $a,b\in R$ 則 $a * b\in R$
  - **M2. 乘法結合律**：若 $a,b,c \in R$ 則 $(a * b) * c ≡ a * (b * c)$
  - **M3. 乘法分配律**：若 $a,b,c \in R$ 則 $a * (b + c) ≡ a * b + a * c$
- 交換環
  - **M4. 乘法交換律**：若 $a,b \in G$ 則 $a * b ≡ b * a$
- 整環
  - **M5. 乘法單位元素**：有 $1 \in R$ 使得$R$中任意元素 $a$ 滿足 $a * 1 ≡ 1 * a ≡ a$
  - **M6. 無零因子**：若 $a,b \in R$ 且 $a * b = 0$ 則 $a = 0$ or $b = 0$

### C. 域

- 具有 $(+,*)$ 兩個二元運算子
  - 滿足A1-M6：是個整環
  - **M7. 乘法反元素**：除了0以外，若 $a \in F$ 則存在 $a^{-1} \in F$ 使得 $a * a^{-1} ≡ a^{-1} * a ≡ 1$
- 有理數, 實數, 複數集合都是域

- 整數集合不是域，因為只有1和-1有乘法反元素

$\begin{array}
{|c | c |c |c|c|}
\hline
約定 & 運算 & 單位元素 & 冪 &反元素
\\\hline
加法運算 & x + y & 0 & nx & −x
\\\hline
乘法運算 & x * y & 1 & x^n& x^{-1}
\\\hline
\end{array}$

![Untitled%209.png](images/Untitled%209.png)

## mod運算子

$$
a = b \space mod \space n
$$

- $mod \space n$ 將所有整數映射到集合 $[0,1 , ... , n - 1]$

![Untitled%2010.png](images/Untitled%2010.png)

## [有限域 GF(p) (Galois Fields)](https://zh.wikipedia.org/wiki/%E6%9C%89%E9%99%90%E5%9F%9F)

- 包含有限個元素的域
- 最常見的例子是當 $p$ 為質數時，整數對 $p$ 取 $mod$
- 整數 $[0,1 , ..., p - 1]$ 的集合 $F_p$
- 質數的目的是使乘法反元素存在，滿足**域**的條件：
  - $w \in F_p$，則存在 $w^{-1} \in F_p$ 使得 $w * w^{-1}≡ 1 \space mod \space p$
        ![Untitled%2011.png](images/Untitled%2011.png)

## 加密檔案格式

### A. 編碼方式

- der
  - 以 Binary 存放
  - 常用於憑證
- pem
  - ASCII(base64) 存放，第一行為 "---BEGIN"
- ppk
  - PUTTY用，類似pem

> ***A PEM file is essentially just DER data encoded using base 64 encoding rules with a header and footer added.***
PEM文件本質上就是DER文件使用BASE64編碼後加上頭尾
>

### B. 副檔名

- crt
  - 憑證 (不含私鑰)
  - 常見於**UNIX**系統
  - 大多是**PEM**編碼
  - 查看憑證`openssl x509 -in alex.crt -text -noout`
  - 轉 DER`openssl x509 -in alex.crt -outform der -out alex.cer`
- cer
  - 憑證 (不含私鑰)
  - 常見於**Windows**系統
  - 大多是**DER**編碼
  - 查看憑證`openssl x509 -in alex.cer -text -noout -inform der`
  - 轉 PEM`openssl x509 -in alex.cer -inform der -out alex.crt`

> X.509 : 常見通用的證書格式
>
- key
  - 存放一個公鑰或私鑰
  - 可能是**PEM**,也可能是**DER**
  - 查看pem KEY`openssl rsa -in alex.key -text -noout`
  - 查看der KEY`openssl rsa -in alex.key -text -noout -inform der`
- pfx/P12
  - predecessor of PKCS#12
  - 包含公鑰和私鑰的二進制格式證書
  - Windows的IIS將它們存在一個PFX文件中
  - PFX通常會有一個"密語",你想把裡面的東西讀取出來的話,它就要求你提供提取密碼
  - 大多是**DER**編碼
  - 轉 PEM`openssl pkcs12 -in alex.pfx -out alex.pem.pfx -nodes`
  - 分解出key`openssl pkcs12 -in alex.pfx -nocerts -nodes -out alex.key`
  - 分解出crt`openssl pkcs12 -in alex.pfx -clcerts -nokeys -out alex.crt`
  - crt+key合成pfx`openssl pkcs12 -export -in alex.crt -inkey alex.key -out alex.pfx`

## Base64

- 基於64個可列印字元來表示二進位資料的表示方法
- $2^{6}=64$，所以每6個位元對應某個可列印字元
- Base64中的可列印字元包括字母**A-Z**、**a-z**、數字**0-9**，這樣共有**62**個字元，此外兩個可列印符號在不同的系統中而不同(一般是 **+** 與 **/**)
- 用於常處理文字資料的場合，表示、傳輸、儲存一些二進位資料
- 如果要編碼的位元組數不能被整除，最後會多出1個或2個位元組
  - 可用下面的方法處理：
    - 使用0位元組值在末尾補足
    - 進行Base64的編碼
    - 在編碼後的Base64文字後加上一個或兩個=號，代表補足的位元組數
            ![Untitled%2012.png](images/Untitled%2012.png)

- 範例

    ![Untitled%2013.png](images/Untitled%2013.png)

- 查詢表

    ![Untitled%2014.png](images/Untitled%2014.png)

## Base58

- 是用於Bitcoin中使用的一種獨特的編碼方式
- 主要用於產生Bitcoin的錢包地址
- Base58不使用數字"0"，字母大寫"O"，字母大寫"I"，和字母小寫"l"，以及"+"和"/"符號
  - 不希望在某些字體看起來相同
  - 不使用"+"和"/"的原因是非字母或數字的字符串作為帳號較難被接受
  - 沒有標點符號，通常不會被從中間分行
  - 大部分的軟體支持雙擊選擇整個字符串
- 由於256不能被58整除，Base58無法像Base64那樣轉換為8bits的2進位後依次取出6bits就可以快速完成轉換
  - 因此，Base58編碼算法需要除法運算實現

---

交易都需要一個有效的簽名才會被存儲在區塊鏈
只有有效的密鑰才能產生有效的數位簽章
用於支出資金的數位簽章也稱為見證（witness）
比特幣交易中的見證數據證明了所用資金的真正歸誰所有。

密鑰是成對出現的，由一個私鑰和一個公鑰所組成
公鑰就像銀行的帳號，而私鑰就像控制賬戶的PIN碼或支票的簽名
比特幣的用戶很少會直接看到數字密鑰
一般情況下，它們被存儲在錢包文件內，由比特幣錢包軟件進行管理。

在比特幣交易的支付環節，收件人的公鑰是通過其數字指紋代表的，稱為比特幣地址，就像支票上的支付對象的名字 （即“收款方”）

一般情況下，比特幣地址由一個公鑰生成並對應於這個公鑰

然而，並非所有比特幣地址都是公鑰； 他們也可以代表其他支付對象，譬如腳本，我們將在本章後面提及

這樣一來，比特幣地址把收款方抽象起來了，使得 交易的目的地更靈活，就像支票一樣：這個支付工具可支付到個人賬戶、公司賬戶，進行賬單支付或現金支付

比特幣地址是用戶經常看到的密鑰的唯一代表，他們只需要把比特幣地址告訴其他人即可。

![Untitled%2015.png](images/Untitled%2015.png)

## 公鑰加密和加密貨幣

這些數學函數都是不可逆的

比特幣使用橢圓曲線乘法作為其公鑰加密的基礎

在比特幣系統中，我們用公鑰加密創建一個密鑰對，用於控制比特幣的獲取。
密鑰對包括一個私鑰，和由其衍生出的唯 一的公鑰。
公鑰用於接收比特幣，而私鑰用於比特幣支付時的交易簽名。

支付比特幣時，比特幣的當前所有者需要在交易中提交其公鑰和簽名（每次交易的簽名都不同，但均從同一個私鑰生 成）。比特幣網絡中的所有人都可以通過所提交的公鑰和簽名進行驗證，並確認該交易是否有效，即確認支付者在該時刻對所交易的比特幣擁有所有權。

提示 大多數比特幣錢包工具為了方便會將私鑰和公鑰以密鑰對的形式存儲在一起。然而，公鑰可以由私鑰計算得到， 所以只存儲私鑰也是可以的。

---

- 私鑰 -> 公鑰 -> 地址
- 生成一個隨機的私鑰（256 bits = 32 bytes）
  - 以太坊的私鑰生成是通過`secp256k15`曲線生成的
  - PEM格式

> secp256k1是一個橢圓曲線算法，比特幣使用的也是相同的曲線算法。
>

```bash
$ openssl ecparam -name secp256k1 -genkey -noout
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIHJT+XEPsg4HrLjAJWMo26az+EZ4SauiMVtHi7vm9PhooAcGBSuBBAAK
oUQDQgAE0mzduiBs9OC/DfOIDZu1yITIjFd09fTgWxF4rqfnBn0btKAMbr2OmJSQ
RF9TasQ3VjcaLkzcGm78+Grv+syytw==
-----END EC PRIVATE KEY-----

$ openssl ecparam -genkey  -name secp256k1 -out eckey.pem -text
ASN1 OID: secp256k1
-----BEGIN EC PARAMETERS-----
BgUrgQQACg==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIAF8FQN5CSCAKfMteOBJ0XfP6pWkLrMen/D9tvgcFrlKoAcGBSuBBAAK
oUQDQgAEOLRye9fcAcD+54nE9WkYYjhO4OQ40s2Moz5xPbSwqOLlS3mXP98UOCY8
C+llZzxLYeqrf5h0xsqhUi5ezMtNzA==
-----END EC PRIVATE KEY-----

```

- 私鑰 + 公鑰（64字節）

```bash
openssl ecparam -name secp256k1 -genkey -noout | openssl ec -text -noout
```

- 地址
  - 對上述公鑰做Keccak-256哈希，然後取最後40 個16進位 (20 bytes)
- Keystore

## NOTE

- 在 Ethereum 區塊鏈中所屬的物件
  - 包含程式碼函式
  - 能夠與其他合約進行互動
  - 做出決策
  - 儲存資料
  - 傳送乙太幣給其他人
- 由創建者所定義
  - 但是它們的執行與他們所提供的服務，都是由 Ethereum 網路本身提供
  - 只要整個網路存在便存在
  - 只會因程式中有撰寫自我銷毀的功能才會消失
