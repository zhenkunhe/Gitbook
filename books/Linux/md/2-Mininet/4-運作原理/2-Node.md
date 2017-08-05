# Node

<!--sec data-title="Node是什麼？" data-id="1" data-nopdf="true" data-collapse=false ces-->
- 每個`Host`其實就是一個`Node`的物件，可以在`node.py`中看到此物件的定義

!FILENAME node.py
``` python
class Node( object ):
    portBase = 0  # Nodes always start with eth0/port0, even in OF 1.0

    def __init__( self, name, inNamespace=True, **params ):
        self.checkSetup()

        self.name = params.get( 'name', name )
        self.privateDirs = params.get( 'privateDirs', [] )
        self.inNamespace = params.get( 'inNamespace', inNamespace )

        ...

        # Start command interpreter shell
        self.startShell()
        self.mountPrivateDirs()

    inToNode = {}  # mapping of input fds to nodes
    outToNode = {}  # mapping of output fds to nodes
```

- 初始時，會有一個變數`inNamespace`用來決定此`Host`是否要透過`network namespaces`來達到`network isolation`的功能

- 當變數都初始化後，就會呼叫`startShell()`來啟動此Host。

!FILENAME node.py
``` python
def startShell( self, mnopts=None ):
    "Start a shell process for running commands"
    if self.shell:
        error( "%s: shell is already running\n" % self.name )
        return
    # mnexec: (c)lose descriptors, (d)etach from tty,
    # (p)rint pid, and run in (n)amespace
    opts = '-cd' if mnopts is None else mnopts
    if self.inNamespace:
        opts += 'n'
    # bash -i: force interactive
    # -s: pass $* to shell, and make process easy to find in ps
    # prompt is set to sentinel chr( 127 )
    cmd = [ 'mnexec', opts, 'env', 'PS1=' + chr( 127 ),
            'bash', '--norc', '-is', 'mininet:' + self.name ]

    master, slave = pty.openpty()
    self.shell = self._popen( cmd, stdin=slave, stdout=slave,stderr=slave,close_fds=False )
    ...
```

- 可以觀察到，mininet是透過一隻叫做`mnexec`的程式來執行，並且透過參數`-n`來將此process給轉換到`network namespaces`中

<!--endsec-->

<!--sec data-title="所以建立完Host以後，可以使用ip來看？" data-id="2" data-nopdf="true" data-collapse=false ces-->

- 理論上我們要可以透過`ip netns show`來看到這些`network namespaces`，實際上卻看不到
  - 原因如同[此篇](https://goo.gl/szi1Bp)所說，由於建立的為`nameless network namespaces`

<!--endsec-->

<!--sec data-title="Host是Node，那Switch呢？" data-id="3" data-nopdf="true" data-collapse=false ces-->

- 建立Switch包含了四種選擇`OVSLegacyKernelSwitch`、`UserSwitch`、`OVSSwitch`，`IVSSwitch`

- 一般常用的就是`OVSSwitch`

- 這四種`Switch`都繼承自`Switch物件`，而`Switch物件`則繼承自`Node`

<!--endsec-->