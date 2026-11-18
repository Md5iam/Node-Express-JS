import express, { Application, Request, Response } from "express"
import {pool } from './db';
import { userRoute } from "./modules/users/user.route";
const app: Application = express()

app.use(express.json())
app.use(express.text());
app.use(express.urlencoded({extended: true}))


app.get('/', (req: Request, res: Response) => {
  // console.log(req);
  // res.send('Hello Siam!');
  res.status(200).json({
    success:true,
    message: "This is root route",
    author: "SIAM"
  });
});


app.use("/api/v1/users" , userRoute);



export default app;