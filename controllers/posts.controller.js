import postschema from "../model/posts.model.js";
import userschema from "../model/users.model.js";
import commentschema from "../model/comments.model.js";
async function createPost(request , response)
{
    const user = await userschema.findOne({username : request.user.username});
    const post = new postschema({
        ...request.body , 
        created_by : {
            id : user.id , 
            username : user.username
        }
    });
    try{
        await post.save();
    }
    catch(error)
    {
        response.status(403).send(error.message);
    }
    response.send("post created");
}

async function deletePost(request , response)
{
    try{
        await postschema.findByIdAndDelete({_id : request.params.id});
    }
    catch(error)
    {
        response.status(403).send(error.message);
    }

    response.send("post deleted");
    
}

async function likePost(request , response)
{
    try{
        await postschema.findByIdAndUpdate({_id : request.params.id} , {$inc : {likes : 1}});
    }
    catch(error)
    {
        response.status(403).send(error);
    }
    response.send("post liked");
}
async function unlikePost(request , response)
{
    try{
        await postschema.findByIdAndUpdate({_id : request.params.id} , {$inc : {likes : -1}});
    }
    catch(error)
    {
        response.status(403).send(error);
    }
    response.send("post unliked");
}

async function commentPost(request , response)
{
    const user = await userschema.findOne({username : request.user.username});
    const comment = new commentschema({
        ...request.body,
        comment_by : {
            id : user.id,
            username : user.username
        },
        postId : request.params.id
    });
    await comment.save();
    try{
        await postschema.findByIdAndUpdate({_id : request.params.id} , {$push : {comments : comment.comment_by.id}});
    }
    catch(err)
    {
        response.status(403).send(err.message);
    }
    response.send(`comment-ID : ${comment.id}`);
}
async function getPost(request , response)
{
    try{
        const post = await postschema.findById({_id : request.params.id});
        const comment = await commentschema.find({postId : request.params.id});
        const contentOfComment = [];
        comment.forEach(comment => contentOfComment.push(comment.content));
        response.send({
            id : post.id,
            likes : post.likes,
            comments : contentOfComment
        });
    }
    catch(error)
    {
        response.status(403).send(`${error.message}`)
    }

}

async function getAllPost(request , response)
{
    try{
        const user = await userschema.findOne({username : request.user.username});
        const posts = await postschema.find({'created_by.username' : `${user.username}`});
        const responseArray = [];
        posts.forEach(post => responseArray.push(
            {
                id : post._id,
                title : post.title,
                desc : post.desc,
                created_at : post.created_at,
                comments : post.comments,
                likes : post.likes
            }
        ))
        response.send(responseArray);
    }
    catch(error)
    {
        response.status(403).send(error.message);
    }
    
}
export default {createPost , deletePost , likePost , unlikePost , commentPost , getPost , getAllPost};