<!-- slide -->

# Gateway Framework

<!-- slide -->

## Git

- `git clone ssh://git@10.255.131.159:10022/Alex_Hoh/gwFramework.git`

<!-- slide -->

## Build Enviriment

- `gcc` : >= 4.9.0v
- `cmake` : >= 2.8.11v
- `Ubuntu` : 14.04 | 16.04

<!-- slide -->

## Build

- X86_64
  - `./build.sh`

- arm
  - `./build.sh --toolchain-file toolchain/OEToolchainConfig.cmake`
> You should set environment variables from file before building an arm binary.

<!-- slide -->

## Build sequence

``` mermaid
graph LR
    main(main.cpp) --> obj(main.o)
    inc(gateway.h) --> obj
    obj --> |Dynamic Link| lib((libgateway.so))
    lib --> bin(main)
```

- File path
  - `main.cpp` - gateway/src
  - `gateway.h` - libgateway/include
  - `libgateway.so` - libgateway/x86_64|arm

<!-- slide -->

## Introduction - Event Publish & Subscribe

``` puml
@startuml
scale 1.2
    frame "Gateway Process" {

      [Parameter Manager] as PM

      [Event Manager] as EM

      [Log Manager] as LM

      node "Module Sub" {
          [Subscribe Thread] as ST
          (Callback C) <-up- ST : 3
          (Callback C) -up-> ST : Done
          (Callback B) <-up- ST : 2
          (Callback B) -up-> ST : Doneab
          (Callback A) <-up- ST : 1
          (Callback A) -up-> ST : Done
          ST <-up- EM
      }

      node "Module Pub" {
          [Publish Thread] as PT
          (Event C) -up-> PT : Pass 3
          (Event B) -up-> PT : Pass 2
          (Event A) -up-> PT : Pass 1
          PT -up-> EM
      }

    }
@enduml
```

<!-- slide -->

## Modules

| Name | Description |
| :--- | :----: |
| samplePublishModule | a |
| samplePublishModule_C    | b      |
| sampleSubscribeModule | c |
| sampleSubscribeModule_C    | d      |

<!-- slide -->

## API - Gateway

- void `CreateGateway`()
- void `DestroyGateway`()
- void `SetFilePath`( const char* jsonFilePath , const char* logFilePath )
- void `LoadModules`()
- void `UnloadModules`()
- void `StartModules`()
- void `StopModules`()
- int `RemoveModule`(const char* name)
- int `InstallModule`(const char* info)

<!-- slide vertical=true -->

## API - Module

- MODULE_EXPORT int `create`( const char* args )
- MODULE_EXPORT int `destroy`( void )

<!-- slide vertical=true -->

## API - Event

- void `SentEvent`( EventType event , const char* message )

<!-- slide vertical=true -->

## API - Parameter

- void `SetParameter`( const char* name , const char* value )
- `std::string `GetParameter`( const char* name )
- void `GetParameter_C`( const char* name , char* destination , size_t destinationSize )
- size_t `GetParameterLength`( const char* name )

<!-- slide vertical=true -->

## API - Log

- void `Debug`( const char* category , const char* format , ... )
- void `Info`( const char* category , const char* format , ... )
- void `Warning`( const char* category , const char* format , ... )
- void `Error`( const char* category , const char* format , ... )
- void `Critical`( const char* category , const char* format , ... )

<!-- slide -->

## Launch File

``` j
[[modules]]
   args = "{\"int\":1,\"name\":\"alex\"}"
   version = "v1.0"
   path = "../modules/sampleSubscribeModule/libsampleSubscribeModule.so"
   name = "sampleSubscribeModule"
[[modules]]
   args = ""
   version = "v1.0"
   path = "../modules/samplePublishModule/libsamplePublishModule.so"
   name = "samplePublishModule"
```

- 注意：若`path`不正確,會導致無法成功找到`module`
- 注意：若`name` or `version`與module內hard code比對不一致,判定為`不可load`

<!-- slide -->

## Event Manager

``` C
CallbackMap callbackMaps[] =
{
    {A,callback},
    {B,callback},
    {C,callback}
};
```

- 每個`Module`註冊N筆`Event`時,便產生N個`Event Handler`
- 每個`Event Handler`處理(Callback)一項訂閱事件
- 如上,此`Module`產生3個`Event Handler`
- `Event Handler`的產生時機為: `Module`的`create()` `return 0;`以後
- 因此,當`module`的`create`執行結束,所有`callback`事件開始運作
- `Event Handler`的結束時機為: `Module`的`destory()` `return 0;`以後
- 因此,當`module`的`destory()`執行結束,所有`callback`事件停止運作

<!-- slide -->

## Parameter Manager

- 目前所有Parameter不可動態新增與修改初始值(Hard Code)
- C++ 可使用std::string `GetParameter`( const char* name )更方便讀取

<!-- slide -->

## Log Manager

- Info
- Warn
- Critical
- Error
- Debug:當編譯時有`Define DEBUG`（-DDEBUG）時,才會出現

<!-- slide -->

## Running samples

1. `cd install/usr/bin`
2. `./main launch.toml log.conf`
