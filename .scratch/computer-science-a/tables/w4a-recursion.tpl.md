---
{
  "key": "algo.recursion",
  "title": "Recursion",
  "summary": "The base case and general case of a recursive subroutine, writing and tracing recursive functions in pseudocode and Python, the call stack and unwinding with the stack shown, when recursion is better than iteration, and how a compiler translates recursive code.",
  "concepts": ["acs.algo.recursion"],
  "estimatedMinutes": 60,
  "level": "core"
}
---
## Introduction

A queue of pupils at a school gate in Gweru is waiting for the register to be checked. The teacher asks the first pupil "How many pupils are behind you?" The pupil does not count them all. Instead, the pupil asks the next pupil the same question, who asks the next, and so on, until the last pupil answers "none". Then each pupil adds one to the answer from the pupil behind and passes it forward. The question is solved by passing a *smaller copy of the same question* along the queue. This is the idea of **recursion**.

In programming, a subroutine that calls itself is **recursive**. Recursion gives short, clear solutions to problems that break into smaller versions of themselves, such as the quick sort, searching a binary tree and the factorial. This lesson explains how a recursive subroutine is built, how the computer keeps track of the calls using the stack, and when to prefer recursion or iteration. All outputs were produced by running the code. You should already know functions, procedures and parameters, and have seen a stack.

## Key definitions

:::definition{term="Recursion"}
A way of solving a problem in which a subroutine calls itself with a smaller or simpler version of the problem until a case is reached that can be answered directly.
:::

:::definition{term="Base case"}
The case in a recursive subroutine that is solved directly, without another recursive call. It stops the recursion.
:::

:::definition{term="General case (recursive case)"}
The case in which the subroutine calls itself with arguments that move closer to the base case.
:::

:::definition{term="Call stack"}
The area of memory in which each call of a subroutine stores its return address, parameters and local variables, as a stack frame that is added when the subroutine is called and removed when it returns.
:::

:::definition{term="Unwinding"}
The returns that happen, one after another in reverse order, once the base case has been reached.
:::

## The essential features

Every recursive subroutine needs two things:

1. a **base case** that returns a value (or stops) without calling itself;
2. a **general case** that calls itself with a *smaller or simpler argument*, so that each call gets closer to the base case.

If the base case is missing, or the argument does not move towards it, the calls never stop and the stack runs out of memory.

The **factorial** of n, written n!, is n × (n − 1) × … × 1. It is defined recursively: 1! = 1 (base case) and n! = n × (n − 1)! (general case).

{{factPseudo}}

The Python version, run for real:

{{factPy}}

{{factOut}}

## The call stack and unwinding

:::worked-solution{title="Tracing Factorial(4) with the call stack"}
Each call adds a frame to the stack and none of them can finish until the base case is reached. The table shows every call and every return, with the stack after each event (the oldest call is on the left, the newest on the right).

{{stackTable}}

1. **Winding up**: `Factorial(4)` calls `Factorial(3)`, which calls `Factorial(2)`, which calls `Factorial(1)`. Four frames are on the stack. Nothing has been multiplied yet.
2. **Base case**: `Factorial(1)` returns 1 and its frame is removed.
3. **Unwinding**: `Factorial(2)` completes 2 × 1 = 2, `Factorial(3)` completes 3 × 2 = 6, and `Factorial(4)` completes 4 × 6 = **24**.

There are 4 calls and 4 returns. The maximum stack depth is 4, so the memory used grows in proportion to n.
:::

### The order of statements around the call matters

A statement placed *before* the recursive call runs on the way down; a statement placed *after* it runs on the way back up, in the reverse order. The two Python subroutines below differ only in where `print` is placed:

{{cdPy}}

{{cdOut}}

`countdown` prints on the way down, so 3, 2, 1 appear in the order of the calls. `show` prints after the recursive call, so its prints happen during unwinding and the order is reversed.

### What happens without a base case

{{badPy}}

{{badOut}}

Every call of `bad` makes another call and none returns, so the stack fills until the language stops the program. In Python this is a `RecursionError`.

:::worked-solution{title="Adding up an array recursively"}
The sum of the items of an array from position `Index` onwards is the item at `Index` plus the sum of the items from `Index + 1` onwards. The base case is that beyond the last item the sum is 0.

{{sumPseudo}}

Python version, run for real:

{{sumPy}}

{{sumOut}}

The array is 7, 4, 9, 2. Working from the base case back:

{{sumTable}}

`SumList(5)` is the base case and returns 0; each earlier call adds its own item to the value returned: 2 + 0, then 9 + 2, then 4 + 11, then 7 + 15 = 22.
:::

Other standard recursive subroutines have the same shape. A power function uses `Base ^ Exponent = Base × Base ^ (Exponent − 1)` with the base case `Exponent = 0` returning 1:

{{powPseudo}}

The calls finish in the order shown below for `Power(3, 4)`: the base case first, then each call multiplies its `Base` by the value returned by the call it made.

{{powTable}}

The answer is 3⁴ = 81. Notice that there are five calls in all (exponents 4, 3, 2, 1 and 0), one more than the exponent, because the base case is also a call.

A recursive binary search calls itself on the lower or upper half of the array, with the base cases "the range is empty" and "the middle item is the target". The tree traversals in the lesson on binary trees are recursive too: visit the left sub-tree, the node and the right sub-tree.

## Designing a recursive solution

To write a recursive subroutine, work through three questions:

1. **What is the simplest case that can be answered at once?** This is the base case: the factorial of 1, the sum of no items, a list of one item that is already sorted.
2. **How can a bigger problem be expressed using a smaller one of the same kind?** This is the general case: n! is n times (n − 1)!, the sum is one item plus the sum of the rest.
3. **Does every call move closer to the base case?** The argument must get smaller each time (N − 1, Index + 1, half the range), otherwise the recursion never stops.

After writing the subroutine, test it with the base case itself, then with one step above it, and then with a larger value, tracing the calls and returns each time. A recursive function that returns a value must return on *every* path, because the value of each call is used by the call above it.

Some recursive definitions make more than one recursive call. The Fibonacci numbers are defined by `Fib(N) = Fib(N - 1) + Fib(N - 2)` with `Fib(0) = 0` and `Fib(1) = 1`. Writing this directly is short and clear, but each call makes two further calls, so the number of calls roughly doubles with each increase in N; the earlier lesson on Big O shows that `Fib(20)` makes over twenty thousand calls. For such functions a loop that keeps the last two values is much faster, which is an example of iteration beating recursion.

## Recursion or iteration?

{{compare}}

Any recursive algorithm can be rewritten with a loop and (when needed) a stack of your own. Recursion is preferred when the problem is naturally recursive and the depth is small, such as tree traversal. Iteration is better for simple repetition, when speed or memory is important, or when the depth could be very large.

## How a compiler translates recursive code

A compiler (or interpreter) turns each call into machine instructions that **push a stack frame** holding the return address, the parameters and the local variables, then jump to the start of the subroutine. Each return **pops the frame** and jumps to the saved return address. Because every call has its own frame, each active call has its own copy of the parameters and local variables, which is why `Factorial(3)` can wait for `Factorial(2)` without losing its own `N`. The recursion needs no special machine instructions: it uses the same call and return mechanism as any other subroutine, and the stack is what makes it work.

:::keyfact{title="ZIMSEC and Cambridge"}
Recursion is Form 6 for ZIMSEC and A Level only for Cambridge (Paper 3, topic 19.2 and Paper 4). Both boards expect the base case and general case, writing and tracing a recursive function, the use of the stack and when recursion is a better choice than iteration. Cambridge also asks what a compiler does to translate recursive code.
:::

## Common mistakes

:::mistake{title="No base case, or one that is never reached"}
Without a base case, or with a general case that does not move towards it (calling `Factorial(N)` instead of `Factorial(N - 1)`), the recursion never ends.
:::

:::mistake{title="Forgetting that nothing is returned until unwinding"}
In `Factorial(4)` no multiplication is completed until the base case has returned. Write the calls first, then the returns.
:::

:::mistake{title="Getting the order of output wrong"}
Statements before the recursive call run in call order; statements after it run in the reverse order during unwinding.
:::

:::mistake{title="Saying recursion is always faster or always shorter"}
It is often shorter to write but is usually slower and uses more memory than a loop because of the stack frames.
:::

## Exam tips

:::exam-tip
Cambridge Papers 3 and 4 and ZIMSEC Paper 1 ask you to **identify** the base case and general case, **trace** a recursive function (show the calls, the stack and the returned values), **write** a recursive function, or **explain** the use of the stack. For a trace, list the calls going down and the returns coming back up.
:::

:::exam-tip
"**Explain** one advantage and one disadvantage of recursion": advantage, clear and short code for naturally recursive problems; disadvantage, uses more memory (a stack frame for every call) and may overflow the stack.
:::

## Summary

:::summary
- A recursive subroutine calls itself; it needs a base case that stops the recursion and a general case that moves towards it.
- Each call is placed on the call stack as a frame holding the parameters, local variables and return address.
- No result is completed until the base case is reached; the returns then unwind the stack in reverse order.
- Statements before the recursive call run in call order and statements after it run in reverse order.
- Recursion is clear for naturally recursive problems (trees, divide and conquer) but uses more memory than iteration and can overflow the stack.
:::
