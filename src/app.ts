import express,{Request,Response} from "express"
import { router } from "./routes/routes";
import { authroute } from "./routes/authroutes";


const body_parser = require('body-parser');


//import { mongoDBConnection } from "./database/data";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// app.use(logger);
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL environment variable is not set!"); // Explicit error for clarity
    }
    mongoose.connect(process.env.MONGODB_URL as string);
    console.log("DB Connected!");

  } catch (err) {
    console.error(`Error details: ${err}`);
  }
  

app.use("/", router);
app.use("/users", authroute);

app.use(authroute);

// app.use(errorHandler);

app.listen( process.env.PORT || 7777 , () => {
    console.log("Server is rocking at 7777");
})
