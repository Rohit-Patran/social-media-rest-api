# social-media-rest-api
It is a social media REST API with JWT authentication

## to see this REST API in action use POSTMAN tool and hit the URL : https://socio-api-oq0f.onrender.com/

## in order to access the mentioned routes : the credentials you need:
this should be in the body of the postman as JSON 
{
  "username" : "ram",
  "email" : "ram@email.com"
}
and hit the authenticate route -- you get the JWT_KEY and use it in your headers with Authorization : JWT_KEY

after this we can access the routes mentioned.
