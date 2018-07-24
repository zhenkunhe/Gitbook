# GDB

tags: Linux,GDB

<!--sec data-title="All-Stop Mode" data-id="1" data-nopdf="true" data-collapse=false ces-->

In all-stop mode, whenever your program stops under gdb for any reason, all threads of execution stop, not just the current thread. This allows you to examine the overall state of the program, including switching between threads, without worrying that things may change underfoot.

Conversely, whenever you restart the program, all threads start executing. This is true even when single-stepping with commands like step or next.

In particular, gdb cannot single-step all threads in lockstep. Since thread scheduling is up to your debugging target's operating system (not controlled by gdb), other threads may execute more than one statement while the current thread completes a single step. Moreover, in general other threads stop in the middle of a statement, rather than at a clean statement boundary, when the program stops.

You might even find your program stopped in another thread after continuing or even single-stepping. This happens whenever some other thread runs into a breakpoint, a signal, or an exception before the first thread completes whatever you requested.

Whenever gdb stops your program, due to a breakpoint or a signal, it automatically selects the thread where that breakpoint or signal happened. gdb alerts you to the context switch with a message such as ‘[Switching to Thread n]’ to identify the thread.

On some OSes, you can modify gdb's default behavior by locking the OS scheduler to allow only a single thread to run.

set scheduler-locking mode
    Set the scheduler locking mode. It applies to normal execution, record mode, and replay mode. If it is off, then there is no locking and any thread may run at any time. If on, then only the current thread may run when the inferior is resumed. The step mode optimizes for single-stepping; it prevents other threads from preempting the current thread while you are stepping, so that the focus of debugging does not change unexpectedly. Other threads never get a chance to run when you step, and they are completely free to run when you use commands like ‘continue’, ‘until’, or ‘finish’. However, unless another thread hits a breakpoint during its timeslice, gdb does not change the current thread away from the thread that you are debugging. The replay mode behaves like off in record mode and like on in replay mode.
show scheduler-locking
    Display the current scheduler locking mode. 

By default, when you issue one of the execution commands such as continue, next or step, gdb allows only threads of the current inferior to run. For example, if gdb is attached to two inferiors, each with two threads, the continue command resumes only the two threads of the current inferior. This is useful, for example, when you debug a program that forks and you want to hold the parent stopped (so that, for instance, it doesn't run to exit), while you debug the child. In other situations, you may not be interested in inspecting the current state of any of the processes gdb is attached to, and you may want to resume them all until some breakpoint is hit. In the latter case, you can instruct gdb to allow all threads of all the inferiors to run with the set schedule-multiple command.

set schedule-multiple
    Set the mode for allowing threads of multiple processes to be resumed when an execution command is issued. When on, all threads of all processes are allowed to run. When off, only the threads of the current process are resumed. The default is off. The scheduler-locking mode takes precedence when set to on, or while you are stepping and set to step.
show schedule-multiple
    Display the current mode for resuming the execution of threads of multiple processes.

<!--endsec-->