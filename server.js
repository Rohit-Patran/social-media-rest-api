import express from "express";
import dotenv from "dotenv";
import dbConnection from "./database/connection.js";
import router from "./routes/routes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get("/" , (request , response) => {
  response.send("<center><h1>welcome to social media REST API</h1> <br> <h3>try out the mentioned routes using <strong>POSTMAN</strong> to the above URL </h3></center>")
})
app.use("/api" , router);


dbConnection()
.then(() => app.listen(PORT , () => console.log(`backend started at ${PORT}`)))
.catch(error => console.log(error));

