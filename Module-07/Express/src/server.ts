import { Message } from './../node_modules/esbuild/lib/main.d';
import express, { Application, Request, Response } from "express"
import { Pool } from 'pg';
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
      email VARCHAR(255) UNIQUE NOT NULL,
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

app.post("/api/v1/users", async(req, res)=>{
  try{
    // console.log(req.body);
    const {name , email, password, age} = req.body;
    // console.log(password);

    const result = await pool.query(`
        INSERT INTO users (name , email, password , age )
        VALUES ($1, $2, $3, $4) RETURNING *
      `,
      [name,email,password, age],
    );
    console.log(result);
    
    res.status(201).json({
      success:true,
      message: "User created!!",
      data: result.rows[0],
    });
  }catch(error: any){
    res.status(500).json({
      success:false,
      message: error?.message,
      error: error,
    });
  }
});

app.get("/api/v1/users", async(req: Request, res: Response)=>{
  try{
    const result = await pool.query(`
      SELECT * FROM users
      `);
    // console.log(result);
    res.status(200).json({
      success:true,
      message: "All users retrived successfully!!",
      data: result.rows,
    });
  }catch(error: any){
    res.status(500).json({
      success:false,
      message: error?.message,
      error: error,
    });
  }
});

app.get("/api/v1/users/:id", async(req: Request, res: Response)=>{
  try{
    const {id} = req.params;
    const result = await pool.query(`
      SELECT * FROM users WHERE id=$1
      `,
    [id],
  );

  // extra add by siam 
  if (result.rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // console.log(result);
  res.status(200).json({
    success:true,
    message: "User retrived successfully!!",
    data: result.rows[0],
  });
  }catch(error: any){
    res.status(500).json({
      success:false,
      message: error?.message,
      error: error,
    });
  }
})

app.put('/api/v1/users/:id', async(req: Request, res: Response)=>{
  try{
    const {id} = req.params;
    const {name, password, age, is_Active} = req.body;
    const result = await pool.query(`
      UPDATE users 
      SET 
      name = COALESCE($1, name),
      password = COALESCE($2, password),
      age = COALESCE($3, age),
      is_Active = COALESCE($4, is_Active),
      updated_at = NOW()
      WHERE id=$5 RETURNING *
    `,
  [name ?? null, password ?? null, age ?? null, is_Active ?? null , id],
);
// console.log(result);
  res.status(200).json({
    success:true,
    message: "User updated successfully!!",
    data: result.rows[0],
  });

  }catch(error: any){
    res.status(500).json({
      success:false,
      message: error?.message,
      error: error,
    });
  }
});

app.listen(port, () => {
  console.log(`The Express server is running in ${port}`)
})