import path from "node:path";
import fs from "node:fs"

const filePath = path.join(process.cwd(), "./src/database/db.json" ); 

export const productService = ()=>{
  const result = fs.readFileSync(filePath , "utf-8");
  return JSON.parse(result);
}

export const createProduct = (payload: any)=>{
  fs.writeFileSync(filePath, payload);
};