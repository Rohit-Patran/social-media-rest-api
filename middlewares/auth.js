import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function auth(request , response , next)
{
    const jwtToken = jsonwebtoken.sign(request.body, process.env.SECRET_KEY , {algorithm : 'HS512'});
    jsonwebtoken.verify(jwtToken , process.env.SECRET_KEY , (error , data) =>{
        (data) ? next() : response.status(401).send(`ERROR : ${error.message}`);
    });
    
};

function userauth(request , response , next)
{
    const authHeaderToken = request.headers["authorization"];
    if(authHeaderToken == null)
    {
        response.status(401).send("unauthorized access");
    };
    jsonwebtoken.verify(authHeaderToken , process.env.SECRET_KEY , (error , data) =>{
        if(data)
        {
            request.user = data;
            next();
        }
        else{
            response.status(401).send(`ERROR : ${error.message}`);
        }
    });
    
}

export default {auth , userauth};