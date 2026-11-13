import path from "node:path";

const filePath = path.join(process.cwd(), "./src/databse/db.json" ); 

const productService = ()=>{
  console.log(filePath)
}

export default productService