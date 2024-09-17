import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

export const connectdb = () => {
  mongoose
    .connect("mongodb://localhost:27017", {
      dbName: "Collaborative_Document",
    })
    .then(() => {
      console.log(`database connected `);
    })
    .catch((e) => {
      console.log(e.message);
    });
};
