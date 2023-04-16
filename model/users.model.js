import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    } , 
    email : {
        type : String,
        required : true,
        unique : true
    } , 
    followers : {
        type : Array,
        default : [],
    } , 

    followersCount : {
        type : Number , 
        default : 0
    } , 
    following : {
        type : Array,
        default : [],
    } , 
    followingCount : {
        type : Number , 
        default : 0
    }

} , {versionKey : false});

const userschema = mongoose.model("users" , userSchema , "users");
export default userschema;