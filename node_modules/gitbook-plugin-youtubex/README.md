GitBook YouTube Plugin
===

This is a plugin for inserting YouTube videos in GitBook.

## Features

* The player will be responsive and will resize according to the page size.
* A link pointing to the video will be displayed instead if the book is converted into .pdf or other ebook formats.
    * The text description is language-dependent and may be configured in `book.json`

## Usage

Youtube videos can be inserted into a gitbook chapter using a tag with the video id inserted inbetween:

```
{%youtube%}dQw4w9WgXcQ{%endyoutube%}
```

You can also add a time marker in your text. Upon clicking it, the video will travel to the time specified by the marker.

```
{%m id="dQw4w9WgXcQ", m=23, s=40%}{%endm%}
```

* ```h```: hour
* ```m```: minute
* ```s```: second

### Plugin configuration
You can configure the text-replacement's description in eBook/PDF builds for each language book.
Add an object like this to your `book.json`:

```json
"pluginsConfig": {
  "youtubex": {
    "embedDescription": {
      "en": "Watch this video!",
      "de": "Eingebettetes video:"
    }
  }
}
```

---

See the plugin here: [Click here](http://ymcatar.gitbooks.io/gitbook-test/content/testing_youtubex.html)

## Changelog

* 2.0 Releases:
  * **2.0.3**: fix issue with video with id containing underscore character.
  * **2.0.2**: bug fix regarding YouTube iFrame API loading.
  * **2.0.1**: fix loading issues.
  * **2.0.0**: (requires gitbook 3.0+ now)
    * auto scroll to video when time marker clicked (thanks @noerw)
    * added locale support (thanks @noerw)
    * better way for loading the youtube api script


* 1.0 Releases:
	* **1.0.2:** Fix API script loading problem.
	* **1.0.1:** Fix time marker.
	* **1.0.0:** Now using YouTube iFrame API to power the plugin. Added support for adding time markers to control video progress.


* 0.3 Releases:
	* **0.3.0:** Added check to terminate the book generation if the id contain invalid characters.


* 0.2 Releases:
	* **0.2.1:** Fixed broken link in the documentation.
	* **0.2.0:** Improved looks and feels.
