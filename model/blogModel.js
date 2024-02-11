const mongoose=require('mongoose');

const blogModel=mongoose.Schema({
     title:{
        type:String,
        trim:true,
        required:true
     },
     desc:{
        type:String,
        trim:true,
        required:true,
     },
     file:{
        type:String,
     },
     author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
     }
},{
    timestamp:true,
})

const Blog=mongoose.model('Blog',blogModel);

module.exports=Blog;