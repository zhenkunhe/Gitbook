# valgrind

tags: valgrind,memory

<!--sec data-title="Introduction" data-id="1" data-nopdf="true" data-collapse=false ces-->

Memory Leak: leak on the heap, memory allocation during runtime

1. Frequent Memory Leak: a code include memory leak is used frequently (most dangerous but relatively easy to find)

2. Occasional Memory Leak: memory leak happens in specific occasion (hard to find)

3. One-Time Memory Leak: only leak once, like in a singleton class (not that dangerous)

4. Implicit Memory Leak: always allocate memory  during the runtime and only free memory until exit (hard to find and dangerous, may hold too much memory and lead to crush )

Examples

1. Forget to free/delete

```c++
void func()
{
    char *oldString = "Old String";
    char* newStrig = strdup(oldString);
    //be careful with c lib-functions which alloc memory inside

    char *textString = malloc(128*sizeof(char));
    ClassTypeA *ptr = new ClassTypeA;
    return;
}
```

Be careful with logic branches

```c++
BassClass * obj = new BaseClass；
if（test something）
    return;
else if (test something)
    do something;
else
    do something;
delete obj;
return;
```

2.Careful with Inheritance, polymorphism 

```c++
BaseClass* obj_ptr = new DerivedClass;
delete obj_ptr;

/*If you are counting on the destructor to delete memory allocated in the constructor beware of this mistake as it will cause a memory leak. */
/*Use a virtual destructor to avoid this problem.*/
```

3.Pointer re-assignment error

```c++
char *a = malloc(128*sizeof(char));
char *b = malloc(128*sizeof(char));
b = a;
free(a);
free(b); // will not free the pointer to the original allocated memory.
```

4.Default copy constructor may not give correct results

```c++
ClassA& operator=(const ClassA& right_hand_side);
/*sallow copy, deep copy?*/
/*Memory allocated by copy constructors for pointer duplication. Check in destructor and delete if necessary. Memory allocated in passing class by value which invokes copy constructor. Also beware, the default copy constructor may not give you the results you want especially when dealing with pointers as the default copy constructor has no knowledge of how to copy the contents of what the pointer points to. To prohibit the use of the default copy constructor define a null assignment operator. And when there is allocation in class, define your own destructor*/

class GCharacter //Game Character
{
private:
    std::string name; 
    int capacity;   //the capacity of our tool array
    int used;       //the nr of elements that we've actually used in that tool array
    std::string* toolHolder; //string pointer that will be able to reference our ToolArray;

public:
    static const int DEFAULT_CAPACITY = 5;
    //Constructor
    GCharacter(std::string n = "John", int cap = DEFAULT_CAPACITY)
    :name(n), capacity(cap), used(0), toolHolder(new string[cap])
    {
    }
}

int main()
{
 GCharacter gc1("BoB", 5); 
 GCharacter gc2("Terry", 5); 
    gc2 = gc1;
    GCharacter gc3 = gc1;
    return 0;
}
```

5. Do not rely on STL containers

```c++
vector<Object *> objects;
for (int i=0;i <10; i++)
{
    Object * obj = new Object;
    objects.push_back(obj);
}
//do something with objects ....
objects.clear();
return;
```

Yes, stl containers will call destruct functions.

But in this case, the container dose not free any memory.

```c++
vector <T> objects;
//when clear object in vector, the vector will call the destructor of T in this way
*T->~T();
```

6. Implicit Memory Leak:  free memory as soon as you don't need it(or need so large)

another stl example:

stl containers always know how and when to expand itself, but they never know when to shrink itself. 

```c++
{
    vector<int> vec;
    for(int64_t i=0; i<1000000000000000000; i++)
        vec.push_back(1);
    //do something
    vec.clear(); /*don't need it anymore*/
    //do a lot of things, maybe online service, never need to stop until next release
}
```

then the 1000000000000000000*sizeof(int) memory will hold forever.

```c++
//if you don't need it
vector<int>().swap(vec) //instead of clear

//if you want to shrink the container size
vector<int>(vec).swap(vec)
```

7. Implicit Memory Leak: heap fragmentation（impossible to be found by tools）

You think the code is memory leak free, but the memory usage always going up and then crush....

Applications that are free from memory leaks but perform dynamic memory allocation and deallocation frequently tend to show gradual performance degradation if they are kept running for long periods. Finally, they crash. Why is this? Recurrent allocation and deallocation of dynamic memory causes the heap to become fragmented, especially if the application allocates small memory chunks (int, an 8 byte object etc.). A fragmented heap can have many free blocks, but these blocks are small and non-contiguous.

imagine that you have a "large" (32 bytes) expanse of free memory: 

---------------------------------- 

 |                                | 

 ----------------------------------

Now, allocate some of it (5 allocations):

---------------------------------- 

 |aaaabbccccccddeeee              | 

 ---------------------------------- 

Now, free the first four allocations but not the fifth:

---------------------------------- 

 |              eeee              | 

 ----------------------------------

Now, try to allocate 16 bytes. Oops, I can't, even though there's nearly double that much free.

On systems with virtual memory, fragmentation is less of a problem than you might think, because large allocations only need to be contiguous in virtual address space, not in physical address space. So in my example, if I had virtual memory with a page size of 2 bytes then I could make my 16 byte allocation with no problem. Physical memory would look like this: 

---------------------------------- 

 | ffffffffffffffeeeeff           | 

 ----------------------------------

whereas virtual memory (being much bigger) could look like this:

------------------------------------------------------... 

 |               eeeeffffffffffffffff

 ------------------------------------------------------... 

The classic symptom of memory fragmentation is that you try to allocate a large block and you can't, even though you appear to have enough memory free. Another possible consequence is the inability of the process to release memory back to the OS (because there's some object still in use in all the blocks it has allocated from the OS, even though those blocks are now mostly unused).

Method to avoid:

1.First of all, use dynamic memory as little as possible. In most cases, you can use static or automatic storage instead of allocating objects dynamically.

2.Secondly, try to allocate large chunks rather than small ones. For example, instead of allocating a single object, allocate an array of objects at once, and use these objects when they are needed.

(Like use reserve() for stl containers)

3. If all these tips don't solve the fragmentation problem, you should consider building a custom memory pool.

8. Implicit Memory Leak: memory not release to OS

When you call free() or delete(), it will NOT really release any memory back to OS. Instead, that memory is kept with the same process until it is terminated. However, this memory can be reused for any future allocations by the same process.

 documentation for libc's free:

    Occasionally,  free can actually return memory to the operating system and make the process smaller. Usually, all it can do is allow a later call to  malloc to reuse the space. In the meantime, the space remains in your program as part of a free-list used internally by  malloc. 

a little deeper by looking at other malloc/free family of functions and saw 'mallopt', and that you can actually change the way malloc/free behave (especially if you're using GNU libc -- pointers about other platform implementations would be helpful). One option that is interesting to look at is M_TRIM_THRESHOLD which:

    This is the minimum size (in bytes) of the top-most, releasable chunk that will cause  sbrk to be called with a negative argument in order to return memory to the system. 


昨天晚上，我徒弟跑过来讲，他的程序的内存占用居高不下，愿意是std::map的clear()没有效果。于是我让他用erase(begin,end); 试试也不行。

代码如下：
View Code

用命令 top -p `ps -ef | grep abc | grep -v grep | awk {'print $2'}`, 一查看，占了104M物理内存。

开始我猜测是stl用了自己的缓冲池，clear()并没有归还给系统。于是我用了boost::unordered_map试试，一查看，占了78M物理内存（看来hashmap比红黑树既快又省空间）。

于是上网查询资料，stl有很多种allocator，默认采用是的new_allocator，并没有使用内存缓冲池，针对不同的应用场合，STL中实现了不同的Allocator。

__gnu_cxx::new_allocator<T> Simply wraps ::operator new and ::operator delete.
__gnu_cxx::malloc_allocator<T> Simply wraps malloc and free. There is also a hook for an out-of-memory handler
__gnu_cxx::debug_allocator<T> A wrapper around an arbitrary allocator A. It passes on slightly increased size requests to A, and uses the extra memory to store size information.
__gnu_cxx::__pool_alloc<bool, int> A high-performance, single pool allocator. The reusable memory is shared among identical instantiations of this type.
__gnu_cxx::__mt_alloc<T> A high-performance fixed-size allocatorthat was initially developed specifically to suit the needs of multi threaded applications
__gnu_cxx::bitmap_allocato A high-performance allocator that uses a bit-map to keep track of the used and unused memory locations

发现stl提供的malloc.h有监控功能，于是修改为下面代码：

```c++
#include <iostream>
#include <string>
#include <map>
#include <boost/unordered_map.hpp>
#include <malloc.h>

using namespace std;
using namespace boost;
void release_map(void)
{
    malloc_stats();
    map<int,string> testmap;
    sleep(2);
    for(int i=0; i<1000000; i++)
    {
        testmap.insert(make_pair(i,"abc"));
    }
    malloc_stats();
    testmap.clear();
    malloc_stats();
}

int main()
{
    release_map();
    getchar();
    return 0;
}
```

发现clear() 其实已经归还内存了，内存的持有是 system bytes 。显然，malloc并没有把这些内存归还给系统，而是缓存起来了。所以说，这个例子的罪魁祸首并不是STL，而是glibc的malloc。好吧，既然找到问题，那就要解决它，虽然glibc的缓存也是一番好意，但是由于实际运行环境不能等到什么用户heap空间内连续空闲内存数据超出一个阈值时才将这片内存归还给内核。

glibc管理内存目前采用的是ptmalloc2，我测试了google的tcmalloc和Jason Evans的jemalloc。

测试很简单，把包downlaod下来并解压，./configure && make && make install即可。

export $LD_PRELOAD="/usr/local/lib/libtcmalloc.so” 或者 export $LD_PRELOAD="/usr/local/lib/libjemalloc.so” (这个要根据自己的实际情况选择路径)

然后编译后可以用ldd查看程序的依赖库。

测试结果：tcmalloc也不归还给系统，而jemalloc的clear后不再占用物理内存。

徒弟问了一句jemalloc靠谱么，我想想淘宝的Tengine，facebook的folly，redis，firefox，freebsd都是用这个，应该是很靠谱的。你上线去测试看看。

附上一张内存分配性能比较图片：

![Performance](images/memory_leak_1.jpg)

```bash
valgrind --leak-check=full --show-leak-kinds=all --track-origins=yes ./pega_iot_gateway_bin hello_world_lin.json
```

可以看到 memory lost 分成幾種類型：

- definitely lost: 真的 memory leak 了
- indirectly lost: 間接的 memory leak，structure 本身發生 memory leak，而內部的 member 如果是 allocate 的出來的，一樣會 memory leak，但是只要修好前面的問題，後面的問題也會跟著修復
- possibly lost: allocate 一塊記憶體，並且放到指標 ptr，但事後又改變 ptr 指到這會計一體的中間 (這一點我目前也不是很清楚，建議看原文說明)
- still reachable: 程式結束時有未釋放的記憶體，不過卻還有指標指著，通常會發生在 global 變數

如果不想 show possibly lost，可以加下面的參數
3.9版 `--show-leak-kinds=definite`
3.7版 `--show-possibly-lost=no`

<!--endsec-->