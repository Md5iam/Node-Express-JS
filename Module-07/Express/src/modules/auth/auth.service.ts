import bcrypt from "bcryptjs";
import { pool } from "../../db";

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  // Check if user exist in DB
  // Check if the password match
  // Check the user status
  // Generate JWT if all pass

  const { email, password } = payload;
  const user = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
  `,
    [email],
  );
  if (user.rowCount === 0) {
    throw Error("Invalid credentials !!");
  }
  // console.log(user.rows[0])

  const matchPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!matchPassword) {
    throw new Error("Invalid credentials !!");
  }

  if (!user.rows[0].is_active){
    throw new Error("Access denied !!");
  }
};

export const authService = {
  loginUserIntoDB,
};
