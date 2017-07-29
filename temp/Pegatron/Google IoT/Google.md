----------------------
# Listening (makePro) #
----------------------

Project Name: makeProListening/iOSApp

<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

- [Listening (makePro)](#listening-makepro)
	- [Folders and Files in](#folders-and-files-in)

<!-- tocstop -->

``` python
alex = 1
```

``` c
printf("%s\n", );
```

``` {mermaid}
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail...
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```

```{plantuml}
object Object01
object Object02
object Object03
object Object04
object Object05
object Object06
object Object07
object Object08

Object01 <|-- Object02
Object03 *-- Object04
Object05 o-- "4" Object06
Object07 .. Object08 : some labels
```

``` {wavedrom}
{ assign:[
  ["z", ["~&",
    ["~^", ["~", "p0"], ["~", "q0"]],
    ["~^", ["~", "p1"], ["~", "q1"]],
    ["~^", ["~", "p2"], ["~", "q2"]],
    "...",
    ["~^", ["~", "p7"], ["~", "q7"]],
    ["~","~en"]
  ]]
]}
```

``` {viz}
digraph G {

	subgraph cluster_0 {
		style=filled;
		color=lightgrey;
		node [style=filled,color=white];
		a0 -> a1 -> a2 -> a3;
		label = "process #1";
	}

	subgraph cluster_1 {
		node [style=filled];
		b0 -> b1 -> b2 -> b3;
		label = "process #2";
		color=blue
	}
	start -> a0;
	start -> b0;
	a1 -> b3;
	b2 -> a3;
	a3 -> a0;
	a3 -> end;
	b3 -> end;

	start [shape=Mdiamond];
	end [shape=Msquare];
}

```



----------------------
Folders and Files in
----------------------

**/Listening** project folder

	/AppResource/		Content-related data

	/Classes/		Basic classes
	  * AppResource.swift: class for accessing content data (in AppResource folder)
	  * AppUtil.swift: class for direct-access to low-level resources

	/ViewControllers/	ViewControllers

	* Constants.swift		Global access constants
