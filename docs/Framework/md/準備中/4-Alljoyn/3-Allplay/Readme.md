# Alljoyn - Allplay

tags: Alljoyn,Framework,Allplay

<!--sec data-title="核心" data-id="1" data-nopdf="true" data-collapse=false ces-->

	BusObject Path: /net/allplay/MediaPlayer
        Interface:      net.allplay.MediaPlayer

<!--endsec-->

<!--sec data-title="附加" data-id="2" data-nopdf="true" data-collapse=false ces-->

	BusObject Path: /net/allplay/MediaPlayer
        Interface:      net.allplay.ZoneManager
        Interface:      org.alljoyn.Control.Volume
        
	BusObject Path: /net/allplay/MediaPlayer/Playlist
        Interface:      net.allplay.Playlist

<!--endsec-->

<!--sec data-title="net.allplay.MediaPlayer" data-id="3" data-nopdf="true" data-collapse=false ces-->

### XML

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<interface name="net.allplay.MediaPlayer">
   <signal name="EnabledControlsChanged">
      <arg name="enabledControls" type="a{sb}" direction="out" />
   </signal>
   <signal name="EndOfPlayback" />
   <method name="ForcedPrevious" />
   <method name="GetPlayerInfo">
      <arg name="displayName" type="s" direction="out" />
      <arg name="capabilities" type="as" direction="out" />
      <arg name="maximumVolume" type="i" direction="out" />
      <arg name="zoneInfo" type="(siv)" direction="out" />
   </method>
   <method name="GetPlaylist">
      <arg name="items" type="a(ssssxsssa{ss}a{sv}v)" direction="out" />
      <arg name="controllerType" type="s" direction="out" />
      <arg name="playlistUserData" type="s" direction="out" />
   </method>
   <method name="GetPlaylistInfo">
      <arg name="controllerType" type="s" direction="out" />
      <arg name="playlistUserData" type="s" direction="out" />
   </method>
   <signal name="InterruptibleChanged">
      <arg name="interruptible" type="b" direction="out" />
   </signal>
   <signal name="LoopModeChanged">
      <arg name="loopMode" type="s" direction="out" />
   </signal>
   <method name="Next" />
   <signal name="OnPlaybackError">
      <arg name="index" type="i" direction="out" />
      <arg name="error" type="s" direction="out" />
      <arg name="description" type="s" direction="out" />
   </signal>
   <method name="Pause" />
   <method name="Play">
      <arg name="itemIndex" type="i" direction="in" />
      <arg name="startPositionMsecs" type="x" direction="in" />
      <arg name="pauseStateOnly" type="b" direction="in" />
   </method>
   <signal name="PlayStateChanged">
      <arg name="state" type="(sxuuuiia(ssssxsssa{ss}a{sv}v))" direction="out" />
   </signal>
   <signal name="PlaylistChanged" />
   <method name="Previous" />
   <method name="Resume" />
   <method name="SetPosition">
      <arg name="positionMsecs" type="x" direction="in" />
   </method>
   <signal name="ShuffleModeChanged">
      <arg name="shuffleMode" type="s" direction="out" />
   </signal>
   <method name="Stop" />
   <method name="UpdatePlaylist">
      <arg name="playlistItems" type="a(ssssxsssa{ss}a{sv}v)" direction="in" />
      <arg name="index" type="i" direction="in" />
      <arg name="controllerType" type="s" direction="in" />
      <arg name="playlistUserData" type="s" direction="in" />
   </method>
   <property name="EnabledControls" type="a{sb}" access="read" />
   <property name="Interruptible" type="b" access="read" />
   <property name="LoopMode" type="s" access="readwrite" />
   <property name="PlayState" type="(sxuuuiia(ssssxsssa{ss}a{sv}v))" access="read" />
   <property name="ShuffleMode" type="s" access="readwrite" />
   <property name="Version" type="q" access="read" />
</interface>
```

### Method

#### Play
#### Pause
#### Resume
#### Stop
#### Previous
#### Next
#### SetPosition
#### GetPlayerInfo
#### GetPlaylist
#### GetPlaylistInfo
#### ForcedPrevious

### Properties
#### EnabledControls
#### Interruptible
#### LoopMode
#### PlayState
#### ShuffleMode
#### Version

### Signal
#### EnabledControlsChanged
#### EndOfPlayback
#### InterruptibleChanged
#### LoopModeChanged
#### ShuffleMode
#### Version

### Scenario

`start`
GetPlayerInfo
GetEnabledControls
GetInterruptible
GetLoopMode
GetPlayState
GetShuffleMode
GetVersion
GetPlaylist()

`設定撥放位置`
Method - SetPosition(INT64 positionMsecs)
signal - PlayStateChanged - sxuuuiia(ssssxsssa{ss}a{sv}v) state

`隨機撥放`
Set - ShuffleMode - STRING
> SHUFFLE
> LINEAR

signal - ShuffleModeChanged - STRING shuffleMode

`循環模式`
Set - LoopMode - STRING
> ONE
> NONE
> ALL

signal - LoopModeChanged - STRING loopMode

`Resume`
Method - Resume()
signal - PlayStateChanged - sxuuuiia(ssssxsssa{ss}a{sv}v) state

`新增歌曲到Playlist`
Method - UpdatePlaylist

      <arg name="playlistItems" type="a(ssssxsssa{ss}a{sv}v)" direction="in"/>
      <arg name="index" type="i" direction="in"/>
      <arg name="controllerType" type="s" direction="in"/>
      <arg name="playlistUserData" type="s" direction="in"/>
   
>`playlistItems`
>public string Album { get; set; }
        public string Artist { get; set; }
        public long Duration { get; set; }
        public string Genre { get; set; }
        public string MediaType { get; set; }
        public IDictionary<string, object> MediumDesc { get; set; }
        public IDictionary<string, string> OtherData { get; set; }
        public string ThumbnailUrl { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public object UserData { get; set; }
 >`

Album=幸福了 然後呢
Duration=286000
Genre=Pop
Artist=A-Lin & 小宇
MediaType=audio
MediumDesc=System.__ComObject
OtherData=System.__ComObject
ThumbnailUrl=http://192.168.1.20:10508/download/thumb.jpg?id=8285275079956195101
Title=920
Url=http://192.168.1.20:10508/download/item.mp3?id=8285275079956195101`
       
signal - PlayListChanged - VOID
Method - GetPlaylist
Method - Play()
signal - PlayStateChanged - sxuuuiia(ssssxsssa{ss}a{sv}v) state

`Pause`
Method - Pause()
signal - PlayStateChanged - sxuuuiia(ssssxsssa{ss}a{sv}v) state

`Next`
Method - Next()
signal - PlayStateChanged - sxuuuiia(ssssxsssa{ss}a{sv}v) state

`Previous`
Method - Previous()
signal - PlayStateChanged - sxuuuiia(ssssxsssa{ss}a{sv}v) state

`移除PlayList`
Method - UpdatePlaylist
Method - GetPlaylist
signal - PlayListChanged - VOID

`連線失敗`
signal - OnPlaybackError - 

<!--endsec-->

<!--sec data-title="Volume" data-id="4" data-nopdf="true" data-collapse=false ces-->

`調整音量`
Set - Volume - INT16
> Volume : 0~100

signal - VolumeChanged - INT16 newVolume
> newVolume : 0-100

<!--endsec-->

<!--sec data-title="Pega-Gateway Event" data-id="5" data-nopdf="true" data-collapse=false ces-->

- Play
> In
>``` json
{
   "itemIndex":Int
   "startPositionMsecs":Int64
   "pauseStateOnly":Bool
}
> ```
> Out
>``` json
{}
> ```

- Previous
> In
>``` json
{}
> ```
> Out
>``` json
{}
> ```

- Pause
> In
>``` json
{}
> ```
> Out
>``` json
{}
> ```

- Resume
> In
>``` json
{}
> ```
> Out
>``` json
{}
> ```

- Stop
> In
>``` json
{}
> ```
> Out
>``` json
{}
> ```

- Next
> In
>``` json
{}
> ```
> Out
>``` json
{}
> ```

- UpdatePlaylist
> In
>``` json
{
   "playlistItems":
   [
      {
         "url":String
         "title":String
         "artist":String
         "thumbnail_url":String
         "duration":Int64
         "mediaType":String
         "album":String
         "genre":String
         "other_data":
         {
            String:String
         }
         "medium_description":
         {
            String:???
         }
         "userData":???
      }
   ]
   "index":Int
   "controllerType":String
   "playlistUserData":String
}
> ```
> Out
>``` json
{}
> ```

- SetPosition
> In
>``` json
{
   "positionMsecs":Int64
}
> ```
> Out
>``` json
{}
> ```

- ForcedPrevious
> In
>``` json
{}
> ```
> Out
>``` json
{}
> ```

- CreateZone
> In
>``` json
{
   "players":
   [
      String
   ]
}
> ```
> Out
>``` json
{
   "zoneId":String
   "timestamp":Int
   "failedPlayers":
   {
      String:Int
   }
}
> ``` 

- SetZoneLead
> In
>``` json
{
   "zoneId":String
   "timeServerIp":String
   "timeServerPort":Uint16
}
> ```
> Out
>``` json
{
   "timestamp":Int
}
> ``` 

<!--endsec-->

<!--sec data-title="Pega-Gateway Get-Parameter" data-id="6" data-nopdf="true" data-collapse=false ces-->

- GetPlayerInfo
``` json
{
   "displayName":String
   "capabilities":
   [
      String
   ]
   "maximumVolume":Int
   "zoneInfo":
   {
      "zoneId":String
      "zone_timestamp":Int
      "player_known_name":???
   }
}
```

- GetPlaylist
``` json
{
   "items":
   [
      {
         "url":String
         "title":String
         "artist":String
         "thumbnail_url":String
         "duration":Int64
         "mediaType":String
         "album":String
         "genre":String
         "other_data":
         {
            String:String
         }
         "medium_description":
         {
            String:???
         }
         "userData":???
      }
   ]
   "controllerType":String
   "playlistUserData":String
}
```

- GetPlaylistInfo
``` json
{
   "controllerType":String
   "playlistUserData":String
}
``` 

- GetPlayState

``` json
{
   "playstate":String
   "position":Int64
   "current_sample_rate":uint32
   "audio_channels":uint32
   "bits_per_sample":uint32
   "index_current_item":Int64
   "index_next_item":Int64
   "items":
   [
      {
         "url":String
         "title":String
         "artist":String
         "thumbnail_url":String
         "duration":Int64
         "mediaType":String
         "album":String
         "genre":String
         "other_data":
         {
            String:String
         }
         "medium_description":
         {
            String:???
         }
         "userData":???
      }
   ]
}

```

- EnabledControls:

``` json
[
   "???":String
   "???":Bool
]
```

- GetInterruptible:`Bool`
- GetLoopMode : `String` (ONE,ALL,NONE)
- GetShuffleMode : `String` (LINEAR,SHUFFLE)
- GetAllplayVersion : `Uint16`
- GetVolume : `Int16`
- GetMute : `Bool`
- GetVolumeRange :

``` json
{
   "Low":Int16
   "High":Int16
   "Increment":Int16
}
```

- GetVolumeEnabled : `Bool`
- GetZoneManagerEnabled:`Bool`

<!--endsec-->

<!--sec data-title="Pega-Gateway Set-Parameter" data-id="7" data-nopdf="true" data-collapse=false ces-->

- SetLoopMode : `String` (ONE,ALL,NONE)
- SetShuffleMode : `String` (LINEAR,SHUFFLE)
- SetVolume : `Int16`
- SetMute : `Bool`

<!--endsec-->