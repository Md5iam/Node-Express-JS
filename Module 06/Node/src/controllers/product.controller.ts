import type { IncomingMessage, ServerResponse } from "http";
import {createProduct, productService} from "../service/product.service";
import type { Iproduct } from "../types/product";
import { bodyParser } from "../utils/parseBody";

const productController = async (req: IncomingMessage , res: ServerResponse)=>{
  const url = req.url;
  const method = req.method;
  const products = productService();

  // products/1 -> []
  const urlParams = url?.split("/");
  // console.log(urlParams); ["","products","1"]
  const id = urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

  // Get all products
  if ( url === "/products" && method === "GET"){
      res.writeHead(200,{"Content-Type": "application/json"});
      res.end(JSON.stringify({
        message: "Products retrive successfully!!",
        data: products
      }
      ));
  }
  else if ( method === "GET" && id !== null ){
    const product = products.find((p: Iproduct) => p.id === id)
      res.writeHead(200,{"Content-Type": "application/json"});
      res.end(JSON.stringify({
        message: "Product retrive successfully!!",
        data: product
      }
      ));
  }
  else if (method === "POST" && url === "/products"){
    const body = await bodyParser(req);
    console.log(body);
    const newProduct = {
      id: Date.now(),
      ...body
    }
    const products = productService(); // [{},{}]
    products.push(newProduct); // [{},{},{}]
    createProduct(JSON.stringify(products));

      res.writeHead(201,{"Content-Type": "application/json"});
      res.end(JSON.stringify({
        message: "Product created successfully!!",
        data: products
      }

      ));
  }
}

export default productController;