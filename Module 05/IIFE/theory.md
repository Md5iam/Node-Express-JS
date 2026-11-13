## IIFE stands for Immediately Invoked Function Expression.
It is a JavaScript function that is defined and executed immediately, without needing to call it separately.

```js
function greet() {
  console.log("Hello World");
}

// We must call the function
greet();
```
Using IIFE we can write

```js
(()=>{
  function greet() {
    console.log("Hello World");
  }
  greet();
})();
```
