import express, { Application, Request, Response } from "express"
import {pool } from './db';
import { userRoute } from "./modules/users/user.route";
import { profileRouter } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import fs from "fs"

const app: Application = express()

app.use((req, res, next) => {
  // console.log('Method -> URL -> Time:', req.method, req.url, Date.now());
  const log = `\nMethod : ${req.method} | URL : ${req.url} | Time : ${Date.now()}\n`;
  fs.appendFile("logger.txt", log, (err)=>{
    console.log(err);
  });
  next();
});

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
app.use("/api/v1/profiles", profileRouter);
app.use("/api/v1/auth", authRoute);


export default app;