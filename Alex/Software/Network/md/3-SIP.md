# SIP

[TOC]

## 摘要

SIP已經成為VoIP的主要通訊協定
為了和現有的PSTN公眾網路 銜接而制定的SIP延伸協定：SIP-T、SIP-I
SIP 的一個重要應用，IMS多媒體子系統

## 定位

SIP(Session Initiation Protocol)通訊協定主要是作為一個或多個使用 者在網路上建立、修改、維護和終止會談的通訊使用。是屬於應用層 (application layer)的一種通訊協定

VoIP的服務裡，至少須包含兩個部分的通訊協定，

第一個部分是 呼叫控制協定 - 最主流的就屬H.323和SIP 但由於H.323過於複雜 協定中的命令與訊息都是由二進位碼所組成 實行(implement)起來非常困難 使得相對較為簡易、開放的 SIP協定得以受到越來越多的重視

另一個是媒體傳輸協定(包含媒體控制和及時傳輸控制)

## 特點

簡單：SIP的通訊模式與 HTTP通訊協定的類似，採用請求(request)/回應(response)的模 式，提供數種的要求命令(command)和回應代碼(status code)，並配合夾帶檔頭欄位(header fields)訊息和通訊內容 (content)，來完成呼叫控制。
以文字為主：類似HTTP的作法， 將協定的訊息以文字 (Text)表達並使用標準的字元編碼，如ASC-II或UTF-8。使用文 字模式有幾種好處，首先是容易實作，特別是容易進行偵 錯(debug)；再者是擴充性較佳，增 加額外的訊息不需要大幅更動原有的解析程式。

與傳輸層分離：SIP在傳輸層之上運作， 可以提升網路傳輸的適應性和支援性，例如在封包漏失較為嚴重 的網路環境中使用TCP連線，而在較好的環境中就使用UDP。

支援移動性：SIP在制定時，就將支援移動性 納入考量，使得無 論在呼叫階段或是交談過程中，都可以藉由轉送或是重新邀請 (re-invite)的方式來維繫會談session。

較早被運用於VoIP 的通訊協定是H.323，但H.323 並非為了VoIP而設計的，因此在支援VoIP有許多缺陷。 反觀 SIP 卻是專為VoIP而設計的，因此比SIP 有許多顯著的優點。

## 架構

最主要的任務在於建立、維繫及管理會談(session)
建立會談的第一步是要找到受話者的位址，然後呼叫受話者， 受話者同意建立會談後再交換建立會談的一些重要約定訊息
協商之後便開是建立會談，讓雙方自行傳輸語音封包，
然後再繼續管控會談過程，直到通話結束為止。

這些功能可以各自存在於不同的硬體設備，也可能 數個功能共存於同一硬體設備上。

四種基本的元件，包括：
User Agent
：簡稱UA，負責為CPE(終端設備)提供服務， 又可細分為用戶端User Agent Client(UAC)和User Agent Server(UAS)， UAC 負責提出請求，UAS負責回應訊息。每一個SIP UA都可以扮演UAC 或UAS，服務呼叫者(Caller)的UA，執行UAC 的角色；反之，服務 被呼叫(Callee)的UA則是 UAS。

Proxy Server：
代理伺服器是SIP運作時的中心，Proxy Server會將 呼叫者的請求轉送到另外一端，所以它同時會扮演UAC和UAS。

Redirect Server：
Redirect Server用來實現邏輯位址和實體位址的分離， 每個使用者擁有一個固定不變的邏輯位址，但實體位址可以隨意 變動，每當使用者移動時，必須由UA 負責向一個Redirect Server 註冊，所以他人可以以被呼叫者的邏輯位址詢問Redirect Server獲知 被呼叫者的實際位址。Redirect Server 可以用來實現 Call Forward 這類功能。 經由Redirect Server的運作，被呼叫端 實際的位址可以在建立會談時被告知給呼叫端，與Proxy Server不同 的是，Redirect Server不會轉送任何SIP訊息。

Registrar Sever：
登錄伺服器，其目的為紀錄或更新用戶位址及狀 態。當User Agent上線時，會先執行SIP的REGISTER命令，用以 將目前UA的位址及狀態紀錄或更新，當有呼叫者提出會談的請求 時，相關的其他元件就能順利的找到被呼叫端。每次UA登錄時都有 一定的期限，UA必須在期限內重新註冊，否則相關的會期(Session) 狀態，就無法維護，此設計讓SIP具有支援移動性的能力。
其他一些伺服器像是Location Server和Media Gateway等，雖 然這些伺服器都不會處理跟SIP的訊息，但通常一個SIP的系統都會 需要用到這些伺服器，才能建立完整的通話。

## 語法

SIP的語法是以BNF規則所定義的，該語法規則非常類似HTTP的 通訊協定，最基本的單位為SIP Message，Message是由三部分所組 成：起始行(Start Line)、訊息表頭(Message Header)、訊息本體 (Message Body)。而Message又分兩種：請求(Request)和回應 (Response)

Start Line：
以Request的訊息而言，在Start Line行以一個大寫的 英文單字開頭，代表不同的功能，如INVITE、ACK、BYE、CANCEL、 REGISTER、INFO和OPTION 等方法。
Response訊息則在Start Line 以一個三位數的十進位回應碼 (Status Code) 開頭代表不同的回應 訊息，如1XX 表示一些進行中狀態的說明(Provisional)；2XX 表示 成功；3XX 表示轉向(Redirect)的狀況；4XX表示請求端的錯誤 (Client-Error)；5XX表示服務端的錯誤(Server-Error)；6XX表示一些 全域性的錯誤(Global-Error)。

Message Header：
主要是用來說明Request和Response訊息的詳細資料。

Message Body：
則主要是傳遞會談描述協定(SDP)的訊息。
SIP在每次的會談中稱作交談(Dialog)。在Dialog中可能會包含 許多訊息交易(Transaction)，所謂的Transaction就是由請求端發出 請求命令到另一端回應的訊息被接收完畢為止。每個Transaction都 會有個序號ID，用來辨識每個交易的順序及回應關係。

除了語法與物件的定義外，SIP也描述了幾種建立呼叫的模型，包 括只包含兩個UA參與的直接呼叫(Direct Call)；和經過Proxy Server 的代理呼叫(Proxy Call)、多重代理呼叫；透過Redirect Server的重 定向呼叫(Redirect Call)。另外還有透過第三方的呼叫控制(3rd Party Call Control, 3PCC)，來完成像是REFER、CONFERENCE等應用。

另外還有一些進階的功能，如一號多機、一機多號、請勿打擾(Do Not Disturb)、自動轉接(Call Forward)、自動回撥、呼叫保留和話中插接 等功能不一而足。

## 其他與SIP協定相關的網路協定

SDP：
會談描述協定。此協定主要是用來協商雙方建立多媒體資料封 包通道(Traffic channel)之用。雙方會在邀請(Invite)訊息的三向交握 (hand-shake)過程中交換彼此可以使用的通訊方式及資料格式。

RTP：
即時傳輸協定。用於及時的資料傳遞，如語音影像資料。由於 VoIP所傳輸的多媒體資料大多及時性優先於資料的完整性，所以利 用RTP的特性來編排、補償及傳遞這些資料內容，最為合適。

LDAP：
輕量級目錄訪問協定。此協議主要是讓SIP server用來與位 址服務的伺服器(Location Server)溝通，已取得某個查詢目的的正確 位置。

## 改良

SIP-T
為了讓VoIP的服務擴展，VoIP網路與現有網路(如公眾交換網路PSTN) 的互通性便為一個重要的議題。作為VoIP裡主要的通訊協定SIP，當然 有必要加以延伸，以作為和其他網路連接的工具。SIP-T (SIP for Telephone)便是在此需求下而產生，被定義於IETF 3372。此協定當初由 IETF小組制定的原因是因為該小組是和制定SIP協定的同一組人，對SIP 的了解最深入，由他們來制定最合適不過，而且若是在制定過程中發現 SIP的不足時，還可以去修改原來SIP的協定。
SIP-T的目的是在於提供PSTN與IP網路之間，訊號轉譯與互相運作 的一套機制，使得從兩端服務都能夠透通地彼此連接。在SIP-T協定中定 義了三種連接的方式，分別為

SIP Bridging：
就是由PSTN的用戶發起(origination)，中間經過以SIP 作協定的VoIP網路，再由PSTN網路終結(termination)。 (Phone-to-Phone)。

PSTN origination ：
IP termination: 就是由PSTN的用戶發起，由IP網 路的SIP用戶終結。 (例如: Phone-to-PC VoIP)

IP origination ：
PSTN termination: 就是由IP網路的SIP用戶發起， 由PSTN的用戶終結。 (例如: PC-to-Phone VoIP)

SIP-I
SIP-I又稱為SIP with encapsulated ISUP，此協定是由ITU-T的工 作小組(ITU-TSG11)所制定，其內容包含Technical report TRQ.2815和 Recommendation Q.1912.5標準草案。其中TRQ.2815主要是定義SIP 和Bearer Independent Call Control(BICC) 協議或ISUP協議之間的 互通技術需求、互通介面模型、互通單元(Interworking Unit, IWU)所應支 援的能力等等。Q.1912.5則定義了SIP和BICC/ISUP的互通機制、訊息 的對應及封裝，將這些功能完整地定義於互通單元裡(IWU)。所謂的互通 單元就是執行各種介面節點之間的訊息交換，轉交或遞送訊息到SIP網 路。在不同的網路之間的稱作Network-to-Network Interface(NNI)，這 些介面都需要IWU來作為橋梁。

SIP-T 與SIP-I之間的比較
相較於SIP-I豐富的內容，SIP-T只有定義一些基本通訊功能的介面轉 換，可以說相對的實用性低了很多。這些以互聯網起家的IETF技術人員 所制定的標準，終究不比以傳統通訊本家的組織人員(ITU-T)鎖定義的標 準。SIP-I協定不但沿用了許多IETF的標準，還在基本的呼叫服務之外， 制定包括CLIP、CLIR等附屬業務間的互通；除了呼叫信令的互通，還考 慮了資源預留、品質確保、媒體資訊轉換、與PSTN/3GPP等完整互通的 問題。而且SIP-I所制定的協議，也比較清晰嚴謹，沒有像IETF許多協議 較為彈性卻相對模糊的特性。這些因素使得目前以SIP-I較廣為各家營運 商、電信商所接受，漸漸成為整合其他網路的核心協定。

## IMS

IMS（IP Multimedia Subsystem; IP多媒體子系統）
可以連結無線、有線與有線電視寬頻服務的各種裝置，IMS解決方案為重視存取（access-aware），並支援 3GPP（IMS）、3GPP2（MMD）、Packet Cable 2.0與TISPAN標準。目前有線網路、有線電視寬頻服務、CDMA及GSM/UMTS市場領導廠商都在進行IMS測試。

IMS整合服務網路建立於 SIP多媒體、網路電話（Voice over IP；VoIP）及無線通訊之基礎。以IMS為基礎的服務包括影像電話、視訊會議、即時訊息與多媒體服務等，且僅需透過一項設備與一個電話號碼即可進行。 此一解決方案協助服務供應商更有效率地整合多重網路上的用戶資訊，並可將用戶各項費用列於單一帳單上。

## 在同一域中建立 SIP协议 会话

　　下图说明了在预订同一个 ISP 从而使用同一域的两个用户之间建立 SIP协议 会话的过程。用户 A 使用 SIP协议 电话。用户 B 有一台 PC，运行支持语音和视频的软客户程序。加电后，两个用户都在 ISP 网络中的 SIP协议 代理服务器上注册了他们的空闲情况和 IP 地址。用户 A 发起此呼叫，告诉 SIP协议 代理服务器要联系用户 B。然后，SIP协议 代理服务器向 SIP协议 注册服务器发出请求，要求提供用户 B 的 IP 地址，并收到用户 B 的 IP 地址。SIP协议 代理服务器转发用户 A 与用户 B 进行通信的邀请信息（使用 SDP），包括用户 A 要使用的媒体。用户 B 通知 SIP协议 代理服务器可以接受用户 A 的邀请，且已做好接收消息的准备。SIP协议 代理服务器将此消息传达给用户 A，从而建立 SIP协议 会话。然后，用户创建一个点到点 RTP 连接，实现用户间的交互通信。

1.呼叫用户 B
2.查询B在哪里
3.响应B的SIP协议地址
4.呼叫
5. 响应
6. 响应
7. 多媒体通道已建立
![1](http://user-image.logdown.io/user/18450/blog/17983/post/1182300/CKRlEFRVQliBgMcI9OVZ_0918250.jpg)

## 在不同的域中建立 SIP协议 会话

　　本情景与第一种情景的不同之处如下。用户 A 邀请正在使用多媒体手持设备的用户 B 进行 SIP协议 会话时，域 A 中的 SIP协议 代理服务器辨别出用户 B 不在同一域中。然后，SIP协议 代理服务器在 SIP协议 重定向服务器上查询用户 B 的 IP 地址。SIP协议 重定向服务器既可在域 A 中，也可在域 B 中，也可既在域 A 中又在域 B 中。SIP协议 重定向服务器将用户 B 的联系信息反馈给 SIP协议 代理服务器，该服务器再将 SIP协议 会话邀请信息转发给域 B 中的 SIP协议 代理服务器。域 B 中的 SIP协议 代理服务器将用户 A 的邀请信息发送给用户 B。用户 B 再沿邀请信息经由的同一路径转发接受邀请的信息。

![2](http://user-image.logdown.io/user/18450/blog/17983/post/1182300/o4xAeac4TvWMhBKw0j6B_0918251.jpg)

SIP最强大之处就是用户定位功能。SIP本身含有向注册服务器注册的功能，也可以利用 其它定位服务器DNS、LDAP等提供的定位服务来增强其定位功能。

　#SIP共规定了六种信令
 INVITE、ACK、CANCEL、OPTIONS、BYE、REGISTER
INVITE和 ACK用于建立呼叫，完成三次握手，或者用于建立以后改变会话属性；
BYE用以结束会话；
OPTIONS 于查询服务器能力；
CANCEL用于取消已经发出但未最终结束的请求；
REGISTER用于客户出向注册服 务器注册用户位置等消息。

SIP协议支持三种呼叫方式：由用户代理服务机（UAC）向用户代理服务器（UAS）直接呼叫， 由UAC在重定向服务器的辅助下进行重定向呼叫和由代理服务器代表UAC向被叫发起呼叫。通过 SIP代理建立呼叫的例子

![3](http://user-image.logdown.io/user/18450/blog/17983/post/1182300/pp1vJo9pR8GrvWLUgYDc_05111514320696246.gif)

## 可通過以下過程建立兩個電話之間的SIP通話

![4](http://user-image.logdown.io/user/18450/blog/17983/post/1182300/eglK479QtSqsVTii3cTW_sip_call_session.jpg)

    撥打方電話發送邀請
    接收方電話返回一個通知應答100–正在嘗試
    接收方電話發出並送回應答180–正在撥打
    當撥打方拿起電話，接收方電話發出應答200–OK
    撥打方電話回以確認應答，以告知對方
    當通過RTP傳輸資料時，就可以通話了
    當撥打方挂上電話後，會向接收方電話發出一個再見呼叫
    撥打方電話會回以應答200–OK

就這麽簡單！SIP協定邏輯性強，容易理解。

## RFC 3261

SIP 是一個應用層的控制協議,可以用來建立、修改、和終止多媒體會話(或者會議)例如 Internet 電話。

用戶定位: 檢查終端使用者的位置,用於通訊。
用戶有效性:檢查用戶參與會話的意願程度。
用戶能力:檢查媒體和媒體的參數。
建立會話:”ringing”,建立會話參數在呼叫方和被叫方。
會話管理:包括發送和終止會話,修改會話參數,啟動服務等等。

SIP 不是一個垂直集成的通訊系統。SIP 可能叫做是一個部件更合適,它可以用作其他 IETF 協定的一個部分,用來構造完整的多媒體架構。

比如,這些架構將會包含即時資料傳輸協議(RTP)(RFC 1889)用來傳輸即時的資料並且提供QoS 回饋,
即時資料流通訊協定(RSTP)(RFC 2326)用於控制流媒體的的傳輸,
媒體閘道控制協議(MEGACO)(RFC 3015)用來控制到公共電話交換網(PSTN)的閘道,
還有工作階段描述通訊協定(SDP)(RFC 2327)用於描述多媒體會話。
因此,SIP 應該和其他的協議一起工作,才能提供完整的對終端使用者的服務。

SIP 並不提供會議控制服務(比如議席控制或者投票系統),並且並沒有建議會議應該怎樣管理。
可以通過在 SIP 上建立其他的會議控制協議來發起一個會議。

SIP 可以基於 IPV4 也可以基於 IPV6

![5](http://i.imgur.com/kTFEnM6.png)

Alice 通過 Bob 的 SIP 標誌 “呼叫” Bob,
這個 SIP 標誌是統一分配的資源(Uniform Resource Identifier URI)稱作 SIP URI。
SIP URI它很像一個 email 位址,典型的 SIP URI 包括一個用戶名和一個主機名
稱。在這個範例中,SIP URI 是 sip:bob@biloxi.com
biloxi.com 是 Bob 的SIP 服務提供者。
Alice 有一個 SIP URI: sip:alice@atlanta.com。
SIP 也提供保密 URI,稱作 SIPS URI。
例如:sips: <bob@biloxi.com>。一個基於 SIPS URI 的通話保證這個通話是安全的,並且對呼叫者和被叫的所有的
SIP 消息是加密傳輸的(叫做 TLS)。
在 TLS 中,請求是通過加密方式傳輸給被叫方,但是這個加密機制是基於被叫方宿主要伺服器的實現的。

INVITE sip:bob@biloxi.com SIP/2.0
Via: SIP/2.0/UDP pc33.atlanta.com;branch=z9hG4bK776asdhds
Max-Forwards: 70
To: Bob <sip:bob@biloxi.com>
From: Alice <sip:alice@atlanta.com>;tag=1928301774
Call-ID: <a84b4c76e66710@pc33.atlanta.com>
CSeq: 314159 INVITE
Contact: <sip:alice@pc33.atlanta.com>
Content-Type: application/sdp
13
Content-Length: 142
(Alice’s SDP not shown)

在文本消息的第一行,包含了請求的類型(INVITE)。在這行之後的是這個請求的頭域。這個例子中包含了最少需要的頭域集合。簡單介紹一下:

VIA 域包含了 Alice 接收發送請求的伺服器位址(pc33.atlanta.com)。同樣這個包含了一個分支參數來標誌 Alice 和這個伺服器的會話事務。

這個 TAG 參數是一個隨機字串(1928301774),是softphone在 URI 上增加的一個隨機串。用來做標誌用途的。
Call_ID包含一個全域的唯一標誌,用來唯一標誌這個呼叫,通過隨機字串和softphone的自己名字或者 IP 抵制混和產生的。

通過 TO TAG, FROM TAG 和CALL-ID 完整定義了 Alice 和 Bob 之間的端到端的 SIP 關係,並且表示這個是一個對話性質的關係。

CSEQ 或者 Command Sequence 包含了一個整數和一個請求名字。
這個 Cseq數位是順序遞增的。每當對話中發起一個新的請求都會引起這個數位的順序遞增。
Contact 域包含一個 SIP 或者 SIPS URI 用來表示訪問 Alice 的直接方式,通常由用戶名和一個主機的全名(Fully Qualified Domain Name FQDN)組成。
當FQDN 作為首選的時候,許多終端使用者由於不會由名字登記(而導致不能訪問Alice 的主機),所以 IP 位址是可選的。

Max-Forwards:最大轉發數量限制了通訊中轉發的數量。它是由一個整數組成,每轉發一次,整數減一。

Content-type 包含了訊息文字的描述(訊息文字在本範例中沒有列出)

Content-length:包含訊息文字的長度(位元組數)

由於 softphone 並不知道 bob 或者 bob 的 sip 伺服器 biloxi.com 在哪裡,
所以softphone 發送 INVITE 請求到 Alice 的 sip 伺服器,atlanta.com。

這個atlanta.com SIP 伺服器應該已經在 Alice 的 softphone 中配置了,或者可以通過 DHCP 獲得。
atlanta.com SIP 伺服器是一台代理伺服器。
代理伺服器接收SIP 請求並且根據請求轉發。
在這個例子中,代理伺服器接收到 INVITE 請求,並且回送一個 100(Trying)應答給 Alice 的 softphone。

100(Trying)應答表示 INVITE 請求已經收到,並且代理伺服器正在轉發 INVITE 請求。

SIP 的應答是通過一個三位元數的數字表示的。SIP 應答同樣包含 TO、FROM、Call-ID,CSEQ 和在 VIA 中的分支參數,這個參數使得 Alice 的 softphone 可以把請求和應答關聯起來。

atlanta.com 代理伺服器收到 INVITE 請求之後,就去找biloxi.com 可能通過 DNS 服務來找提供這個 biloxi.com 的 SIP 伺服器。最後,轉發 INVITE 請求到 biloxi.com 或者能到達 biloxi.com 的代理伺服器。

在轉發請求之前,atlanta.com 代理伺服器會在 via 頭上增加一個一段包含自己抵制的值
(INVITE 已經包含了 Alice 的的地址 VIA 域)

當 Alice 的 softphone 收到 180(Ringing)應答的時候,它提示 Alice,可能是通過一個回鈴音,或者螢幕上的一個消息提示。

在這個例子中,Bob 決定回應這個呼叫。當他拿起電話,他的 SIP 電話發送 200(OK)回應給發送者,表示這個電話已經接起來了。

這個 200(OK)包含了一個消息體,這個消息體包含 SDP 媒體描述,這個媒體描述包含 Bob 希望和 Alice建立何種媒體連接。

同樣,SDP 消息也是兩段交換:Alice 發送一個給 Bob,Bob發送一個回給 Alice。這個兩段的交換提供基本的相容性協商,並且基於簡單的SDP 提出/應答交換模型。

如果 Bob 不想響應這個呼叫或者正在響應別的呼叫,一個錯誤的響應會代替正常的 200(OK)回送出去,這樣,就不會有連接建立。

Bob 發出的 200(OK)(圖一的 F9 消息)可能長得像這樣的:
SIP/2.0 200 OK
Via: SIP/2.0/UDP server10.biloxi.com
;branch=z9hG4bKnashds8;received=192.0.2.3

Via: SIP/2.0/UDP bigbox3.site3.atlanta.com
;branch=z9hG4bK77ef4c2312983.1;received=192.0.2.2

Via: SIP/2.0/UDP pc33.atlanta.com
;branch=z9hG4bK776asdhds ;received=192.0.2.1

To: Bob <sip:bob@biloxi.com>;tag=a6c85cf
From: Alice <sip:alice@atlanta.com>;tag=1928301774
Call-ID: <a84b4c76e66710@pc33.atlanta.com>
CSeq: 314159 INVITE
Contact: <sip:bob@192.0.2.4>
Content-Type: application/sdp
Content-Length: 131
(Bob’s SDP not shown)

(有三個 VIA 域值-一個是 Alice SIP 電話增加的,一個是 atlanta.com 代理加
的,一個是 biloxi.com 代理加的)。

Bob 的 SIP 電話增加了一個 TAG 參數。這個 TAG 參數會被參與對話的各方所使用,並且在以後的對話中被使用。Contract
域包含了一個能直接聯繫到 Bob 的 URI。

Content-type 和 Content_Length域包含了消息體(沒有在例子中體現),這個消息體裡邊是 Bob 的 SDP 媒體資訊。

##

除了 DNS 和位置服務之外,代理伺服器可以自主決定路由,也就是說自己決定應
該向哪裡轉發請求。

比如,如果 Bob 的 SIP 電話返回一個 486(電話正忙)信號,biloxi.com 這個代理伺服器可以轉發這個 INVITE 請求到 Bob的語音郵箱伺服器。

一個代理伺服器可以同時向 N 個地方發送 INVITE 請求。這種併發尋找就是傳說中的分流(forking)。

在通話結束的時候,Bob 首先斷開(掛機 hangs up),並且發送一個 BYE 的消息。
這個 BYE 的消息將直接送到 Alice 的 softphone,同樣是跳過代理的。

Alice通過發送 200(OK)應答來確認收到了這個 BYE 消息,這個消息終止了會話並且應答了 BYE 的請求。
ACK 在這裡不需要發送-一個 ACK 信號只在響應一個INVITE 的響應的時候被發送。

## 登記服務

登記服務是另一個常用的 SIP 操作。

登記服務是 biloxi.com 代理伺服器知道 Bob當前位址的一個方法。

在初始化的時候,或者每隔一段時間,Bob 的 SIP 電話發送 REGISTER 消息給 biloxi.com 的一個註冊伺服器。

REGISTER 消息包含了
Bob 當前登陸伺服器的 SIP 或者
SIPS 的 URI(sip:bob@biloxi.com)(轉換成為 Contact 域中的 SIP 或者 SIPS URI)。

登記伺服器登記這個映射,這個叫做綁定(binding),
寫到一個資料庫裡邊,叫做定位服務(location service),這個資料庫可以被 biloxi.com 的代理伺服器使用。

通常登記伺服器和代理伺服器是做在一起的。

一個很重要的概念就是 SIP 伺服器的差別在邏輯上,並非在物理上的差別。

Bob 並沒有限定非得在一個單個設備上發起註冊。

比如,他家裡的 SIP 電話和公司的 SIP 電話都可以註冊。

這些消息在定位服務(location service)中保存,並且允許代理伺服器通過不同的手段查找 Bob。

同樣的,不同的用戶也可以在同一個設備上同時註冊。

定位服務(location service)是一個邏輯概念。

他是讓代理服務通過輸入一個URI 來查詢到底應該向哪裡轉發請求。

最後在 SIP 中需要注意的是,註冊服務只是用來提供路由收到的 SIP 請求的,它並不做請求的身份認證的判定。

![6](http://user-image.logdown.io/user/18450/blog/17983/post/1182300/6aikDwhxSHevRC3n2BGq_Nat.png)
