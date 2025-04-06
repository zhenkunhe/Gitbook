# Basic

tags: Swift,Language

[TOC]

<!--sec data-title="變數" data-id="1" data-nopdf="true" data-collapse=false ces-->

## 一般變數

``` swift
var age:Int = 18
var height:Float = 173.5
var weight = 65.1       //不一定需要宣告型態,但最好宣告
let name:String = "坤"  //final

var boolTrue:Bool = true
var boolFalse:Bool = false

print("年紀\(age)歲,身高\(height)公分,"+"體重\(weight)公斤")
print("boolTrue＝\(boolTrue),boolFalse=\(boolFalse)")
```

`年紀20歲,身高160.0公分,體重50.0公斤`
`boolTrue＝true,boolFalse=false`

## Byte

``` swift
let minIntU8:UInt8 = UInt8.min  //byte
let maxIntU8:UInt8 = UInt8.max  //byte

print("最小值＝\(minIntU8)歲,最大值=\(maxIntU8)")
```

`最小值＝0歲,最大值=255`

## 強制轉型

``` swift
var dValue:Double = 100.999
var fValue:Float = Float(dValue)    //必須強制轉型
var iValue:Int = Int(fValue)

print("Double＝\(dValue),Float=\(fValue),Int=\(iValue)")
```

`Double＝100.999,Float=100.999,Int=100`

## 空變數

``` swift
var number:Int?
//未定義內容的空間,直接印出會變成nil
//效果等同宣告指標卻還沒分配空間
number = 100
print("number＝\(number)")
```

`number＝Optional(100)`

## assert

``` swift
assert(boolFalse, "發生錯誤")   
//斷程式專用,防惡意軟體 不常拿來debug
```

<!--endsec-->

<!--sec data-title="集合" data-id="2" data-nopdf="true" data-collapse=false ces-->

## 同型態集合-[]

``` swift

var apple:[String] = ["iPad","iPhone"]
let newProduct:[String] = ["ipod","Mac"]
print("Apple目前產品有\(apple[0])與\(apple[1])")

apple += newProduct
apple.append("iWatch")
apple += ["Mac Book Pro"]
apple.insert( "magic mouse",  at: 2 )  //特定格式

let r_1 = apple.remove(at: 2)
let r_2 = apple.removeLast()

for (index,product) in apple.enumerated() {
//陣列 列舉法
    print("目前第\(index)項產品是\(product)")
}

apple.removeAll(keepingCapacity: true)

if apple.isEmpty {
    print("clean")
}

var htc:[String] = [String]()
htc.append("one")
htc += [String](repeating: "尚未推出", count: 3)

for (index,product) in htc.enumerated() {
    print("目前第\(index)項產品是\(product)")
}
```

`Apple目前產品有iPad與iPhone
目前第0項產品是iPad
目前第1項產品是iPhone
目前第2項產品是ipod
目前第3項產品是Mac
目前第4項產品是iWatch
clean
目前第0項產品是one
目前第1項產品是尚未推出
目前第2項產品是尚未推出
目前第3項產品是尚未推出`

## 異型態集合-()

``` swift
var product = ("iPad wifi",19999)
var (device,price) = product    //集合與命名
var (device_2,_) = product    //集合與命名

print("\(product.0)售價,\(product.1)元")
print("\(device)售價,\(price)元")
print("\(device_2)售價")

var product_2 = (device:"iPad wifi",price:19999,capacity:500)

print("\(product_2.0)售價,\(product_2.1)元,\(product_2.2)G")
print("\(product_2.device)售價,\(product_2.price)元,\(product_2.capacity)G")
```

`iPad wifi售價,19999元
iPad wifi售價,19999元
iPad wifi售價
iPad wifi售價,19999元,500G
iPad wifi售價,19999元,500G`

## Array

``` swift
var sony:Array<String> = Array<String>(repeating: "即將推出", count: 4)
//Array集合 字串版型
sony[0 ... 2 ] = ["z1","z2","z3"]
//加入元素
for (index,product) in sony.enumerated() {
    print("目前第\(index)項產品是\(product)")
}
```

`目前第0項產品是z1
目前第1項產品是z2
目前第2項產品是z3
目前第3項產品是即將推出`

## NSArray

``` swift
var acer:NSArray = NSArray(objects: "a_1","a_2",88)
//槓Object C的Array,此宣告為final值,也就是內容不能替換
for (index,product) in acer.enumerated() {
    print("目前第\(index)項產品是\(product)")
}
```

`目前第0項產品是a_1
目前第1項產品是a_2
目前第2項產品是88`

## NSMutableArray

``` swift
var mi:NSMutableArray = NSMutableArray()
mi.add("紅米機")
print("\(mi.object(at: 0))")


var ary = [[4,7,6,9],[1,2,3],[4,5,6,7,8]]

for i:Int in 0  ..< ary.count {
    for j:Int in 0  ..< ary[i].count {
        print("\(ary[i][j])\t" , terminator: "")
    }
    print()
}

for elements in ary {
    for element in elements {
        print("\(element)\t", terminator: "")
    }
    print("")
}
```

`紅米機
4   7   6 9
1   2   3
4   5 6 7 8
4   7 6 9
1   2 3
4   5 6 7 8`

## Dictionary

``` swift
var apple:Dictionary<String,Int> = ["iPhone":26000,"iPad":18000]
apple["iWatch"] = 16800

for element in apple.keys{
    print("商品\(element) = \(apple[element])")
}

var max:Int = 0
for element in apple.values{
    if max < element {
        max = element
    }
}

print("最貴為\(max)元")


var people:Dictionary<String,[String]> = [ "賀振坤" : ["吳國隆","王大維"] , "王勇傑" : ["賀振坤","王大維"] ]

var temp:[String] = people["賀振坤"]!
people["賀振坤"] = people["王勇傑"]
people["王勇傑"] = temp

for (person,friends) in people{
    print("我的名字叫做\(person)")
    for friend in friends {
        print("我的朋友有\(friend)\t", terminator: "")
    }
    print("")
}
```

`商品iPad = Optional(18000)
商品iWatch = Optional(16800)
商品iPhone = Optional(26000)
最貴為26000元
我的名字叫做賀振坤
我的朋友有賀振坤 我的朋友有王大維
我的名字叫做王勇傑
我的朋友有吳國隆 我的朋友有王大維`

<!--endsec-->

<!--sec data-title="迴圈 & 邏輯判斷" data-id="3" data-nopdf="true" data-collapse=false ces-->

## For each

``` swift
var sum:Int = 0

for i in (0 ..< 1000) {
    if (i % 9 == 0 && i % 32 == 0) {
        sum+=1
    }
}
print("\(sum)")

sum = 0

for i in (0..<1000) where (i % 9 == 0 && i % 32 == 0) {
    sum+=1
}
print("\(sum)")
```

`4`
`4`

## Switch

``` swift
var ID:Int = 3
switch ID {
    case 1:
        print("1")    //case 若進入不需要加入break
    case 2:
        print("2")
    case 3 ... 10:
        print("3~10")
        fallthrough     //穿越到下一個case繼續
    case 11 ... 20:
        print("11~20")
    default:
        break           //default必須存在且有功能,若無功能則加入break
}

var say:String = "食べます"
var chinese:String?

switch say
{
    case "Eat","食べます":
        chinese = "吃飯"
    case "Hello","こんにちは":
        chinese = "問安"
    default:
        break
}

if chinese == nil
{
    print("?")
}
else
{
    print("\(chinese)")
}
```

`3~10
11~20
Optional("吃飯")`

<!--endsec-->

<!--sec data-title="Function" data-id="4" data-nopdf="true" data-collapse=false ces-->

## Function & Function variable

``` swift
func toAdd( _ num1:Int , num2:Int ) -> Int{
    return num1 + num2
}

func toSub( _ num1:Int , num2:Int ) -> Int{
    return num1 - num2
}

func countAddAndSub( _ a:Int , b:Int , fun_add:(Int,Int) -> Int , fun_sub:(Int,Int) -> Int ) -> (Int,Int) {
    return ( fun_add(a,b) , fun_sub(a,b) )
}

var a = 20 , b = 10
//var mathFuncAdd:(Int,Int)->Int = toAdd
//var mathFuncSub:(Int,Int)->Int = toSub
var result = countAddAndSub( a , b:b , fun_add:toAdd , fun_sub:toSub)
//result = countAddAndSub( a , b , mathFuncAdd , mathFuncSub)
print("add = \(result.0),sub = \(result.1)")
```

`add = 30,sub = 10`

## Function local variable scope

``` swift
func getNewP (_ money:Int) -> () -> Int{
    var salary:Int = 0
    func workADay() -> Int {
        salary += money
        return salary
    }
    return workADay
}

let emp_1 = getNewP(700), emp_2 = getNewP(800) , emp_3 = getNewP(900)
//由於emp_1為workADay()的實體,而workADay()實體緊抓著屬於自己的salary,故不得釋放salary的memory

for i in 1 ... 2 {
    print("第\(i)天員工1的薪水 ＝ \(emp_1()) 元")
    print("第\(i)天員工2的薪水 ＝ \(emp_2()) 元")
    print("第\(i)天員工3的薪水 ＝ \(emp_3()) 元")
}
```

`第1天員工1的薪水 ＝ 700 元
第1天員工2的薪水 ＝ 800 元
第1天員工3的薪水 ＝ 900 元
第2天員工1的薪水 ＝ 1400 元
第2天員工2的薪水 ＝ 1600 元
第2天員工3的薪水 ＝ 1800 元`

## Named Function & Closure

``` swift
func a() -> Void {
    print("這是Ａ函式")
}

func b() -> Void {
    print("這是B函式")
}

func countDown ( _ start:Int , timesupClosure:() -> Void ) -> Void{
    for i in (0 ... start).reversed()
    {
        if( i > 0)
        {
            print("倒數\(i)秒")
        }
        else
        {
            timesupClosure()
        }
    }
}

countDown(10, timesupClosure:a)
countDown(10, timesupClosure:b)
countDown(10, timesupClosure:{
        print("這是Ｃ函式")
        //臨時函數如果沒有參數,沒有回傳,不需要多餘的in
    }
)
```

`倒數3秒
倒數2秒
倒數1秒
這是Ａ函式
倒數3秒
倒數2秒
倒數1秒
這是B函式
倒數3秒
倒數2秒
倒數1秒
這是Ｃ函式
`

## Lambda & Closure

``` swift
func babyName (_ secName:String ,firNameFunc:(String) -> String) -> Void
{
    print("寶寶的名字叫\(firNameFunc(secName))")
}

//「臨時函式」的宣告規矩 一切宣告完以後要加「in」 爾後的區塊才是「函式本體」
babyName("賀",firNameFunc:
    {(secName : String) -> String in
        return secName + "振坤"
    }
)

//「臨時函式」若當「參數」,可寫在「呼叫此臨時函式」的「後方」
babyName("賀")
{(secName : String) -> String in
    return secName + "振坤"
}

//「臨時函式」若當「參數」,此「臨時函式」可「使用呼叫者的參數」
babyName("賀"){return $0 + "振坤"}

//「臨時函式」若當「參數」,則可直接將return的結果打入{}內,當作呼叫者的參數
// 若此寫法的「臨時函式」回傳不帶參數,會認為此「臨時函式」是不需要輸入參數的函式
babyName("賀"){$0 + "振坤"}
```

`寶寶的名字叫賀振坤
寶寶的名字叫賀振坤
寶寶的名字叫賀振坤
寶寶的名字叫賀振坤`

<!--endsec-->

<!--sec data-title="Objective-C Bridging Header" data-id="5" data-nopdf="true" data-collapse=false ces-->

- `Project` -> `Build Settings` -> `Objective-C Bridging Header`

![Alt text](images//basic1.png)
![Alt text](images/basic2.png)

`Swift_4-Bridging-Header.h`

``` cpp
void getImput(int *output);
```

`file.c`

``` cpp
#include <stdio.h>
#include <stdlib.h>

void getImput(int *output){
    scanf("%i",output);
}
```

`main.swift`

``` swift
var num:CInt = 0;
print("請輸入任意整數")
getImput(&num);

if Int(num) % 2 == 1 {
    print("奇數")
}
else {
    print("偶數")
}
```

`請輸入任意整數
2
偶數`

<!--endsec-->

<!--sec data-title="Enum" data-id="6" data-nopdf="true" data-collapse=false ces-->

``` swift
enum Language {
    case java
    case swift
    case objC
    case actionScript
    case other
}

var tool:Language = .java
switch tool {
case .java:
    print("此為Java")
case .swift:
    print("此為Swift")
case .objC:
    print("此為objC")
case .actionScript:
    print("此為ActionScript")
default:
    print("此語言為其他語言")
}

enum Role{
    case status(Float,Float,Float)
    case name (String)
}

var roleStatus:Role = Role.status(1000, 599, 200)
var roleName:Role = Role.name("zhenkun")
var role = roleStatus

switch role {
case .status(var hp,var sp,var mp) :
    hp -= 200
    print("Hp:\(hp) Sp:\(sp) Mp:\(mp)")
case let .name(username):
    print("\(username)")
}

enum Classroom : Int {
    case mary = 3 ,  ada , fred = 6 , eva , cathy , diana
}

if let value = Classroom(rawValue: 7){
    print("\(value)")
    print("\(value.rawValue)")
}
```

`此為Java
Hp:800.0 Sp:599.0 Mp:200.0
eva
7`

<!--endsec-->

<!--sec data-title="struct" data-id="7" data-nopdf="true" data-collapse=false ces-->

``` swift
struct Ball {
    var x:Int = 0
    var y:Int = 0
    var z:Int = 0
    var name:String = ""
}

var b1:Ball = Ball()
var b2:Ball = Ball(x: 1, y: 2, z: 3, name: "blueBall")

b1 = b2
b1.x = 100

print("\(b2.x)")

struct Point {
    var X:Float = 0.0
    var Y:Float = 0.0
}

struct Size {
    var w:Float = 0.0
    var l:Float = 0.0
}

struct Rect {
    var origin:Point = Point()
    var size:Size = Size()
    var center:Point{                           //Swift的struct有能力將「屬性」與「屬性」之間建立關係  利用「get」&「set」
        get {
            let centerX = origin.X + (size.w/2)
            let centerY = origin.Y + (size.l/2)
            return Point(X:centerX  ,Y:centerY)
        }
        set (newCenter) {
            self.origin.X = newCenter.X - (size.w/2)
            self.origin.Y = newCenter.Y - (size.l/2)
        }
    }
    var area:Float{         //只有get沒有set
        return size.w * size.l
    }
}

var rect:Rect = Rect(origin: Point(X: 20, Y: 30), size: Size(w: 50, l: 50))         //測試get

rect.center = Point(X: 60, Y: 60)       //測試set
rect.center.X = 70                      //set進階版 此行等於rect.center = Point(X: 70, Y: 不變)
//rect.area = 0.0                       //get only的屬性沒有辦法set

print("原點：(\(rect.origin.X),\(rect.origin.Y))\n範圍：(\(rect.size.w),\(rect.size.l))\n中心：(\(rect.center.X),\(rect.center.Y))\n面積：\(rect.area)")



struct ScoreRecord{
    var scroe:Int = 2{          //若「屬性」與其他「屬性」沒有關聯,則有個多餘的方式,willSet＆didSet 幾乎沒用   且didSet中有特定的關鍵字:oldValue
        willSet(newScore){
            print("傳入新分數\(newScore)")
        }
        didSet {
            print(scroe >= oldValue ? "進步了\(scroe - oldValue)分" : "退步了\(oldValue - scroe)分")   //didSet屬性設定中的特定關鍵字:oldValue
        }
    }
}

var score:ScoreRecord = ScoreRecord()

score.scroe = 10

struct RoleStruct {
    var name:String?
    init(){
        name = "坤"
        print("初始")
    }
}

var roleA:RoleStruct = RoleStruct()
print("\(roleA.name)")
```

`1
原點：(45.0,35.0)
範圍：(50.0,50.0)
中心：(70.0,60.0)
面積：2500.0
傳入新分數10
進步了8分
初始
Optional("坤")`

<!--endsec-->

<!--sec data-title="Class" data-id="8" data-nopdf="true" data-collapse=false ces-->

## 建構&解構&Lazy

``` swift
struct Position {
    var X:Float = 0.0
    var Y:Float = 0.0
    var Z:Float = 0.0
}

class Cube {
    var m_pos:Position = Position()
    var m_l:Float
    var m_w:Float
    var m_h:Float

    init (p:Position , l:Float , w:Float , h:Float){
        m_pos = p
        m_l = l
        m_w = w
        m_h = h
    }
}

var cubeA:Cube = Cube(p: Position(), l: 200.0 , w: 300.0 , h: 1000.0)
//var cubeB:Cube = Cube()   //error 建構子被覆蓋

print("體積：\(cubeA.m_l * cubeA.m_w * cubeA.m_h)")


class DataImporter{
    var path:String = "path.txt"
}

class DataManager{
    lazy var dataImp:DataImporter = DataImporter()      //lazy:物件尚不用到時,不建立實體
    var data:[String] = [String]()
}

let dataManager:DataManager = DataManager()
dataManager.data.append("Data_1")
dataManager.data.append("Data_2")

print("將資料存到\(dataManager.dataImp.path)裡面")


class Role{
    var _name:String?
    var _hp:Int?
    var _mp:Int?
    init(){
        _name = ""
        _hp = 0
        _mp = 0
    }

    init(name:String){
        _name = name
        _hp = 0
        _mp = 0
    }

    init(name:String,hp:Int,mp:Int){
        _name = name
        _hp = hp
        _mp = mp
    }

    deinit{
        print("釋放")
    }
}

var role:Role? = Role(name: "zhenkun", hp: 1, mp: 1)
role = nil
```

`體積：6e+07
將資料存到path.txt裡面
釋放`

## Private & Static

``` swift
private var acount:Int = 0

struct Classroom{
    static var count:Int = 0
}

class Student {
    var _name:String?
    //物件的靜態屬性：為了安全起見,限定不行使用static直接呼叫來使用或修改 規定要設定get & set,指向此檔案內的private成員做為共同存取
    class var number:Int{
        get{
        return acount
        }
        set (newValue){
            acount = newValue
        }
    }
    init(name:String){
        _name = name
        print("\(_name)走進教室")
        Student.number += 1            //原始寫法,但也沒有特別屬於此物件所有
        Classroom.count += 1           //較好的寫法,將所有靜態屬性放入struct   並在使用的時候呼叫就好
    }
    deinit{
        print("\(_name)離開教室")
        Student.number -= 1
        Classroom.count -= 1
    }
}


var s1:Student? = Student(name: "Zhenkun")
var s2:Student? = Student(name: "Alex")

print("教室\(Classroom.count)人")
print("教室\(Student.number)人")

s1 = nil
s2 = nil

print("教室\(Classroom.count)人")
print("教室\(Student.number)人")
```

`Optional("Zhenkun")走進教室
Optional("Alex")走進教室
教室2人
教室2人
Optional("Zhenkun")離開教室
Optional("Alex")離開教室
教室0人
教室0人`

## 繼承

``` swift
class BaseObject {
    var l:Float = 0 , w:Float = 0
    func getSize (_: Void) ->Float{
        return l * w
    }
}

class Rect:BaseObject {
}

class Circle:BaseObject {
    var r:Float = 0.0
    override func getSize (_: Void) ->Float{
        return Float (pow( Double(r) , 2.0 ) * M_PI)
    }
}

class Cube:BaseObject {
    var h:Float = 0.0
    override func getSize (_: Void) ->Float{
        return super.getSize() * h
    }
}

var rect:Rect = Rect()
var circle:Circle = Circle()
var cube:Cube = Cube()

rect.l = 10
rect.w = 20
print("\(rect.getSize())")

circle.r = 10
print("\(circle.getSize())")

cube.l = 10
cube.w = 20
cube.h = 30
print("\(cube.getSize())")
```

`200.0
314.159
6000.0`

<!--endsec-->

<!--sec data-title="Protocol" data-id="9" data-nopdf="true" data-collapse=false ces-->

## 實作

``` swift
protocol Rect {
    func getPerimeter(_ w:Int ,l:Int) -> Int
    func getArea(_ w:Int , l:Int) -> Int
}

protocol Circle {
    func getPerimeter(_ r:Float) -> Float
    func getArea(_ r:Float) -> Float
}

class Object: Rect,Circle{     //不能多重繼承,但是可以多重實作.若要繼承,父類別需要寫在冒號後的第一個

    func getPerimeter(_ w:Int ,l:Int) -> Int {
        return (l + w) * 2
    }
    func getArea(_ w:Int ,l:Int) -> Int {
        return l * w
    }
    func getPerimeter(_ r:Float) -> Float {
        return r * r * Float(M_PI)
    }
    func getArea(_ r:Float) -> Float {
        return 2 * r * Float(M_PI)
    }
}

var obj:Object = Object()

print("圓面積：\(obj.getArea(3)),圓周長：\(obj.getPerimeter(3))")
print("Rect面積：\(obj.getArea(3, l: 4)),Rect周長：\(obj.getPerimeter(3,l: 4))")
//參數第一個不需要形容意義(init 例外)
```

`圓面積：18.8496,圓周長：28.2743
Rect面積：12,Rect周長：14`

## Delegate

`BankDelegate.swift`

``` swift
protocol BankDelegate {
    func showBroken() -> Void
    func showBalance(_ money:Int) -> Void
}
```

`Bank.swift`

``` swift
class Bank {
    var _money:Int = 0
    let _bankD:BankDelegate?
    init (money:Int , bankD:BankDelegate){
        _bankD = bankD
        _money = money
    }

    func withDrawal(_ value:Int) -> Void{
        if _money >= value {
            _money -= value
            _bankD!.showBalance(_money)
        }
        else {
            _bankD!.showBroken()
        }
    }
    func deposit(_ value:Int) -> Void{
        _money += value
        _bankD!.showBalance(_money)
    }
}
```

`main.swift`

``` swift
class Main:BankDelegate {
    init(_: Void){
        let bank:Bank = Bank(money: 1000, bankD: self)
        bank.withDrawal(300)
        bank.deposit(200)
        bank.withDrawal(1000)
    }
    func showBroken() -> Void{
        print("你已經破產了")
    }
    func showBalance(_ money:Int) -> Void{
        print("你還剩下\(money)元")
    }
}

var main:Main = Main()
```

`你還剩下700元
你還剩下900元
你已經破產了`
