import mongoose from "mongoose";


export const connectDB = () => {
    mongoose
  .connect(process.env.database_uri, {
    dbName: "backendapi",
  })
  .then(() => {
    console.log("database connected succesfully");
  })
  .catch(() => {
    console.log("error in connnecting database");
  });
}
