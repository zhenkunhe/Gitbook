# iOS

tags: Swift,Language,iOS,Framework

[TOC]

<!--sec data-title="cocoapods" data-id="0" data-nopdf="true" data-collapse=false ces-->

- 它是將所有的依賴庫都放到一個名為Pods資料夾中，然後讓專案依賴Pods資料夾，如此，源碼管理工作都從專案移到了Pods資料夾中
- Pods資料夾最終會編譯成一個名為libPods.a的文件，專案只需要依賴這個.a檔即可
- 對於資源文件，CocoaPods提供了一個名為Pods-resources.sh的bash腳本，該腳本在每次專案編譯的時候都會執行，將第三方庫的各種資源文件複製到目標目錄中
- CocoaPods通過一個名為Pods.xcconfig檔來在編譯時設置所有的依賴和參數
- Setting up CocoaPods master repo
- 这并不是卡住，而是一直在安装，速度比较慢是正常的，等待就好，如果你想知道进度，那么进行如下操作

> 新建一个终端窗口
`cd ~/.cocoapods/`
再输入`du -sh *`
隔几分钟查看下下载量在增加就可以了。不要着急，整个文件大概要400M+貌似，急不来的。

`Download`

``` bash
# Xcode 7 + 8
$ sudo gem install cocoapods --pre

# Xcode 7
sudo gem install activesupport -v 4.2.6
sudo gem install cocoapods
```

`Podfile`

``` bash
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target 'listenPro' do
  # Comment the next line if you're not using Swift and don't want to use dynamic frameworks
  use_frameworks!

  # Pods for listenPro
  pod 'EliteFramework'
  pod 'Google/Analytics'
  pod 'FBSDKCoreKit'
  pod 'FBSDKLoginKit'
  pod 'FBSDKShareKit'
end
```

`Install`

```
pod install
```

<!--endsec-->

## Xcode 7

```bash
sudo gem install activesupport -v 4.2.6
sudo gem install cocoapods
```

<!--sec data-title="AppDelegate" data-id="1" data-nopdf="true" data-collapse=false ces-->

## App生命週期

``` swift
import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate  {    //最重要的兩個元件
    //UIApplicationDelegate 內部設定了appa生命週期觸發的函式

    var window: UIWindow?   //root視窗物件,不包含container

    //啟動瞬間觸發
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        return true
    }

    //即將終止活動 觸發
    func applicationWillResignActive(_ application: UIApplication) {
        print("applicationWillResignActive");
    }

    //進入後台完成 觸發
    func applicationDidEnterBackground(_ application: UIApplication) {
        print("applicationDid Enter Background");
    }

    //即將進入前端
    func applicationWillEnterForeground(_ application: UIApplication) {
        print("application Will Enter Foreground");
    }

    //app開始活動觸發
    func applicationDidBecomeActive(_ application: UIApplication) {
        print("application Did Become Active");
    }

    //app釋放的瞬間觸發
    func applicationWillTerminate(_ application: UIApplication) {
        print("application Will Terminate");
    }
}
```

### UIWindow

``` swift
 var window: UIWindow?
//啟動瞬間觸發
func application(_ application: UIApplication,didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

        // Initialize window
        window = UIWindow(frame: UIScreen.main.bounds)

        // Background color of window
        window?.backgroundColor = UIColor.white

        // Set root view controller
        window?.rootViewController = ViewController()

        // Show window
        window?.makeKeyAndVisible()

        return true
    }
```

<!--endsec-->

<!--sec data-title="UIView" data-id="2" data-nopdf="true" data-collapse=false ces-->

- `view.removeFromSuperview()`
- `view.backgroundColor = UIColor.green`
- `self.addSubview(view)`
- `view.frame.size = CGSize(width: 100, height: 100)  //設置size`
- `view.center = CGPoint(x: frame.size.width/2, y: frame.size.height/2)    //設置View的「中心點」`
- `self.insertSubview(viewD, aboveSubview: viewC)`
- `self.exchangeSubviewAtIndex(2, withSubviewAtIndex: 3)`
- `ballView.layer.masksToBounds = true //不去繪製超出遮罩外的範圍`
- `ballView.layer.cornerRadius = w/2`
- `UIView.beginAnimations("MoveGroupAni", context: nil)
        UIView.setAnimationDelay(0.1)
        //從這行到UIView.commitAnimations()之間的繪圖動作,會在0.1秒內逐漸完成,並命名這串動作為MoveGroupAni
        //若時間還沒到,卻引發了下一個Animations,則動作會立刻完成,以便銜接下一個Animations
        ballView.center = location
        UIView.commitAnimations()`
- `self.isUserInteractionEnabled = true  //攔截事件,不穿透`

### Basic Property

`MainView.swift`

``` swift
class MainView: UIView {
    //CGRect內放著((x,y),(w,h))也就是(原點,寬高)  值為CGFloat,與Float不同的地方只是一個有繪製輸出
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.backgroundColor = UIColor.brown//透明色UIColor.clearColor

        let w:CGFloat = 100
        let h:CGFloat = 100

        //left top
        var view:UIView = UIView(frame:CGRect(x: 0, y: 0, width: w, height: h) )
        view.backgroundColor = UIColor.red
        self.addSubview(view)

        //right top
        view = UIView(frame:CGRect(x: self.frame.size.width - w, y: 0, width: w, height: h) )
        view.backgroundColor = UIColor.blue
        self.addSubview(view)

        //left button
        view = UIView(frame:CGRect(x: 0, y: self.frame.size.height - h, width: w, height: h) )
        view.backgroundColor = UIColor.green
        self.addSubview(view)

        //right button
        view = UIView(frame:CGRect(x: self.frame.size.width - w, y: self.frame.size.height - h, width: w, height: h) )
        view.backgroundColor = UIColor.purple
        self.addSubview(view)

        //center
        view = UIView(frame:CGRect.zero)     //空的矩形
        view.frame.size = CGSize(width: 100, height: 100)  //設置size
        view.backgroundColor = UIColor.gray
        view.center = CGPoint(x: frame.size.width/2, y: frame.size.height/2)    //設置View的「中心點」
        self.addSubview(view)

        view.removeFromSuperview()//移除需要子物件自己離開

    }

    required init(coder aDecoder: NSCoder) {       //初始化失敗時呼叫
        fatalError("init(coder:) has not been implemented")
    }
}
```

`AppDelegate.swift`

``` swift
var mainView: MainView?
    //啟動瞬間觸發
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        // Initialize window
        window = UIWindow(frame: UIScreen.main.bounds)

        // Background color of window
        window?.backgroundColor = UIColor.white

        // Set root view controller
        window?.rootViewController = ViewController()

        mainView = MainView(frame: window!.frame)

        window?.addSubview(mainView!)
```

<img src="images/ios1.png" width="300">

### Subview Layer

``` swift
        self.backgroundColor = UIColor.brown//透明色UIColor.clearColor

        let viewH:CGFloat = 300

        //red View
        let viewA = UIView(frame: CGRect(x: 0, y: 0, width: self.frame.size.width, height: viewH))
        viewA.backgroundColor = UIColor.red

        self.addSubview(viewA)

        //blue View
        let viewB = UIView(frame: CGRect(x: 0, y: viewH/2, width: self.frame.size.width, height: viewH))
        viewB.backgroundColor = UIColor.blue
        self.addSubview(viewB)

        //black View
        let viewC = UIView(frame: CGRect(x: 0, y: viewH, width: self.frame.size.width, height: viewH))
        viewC.backgroundColor = UIColor.black
        self.insertSubview(viewC, aboveSubview: viewA)    //Subview

        //green View
        let viewD = UIView(frame: CGRect(x: 0, y: viewH, width: self.frame.size.width, height: viewH/2+100))
        viewD.backgroundColor = UIColor.green
        self.insertSubview(viewD, aboveSubview: viewC)    //Subview

        //self.exchangeSubviewAtIndex(2, withSubviewAtIndex: 3) //交換子view層級
```

<img src="images/ios2.png" width="300">

<!--endsec-->

<!--sec data-title="ViewController" data-id="3" data-nopdf="true" data-collapse=false ces-->

- 每個ViewController有一個view作為這次要控制的主view

<!--endsec-->

<!--sec data-title="Touch event" data-id="4" data-nopdf="true" data-collapse=false ces-->

- touchesBegan
- touchesMoved
- touchesEnded
- let t:UITouch = touch as! UITouch
  if(t.tapCount == 2)

`ViewController.swift`

``` swift
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?)
    {
        for subView in self.view.subviews
        {
            subView.touchesBegan(touches, with: event)
        }
    }
```

`MainView.swift`

``` swift
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        let touche:UITouch = touches.first! as UITouch

        //取出touch相對於某View的相對位置
        let location:CGPoint = touche.location(in: self)

        let view = UIView(frame: CGRect(x: location.x, y: location.y, width: 30, height: 30))
        view.backgroundColor = UIColor(red: CGFloat(arc4random()%256)/255, green: CGFloat(arc4random()%256)/255, blue: CGFloat(arc4random()%256)/255, alpha: CGFloat(arc4random()%100)/100)
        //RGB Alpha的value從0-255壓縮到0~1之間的浮點數
        self.addSubview(view)
        ary.append(view)
    }

    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
    }
```

<img src="images/ios3.png" width="300">

<!--endsec-->

<!--sec data-title="Draw" data-id="5" data-nopdf="true" data-collapse=false ces-->

``` swift
    override func draw(_ rect: CGRect) {
        let drawWidth:CGFloat = 10
        m_context = UIGraphicsGetCurrentContext()   //畫筆文本
        setDrawWidth(drawWidth)                     //CGContextSet...

        setContentColer(UIColor.red)         //CGCGContextSet...
        var ori:CGPoint = CGPoint(x: 0, y: 0)
        let tar:CGPoint = CGPoint(x: frame.size.width, y: frame.size.height)
        drawLine(ori, tar: tar)                     //CGContext Set..Move...Add...Path

        setContentColer(UIColor.blue)        //CGCGContextSet...
        let r:CGFloat = 50
        let center:CGPoint = CGPoint(x: frame.size.width - r - drawWidth, y: 0 + r + drawWidth)
        drawCircle(center, r: r ,isFill: false)     //CGContext Set..Move...Add...Path

        setContentColer(UIColor.green)        //CGCGContextSet...
        let size:CGSize = CGSize(width: 100, height: 100)
        ori = CGPoint(x: 0 , y: frame.size.height - size.height)
        drawTriangleRect(ori, rect: size, isFill: true)

        setContentColer(UIColor.yellow)        //CGCGContextSet...
        let p1:CGPoint = CGPoint(x: 0, y: frame.size.height/2 )
        let p2:CGPoint = CGPoint(x: frame.size.width, y: frame.size.height/2 )
        let p3:CGPoint = CGPoint(x: frame.size.width/2, y: frame.size.height/4 )
        drawQuadCurve(p1, to: p2, curve: p3)
    }

    func setContentColer(_ col:UIColor){
        //UIColor內含著CGColor,CGColor只是ＡＲＧＢ四個浮點數的集和
        let components = col.cgColor.components
        m_context.setFillColor(red: (components?[0])!, green: (components?[1])!, blue: (components?[2])!, alpha: (components?[3])!)
        m_context.setStrokeColor(red: (components?[0])!, green: (components?[1])!, blue: (components?[2])!, alpha: (components?[3])!)
    }

    func setDrawWidth(_ w:CGFloat){
        m_context.setLineWidth(w)             //設定畫筆寬度
    }

    func drawLine(_ ori:CGPoint,tar:CGPoint){
        m_context.setLineCap(CGLineCap.round) //設定線條樣式,kCG系列是樣式
        m_context.move(to: CGPoint(x: ori.x, y: ori.y))   //移動畫筆到某一點
        m_context.addLine(to: CGPoint(x: tar.x, y: tar.y))//畫一條線
        m_context.strokePath()                  //空心繪製路徑開始
    }

    func drawCircle(_ center:CGPoint,r:CGFloat,isFill:Bool){
        m_context.move(to: CGPoint(x: center.x - r, y: center.y - r))
        m_context.addEllipse(in: CGRect(x: center.x - r, y: center.y - r, width: r * 2, height: r * 2))
        isFill ? (m_context).fillPath() : m_context.strokePath()
    }

    func drawTriangleRect(_ ori:CGPoint, rect:CGSize,isFill:Bool){
        m_context.move(to: CGPoint(x: ori.x + (rect.width / 2), y: ori.y))    //移動畫筆到某一點
        m_context.addLine(to: CGPoint(x: ori.x, y: ori.y + rect.height))     //畫一條線
        m_context.addLine(to: CGPoint(x: ori.x + rect.width, y: ori.y + rect.height))    //畫一條線
        m_context.addLine(to: CGPoint(x: ori.x + (rect.width / 2), y: ori.y)) //畫一條線
        isFill ? (m_context).fillPath() : m_context.strokePath()
    }

    func drawQuadCurve(_ ori:CGPoint, to:CGPoint , curve:CGPoint){
        m_context.move(to: CGPoint(x: ori.x, y: ori.y))    //移動畫筆到某一點
        m_context.addQuadCurve(to: CGPoint(x: to.x, y: to.y), control: CGPoint(x: curve.x, y: curve.y))
        m_context.strokePath()
    }
```

<img src="images/ios4.png" width="300">

<!--endsec-->

<!--sec data-title="UINavigationController" data-id="6" data-nopdf="true" data-collapse=false ces-->

`AppDelegate.swift`

``` swift
    var window: UIWindow!
    var navaController:UINavigationController!
    var mainVC:ViewController!

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        window = UIWindow(frame: UIScreen.main.bounds)
        mainVC = ViewController()
        mainVC.refreshWithFrame(window.frame)

        navaController = UINavigationController()
        navaController.pushViewController(mainVC, animated: false)  //當被掛載時,mainVC裡面的navigationController會指向他

        window?.rootViewController = navaController
        window.makeKeyAndVisible()
        return true
    }
```

`ViewController.swift`

``` swift
    //window掛載navigationController後呈現時,才執行以下
    //此時的self.navigationController與self.navigationItem才可抓到
    override func viewDidLoad() {
        super.viewDidLoad()

        m_leftBtnItem = UIBarButtonItem(barButtonSystemItem: UIBarButtonSystemItem.compose , target: self, action: #selector(ViewController.onSelectLeftAction(_:)))
        self.navigationItem.leftBarButtonItem = m_leftBtnItem

        m_rightBtnItem = UIBarButtonItem(barButtonSystemItem: UIBarButtonSystemItem.done, target: self, action: #selector(ViewController.onSelectRightAction(_:)))
        self.navigationItem.rightBarButtonItem = m_rightBtnItem

        let titleView:UIImageView = UIImageView(frame: CGRect(x: 0, y: 0, width: 30, height: 30))
        titleView.image = UIImage(named: "icon")
        self.navigationItem.titleView =  titleView
    }

    //MARK: - CallBack & Lisetner
    //-------------------------------

    func onSelectRightAction(_ sender:UIBarButtonItem){
        if popRightVC == nil {
            popRightVC = Pop2ViewController()
        }
        else if m_isAlready {
            self.navigationController?.pushViewController(popRightVC!, animated: true)
        }
    }
```

<img src="images/ios5.png" width="300">
<img src="images/ios6.png" width="300">

<!--endsec-->

<!--sec data-title="UITabBarController ＆ 切頁動畫" data-id="7" data-nopdf="true" data-collapse=false ces-->

`TabBarViewController.swift`

``` swift
import UIKit

class TabBarViewController: UITabBarController,UITabBarControllerDelegate {

    override func viewDidLoad()
    {
        super.viewDidLoad()

        let controllers:[UIViewController] = [PageOneViewController(),PageTwoViewController(),PageThreeViewController()]

        self.viewControllers = controllers
        self.delegate = self

        //初始全部跑一遍回到原點,起始才會出現全部選項
        for i in (0 ..< self.viewControllers!.count).reversed()
        {
            self.selectedIndex = i % self.viewControllers!.count
        }
    }

    //切換tab過程的動畫
    func tabBarController(_ tabBarController: UITabBarController, shouldSelect viewController: UIViewController) -> Bool
    {
        let fromView: UIView = tabBarController.selectedViewController!.view
        let toView  : UIView = viewController.view

        if fromView == toView
        {
            return false
        }

        UIView.transition(from: fromView, to: toView, duration: 0.3, options: UIViewAnimationOptions.transitionCrossDissolve)
        {
            (finished:Bool) in
        }
        return true
    }
}
```

`PageOneViewController.swift`

``` swift
    override func viewDidLoad()
    {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor.red

        let tabBarItem:UITabBarItem = UITabBarItem(title: "第一頁", image: UIImage(named: "aa"), selectedImage: UIImage(named: "bb"))
        self.tabBarItem = tabBarItem
    }
    override func viewWillAppear(_ animated: Bool) {
        let tabBarItem:UITabBarItem = UITabBarItem(title: "第一頁", image: UIImage(named: "aa"), selectedImage: UIImage(named: "bb"))
        self.tabBarItem = tabBarItem
    }
```

<img src="images/ios7.png" width="300">
<img src="images/ios8.png" width="300">

<!--endsec-->

<!--sec data-title="動畫" data-id="8" data-nopdf="true" data-collapse=false ces-->

- 寫在`tableView willDisplayCell`或是`tabBarController shouldSelect viewController`之中

``` swift
      var rotation:CATransform3D;
        rotation = CATransform3DMakeRotation(  CGFloat(90*M_PI/180) , 0.0, 0.7, 0.4);
        rotation.m34 = 1.0 / (-600);

        //2. Define the initial state (Before the animation)
        toView.layer.shadowColor = UIColor.black.cgColor
        toView.layer.shadowOffset = CGSize(width: 10, height: 10)
        toView.alpha = 0;

        toView.layer.transform = rotation;
        toView.layer.anchorPoint = CGPoint(x: 0, y: 0.5)

        //3. Define the final state (After the animation) and commit the animation
        UIView.beginAnimations("rotation", context: nil)
        UIView.setAnimationDuration(0.8)
        toView.layer.transform = CATransform3DIdentity;
        toView.alpha = 1;
        toView.layer.shadowOffset = CGSize(width: 0, height: 0)
        UIView.commitAnimations()
```

![Animation](images/ios9.png)

<!--endsec-->