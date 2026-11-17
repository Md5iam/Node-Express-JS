import express, { Application, Request, Response } from "express"
import {Pool} from "pg"
const app: Application = express()
const port = 5000

app.use(express.json())
app.use(express.text());
app.use(express.urlencoded({extended: true}))

const pool =  new Pool({
  connectionString: "postgresql://neondb_owner:npg_6XcVnaj2KvsR@ep-silent-cell-ao8j4e4f.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=false&channel_binding=require"
});
// console.log(pool);


const initDB = async () => {
try {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      age INT,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log("Database connected!!");
} catch (error) {
  console.log(error);
}
};

initDB();


app.get('/', (req: Request, res: Response) => {
  // console.log(req);
  // res.send('Hello Siam!');
  res.status(200).json({
    success:true,
    message: "This is root route",
    author: "SIAM"
  });
});

app.post("/", async(req, res)=>{
  // console.log(req.body);
  const {name , age, password} = req.body;
  // console.log(password);
  
  res.status(200).json({
    success:true,
    message: "This is test API",
    data: {name, age}
  });
})

app.listen(port, () => {
  console.log(`The Express server is running in ${port}`)
})