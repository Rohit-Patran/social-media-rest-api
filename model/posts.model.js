import mongoose from "mongoose";
const postSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        default : ""
    } , 
    desc : {
        type : String,
        default : ""
    } , 
    comments : {
        type : Array,
        default : []
    } , 
    likes : {
        type : Number,
        default : 0
    } , 
    created_by : {
        type : Object,
        default : {}
    },
} , {
    versionKey : false,
    timestamps : true
});

const postschema = mongoose.model("posts" , postSchema , "posts");
export default postschema;