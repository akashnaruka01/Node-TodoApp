import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

app.listen(process.env.port, () => {
  console.log(`server is working on port ${process.env.port} in ${process.env.NODE_ENV} mode`);
}); 
