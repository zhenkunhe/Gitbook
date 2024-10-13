# Swift
[TOC]
## 1

```swift
FOR /L %G IN (1,1,9) DO ren "S23E? - .rmvb" "S23E0%G - .rmvb”

case 0 ... 59
choice = toupper(choice);
i+=2;
* = 值
＆＝ 址
-w
-1 = - 1 int byte

#include <stdlib.h>
malloc & free

char str[5];靜態大小
char string[] = "Hello”; 靜態大小

char* str; 動態大小
char* str = (char*) malloc(); 動態大小

string = “hello”; //大小宣告與否皆可,重點是值不可已指派
scantf(“%s”,string) ＆ gets(string); & strcpy(string,"你好嗎？"); //大小宣告需先宣告（若已指派 則覆蓋）

//gets & scanf 混用時fflush問題
```

中央政府 地方政府 經費給有實力來申請的軟實力的公司 抽40% 教授需要學生(人)跟名聲

教書 寫書 寫軟體 當技術顧問 騙政府錢 兼職 合夥

上班就是拼轉型 MIS 不可能把雲端牽回家做

NS是之前公司的名稱 代表著IOS的東西

全預成員 : m = menber m_firNum or _firNum

obj c 適合合作 嚴謹

已經有自動release @(Language)“ 字串的表示 與Ｃ做區隔用 + 靜態 - 非靜態

## 2

var weight = 65.1 //不一定需要宣告型態,但最好宣告

let name:String = “坤” //final

//println(“年紀”+String(age)+“歲,身高”+String(身高)+“公分,”+“體重”+String(體重)+“公斤”) //中文變數名稱有轉型之類的bug

let minIntU8:UInt8 = UInt8.min //byte

let maxIntU8:UInt8 = UInt8.max //byte

var dValue:Double = 100.999

var fValue:Float = Float(dValue) //必須強制轉型

var iValue:Int = Int(fValue)

var number:Int? //未定義內容的空間,直接印出會變成nil 效果等同宣告指標卻還沒分配空間

assert(boolFalse, “發生錯誤”) //斷程式專用,防惡意軟體 不常拿來debug

/*

var product = (“iPad wifi”,19999)

var (device,price) = product //集合與命名

var (device_2,_) = product //集合與命名

println(“(product.0)售價,(product.1)元”)

println(“(device)售價,(price)元”)

println(“(device_2)售價”)

- /

/*

var product_2 = (device:“iPad wifi”,price:19999,capacity:500)

println(“(product_2.0)售價,(product_2.1)元,(product_2.2)G”)

println(“(product_2.device)售價,(product_2.price)元,(product_2.capacity)G”)

- /

switch ID {

```swift
case 1:

case 2:

case 3 ... 10:        fallthrough     //穿越到下一個case繼續

case 11 ... 20:

default:

    break           //default必須存在且有功能,若無功能則加入break
```

}

var x:Int?

switch true{ //搭配bool值

```swift
case x>1 || x<0 :       //可以邏輯運算,可取代if else

    break;

default:

break
```

}

String.uppercaseString

for i in start … end

for (index,product) in enumerate(apple) { //陣列 列舉法

var htc:[String] = String //宣告空字串陣列

htc += [String](count:%203,%20repeatedValue:) //重複宣告陣列元素

var sony:Array = Array(count: 4, repeatedValue: “即將推出”) //Array集合 字串版 型 常用

sony[0 … 2 ] = [“z1”,“z2”,“z3”] //加入元素

var acer:NSArray = NSArray(objects: “a_1”,“a_2”,88) //槓Object C的Array,此宣告為final值,也就是內容不能替換

var mi:NSMutableArray = NSMutableArray() //槓Object C的另一種Array,此宣告可替換內容值 常用

mi.addObject(“紅米機”)

var apple:Dictionary<String,Int> = [“iPhone”:26000,“iPad”:18000]

apple[“iWatch”] = 16800

var people:Dictionary<String,[String]> = [ “賀振坤” : [“吳國隆”,“王大維”] , “王勇傑” : [“賀振坤”,“王大維”] ]

var temp:[String] = people[“賀振坤”]!

若有可能指向nil則要加入postfix !

for-in Range 1..<5

func classroom() -> (p_1:String , p_2:String ) {

```swift
return ("喔喔","恩恩")
```

}

println(classRoom().p_1)

回傳可以多重數值 且命名

As a character:

let c = Character(UnicodeScalar(65))

Or as a string:

let s = String(UnicodeScalar(65))

func countResult (number a:Int , toAdd b:Int , toSub c:Float ) -> Float {

```swift
return Float(a+b)-c
```

}

```swift
println("\(countResult(number:1,toAdd:3,toSub:2.2))")
```

傳入參數＋註解法

func discountResult (price p:Int , discount d:Float = 10 ) -> Float {

```swift
return Float(p) * (d / 10)
```

}

println(“(discountResult(price:100))”)

參數可以設預設值,有預測值的參數必須寫到最後面 （ 不多語系提供）

func avarageNum (nums:Float …) -> Float { // 未知數量參數

func connectContent(var s_1:String //使參數不為final而是var

func swap(inout num1:Int , inout num2:Int ) { //call by refrence

func toAdd( num1:Int , num2:Int ) -> Int{

```swift
return num1 + num2
```

}

func toSub( num1:Int , num2:Int ) -> Int{

```swift
return num1 - num2
```

}

func countAddAndSub( a:Int , b:Int , fun_add:(Int,Int) -> Int , fun_sub:(Int,Int) -> Int ) -> (Int,Int) {

```swift
return ( fun_add(a,b) , fun_sub(a,b) )
```

}

var a = 20 , b = 10

var result = countAddAndSub( a , b , toAdd , toSub)

println(result)

可以傳遞 未知函數 當作參數,

需宣告此未知函數的 參數 與 回傳

用於呼叫第三方函數 合作的時候使用

//var mathFuncAdd:(Int,Int)->Int = toAdd

//var mathFuncSub:(Int,Int)->Int = toSub

//可以將方法重新命名

func switchFunc( choice:Int ) -> (Int,Int) -> (Int) {

函數回傳值可以是另一個函數型態

closures 閉包

語法糖 ＆語法鹽

## 3

研發經費 政府 enum = 定義事件觸發的結果 switch列舉可以不用加default,但要全部列舉出來

enum Language { //同enum Language : Int 基本型態

```swift
case java

case swift
```

}

var tool:Language = Language.java

switch tool

case Language.java:

if let value = Language(rawValue: 7){

}

//宣告變數為列舉的某一「rawValue」時,而不是編譯器定義的「代稱」時,有找不到的可能,故此要用if判斷

強化版的enum 每一個值可以指向一段記憶體空間

enum Role{

```swift
case status(Float,Float,Float)

case name (String)
```

}

var roleStatus:Role = Role.status(1000, 599, 200)

switch role

case .status(var hp,var sp,var mp) :

//結構內容若3個int 不代表此結構為12bytes 還有結構內容特性要存

Swift的struct有能力將「屬性」與「屬性」之間建立關係 利用「get」&「set」

//get only的屬性沒有辦法set

```swift
var center:Point{                           //Swift的struct有能力將「屬性」與「屬性」之間建立關係  利用「get」&「set」

    get {

        let centerX = origin.X + (size.w/2)

        let centerY = origin.Y + (size.l/2)

        return Point(X:centerX  ,Y:centerY)

    }

    set(newCenter) {

        self.origin.X = newCenter.X - (size.w/2)

        self.origin.Y = newCenter.Y - (size.l/2)

    }
```

//若「屬性」與其他「屬性」沒有關聯,則有個多餘的方式,willSet＆didSet 幾乎沒用 且didSet中有特定的關鍵字:oldValue

結構 ＝結構 //call by value

結構的靜態成員用static關鍵字宣告 enum的靜態成員同樣用static關鍵字宣告

結構的靜態方法：static 物件＝物件 //call by refrence 物件的靜態屬性：為了安全起見,限定不行使用static直接呼叫來使用或修改 規定要設定get & set,指向此檔案內的private成員做為共同存取 物件的靜態方法：class

lazy var dataImp:DataImporter = DataImporter() //lazy:物件尚不用到時,不建立實體

## 4

swift沒有protected 屬性可以override 不過用不到 π = M_PI

swift裡面沒有package的概念,所謂的文件夾只是開發者看的,最後所有都會包成一大包

其他文件其實也只是main文件的延伸（也就是private & public & default 都是一樣的）

檔案名稱與內容class不一定要同名

亂數arc4

init ＝建構子

convenience ?

require = 子class必須重構

extension擴展一個型態內的函式or屬性

IOS開發android不要用eclipse 容易當機 用Android Studio

this. = self.

deinit{} 在宣告實體時 使用?宣告
釋放時使用 xxx = nil

## 5

class SomeClass: SomeSuperClass, FirstProtocol, AnotherProtocol { // 類別的內容

}//不能多重繼承,但是可以多重實作.若要繼承,父類別需要寫在冒號後的第一個

//參數第一個不需要形容意義(init 例外)

打class.之後沒有跳出提示,按兩下esc

協定本身不實作任何功能，但你可以將它當做型別來使用。 若是用在成員 該成員需要宣告初始化方式

gameLoop: while square != finalSquare {

break gameLoop

continue gameLoop

case let newSquare where newSquare > finalSquare:

if game is SnakesAndLadders {

option的「值」如果有需要存取則要加！

option的「址」如果需要存取則加入？

專案->all->搜索bri->在swift compiler那邊的objc橋頭文件-> 將含有#import “xxx.h” .的h檔 的路徑拉進去

好朋友都回來了 也可以引入C&C++

ObjC有private跟publick（@property）的區別

- (id)init{ //id 代表 回傳任意物件

```swift
return [super init];
```

}

//swift有自動呼叫super init

## 6

一個class,一個畫面(XML,class) storyboard/xib(容易因為更新跑掉比例) open GL

hide status bar 只有啟動瞬間可以影藏 icon = pix * 2 or pix * 3(高解析壓縮顯示用) 2x 29 =58 pix

launch image source => 點選,以後使用命名有規則: a.png a@2x.png 1@3x.png

plist ＝蘋果自創的xml 可以改$(PRODUCT_NAME)(專案名稱)

option在set值的時候,要打？ 在get值得時候,要打！

## 7

變數只能給初值或是 ! = 未來會給值 ? = optional

Info.plist是任何物件序列化後的樣子 以info為例,此plist也可還原成程式可取的object

iOS對 美國大通 or 外商銀行 不收電匯手續費 若是其他銀行,需要手續費且本人簽領 結算額150美

google對所有台灣銀行都支援,有一筆手續費 結算額100美 . //MARK: -Override UIViewController

```swift
//-----------------------------------
```

MARK：是Xcode的關鍵字

鍵盤不能實作,只有辦法透過「能跟鍵盤互動的元件」來互動

模擬器有時候鍵盤跳不出來,需要案一下hardware的keyboard最下面的選項(toggle)

newValue 是 set 區域下的關鍵字,可以讓set不需要引入參數

codebox

newValue 是 set 區域下的關鍵字,可以讓set不需要引入參數

codebox

政府資料開放平台 https://www.kickstarter.com/discover

台灣 one click 1.1~2.5

還有曝光量算法

ECP值: 曝光:點擊 比,如果越高錢越多

全屏廣告： (google 最早收購ADMOb廣告商,變得可以發送網頁＆手機)

亞馬遜:購買產品才分