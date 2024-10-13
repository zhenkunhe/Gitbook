# OpenGL
[TOC]
## 3D圖形原理

- 主要是透過這幾項產生3D視覺
    - 深度
    - 光影
    - 透視
- 圖像基本單元
    - Point
    - Line
    - Triangle

## OpenGL

- OpenGL本身並`不是一個API`
    - 是一個由Khronos組織製定並維護的`規範(Specification)`
    - 定義了一套可以供上層應用程序進行調用的API
    - 內部具體每個函數是如何Implement，將由OpenGL library的開發者自行決定
- 它抽象了GPU的功能，使應用開發者不必關心底層的GPU類型和具體實現
- OpenGL library的開發者通常是`顯卡vendor`
    - 顯卡所支持的OpenGL版本都為這個系列的顯卡專門開發的
    - Apple系統的OpenGL庫是由Apple自身維護
    - 在Linux下，有顯卡vendor提供的OpenGL庫
    - 這也意味著任何時候OpenGL library`表現行為與規範規定不一致`時，基本都是library的開發者留下的bug
        
        > 由於OpenGL的大多數實現都是由顯卡廠商編寫的，當產生一個bug時通常可以通過升級顯卡驅動來解決
        > 

### 模式

- 早期的OpenGL使用`立即渲染模式（Immediate mode）`
    - 也就是`固定渲染管線`
    - 這個模式下繪製圖形很`方便`
        - OpenGL的大多數功能都被庫隱藏起來
        - 開發者很少能控制OpenGL如何進行計算的自由
- OpenGL`3.2`開始，規範文檔開始廢棄`立即渲染模式`，出`核心模式(Core-profile)`
    - 當使用OpenGL的核心模式時，OpenGL迫使我們使用`現代函數`
    - 當我們試圖使用一個已廢棄的函數時，OpenGL會拋出一個錯誤並終止繪圖
    - 現代函數的優勢是`更高的靈活性`和`效率`，然而也`更難於學習`

### 版本

- 更高版本的OpenGL 4.5 都出來了，為什麼我們還要學習OpenGL 3.3？
    - 所有OpenGL的更高的版本都是在3.3的基礎上，引入了額外的功能，並`沒有改動核心架構`
    - 新版本只是引入了一些更有效率或更有用的方式去`完成同樣的功能`
    - 當你的經驗足夠，你可以輕鬆使用來自更高版本OpenGL的新特性

> 當使用新版本的OpenGL特性時，只有新一代的顯卡能夠支持你的應用程序這也是為什麼大多數開發者基於較低版本的OpenGL編寫程序，並只提供選項啟用新版本的特性
> 

### State Machine

- OpenGL本身是一個巨大的`State Machine`
- OpenGL的State會儲存在`Context`中
    - 透過`狀態設置函數(State-changing Function)`來改變`Context`

### Object

- OpenGL是用`C`寫的，同時也支持多種語言的派生，但其核心仍是一個C library
- 由於C的一些語言結構不易被翻譯到其它的高級語言，因此OpenGL開發的時候引入了一些抽象層
    - `Object`就是其中一個
    - 可以把`Object`就是看做一個C的`Struct`
        
        ```c
        struct object_name {
            GLfloat  option1;
            GLuint   option2;
            GLchar[] name;
        };
        ```
        
- 使用OpenGL時，建議使用OpenGL定義的`基元類型`
    - 比如使用float時我們加上前綴GL（因此寫作GLfloat）
    - int、uint、char、bool等等也類似
    - OpenGL定義的這些GL基元類型的內存佈局是`與平台無關的`

## [GLFW](https://www.glfw.org/download.html)
![Untitled.png](Untitled.png)
- 提供了一些渲染物體所需的最低限度的接口
- 創建OpenGL context
- windows管理
- 處理用戶輸入
- 函數名稱：`glfw`

## EGL

- 同`GLFW`
- 由於每一種系統的視窗系統都不同
    - EGL 作為跨平台的接口, 自然要處理這個轉換
- `OpenGL ES`並沒有提到API如何窗口系統連接
- 於是透過EGL將`視窗系統`與`OpenGL ES`接合
    - window：OpenGL ES + EGL + Windows系統窗口
    - Linux：OpenGL ES + EGL + X11
    - ARM：OpenGL ES + EGL + wayland
    - iOS不支援EGL，但支援OpenGL ES
- 確保`OpenGL ES`的平台獨立性
- EGL也是一套API
    - 它的實現也需要系統廠商來提供

### library

- **`OpenGL ES library`**
    ```c
    #include <GLES/gl.h>
    ```
    
    - 是OpenGL ES中定義的API的具體實現
        - 由於每個GPU結構不同，從而導致各個vendor的`OpenGL ES library`也各不相同
        - 通常由GPU vendor提供
    - HW Device Path - `/vendor/lib/egl` | `/system/lib/egl`
        - `libGLES.so` | `libGLES_*.so`
            
            > 3合1大補帖
            > 
        - `libGLESv1_CM.so` | `libGLESv1_CM_*.so`
        - `libGLESv2.so` | `libGLESv2_*.so`
    - SW Device Path - `/vendor/lib/egl`
        - `libGLES_android.so`
        - `libGLES_emulation.so`
        - `libGLES_swiftshader.so`
        - Android Emulator

- **`OpenGL ES Wrapper library`**
    - 對OpenGL ES API進行封裝的一個library
        - 向上為應用程序提供了標準的OpenGL ES API
        - 向下和不同vendor實現的`OpenGL ES library`進行綁定
        - 將OpenGL ES API和對應的實現函數綁定在一起
    - Device Path - `/system/lib/`
        - `libGLESv1_CM.so`：OpenGL ES 1.x API 的Wrapper
        - `libGLESv2.so`：OpenGL ES 2.0 的Wrapper
        - `~~libGLESv3.so`：OpenGL ES 3.0 的Wrapper~~
            - 因為OpenGL ES 3.0 API是兼容OpenGL ES 2.0 API
            - 所以`libGLESv2.so`本質上和`libGLESv3.so`是一樣的

- **`EGL library`**
    ```c
    #include <EGL/egl.h>
    ```
    
    - EGL也是一套API
        - 它的實現也需要vendor來提供
    - Device Path - `/vendor/lib/egl` | `/system/lib/egl`
        - `libEGL.so` | `libEGL_*.so`

- **`EGL Wrapper library`**
    - Device Path - `/system/lib/libEGL.so`
    - 目前是透過他裡面的`Loader`去上述提到的位置`dlopen & dlsym` - **`OpenGL ES library`**&**`EGL library`**
    - 如果他直接去找(`dlsym`)失敗，會用自己的`eglGetProcAddress()`把**`OpenGL ES Wrapper library`** & **`EGL Wrapper library`** 全翻(`dlsym`)一遍
    - 如果找(`dlsym`)不到，他會請**`EGL library`**用`eglGetProcAddress()`翻一遍

### ~~elg.cfg(Android 4.4之後捨棄)~~

- 決定使用的`OpenGL ES library`
- Path
    - Source Code - `/device/`
    - Build - `/out/target/product/k85v1_64/vendor/lib/egl/egl.cfg`
    - Device - `/system/lib/egl/egl.cfg` | `/vendor/lib/egl/egl.cfg`
- 內容如下
    
    ```shell
    0 1 mali # Mali 3D GPU driver, pre-built by MediaTek
    0 0 android
    ```
    
    - 第1個數字代表螢幕編號
    - 第2個數字0代表SW, 1代表HW library
    - 第3個為library name
        - EX - `libGLESv1_CM_mali.so`
        - 放在上面的優先執行
- 如果此文件不存在，Default配置為`0 0 android`

## GLEW

- 因為OpenGL只是一個標準/規範，具體的實現是由驅動開發商針對特定顯卡實現的
    - 由於OpenGL驅動版本眾多，它大多數函數的位置都無法在編譯時確定下來，需要在運行時查詢
    - 任務就落在了開發者身上，開發者需要在運行時獲取函數地址並將其保存在一個函數指針中供以後使用
        
        ```c++
        // 定义函数原型
        typedef void (*GL_GENBUFFERS) (GLsizei, GLuint*);
        // 找到正确的函数并赋值给函数指针
        GL_GENBUFFERS glGenBuffers  = (GL_GENBUFFERS)wglGetProcAddress("glGenBuffers");
        // 现在函数可以被正常调用了
        GLuint buffer;
        glGenBuffers(1, &buffer);
        ```
        
- 為了方便的管理平台與opengl版本不匹配，以及方便的解決不同顯卡特有的硬件接口支持
    - 只要包含一個`glew.h`頭文件，你就能使用gl,glu,glext,wgl,glx的全部函數。
- 函數名稱：`gl,glu,glext,wgl,glx`

## GL3W

- 同GLEW
- 函數名稱：`gl3w`

## Mesa 3D

- 實踐OpenGL的一個open source library

## OpenGL ES

- 是OpenGL的`子集`
- 刪除了`立即渲染模式（Immediate mode）`
- 降低電耗

@import "1.csv"

- Open 2.x 缺乏陰影貼圖, volume rendering, GPU粒子動畫. 幾何形狀實例化, 紋理壓縮, 卡馬校正

### Flow

- 3D location
- Vertex
    - 3D坐標數據的集合
- `Vertex Shader`
- Geometry Shader (Option)
    - 產生新Vertex構造出新的（或是其它的）Geometry
- Primitive
    - 將Vertex之間的關係組織起來，形成Primitive，如三角形,直線
- Clipping
    - Vertex有可能落在我們繪製窗口的區域之外，則丟棄用來提升執行效率
- `Rasterization`
- Fragment
    - OpenGL渲染一個像素所需的所有Data
        - 屏幕坐標，深度，法線
- `Fragment Shader`
    - 計算一個像素的最終顏色 & 深度
        - 但最後`Per-Fragment Operation`階段還有可能改變顏色
    - OpenGL高級效果產生的地方
        - 光照、陰影、光的顏色
- OpenGL ES 1.x中, 最後為`Alpha test` & `混合(Blending)`
    - 檢查`Alpha值`（物體的透明度）並對物體進行`混合(Blend)`
        - 所以，即使在Fragment Shader中計算出來了一個像素輸出的顏色，最後的像素顏色也可能完全不同
        
            ![Untitled%201.png](Untitled%201.png)

- 藍色部分代表的是我們可以注入自定義的Shader的部分
- 新版最後為`Per-Fragment Operation`代替
    - 因為`Alpha test`可以在`Fragment Shader`進行
    - Pixel ownership test
        - 決定在Frame buffer中某點(Xw,Yw)的畫素當前是否被 OpenGL ES 所有
    - Scissor test
        - 測試(Xw,Yw)是否在剪下矩陣內,如果在矩陣外,Fragment被丟棄
    - 模板test & 深度test
        - 判斷這個像素是其它物體的前面還是後面，決定是否應該丟棄
    - Blending
        - 混合新產生的Fragment顏色和儲存在顏色緩衝區中的顏色
    - Dithering(抖動)
        - 被使用在用幾種顏色的組合模擬出大範圍內的多種色彩模式
    - Per-Fragment階段的最後要將Fragment顏色、深度值、模板值經過Mask過濾後決定是否能寫入framebuffer

        ![Untitled%202.png](Untitled%202.png)
- framebuffer是GPU上的DDR，可以直接mapping到display device

### Rasterization

- 為了在 2D 平面螢幕上顯示 3D 立體物體
    - Primitive -> 2D Fragment (X,Y)
- Rasterization`線性插值`後所產生的顏色、深度、模板和螢幕座標位置(X,Y),成為`Fragment Shader`的輸入
- Bresenhan算法
- 也有別的方法來生成，如光線追蹤
- Software光柵器
    - 一般是指運行在CPU上的光柵器程序
    - 可以根據用戶需要，基於複雜的渲染公式，跑出更加複雜的渲染效果
- Hardware光柵器
    - 依賴於GPU的光柵器
    - 例如OpenGL、Vulkan之類的圖形庫大都是依賴於顯卡

## Shader

- 是運行在`GPU`上的小程序
- 這些小程序為`圖形渲染管線`的某個特定部分而運行
- 從基本意義上來說，Shader只是一種把`輸入`轉化為`輸出`的程序
- Shader也是一種非常獨立的程序，因為它們之間不能相互通信
    - 它們之間唯一的溝通只有通過輸入和輸出

### Vertex Shader

- 把3D坐標轉為另一種3D坐標
- 可以很簡單，只做傳遞，則叫作`pass-throught shader`
- 可以很複雜，透過光照計算或其他技法判斷頂點顏色
- 主要還是做座標系的判斷為主
- 每個頂點執行一次
- Vertex Shader應該接收的是一種特殊形式的輸入，否則就會效率低下
    - Vertex Shader的輸入特殊在，它從Vertex數據中直接接收輸入
    - 為了定義Vertex該如何管理，我們使用`location`這一元數據指定輸入變數，這樣我們才可以在CPU上配置Vertex屬性
        
        > 你也可以忽略layout (location = 0)標識符，通過在OpenGLglGetAttribLocation查詢屬性位置值(Location)
        > 
        
        ```c
        #version 330 core
        layout (location = 0) in vec3 position; // position變數的屬性位置值為0
        
        out vec4 vertexColor; // 為 Fragment Shader指定一個顏色輸出
        
        void main()
        {
            gl_Position = vec4(position, 1.0); // 注意我們如何把一個vec3作為vec4的構造器的參數
            vertexColor = vec4(0.5f, 0.0f, 0.0f, 1.0f); // 把輸出變數設置為暗紅色
        }
        ```
        

### Fragment Shader

- 如果覺得不應該繼續繪製這個Fragment，可以`丟棄fragment`
- 通常一個Fragment 對應於屏幕上的一個像素
    - 但高分辨率的屏幕可能會用多個像素點映射到一個Fragment，以減少GPU 的工作
- 需要一個`vec4`顏色輸出變數
    - 如果沒有定義輸出顏色，OpenGL會把你的物體渲染為黑色（或白色）

- 當`類型`和`名字`都一樣的時候，OpenGL就會把兩個變數鏈接到一起
    
    ```c
    #version 330 core
    in vec4 vertexColor; // 從Vertex Shader傳來的輸入變數（名稱相同、類型相同）
    
    out vec4 color; // Fragment輸出的變數名可以任意命名，類型必須是vec4
    
    void main()
    {
        color = vertexColor;
    }
    ```
![Untitled%203.png](Untitled%203.png)

### GLSL - OpenGL Shader Language

- Shader是使用一種叫`GLSL`的`類C語言`寫成的
- GLSL是為圖形計算量身定制的，它包含一些針對`向量`和`矩陣`操作的有用特性
- Shader的開頭總是要聲明版本
- 一個典型的Shader有下面的結構：

```c
#version version_number

in type in_variable_name;
in type in_variable_name;

out type out_variable_name;

uniform type uniform_name;

int main()
{
  // 處理輸入並進行一些圖形操作
  ...
  // 輸出處理過的結果到輸出變數
  out_variable_name = weird_stuff_we_processed;
}
```

- 輸入變數也叫`頂點屬性(Vertex Attribute)`
- 我們能聲明的 Vertex Attribute 是有上限的，它一般由`Hardware`來決定
    - OpenGL確保至少有`16個包含4分量`的 Vertex Attribute 可用，但是有些Hardware或許允許更多的 Vertex Attribute
    - 你可以查詢`GL_MAX_VERTEX_ATTRIBS`來獲取具體的上限
        
        ```c
        GLint nrAttributes;
        glGetIntegerv(GL_MAX_VERTEX_ATTRIBS, &nrAttributes);
        std::cout << "Maximum nr of vertex attributes supported: " << nrAttributes << std::endl;
        ```
        

### GLSL數據類型
- `int`、`float`、`double`、`uint`和`bool`
- `Vector`
    - 向量是一個可以包含有1、2、3或者4個分量的容器
    - 大多數時候我們使用vecn，因為float足夠滿足大多數要求了
    - 向量的分量可以通過`vec.x`、`.y`、`.z`和`.w`來獲取它們的第1、2、3、4個分量
        > 顏色使用rgba訪問分量

        > 紋理坐標使用stpq訪問分量
    @import "2.csv"
-
    - 向量支援`重組(Swizzling)`
        ```c
        vec2 someVec;
        vec4 differentVec = someVec.xyxx;
        vec3 anotherVec = differentVec.zyw;
        vec4 otherVec = someVec.xxxx + anotherVec.yxzy;
        ```

    - 也可以把向量作為參數  
        ```c
        vec2 vect = vec2(0.5f, 0.7f);
        vec4 result = vec4(vect, 0.0f, 0.0f);
        vec4 otherResult = vec4(result.xyz, 1.0f);
        ```
        
- `Matrix`

## Kernel

### Framebuffer

- Device node
    - `/dev/graphics/fb*`
    - `/dev/fb*`
- `fb0`代表第1個Monitor
- FrameBuffer不是一個圖形系統，更不是視窗系統
    - 有一種機制是把螢幕上的每個點對映成一段線性記憶體空間
    - 程式可以簡單的改變這段記憶體的值來改變螢幕上某一點的色彩
    - FrameBuffer就是此機制的實現
    - 它比X要低級
    - 稱為`buffer`是因為他也佔用memory

## HAL

- Android中並不直接透過`Driver`來跟`Device node`溝通，而是透過`HAL`
- 原因在於HW vendor並不知道有哪些Android產品使用他們的HW
    - 不希望針對每個Android產品寫一個特定的`Driver`
    - 希望一個`Driver`可以通吃所有Android產品
    - 此時，HW vendor如LED，只需要實作Android `HAL`(LED) + common `Driver`(GPIO介面)，即可適用於所有執行Android的產品
    - 手機製造商BSP只需將HW vendor的HAL library移到project中的系統指定目錄即可，剩下交給Android
- HAL這層不能只為了特定HW Device設計，主要是要找出眾多HW Device的共通屬性
- HAL有些是C寫的，所以HAL的繼承方式是C的`strcut`中第一個成員變數為parent struct
    - `hardware/libhardware/include/hardware/gralloc.h`
        
        ```c
        /**
        * Every hardware module must have a data structure named HAL_MODULE_INFO_SYM
        * and the fields of this data structure must begin with hw_module_t
        * followed by module specific information.
        */
        typedef struct gralloc_module_t {
            struct hw_module_t common;
            int (*registerBuffer)(struct gralloc_module_t const* module,buffer_handle_t handle);
            ...
        }
        ```
        
- 每個HAL module都要有一個`HAL_MODULE_INFO_SYM`變數
    - `hardware/libhardware/modules/hwcomposer/hwcomposer.cpp`
        
        ```c
        hwc_module_t HAL_MODULE_INFO_SYM = {
            .common = {
                .tag = HARDWARE_MODULE_TAG,
                .version_major = 1,
                .version_minor = 0,
                .id = HWC_HARDWARE_MODULE_ID,
                .name = "Sample hwcomposer module",
                .author = "The Android Open Source Project",
                .methods = &hwc_module_methods,
            }
        };
        ```
        
- Android的HAL多半填空即可
    - `hardware/libhardware/include/hardware`

### Gralloc

- 兩個Device
    - `fb`
        - 打開Kernel的framebuffer
    - `gralloc`
        - 分配/釋放Kernel的framebuffer
- 上游 - `FramebufferNativeWindow`
- 下游 - `Framebuffer`

### Composer

- UI合成
- 上游 - `HWComposer`

## OpenGL SC

- OpenGL的子集，用於安全需求較高的device

## OpenVG

- 2D版的OpenGL

## OpenML

- Media相關

## WebGL

- Browser 版本
- JavaScript

## OpenKODE

- OpenKODE 1.0
    - OpenGL ES
    - OpenVG
- 後續版本將會增加
    - OpenSL ES
    - OpenMAX