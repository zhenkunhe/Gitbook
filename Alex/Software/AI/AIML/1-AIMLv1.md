# AIML v1.0

[TOC]

## 型態

用於AIML元素和屬性的名稱的約定是名稱都是小寫

## Topic

- Supported in versions: AIML 1.0

Must be within: <aiml>
Can be within: UNKNOWN
Can contain: UNKNOWN
Must Contain: <category>

- optional top-level element that contains category elements
- A topic element has a required name attribute

``` xml
<aiml>
    <topic name="THE TOPIC">
        <category>
            <pattern> phrase </pattern>
            <that> phrase </that>
            <template> phrase </template>
        </category>
    </topic>
</aiml>
```

## Category

- Supported in versions: AIML 1.0
Must be within:`<aiml>`
Can be within: `<aiml> <topic>`
Can contain: `<that> <pattern> <template>`
Must Contain: `<pattern> <template>`

- second-level

- contains exactly one pattern and exactly one template

``` xml
<category>
    <pattern> PATTERN </pattern>
    <that> THAT </that>
    <template> Template </template>
</category>
```

## Pattern

- Supported in versions: AIML 1.0
Must be within: `<category>`
Can be within: undefined
Can contain: `* _ <name/>`
Must Contain: Normalized text "Pattern-side
AIML expressions (PSAE)."

- it must be the first tag to appear after a <category>
- in UPPER CASE.
- \* = one or more words.
- _ = *
- *只能有一個
`<name/>` tag which is replaced at robot load time with the name of the robot.

## That

- 机器人的数据库中对应“是的”的回答必然非常多，比方有下面A和B两个categories
- 也就是机器人自己上句说过的话，即“你是程序员吗？”这样它就可以确定应该匹配 category A了
- <that index=”nx,ny”> = 機器人倒數幾句講的話
- <that index=”2,1”>表示取机器人倒数第2句的话
- <that index=”2,1”>也等于<justbeforethat/>
- <that index="1,1"/>也等于<that/>

``` xml
<category A>
    <pattern>是的</pattern>
    <that>你是程序员吗？</that>
    <template>你最擅长的编程语言是什么？</template>
</category>

<category B>
    <pattern>是的</pattern>
    <that>你是学生吗？</that>
    <template> 你是哪个学校的</template>
</category>
```

## Template

- Supported in versions: AIML 1.0
Must be within: `<category>`
Can be within: undefined
Can contain: TSAE (Template-side AIML Expression)
Must Contain: could be empty

- A template is the "response" or "output" part of an AIML category.

### Star

``` xml
CLIENT: "Hello there, my name is Tom"

<pattern>HELLO * MY NAME IS *</pattern>
<star index="1"/> = there
<star index="2"/> = tom
<star/>
```

<thatstar index=”n”> = that的第n個*

``` xml
<category>
<pattern>你好</pattern>
<template>
计算机 的 型 号 是 什 么
</template>
</category>
<category>
<pattern>*</pattern>
<that>*  的 型 号 是 什 么</that>
<template><star/>
这个型号是<thatstar/>里面
<random>
<li>很好的商品</li>
<li>很流行的商品</li>
<li>很华丽的商品</li>
<random>。
</template>
</category>
```

对话场景：
用户：你好
机器人：计算机 的 型 号 是 什 么
用户：p4
机器人：p4这个型号是计算机里面很好的商品

### input

- 输出用户倒数第2次的输入，看如下对话：
- <beforethat/> = <input index="3"/>
- <justthat/>  <input index="2"/>

``` xml
<category>
<pattern>嘿 嘿</pattern>
<template>
<gossip>你刚才说：“<input index=”2″/>”？</gossip>
</template>
</category>
```

### topicstar

- <topicstar index=”n”>元素用来得到先前倒数第n次谈论的主题

### get

<get name=””名字/>,即得到name的值

### set & think

<think><set name=”topic”>Me</set></think>

### bot name

<bot name="name"/>

### date

<date/>

### id

<id/>

### person2

<person2/> = <person2><star/></person2;>
把第一人称转成第2人称

### person

<person/> = <person><star/></person;>
把第一人称转换成第3人称

### gender

<gender/> = <gender><star/></gender;>
<gender>元素，替换性别以及代名词，例如：
<gender>She told him to take a hike.</gender>
将被替换成：He told her to take a hike，跟性别有关的单词都将被替换，中文怎么处理不是很清楚

### srai

<srai>里面的话会被当作是用户输入，从新查找匹配模式，直到找到非<srai>定义的回复

例如：
<srai>我 是 <star/></srai>，那么机器人会把“我 是 *”当作是用户输入来从新查找匹配模式

<sr/> = <srai><star/></srai>

### size

<size/>

### version

<version/>

### uppercase

``` xml
<category>
<pattern>DO UPPERCASE</pattern>
<template>
This is an <uppercase>uppercase</uppercase> test.
</template>
</category>
```

This category will give the following output: This is an UPPERCASE test.

### lowercase

``` xml
<category>
<pattern>DO LOWERCASE</pattern>
<template>
This is a <lowercase>LOWERCASE</lowercase> test.
</template>
</category>
```

This category will give the following outout: This is a lowercase test.

### formal

<formal>元素，用来格式化输出，例如：<formal>jon baer</formal>
那么回复将被格式化成首字母大写输出：Jon Baer，对中文无效

### sentence

<sentence>元素用来格式化句子，比如：
<sentence>this is some kind of sentence test.</sentence>
可以格式化成：This is some kind of sentence test.即把句子首字母大写

### condition

<condition name=”name” value=”value”>你好 </condition>

```xml
<category>
<pattern>我 头 发 的 颜 色 是 蓝 色 *</pattern>
<template>哇塞，你很
<condition name=”用户性别” value=”女”> 漂亮阿！</condition>
<condition name=”用户性别” value=”男”>英俊阿！</condition>
</template>
</category>
```

```xml
<category>
<pattern>我 头 发 的 颜 色 是 蓝 色 *</pattern>
<template>哇塞，你很
<condition>
<li name=”用户性别” value=”女”>漂亮阿！</li>
<li name=”用户性别” value=”男”>英俊阿！</li>
</condition>
</template>
</category>
```

```xml
<category>
<pattern>我 头 发 的 颜 色 是 蓝 色 *</pattern>
<template>哇塞，你很
<condition name=”用户性别”>
<li value=”女”> 漂亮阿！</li>
<li value=”男”> 英俊阿！</li>
</condition>
</template>
</category>
```

```xml
<category>
<pattern>我 头 发 的 颜 色 是 蓝 色 *</pattern>
<template>哇塞，你很
<condition>
<li name=”用户性别” value=”女”> 漂亮阿！</li>
<li>好看！</li>
</condition>
</template>
</category>
```

### random

```xml
<random>
<li>很好的商品</li>
<li>很流行的商品</li>
<li>很华丽的商品</li>
<random>
```

### gossip

<gossip> X </gossip> Save X as gossip.
<gossip>元素用来把改元素里面的内容保存到gossip.log文件里。

### learn

<learn>basic_chat.aiml</learn>

### system

调用系统函数
<system>date</system>表示取系统当前日期

### javascript

<javascript> </javascript>

### if

<if>判断元素
<if name=”topic” value=”cars”></if>

```xml
<template>
    <if name=”用户名称” value=”true”>
        你的名字叫 <get name=”用户名称”/>.
    <else/>
        你叫什么名字？
    </if>
</template>
```

### NONE

``` python
kernel = aiml.Kernel()
"""
kernel.learn("std-startup.xml")
kernel.respond("load aiml b")
"""
if os.path.isfile("bot_brain.brn"):
    kernel.bootstrap(brainFile = "bot_brain.brn")
else:
    kernel.bootstrap(learnFiles = "std-startup.xml", commands = "load aiml b")
    kernel.saveBrain("bot_brain.brn")
while True:
    message = raw_input("Enter your message to the bot: ")
    respond = kernel.respond(message)
    print respond
```

``` python
sessionId = 12345
kernel.respond(raw_input(">>>"), sessionId)

sessionData = kernel.getSessionData(sessionId)

kernel.setPredicate("dog", "Brandy", sessionId)
clients_dogs_name = kernel.getPredicate("dog", sessionId)

kernel.setBotPredicate("hometown", "127.0.0.1")
bot_hometown = kernel.getBotPredicate("hometown")
```

#### abc

            <condition>
                <li name="origin" value="None">attractive.</li>
                <li name="destination" value="None">handsome.</li>
            </condition>
            test

            <condition name="origin" value="None">where is your origin</condition>
            <condition name="destination" value="None">where is your destination</condition>
            test

</star>要換行
