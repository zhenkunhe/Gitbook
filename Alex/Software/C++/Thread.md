# Thread
[TOC]
## std::condition_variable

### 1 說明
- 使Thread與Thread之間有著`等待`與`通知`的機制
- 因此最主要會有兩個功能的function:`wait`&`signal`
- 呼叫`wait`的Thread一般被定位成`consumer`
- 呼叫`signal`的Thread一般被定位成`Productor`或`Worker`

### 2 進階說明

### 3 範例
```cpp
#include <iostream>                // std::cout
#include <thread>                // std::thread
#include <mutex>                // std::mutex, std::unique_lock
#include <condition_variable>    // std::condition_variable

std::mutex mtx; // 全局互斥锁.
std::condition_variable cv; // 全局条件变量.
bool ready = false; // 全局标志位.

void do_print_id(int id)
{
    std::unique_lock <std::mutex> lck(mtx);
    while (!ready) // 如果标志位不为 true, 则等待...
        cv.wait(mtx); // 当前线程被阻塞, 当全局标志位变为 true 之后,
    // 线程被唤醒, 继续往下执行打印线程编号id.
    std::cout << "thread " << id << '\n';
}

void go()
{
    std::unique_lock <std::mutex> lck(mtx);
    ready = true; // 设置全局标志位为 true.
    cv.notify_all(); // 唤醒所有线程.
}

int main()
{
    std::thread threads[10];
    // spawn 10 threads:
    for (int i = 0; i < 10; ++i)
        threads[i] = std::thread(do_print_id, i);

    std::cout << "10 threads ready to race...\n";
    go(); // go!

  for (auto & th:threads)
        th.join();

    return 0;
}
```

## note
std::condition_variable
wait
wait_for
wait_until
notify_one
notify_all

## mutex
std::mutex
timed_mutex
recursive_mutex
recursive_timed_mutex
lock
unlock

## lock
std::unique_lock
std::lock_guard
std::lock

## thread
std::thread
如果不使用调用t.join()就会遇到 “terminate called whithout an active exception”,但是在使用boost:thread的时候却没遇到这个问题，google了一下，找到答案:
大意是说，在~thread();前没有调用join()则会遇到问题很难调试，如果不想调用join()等线程结束的话你可以调用detach().这样就不会遇到”terminate called whithout an active exception”
如下:
{
std::thread t(func);
t.detach();
}

std::this_thread
get_id()可以用來取得目前的執行序的 id（型別是 thread::id）也可以透過 std::thread 的物件的 get_id() 這個 member function 來取得（例如：mThread.get_id()）。這個功能主要是可以用來識別不同的執行序，有的時候是用的到的。
yield() CPU還是吃滿滿 是暫時放棄一段 CPU 時間、讓給其他執行序使用的；這個應該算是比較進階的使用了，在這邊暫時跳過，之後有機會再整理。
sleep_for() CPU不會吃到 和 sleep_until() 則是用來讓目前的執行序暫時停下來的，前者是停止一段指定的時間、後者則是設定一個絕對時間、讓執行序在指定的時間再繼續執行；而時間的參數，則是要使用 std::chrono（MSDN）的 duration（範例）和 time_point（範例）這兩種型別的時間資料。

## future
std::future
async
get
valid
wait
wait_for
wait_until

future_status::ready 共享状态的标志已经变为 ready，即 Provider 在共享状态上设置了值或者异常。
future_status::timeout 超时，即在规定的时间内共享状态的标志没有变为 ready。
future_status::deferred 共享状态包含一个 deferred 函数

std::chrono::milliseconds
std::chrono::seconds

## atomic
std::atomic
std::atomic_flag
test_and_set() 函数检查 std::atomic_flag 标志，如果 std::atomic_flag 之前没有被设置过，则设置 std::atomic_flag 的标志，并返回先前该 std::atomic_flag 对象是否被设置过，如果之前 std::atomic_flag 对象已被设置，则返回 true，否则返回 false。