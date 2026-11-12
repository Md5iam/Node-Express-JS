// const value = require("./file1")
const {a , b} = require("./file1")
const add = require("./utils/add")

// console.log(value.a + " " + value.b);
console.log(a + " " + b);
console.log(add(a , b));