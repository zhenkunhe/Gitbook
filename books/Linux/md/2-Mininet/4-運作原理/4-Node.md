# Node

每個Host其實就是一個Node的物件，可以在node.py中看到此物件的定義，如下。

在node.py
``` python
class Node( object ):
    """A virtual network node is simply a shell in a network namespace.
       We communicate with it using pipes."""

    portBase = 0  # Nodes always start with eth0/port0, even in OF 1.0

    def __init__( self, name, inNamespace=True, **params ):
        """name: name of node
           inNamespace: in network namespace?
           privateDirs: list of private directory strings or tuples
           params: Node parameters (see config() for details)"""

        # Make sure class actually works
        self.checkSetup()

        self.name = params.get( 'name', name )
        self.privateDirs = params.get( 'privateDirs', [] )
        self.inNamespace = params.get( 'inNamespace', inNamespace )

        # Stash configuration parameters for future reference
        self.params = params

        self.intfs = {}  # dict of port numbers to interfaces
        self.ports = {}  # dict of interfaces to port numbers
                         # replace with Port objects, eventually ?
        self.nameToIntf = {}  # dict of interface names to Intfs

        # Make pylint happy
        ( self.shell, self.execed, self.pid, self.stdin, self.stdout,
            self.lastPid, self.lastCmd, self.pollOut ) = (
                None, None, None, None, None, None, None, None )
        self.waiting = False
        self.readbuf = ''

        # Start command interpreter shell
        self.startShell()
        self.mountPrivateDirs()

    # File descriptor to node mapping support
    # Class variables and methods

    inToNode = {}  # mapping of input fds to nodes
    outToNode = {}  # mapping of output fds to nodes

```
這邊可以看到，這邊會有一個變數inNamespace用來決定此Host是否要透過network namespaces來達到network isolation的功能，當一切變數都初始化後，就會呼叫startShell()來執行此Host。


node.py
``` Python
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
    # Spawn a shell subprocess in a pseudo-tty, to disable buffering
    # in the subprocess and insulate it from signals (e.g. SIGINT)
    # received by the parent
    master, slave = pty.openpty()
    self.shell = self._popen( cmd, stdin=slave, stdout=slave, stderr=slave,
                              close_fds=False )
    self.stdin = os.fdopen( master, 'rw' )
    self.stdout = self.stdin
    self.pid = self.shell.pid
    self.pollOut = select.poll()
    self.pollOut.register( self.stdout )
    # Maintain mapping between file descriptors and nodes
    # This is useful for monitoring multiple nodes
    # using select.poll()
    self.outToNode[ self.stdout.fileno() ] = self
    self.inToNode[ self.stdin.fileno() ] = self
    self.execed = False
    self.lastCmd = None
    self.lastPid = None
    self.readbuf = ''
    # Wait for prompt
    while True:
        data = self.read( 1024 )
        if data[ -1 ] == chr( 127 ):
            break
        self.pollOut.poll()
    self.waiting = False
    # +m: disable job control notification
    self.cmd( 'unset HISTFILE; stty -echo; set +m' )
```

這邊可以觀察到，mininet是透過一隻叫做mnexec的程式來執行

`mnexec`
透過參數-n來將此process給轉換到network namespaces中

當初始化兩個Host後，系統中就會出現了兩個Host，且這兩個host都會透過namespace來達到network isolation，

理論上我們要可以透過ip netns show來看到這些namespaces，實際上卻看不到，原因如同此篇所說。
https://mailman.stanford.edu/pipermail/mininet-discuss/2014-January/003796.html
此時，我們的系統如下

創立好Host後，接下來要創立Switch
Switch有很多種選擇，包含了OVSLegacyKernelSwitch、UserSwitch、OVSSwitch，IVSSwitch此四種，

一般常用的就是OVSSwitch

這四種Switch都繼承自Switch物件，而Switch物件則繼承自Node
    Switch
    OVSLegacyKernelSwitch
    UserSwitch
    OVSSwitch
    IVSSwitch


此時系統如下，系統中已經創立好了switch以及兩個host，這三個Node都分別透過namespace來達到了network isolation，只是彼此之間都尚未有任何Link存在。
