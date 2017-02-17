# gitbook-plugin-chatlog

Easily format a chat exchange in your book.

```
{% chathead date="12/31/15" %}{% endchathead %}

{% msg from="mojombo", time="05:59:01pm PST" %}
Mmmm. Chat.
{% endmsg %}

{% msg from="claylo", time="05:59:20pm PST" %}
yeah, man.
{% endmsg %}

{% chatfoot %}{% endchatfoot %}
```

![Preview of chatlog](https://raw.githubusercontent.com/claylo/gitbook-plugin-chatlog/master/screencap.png)

## Installation

First, add this plugin to your `book.json`:

```json
{
  "plugins": ["chatlog"]
}
```

Then install the plugin locally:

```shell
$ gitbook install
```
## Tips & Suggestions for Use

* Avatar images will be pulled from the `/chatlog` directory in the root of your book repository, and are expected to follow the convention USERNAME.jpg. So, for the chat depicted in the screencap, `/chatlog/claylo.jpg` and `/chatlog/mojombo.jpg` were required.

* If you want a new line in the `chathead-date-prefix` or `chathead-date-suffix` values, use the string `{NL}`. They will be replaced by `\n` before HTML is output.

* To specify a passage of time during a chat, add a `"showgap"` parameter to the block, such as: `{% msg from="claylo", time="05:59:20pm PST", "showgap" %}`. This will cause the time for this entry to be displayed on its own line above the entry.

* To keep chatlogs within a single `<ul>` element, wrap them as follows. Otherwise, Markdown line breaks will mess up the HTML generated. Note: blank lines within the blocks are not parsed by Markdown.
  
```
{% chathead date="12/31/15" %}{% endchathead %}{% 
  msg from="mojombo", time="05:59:01pm PST" %}
Mmmm. Chat.{% endmsg %}{% 
  msg from="claylo", time="05:59:20pm PST" %}
yeah, man.{% endmsg %}{% chatfoot %}{% endchatfoot %}
```

## Configuration

Styles for each chat participant are defined within `pluginsConfig`.

```json
{
  "plugins": ["chatlog"],
  "pluginsConfig": {
    "chatlog": {
      "users": {
        "claylo": {
          "balloon": "#08f",
          "text": "#fff"
        },
        "mojombo": {
          "balloon": "#ddd",
          "text": "#000"
        }
      }
    }
  }
}
```

Any username can be used as the key, so long as it is defined within the plugin configuration.

