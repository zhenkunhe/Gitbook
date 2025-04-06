# DPTF

[TOC]

看specDPPM - Dynamic Power Performance Management
‧ Active Policy
‧ Cooling Mode Policy
‧ Critical Policy
‧ Passive 1.0
‧ Passive 2.0

 _TZM:在裝置下，轉換thermal zone(optional)
 _TZD:thermal zone下的device
 _NTT:有意義的溫度改變為幾度，刷新_TPT
 _DTI:_NTT達標或是跨過某個門檻值的時候觸發
 _TSP:輪詢(刷新_TMP)的時間
 _TPT:傳達裝置內部sensor的溫度，當頂到處發點或是NTT發生時觸發(optional)
 _TMP:當前溫度
 _RTV:傳達的溫度是絕對值or相對值
 _TST:在裝置下，裝置溫度觸發點的最小區間(optional)

改變熱觸發點並重新計算(0x81)的時機:
‧ 裝置插入或移除
‧ active 與 passive轉換:呼叫所有裝置的_SCP
‧ 到達active 或 passive觸發點

偵測溫度改變:
‧ _TZP:輪詢頻率(optional)
‧ 0x80:通知溫度改變

改變溫度裝置列表(0x82):
‧ 刷新_ALx,_PSL, and _TZD

改變溫度關係(0x83):
‧ 刷新_TRT,_ART

重新計算風扇速度(0x80):
‧ 刷新_FST

Active Policy:
_ART:device and fan關係
_ACx:x越小速度越快，回傳溫度門檻值
_ALx List of active cooling device objects

Passive Policy:
_PSV:門檻值
_TRT:裝置監彼此的關係表
_PSV:門檻值
_PSL:processor可改變的列表
_TC1:常數
_TC2:常數
�P [%] = _TC1 *( Tn - Tn-1 ) +_TC2* (Tn - Tt)公式

Critical Policy:
CR3:S3門檻值
_CRT:S5門檻值
_HOT:S4門檻值

DPTF Device下必備:
_HID
_CID(Optional)
IDSP
_OSC

DPTF Cooling Mode Policy:
‧ _SCP
‧ DSCP(取代_SCP):
    Name(VERS,0)  // Version
    Name(CTYP,0)  // Mode
    Name(ALMT,0)  // Acoustic Limit
    Name(PLMT,0)  // Power Limit
    Name(WKLD,0)  // Workload Hint
    Name(DSTA,0)  // Device State Hint
    Name(RES1,0)  // Reserved 1
    //    Arg0 - Version: For DPTF 8.0, this value is always 0.
    //    Arg1 - Mode:  0: Active (Typically AC Power Source)
   1: Passive (Typically Battery Power Source) 
    //    Arg2 - Acoustic Limit: Acoustic Limit value as defined in ACPI specification
    //    Arg3 - Power Limit: Power Limit value as defined in ACPI specification
    //    Arg4 - Workload Hint: Arbitrary Platform defined Integer that indicates to the platform the type of workload run in the OS.
    //    Arg5 - Device State Hint: An integer value that indicates the state of the device.
    //    Arg6 - Reserved 1
‧ IDSP:ITEM INT3400 device scope

DPTF Critical Policy
‧ CR3, _HOT and_CRT
‧ IDSP:ITEM INT3400 device scope

DPTF Passive 1.0 Policy
‧ CR3, _HOT and_CRT
‧ IDSP:ITEM INT3400 device scope

DPTF Processor Participant Device ACPI Notification Codes:
83h PPCC update

DPPM Specific Participant Device ACPI Notification Codes:
91h _PSV,_ACx, _HOT,_CRT update

Notify(\_SB.IETM, 0x88)-update Oem Design Variables Package
    Name(ODVX,Package(){0,0,0,0,0,0})

    // ODVP (Oem Design Variables Package)
    //
    // Variables for OEM's to customize DPTF behavior based on platform changes.
    //
    // Arguments: (0)
    //   None
    // Return Value:
    //   Package of integers
    //
    Method(ODVP,0,Serialized,,PkgObj)
    {
      Store(\ODV0,Index(ODVX,0))
      Store(\ODV1,Index(ODVX,1))
      Store(\ODV2,Index(ODVX,2))
      Store(\ODV3,Index(ODVX,3))
      Store(\ODV4,Index(ODVX,4))
      Store(\ODV5,Index(ODVX,5))
      Return(ODVX)
    }
