import path from "node:path";
import fs from "node:fs"

const filePath = path.join(process.cwd(), "./src/database/db.json" ); 

const productService = ()=>{
  // readFileSync return data by default in buffer
  const result = fs.readFileSync(filePath , "utf-8");
  // console.log(result.toString());
  console.log(result);
  return JSON.parse(result);
}

export default productService