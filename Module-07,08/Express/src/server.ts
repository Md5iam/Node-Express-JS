import app from "./app";
import config from "./config";
import { initDB } from "./db";

app.listen(config.port, () => {
  initDB();
  console.log(`The Express server is running in ${config.port}`)
})