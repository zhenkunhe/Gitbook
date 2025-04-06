# Fortnite

[TOC]

## Info

- 窗口是PM-`Shally Tsou`
- APK - `\\PC14120137\Game\Fornite_APK`
- [Replay](https://epicgames.ent.box.com/s/7jgxocrx9qxcqmump80ms8xp8zngvyke)

## Install

```bash
adb install FortniteClient-Android-Test-arm64-es2_1025.apk
```

## Setup

```bash
adb shell "mkdir -p /storage/emulated/0/Android/data/com.epicgames.fortnite/files/UE4Game/FortniteGame/"
adb shell "mkdir -p /storage/emulated/0/UE4Game/FortniteGame/"
adb push UE4CommandLine.txt /storage/emulated/0/Android/data/com.epicgames.fortnite/files/UE4Game/FortniteGame/
adb push UE4CommandLine.txt /storage/emulated/0/UE4Game/FortniteGame/
```

## User

@import "csv/1.csv"

## 登入

- 一開始APP會需要下載2GB檔案, 需耐心等待
- 帳號必須先註冊epic, 然後請PM跟epic申請開通權限
- 右上->`Matchmaking Region` -> `NA-East`
- 選SOLO
- 這個是epic test server, 只提供給partner使用, 所以配對完沒有任何人, 只有你一個人

## Performance 場景

- 麥田 - `fatal field`

地圖中下

![Untitled.png](images/Untitled.png)

在麥田裡平視

![Untitled%201.png](images/Untitled%201.png)

## Profile

- Default- `UE4CommandLine.txt`

```bash
../../../FortniteGame/FortniteGame.uproject -noconfigrulesdialog -dp=Android_High -dpcvars=r.Android.DisableASTCSupport=0 -epicapp=Partners -nostablepipelinecache
```

- Replay - `UE4CommandLine.txt`

```bash
../../../FortniteGame/FortniteGame.uproject -noconfigrulesdialog -dp=Android_High -dpcvars=r.Android.DisableASTCSupport=0 -epicapp=Partners -nostablepipelinecache -nomcp -execcmds="stat unit,playfortlocalreplay BR-6431402,startfpschart" -replayperfmode -usefixedtimestep -fps=30 -deterministic -csvcaptureframes=12870
```

### Option

- 圖形畫質

```bash
-dp=Android_High <Default>-dp=Android_Mid-dp=Android_Low
```

- 禁用`Update Required screen`

```bash
-skippatchcheck
```

- 禁用`啟動時不受支持的設備錯誤` `<Default>`

```bash
-noconfigrulesdialog
```

- 4指觸碰可開啟`console`
  - 啟動`frame rate stats`

    ```bash
    ​ -execcmds="stat unit"
    ```

  - 啟動Replay`file.replay`

    ```bash
    -execcmds="playfortlocalreplay file"
    ```

    ```bash
    $ adb push file.replay
    /sdcard/Android/data/com.epicgames.fortnite/files/UE4Game/FortniteGame/Fort
    niteGame/Saved/Demos/file.replay
    ```

- 啟動`Vulkan`

```bash
-dpcvars=​r.Android.DisableVulkanSupport=0
```

- 禁用`shadows`

```bash
-dpcvars=sg.ShadowQuality=0
```

- 改變`vsync frame rate`

```bash
-dpcvars=rhi.SyncInterval=1 <60fps>-dpcvars=rhi.SyncInterval=2 <30fps>-dpcvars=rhi.SyncInterval=3 <20fps>
```

- 基本Replay，固定的`30 fps`（遊戲將比實時運行更快或更慢）

```bash
-nomcp -execcmds="playfortlocalreplay replay" -replayperfmode -usefixedtimestep
-fps=30 -deterministic
```

- 基本Replay，固定30 fps，保存`CSV文件`，其中包含前`56,000` frame的性能資訊
  - 有可能`csv` file為空，合理資料量`12870`

    ```bash
    -nomcp -execcmds="stat unit,playfortlocalreplay replay,startfpschart"
    -replayperfmode -usefixedtimestep -fps=30 -deterministic -csvcaptureframes=56000
    ```
