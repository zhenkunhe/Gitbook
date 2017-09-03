# Distance Matrix

tags: Google Cloud,Map,API,Distance Matrix

<!--sec data-title="計價" data-id="1" data-nopdf="true" data-collapse=false ces-->

### 標準使用者

- 每天可以有 2,500 個免費元素。
- 每個查詢可以有 100 個元素。
- 每 10 秒可以有 100 個元素。
- 每 1000 個額外元素為 $0.50 美元，每天最多可以有 100,000 個元素。

### 進階使用者

- 每日配額每 24 小時可有 100,000 個元素以上，視年度合約購買量而定。
- 每個查詢可以有 625 個元素。
- 每 10 秒可以有 1,000 個元素。

<!--endsec-->

<!--sec data-title="多點距離 & 時間" data-id="2" data-nopdf="true" data-collapse=false ces-->

- **URL**：`https://maps.googleapis.com/maps/api/distancematrix/output?input=value`
- **Python**：API - `Client.distance_matrix`
- **Python**：Source Code - `distance_matrix.py`
- **起點**與**目的地**矩陣的**旅行距離**與**時間**。

| Key Input|Option Input|Output Type|Output|Rows|Element|
|:-:	|:-:	|:-:	|:-:|
|key[^key]|mode[^mode]|xml[^xml]|status[^Top status]|element[^element]|status[^Element status]|
|origins[^origins]|language[^language]|json[^json]|origin_addresses[^origin_addresses]||duration[^duration]|
|destinations[^destinations]|avoid[^avoid]||destination_addresses[^destination_addresses]||duration_in_traffic[^duration_in_traffic]|
||units[^units]||rows[^rows]||distance[^distance]|
||arrival_time[^arrival_time]||||fare[^fare]|
||departure_time[^departure_time]||||
||traffic_model[^traffic_model]||||
||transit_mode[^transit_mode]||||
||transit_routing_preference[^transit_routing_preference]||||

>**Python Library**
>``` python
def distance_matrix(client, origins, destinations,mode=None, language=None, avoid=None, units=None,departure_time=None, arrival_time=None,transit_mode=None,transit_routing_preference=None, traffic_model=None)
>```

**Sample code**

``` python
import googlemaps

client  = googlemaps.Client(key='AIzaSyAz1hWEiamCgwsceUYG_dQkvTmfwTBoFT4')
origins = ['Vancouver BC','Seattle']
destinations = ['San Francisco','Victoria BC']

directions_result = client.distance_matrix(origins,destinations)

for i in directions_result.get('rows'):
	print i
	print '------------------------------'
```

**Output**

```json
{
   "destination_addresses" : [
      "美國加利福尼亞州舊金山",
      "加拿大英屬哥倫比亞維多利亞"
   ],
   "origin_addresses" : [ "加拿大英屬哥倫比亞溫哥華", "美國華盛頓西雅圖" ],
   "rows" : [
      {
         "elements" : [
            {
               "distance" : {
                  "text" : "1,528 公里",
                  "value" : 1528399
               },
               "duration" : {
                  "text" : "15 小時 6 分",
                  "value" : 54365
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "114 公里",
                  "value" : 114161
               },
               "duration" : {
                  "text" : "3 小時 10 分",
                  "value" : 11403
               },
               "status" : "OK"
            }
         ]
      },
      {
         "elements" : [
            {
               "distance" : {
                  "text" : "1,300 公里",
                  "value" : 1299971
               },
               "duration" : {
                  "text" : "12 小時 36 分",
                  "value" : 45340
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "172 公里",
                  "value" : 171688
               },
               "duration" : {
                  "text" : "4 小時 35 分",
                  "value" : 16479
               },
               "status" : "OK"
            }
         ]
      }
   ],
   "status" : "OK"
}
```

[^key]:`Key`：您應用程式的**API 金鑰**。

[^origins]:`origins`：一個或多個起點，可以是經緯度or地址。(例如：`origins=Bobcaygeon+ON|41.43206,-81.38992`)

[^destinations]:`destinations`：一個或多個終點，可以是經緯度or地址。(例如：`destinations=Bobcaygeon+ON|41.43206,-81.38992`)

[^mode]:`mode`：交通模式。(`driving|walking|bicycling|transit`)

[^language]:`Language`：語言設定，請參閱<a href="https://developers.google.com/maps/faq#languagesupport">支援的語言清單。

[^avoid]:`avoid`：路線的限制，只能指定一個。(`tolls|highways|ferries|indoor`)

[^units]:`units`：距離的單位。(`metric|imperial`)

[^arrival_time]:`arrival_time`：針對大眾運輸要求指定抵達時間(秒)，自 1970 年 1 月 1 日午夜 (UTC) 起算，不可與`departure_time`並存。

[^departure_time]:`departure_time`：出發時間(秒)，自 1970 年 1 月 1 日午夜 (UTC) 起算，值可以是`now`。如果`mode=driving`時，設定此值才會回傳`duration_in_traffic`。

[^traffic_model]:`traffic_model`：計算旅行時間的方式。(`best_guess(預設)|pessimistic(最久)|optimistic(最快)`)

[^transit_mode]:`transit_mode`：選擇大眾運輸方式，只有當`mode`為 `transit` 時，才能為要求指定此參數。(`bus|subway|train|tram|rail(=train+tram+subway)`)

[^transit_routing_preference]:`transit_routing_preference`：選擇大眾運輸的偏好，只有當`mode`為 `transit` 時，才能為要求指定此參數。(`less_walking|fewer_transfers`)

[^xml]:`Xml`：回傳資料為xml型態。

[^json]:`Json`：回傳資料為json型態。

[^Top status]:`頂層級的Status`：HTTP回傳狀態代碼。(`OK|INVALID_REQUEST|MAX_ELEMENTS_EXCEEDED|OVER_QUERY_LIMIT|REQUEST_DENIED|UNKNOWN_ERROR`)

[^origin_addresses]:`origin_addresses`：起點，經過`地理編碼器`格式化後，回傳當地語系的結果。

[^destination_addresses]:`destination_addresses`：終點，經過`地理編碼器`格式化後，回傳當地語系的結果。

[^rows]:`rows`：每個`row`代表一個`起點`到各`終點`的結果。

[^element]:`element`：每個`element`代表一個`起點`到一個`終點`的結果。

[^Element status]:`元素級的Status`：(`OK|NOT_FOUND|ZERO_RESULTS`)

[^duration]:`duration`：所需時間。`value`欄位以秒表示；`text`欄位以當地語系的文字表示。

[^distance]:`distance`：此路線的總距離。`value`欄位以公尺表示；`text`欄位以當地語系的文字＆`unit`參數表示。

[^duration_in_traffic]:`duration_in_traffic`：根據目前與歷史路況，於此路線行進時花費的時間長度。要求包括`departure_time`參數、`mode`參數是設定為`driving`。

[^fare]:`fare`：如果有的話，此路線的總票價。只有`mode=transit`才有此回傳。`currency`表示貨幣代碼；`value`表示總金額；`text`為語言表示之金額。

<!--endsec-->
