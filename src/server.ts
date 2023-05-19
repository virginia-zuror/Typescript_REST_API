import * as dotenv from "dotenv";

const result = dotenv.config();

if(result.error){
    console.log("Error loading environment variables, aborting");
    process.exit(1);
    
}


import * as express from "express";
import { root } from "./routes/root";
import { isInteger } from "./routes/utils";
import { logger } from "./logger";


const app = express();


const mongoose = require("mongoose");

const mongoDb = process.env.MONGO_URI;

let connection;

const connect = async () => {
  mongoose.set("strictQuery", true);

  if (connection) return connection;

  try {
    connection = await mongoose.connect(mongoDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection.connection.on("error", (error) => {
      logger.error(`DB connection error: ${error.message}`);
    });
    connection.connection.on("disconnected", () => {
      logger.error(`DB disconnected, reconnecting...`);
      connect();
    });
    logger.info(`Connected to DB: ${connection.connection.name}`);
    

  } catch (error) {
    logger.error(`Not connect to DB: ${error.message}`);
  }
  return connection;
};

connect();

function setupExpress(){


    app.route("/").get(root);

}

/* function startServer(){ */
    
    let port:number;
    const portEnv = process.env.PORT,
    portArg = process.argv[2];
    
    if(isInteger(portEnv)){
        port = parseInt(portEnv);
    }

    if(!port && isInteger(portArg)){
        port = parseInt(portArg);
    }
    if(!port){
        port = 9000;
    }

    

    app.listen(port, ()=>{
        setupExpress();
        
        logger.info(`HTTP REST API Server is now running at http://localhost:${port}`);
        
    })

/* } */



