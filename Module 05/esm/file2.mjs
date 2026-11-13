import x from "./file1.mjs"
import { a , b as y } from "./file3.mjs"
import add from "./utils/add.mjs"

console.log(x);
console.log(a , " " + y );
console.log(add(x , y));