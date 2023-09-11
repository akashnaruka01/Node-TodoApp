import mongoose from "mongoose";


export const connectDB = () => {
    mongoose
  .connect(process.env.database_uri, {
    dbName: "backendapi",
  })
  .then((c) => {
    console.log(`database connected with ${c.connection.host}`);
  })
  .catch(() => {
    console.log("error in connnecting database");
  });
}
