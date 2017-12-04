# Interface

- 接下來我們要把這些**interface**給綁到特定的`Node`身上

- 在**Link物件**初始化後段，會去**初始化**兩個**Interface真正的物件本體**

link.py
``` python
class Intf( object ):

    "Basic interface object that can configure itself."

    def __init__( self, name, node=None, port=None, link=None,
                  mac=None, **params ):
        """name: interface name (e.g. h1-eth0)
           node: owning node (where this intf most likely lives)
           link: parent link if we're part of a link
           other arguments are passed to config()"""
        self.node = node
        self.name = name
        self.link = link
        self.mac = mac
        self.ip, self.prefixLen = None, None

        # if interface is lo, we know the ip is 127.0.0.1.
        # This saves an ifconfig command per node
        if self.name == 'lo':
            self.ip = '127.0.0.1'
        # Add to node (and move ourselves if necessary )
        moveIntfFn = params.pop( 'moveIntfFn', None )
        if moveIntfFn:
            node.addIntf( self, port=port, moveIntfFn=moveIntfFn )
        else:
            node.addIntf( self, port=port )
        # Save params for future reference
        self.params = params
        self.config( **params )
```

- 這邊要觀察的重點是每個**Interface**都會去呼叫`node.addIntf( self, port=port )`來處理

node.py
``` python
def addIntf( self, intf, port=None, moveIntfFn=moveIntf ):
    """Add an interface.
       intf: interface
       port: port number (optional, typically OpenFlow port number)
       moveIntfFn: function to move interface (optional)"""
    if port is None:
        port = self.newPort()
    self.intfs[ port ] = intf
    self.ports[ intf ] = port
    self.nameToIntf[ intf.name ] = intf
    debug( '\n' )
    debug( 'added intf %s (%d) to node %s\n' % (
            intf, port, self.name ) )
    if self.inNamespace:
        debug( 'moving', intf, 'into namespace for', self.name, '\n' )
        moveIntfFn( intf.name, self  )

```

- 此方法最後會呼叫`moveIntf`來將該**interface**給處理，**moveIntf**則會呼叫`moveIntfNoRetry`將Interface給綁入到每個`Node`中

util.py
``` python
def moveIntf( intf, dstNode, printError=True,
              retries=3, delaySecs=0.001 ):
    """Move interface to node, retrying on failure.
       intf: string, interface
       dstNode: destination Node
       printError: if true, print error"""
    retry( retries, delaySecs, moveIntfNoRetry, intf, dstNode,
           printError=printError )
```

``` python
def moveIntfNoRetry( intf, dstNode, printError=False ):
    """Move interface to node, without retrying.
       intf: string, interface
        dstNode: destination Node
        printError: if true, print error"""
    intf = str( intf )
    cmd = 'ip link set %s netns %s' % ( intf, dstNode.pid )
    cmdOutput = quietRun( cmd )
    # If ip link set does not produce any output, then we can assume
    # that the link has been moved successfully.
    if cmdOutput:
        if printError:
            error( '*** Error: moveIntf: ' + intf +
                   ' not successfully moved to ' + dstNode.name + ':\n',
                   cmdOutput )
        return False
    return True
```

- 可以看到，透過指令`ip link set %s netns %s`，將特定的**interface**塞入特定**Node**的**namespace**之中

- 此時，我們的系統如下

![拓墣](../image/topo.png)

- 最後**OVSSwitch**透過`ovs-vsctl add-port`將**Switch**上面的Interface都給**OVS**控管

node.py
``` python
def attach( self, intf ):
    "Connect a data port"
    self.vsctl( 'add-port', self, intf )
    self.cmd( 'ifconfig', intf, 'up' )
    self.TCReapply( intf )


def vsctl( self, *args, **kwargs ):
    "Run ovs-vsctl command (or queue for later execution)"
    if self.batch:
        cmd = ' '.join( str( arg ).strip() for arg in args )
        self.commands.append( cmd )
    else:
        return self.cmd( 'ovs-vsctl', *args, **kwargs )

```
