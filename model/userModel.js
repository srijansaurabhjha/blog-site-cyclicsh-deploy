const mongoose=require('mongoose');

const userModel=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    pic:{
        type:String,
        default:'https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg'
    }
},{
    timestamps:true,
})

const User=mongoose.model('User',userModel);

module.exports=User;