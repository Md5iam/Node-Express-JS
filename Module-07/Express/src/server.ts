import express, { Application, Request, Response } from "express"
const app: Application = express()
const port = 5000

app.use(express.json())
app.use(express.text());
app.use(express.urlencoded({extended: true}))

app.get('/', (req: Request, res: Response) => {
  console.log(req);
  // res.send('Hello Siam!');
  res.status(200).json({
    success:true,
    message: "This is root route",
    author: "SIAM"
  });
});

app.post("/", async(req, res)=>{
  console.log(req.body);
})

app.listen(port, () => {
  console.log(`The Express server is running in ${port}`)
})