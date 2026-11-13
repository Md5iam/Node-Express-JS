import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server: Server = createServer((req : IncomingMessage, res: ServerResponse)=>{
  // console.log( "Request :", req);
  // console.log( "Response :", res);
  // console.log(req.url);
  // console.log(req.method);
  const url = req.url; // "/" , "/products"
  const method = req.method; // "GET", "POST"

  if (url === "/" && method === "GET"){
    // console.log("This is root route");

    // res.writeHead(200,{"Content-Type": "text/plain"});
    // res.end("This is Root Route");

    res.writeHead(200,{"Content-Type": "application/json"});
    res.end(JSON.stringify({message: "This is Root Route"}));
  }
  else if(url?.startsWith("/products")){
    res.writeHead(200,{"Content-Type": "application/json"});
    res.end(JSON.stringify({message: "This is Product Route"}));
  }
  else{
    // console.log("This route us not define");

    // res.writeHead(404,{"Content-Type": "text/plain"});
    // res.end("This route us not define");

    res.writeHead(404,{"Content-Type": "application/json"});
    res.end(JSON.stringify({message: "This route us not define"}));
  }
})
server.listen(5000, ()=>{
  console.log("Server is running!!");
})