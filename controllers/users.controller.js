import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import userschema from "../model/users.model.js";

dotenv.config();

function authenticate(request , response , next)
{
    const jwtToken = jsonwebtoken.sign(request.body , process.env.SECRET_KEY , {algorithm : 'HS512'});
    jsonwebtoken.verify(jwtToken , process.env.SECRET_KEY , (error , data) =>{
        (data) ? response.send(`JWT TOKEN : ${jwtToken}`) : response.status(401).send(`ERROR : ${error.message}`);
    });
}

async function createUser(request , response)
{
    const user = new userschema({...request.body});
    try
    {
        const newuser = await user.save();
        (!newuser) ? response.send("user profile created") : response.send("user profile not created");
    }
    catch(error)
    { 
        console.log(error) 
    };
}
async function follow(request , response)
{
    const followUser = await userschema.findById(request.params.id);
    const currentUser = await userschema.findById(request.body.id);

    if(!currentUser.following.includes(followUser.id))
    {
        let followStatus = await followUser.updateOne(
            {
                $push : {followers : request.body.id} , 
                $inc : {followersCount : 1}
            }
        );

        followStatus = await currentUser.updateOne(
            {
                $push : {following : request.params.id} , 
                $inc : {followingCount : 1}
            }
        );

        (followStatus) ? response.send(`${currentUser.username} successfully followed ${followUser.username}`) : response.send(`ERROR`);
    }
    else{
        response.send(`${currentUser.username} already follows ${followUser.username}`);
    }
}

async function unfollow(request , response)
{
    const followUser = await userschema.findById(request.params.id);
    const currentUser = await userschema.findById(request.body.id);

    if(currentUser.following.includes(followUser.id))
    {
        let followStatus = await followUser.updateOne(
            {
                $pull : {followers : request.body.id} , 
                $inc : {followersCount : -1}
            }
        );

        followStatus = await currentUser.updateOne(
            {
                $pull : {following : request.params.id} , 
                $inc : {followingCount : -1}
            }
        );

        (followStatus) ? response.send(`${currentUser.username} successfully unfollowed ${followUser.username}`) : response.send(`ERROR`);
    }
    else{
        response.send(`${currentUser.username} already unfollows ${followUser.username}`);
    }
}

async function getUser(request , response)
{
    const user = await userschema.findOne({username : request.user.username});
    response.send({
        username : user.username,
        followers : user.followersCount,
        following : user.followingCount
    });
}
export default {authenticate , createUser , follow , unfollow , getUser};