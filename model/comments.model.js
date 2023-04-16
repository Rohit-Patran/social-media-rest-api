import mongoose from "mongoose";
const commentSchema = mongoose.Schema({
    postId : {
        type : String,
    },
    content : {
        type : String,
        required : true
    },
    comment_by : {
        type : Object,
        default : {}
    },
} , {
    versionKey : false,
    timestamps : true
});

const commentschema = mongoose.model("comments" , commentSchema , "comments");
export default commentschema;