# Places

tags: Google Cloud,Map,API,Places

<!--sec data-title="計價" data-id="1" data-nopdf="true" data-collapse=false ces-->

- 每 24 小時期間 1 000 個要求
- 每 24 小時期間 150 000 個要求
- 「文字搜尋」服務會乘上 10 倍
- places.py
- 地點資料

<!--endsec-->

<!--sec data-title="附近地點搜尋" data-id="2" data-nopdf="true" data-collapse=false ces-->

- **URL**:`https://maps.googleapis.com/maps/api/place/nearbysearch/output?input=value`
- **Python**:`Client.places_nearby`
- 搜尋指定區域內的地點。

| Key Input|Option Input|Output Type|Output|Result|
|:-:	|:-:	|:-:	|:-:|
|key[^key]|keyword[^keyword]|xml[^xml]|status[^status]|name|
|location[^location]|language[^language]|json[^json]|html_attributions|vicinity|
|radius[^radius]|minprice[^minprice]||next_page_token|type|
||maxprice[^maxprice]||result|geometry|
||name[^name]|||rating|
||opennow[^opennow]|||icon|
||rankby[^rankby]|||reference|
||types[^types]|||id|
||pagetoken[^pagetoken]|||opening_hours|
||zagatselected[^zagatselected]|||photo|
|||||place_id|
|||||scope|

>**Python Library**
>``` python
def places_nearby(client, location, radius=None, keyword=None, language=None,min_price=None, max_price=None, name=None, open_now=False,rank_by=None, type=None, page_token=None)
>```
到
**Sample code**

``` python
import googlemaps

client  = googlemaps.Client(key='AIzaSyAz1hWEiamCgwsceUYG_dQkvTmfwTBoFT4')
languages = 'zh-TW'
location = (25.1207, 121.5019)
types = 'gas_station'
radius = 500

directions_result = client.places_nearby(location, radius ,language=languages, type=types)

for i in directions_result.get('results'):
	print 'rating:',i.get('rating')
	print 'name:',i.get('name')
	print 'scope:',i.get('scope')
	print 'types:',i.get('types')
	print 'vicinity:',i.get('vicinity')
	print '-------------------------------------'
```

<!--endsec-->

<!--sec data-title="文字搜尋" data-id="3" data-nopdf="true" data-collapse=false ces-->

- **URL**:`https://maps.googleapis.com/maps/api/place/textsearch/output?input=value`
- **Python**:`Client.places	`
- 搜尋指定區域內的地點。

| Key Input|Option Input|Output Type|Output|Result|
|:-:	|:-:	|:-:	|:-:|
|key[^key]|location [^location ]|xml[^xml]|status[^status]|name|
|query[^query]|language[^language]|json[^json]|html_attributions|type|
||minprice[^minprice]||next_page_token|formatted_address|
||maxprice[^maxprice]||result|geometry|
||radius [^radius]|||rating|
||opennow[^opennow]|||icon|
||types[^types]|||reference|
||pagetoken[^pagetoken]|||id|
||zagatselected[^zagatselected]|||opening_hours|
|||||photo|
|||||price_level|
|||||place_id|

>**Python Library**
>``` python
def places(client, query, location=None, radius=None, language=None,min_price=None, max_price=None, open_now=False, type=None,page_token=None)
>```

**Sample code**

``` python
import googlemaps

client  = googlemaps.Client(key='AIzaSyAz1hWEiamCgwsceUYG_dQkvTmfwTBoFT4')
languages = 'zh-TW'
location = (25.1203050, 121.5017983)
types = 'food'
radius = 100
query = 'Subway'

directions_result = client.places(query,location,radius=radius,type=types)

for i in directions_result.get('results'):
	print 'rating:',i.get('rating')
	print 'name:',i.get('name')
	print 'types:',i.get('types')
	print 'formatted_address:',i.get('formatted_address')
	print '-------------------------------------'
```

<!--endsec-->

<!--sec data-title="雷達搜尋" data-id="4" data-nopdf="true" data-collapse=false ces-->

- **URL**:`https://maps.googleapis.com/maps/api/place/radarsearch/output?input=value`
- **Python**:`Client.places_radar`
- 可讓您一次搜尋高達 200 個地點，但是與一般從「**文字搜尋**」或「**附近地點搜尋**」要求傳回的資訊相比較不詳細。

| Key Input|Option Input|Output Type|Output|Result|
|:-:	|:-:	|:-:	|:-:|
|key[^key]|keyword[^keyword ]|xml[^xml]|status[^status]|id|
|location[^location]|name[^name]|json[^json]|html_attributions|place_id|
|radius[^radius]|minprice[^minprice]||next_page_token|reference|
||maxprice[^maxprice]||result|geometry|
||opennow[^opennow]||||
||types[^types]||||
||zagatselected[^zagatselected]||||

>**Python Library**
>``` python
def places_radar(client, location, radius, keyword=None, min_price=None, max_price=None, name=None, open_now=False, type=None)
>```

**Sample code**

``` python
import googlemaps

client  = googlemaps.Client(key='AIzaSyAz1hWEiamCgwsceUYG_dQkvTmfwTBoFT4')
location = (25.1203050, 121.5017983)
radius = 1000
keyword = 'Subway'
types = 'food'

directions_result = client.places_radar(location,radius,keyword,type=types)

for i in directions_result.get('results'):
	print 'geometry:',i.get('geometry')
	print 'id:',i.get('id')
	print 'place_id:',i.get('place_id')
	print 'reference:',i.get('reference')
	print '-------------------------------------'
```

<!--endsec-->

<!--sec data-title="地點詳細資料" data-id="5" data-nopdf="true" data-collapse=false ces-->

place	https://maps.googleapis.com/maps/api/place/details/output?parameters

<!--endsec-->

<!--sec data-title="地點相片" data-id="6" data-nopdf="true" data-collapse=false ces-->

places_photo	https://maps.googleapis.com/maps/api/place/photo?parameters

<!--endsec-->

<!--sec data-title="地點自動完成" data-id="7" data-nopdf="true" data-collapse=false ces-->

places_autocomplete	https://maps.googleapis.com/maps/api/place/autocomplete/output?parameters

<!--endsec-->

<!--sec data-title="查詢自動完成" data-id="8" data-nopdf="true" data-collapse=false ces-->

places_autocomplete_query	https://maps.googleapis.com/maps/api/place/queryautocomplete/output?parameters

<!--endsec-->

<!--sec data-title="新增地點" data-id="9" data-nopdf="true" data-collapse=false ces-->

https://maps.googleapis.com/maps/api/place/add/json?key=YOUR_API_KEY

<!--endsec-->

<!--sec data-title="查詢自刪除地點動完成" data-id="10" data-nopdf="true" data-collapse=false ces-->

https://maps.googleapis.com/maps/api/place/delete/json?key=YOUR_API_KEY

[^key]:`Key`：您應用程式的**API 金鑰**。

[^location]:`Location`：用來擷取其周圍地點資訊的緯度/經度。指定 location 參數，就必須一併指定 `radius` 參數。

[^radius]:`Radius`：定義要傳回地點結果的距離範圍 (單位為**公尺**)。允許的最大半徑是**50,000 公尺**。請注意，如果已指定 **rankby=distance**就不得包括 **radius**。

[^keyword]:`Keyword`：所有內容中，包含有某字詞的內容(包含客戶評論)。

[^language]:`Language`：語言設定，請參閱<a href="https://developers.google.com/maps/faq#languagesupport">支援的語言清單。

[^name]:`Name`：要與地點的名稱比對的一或多個字詞 (以空格字元分隔)。

[^minprice]:`Minprice`：有效值的範圍是 **0 (最負擔得起)** 到 **4 (最昂貴)**，含 0 和 4。特定值所代表的確切金額將因地區而異。

[^maxprice]:`Maxprice`：有效值的範圍是 **0 (最負擔得起)** 到 **4 (最昂貴)**，含 0 和 4。特定值所代表的確切金額將因地區而異。

[^opennow]:`Opennow`：只傳回傳送查詢時還在營業的地點。

[^rankby]:`Rankby`：指定列出結果的順序。(`prominence |distance`)。

[^types]:`Types`：將結果限制在至少與其中一個指定類型相符的地點。類型應該以直立線符號分隔 (`type1|type2|etc`)。請參閱<a href="https://developers.google.com/places/supported_types">支援的類型清單</a>。

[^pagetoken]:`Pagetoken`：傳回上次執行之搜尋的接下來 20 個結果。設定 pagetoken 參數將會使用與先前使用的相同參數來執行搜尋，pagetoken 以外的所有參數都將被忽略。 

[^zagatselected]:`Zagatselected`：實驗ing。

[^xml]:`Xml`：回傳資料為xml型態。

[^json]:`Json`：回傳資料為json型態。

[^query]:`Query`：做為搜尋依據的文字字串，例如："restaurant"。

[^status]:`Status`：HTTP回傳狀態代碼。(`OK|ZERO_RESULTS|OVER_QUERY_LIMIT|REQUEST_DENIED(常因為Key無效)|INVALID_REQUEST(常因為缺少必要參數)`)

<!--endsec-->