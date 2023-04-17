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
    response.send("<center><h1>Welcome to Social media REST API</h1><br><p>Try out the mentioned routes using <strong>POSTMAN</strong> to the above URL</p><br><p>For more info visit this github repo --> <a href='https://github.com/Rohit-Patran/social-media-rest-api' target='_blank'>link</a></p></center>");
});
app.use("/api" , router);


dbConnection()
.then(() => app.listen(PORT , () => console.log(`backend started at ${PORT}`)))
.catch(error => console.log(error));

