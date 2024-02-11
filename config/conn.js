const mongoose=require('mongoose')

const connectDB=async()=>{
    try{
        const conn=mongoose.connect(process.env.MONGO_URL)
        console.log('DB connected');
    }catch(err){
        console.log(err.message);
        process.exit();
    }
}

module.exports=connectDB;