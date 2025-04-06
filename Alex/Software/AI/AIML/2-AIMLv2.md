# AIML v2.0 (Program AB)

tags: AIML,AI

[TOC]

## Folder

| c:/ab/bots | the AIML bots go in this directory |
|:-----------|:-----------------------------------|
| c:/ab/lib | Java libraries needed to run this code |
| c:/ab/out | Java class file directory |
| c:/ab/run.bat | batch file to run Program AB |

## Bot

| c:/ab/bots/botname/aiml | store your AIML files here |
|:------------------------|:---------------------------|
| c:/ab/bots/botname/aimlif | Program AB stores AIMLIF files here |
| c:/ab/bots/botname/config | Bot configuration files |
| c:/ab/bots/botname/sets | AIML Sets |
| c:/ab/bots/botname/maps | AIML Maps |

## Mode

| action=chat | run the bot and have a chat |
|:------------|:----------------------------|
| action=ab | run the experimental pattern suggestor |
| action=csv2aiml | convert AIMLIF files to AIML |
| action=aiml2csv | convert AIML files to AIMLIF |
| bot=botname | run the bot found in the botname directory |
| trace=true | print out useful tracing information |

## chat mode

| q | quit without saving |
|:--|:---------------------|
| wq | write AIML and AIMLIF (.csv) files and quit |
| ab | Enter catgeory browser/pattern suggestor mde |

## Pattern suggestor (Category Browser) mode

| q | quit without saving files |
|:--|:---------------------------|
| wq | write AIML and AIMLIF files and quit |
| "Enter" or skip | skip this category |
| d | delete this pattern |
| x | create a category with `<sraix>` of the pattern - saved in sraix.aiml |
| p | inappropriate content - creates a category with `<srai>`FILTER INAPPROPRIATE`</srai>` - saved in inappropriate.aiml |
| f | profanity - creates a category with `<srai>`FILTER PROFANITY`</srai>` - saved in profanity.aiml |
| i | insult - creates a category with `<srai>`FILTER INSULT`</srai>` - saved in insult.aiml |

| template conatins | category saved in |
|:----------------------|:----------------------|
| srai |reductions_update.aiml |
| sraix | sraix.aiml |
| oob | oob.aiml |
| set name | client_profile.aiml |
| get name (except get name=”name”) | client_profile.aiml |
| anything else | personality.aiml |

Optionally, you can write

`<pattern>SOME PATTERN</pattern> response`

## A

- 跑aiml or aimlif 取決於誰比較新
- Program AB was developed as a project in JetBrains IntelliJ IDEA

> Some Java libraries are needed to compile Program AB. These libraries are not included in this source code distribution.

- jgoodies-common.jar
- jgoodies-forms.jar
- json-20090211.jar
- sanmoku-0.0.5.jar
- sanmoku-feature-ex.0.0.1.jar

> httpcomponents-client-4.2.1:

- commons-codec-1.6.jar
- commons-logging-1.1.1.jar
- fluent-hc-4.2.1.jar
- httpclient-4.2.1.jar
- httpclient-cache-4.2.1.jar
- httpcore-4.2.1.jar
- httpmime-4.2.1.jar

### AIML Intermediate Format

- 翻譯AIML的每一個category

> 順序是:
> `activation count, input pattern, that pattern, topic pattern, template, filename.`

- 不包含`<pattern>`, `<that>` or `<topic>`,`<category>`
- 對`,`很敏感,所以不要使用,改用`#Comma`

> `Hi, nice to see you!` -> `Hi#Comma nice to see you!`

- `#Newline`是換行
- `activation count`目前沒有被program ab用到,但你可以優先讀取他來改進bot運行的速度

## AIML Processor Extension

- Program AB 定義了一個Java Interface,名叫`AIMLProcessorExtension`,用來讓你自訂AIML tags用.
- 要實做這個Interface必須做三件事情：

1. `public Set<String> extensionTagSet()`; which returns a set of extension tag names.
2. `public String recursEval(Node node, ParseState ps)`:用來遞迴xml tree,並添增你的標籤會回傳的結果.因為你自定義的標籤可能本身包含原生的AIML 2.0 tags .你會用到`AIMLProcessor.evalTagContent(node, parseState ignoreAttributes)`取得tag or subtag的內容.最後你要return 一個String來代表這個tag的結果.
3. 最後假設你實做的結果為`PCAIMLProcessorExtension`,那麼你需要`AIMLProcessor.extension =  new PCAIMLProcessorExtension();`

``` java
public Set<String> extensionTagNames = Utilities.stringSet("contactid","multipleids");

public Set <String> extensionTagSet()
{
    return extensionTagNames;
}
```

## 使用步驟

1. Link to Ab.jar

``` java
import org.alicebot.ab.*;
```

2. Create a bot

``` java
String botname="mybot"; 
Bot bot = new Bot(botname);
```

You can also specify a root path for the bot's files with

``` java
String botname="mybot"; 
String path="c:/example"; 
Bot bot = new Bot(botname, path);
```

3. Create a chat session

``` java
Chat chatSession = new Chat(bot);
```

4. Use the method multisentence Response to get the bot's replies to multiple-sentence (one or more sentence) inputs:

``` java
String request = "Hello. Are you alive? What is your name?";
String response = chatSession.multisentenceRespond(request); 
System.out.println(response);
```

## Set

- 順序：

Try underscore _ first.
Try to find an exact word match.
Try to find a `<set>` match - this step differs from AIML 1.1
Try star * last.

- 優先：短>長

> “give” > “give up"

- 符合的set在template中用`<star/>`代表

Remote set:`“ISA“+setName+“ “+setMember`
server 端寫:

``` xml
<category>
<pattern>ISACOLOR RED</pattern>
<template>true</template>
</category>

<category>
<pattern>ISACOLOR *</pattern>
<template>false</template>
</category>
```

client端寫

``` xml
<pattern>
 IS <set>color</set> A COLOR
</pattern>
```

> color.txt:
>
> - `external:www.pandorabots.com:8e3fc4b44e342400:4`
The “external” keyword means this is an external set.
The “www.pandorabots.com” specifies the host name.
bot id
The number 4 is the maximum length (in words) of any member of the set.  This parameter saves processing and networking resources by omitting checks of phrases that are too long to be in the set anyway.

## map

- 用在template

``` xml
<map>
    <name>be2was</name>
    <map>
        <name>been2be</name>
        <star index="2"/>
    </map>
</map>
```

- 找不到會回傳`unknown`

Remote Map:`mapName+“ “+domainElement`
server寫:

``` xml
<category>
    <pattern>ZIP2CITY 94618</pattern>
    <template>Oakland, California</template>
</category>

<category>
    <pattern>ZIP2CITY *</pattern>
    <template>unknown</template>
</category>
```

client端寫

``` xml
<template>
    The city for 94618 is 
    <map name=”zip2city”>
        94618
    </map>
</template>
```

> zip2city.txt:
>
> - `external:www.pandorabots.com:8e3fc4b44e342400`
The external keyword means this is an external set.
The “www.pandorabots.com” specifies the host name.
Note that the maximum element length need not be specified for maps, as it was for sets.  This is because the `<set>` element can be activated on the `<pattern>` side much more frequently than the `<map>` element on the `<template>` side.

## configure

Normalization:`normal.txt`
Predicate Defaults:`predicates.txt`
Bot Properties:`properties.txt`
Substitutions:`person.txt`...

| File | AIML Tag |
|:---------|:-------------|
| normal.txt | `<normalize>` |
| person.txt | `<person>` |
| person2.txt | `<person2>` |
| gender.txt | `<gender>` |

Copyright:

| Macro | Expansion |
|:------|:-----------|
| [url] | the URL specified by the bot property url in the file properties.txt |
| [date] | the current date |
| [YYYY] | the current calendar year |
| [version] | the bot property version from properties.txt |
| [botname] | the botname property from properties.txt |
| [botmaster] | the botmaster property from properties.txt |
| [organization] | the organization property from properties.txt |
