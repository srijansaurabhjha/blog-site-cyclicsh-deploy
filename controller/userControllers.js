const User=require('../model/userModel.js');

const signUp=async(req,res)=>{
    try{
       const {name,email,password,pic}=req.body;
       if(!name||!email||!password){
          res.status(400).send("Plz enter all required fields");
          throw new Error("Plz enter all required fields");
       }

       const userAlreadyExist=await User.findOne({
         email:email,
       });

       if(userAlreadyExist){
        res.status(400).send("User Already Exist");
        throw new Error("User Already exists");
       }
       
       if(pic){
          const newUser=await User.create({
            name:name,
            email:email,
            password:password,
            pic:pic,
          });

          if(newUser){
             res.status(201).send({
               _id:newUser._id,
               name:newUser.name,
               email:newUser.email,
               password:newUser.password,
               pic:newUser.pic,
            })
         }else{
               res.status(400).send("SignUp failed");
              throw new Error("SignUp failed");
         }

      }else{
         const newUser=await User.create({
            name:name,
            email:email,
            password:password,
          });

          if(newUser){
             res.status(201).send({
               _id:newUser._id,
               name:newUser.name,
               email:newUser.email,
               password:newUser.password,
               pic:newUser.pic,
            })
         }else{
               res.status(400).send("SignUp failed");
              throw new Error("SignUp failed");
         }
      }
    }catch(err){
        console.log(err.message);
    }
}


const login=async(req,res)=>{
   try{
      const {email,password}=req.body;
      if(!email||!password){
         res.status(400).send("Plz enter all required fields");
         throw new Error("Plz enter all required fields");
      }

      const existingUser=await User.findOne({
         email:email
      });

      if(existingUser){
         if(password===existingUser.password){
            res.status(201).send({
               _id:existingUser._id,
               name:existingUser.name,
               email:existingUser.email,
               password:existingUser.password,
               pic:existingUser.pic,
            })
         }else{
            res.status(400).send("Wrong credentials");
            throw new Error("Login failed");             
         }
      }else{
         res.status(400).send("Wrong credentials");
         throw new Error("Login failed");        
      }
   }catch(err){
      console.log(err.message);
   }
}

const editProfile=async(req,res)=>{
   try{
      const {userId,name,email,password,pic}=req.body;
      
      const newUser=await User.findByIdAndUpdate(userId,{name,email,password,pic},{new:true});

      res.status(201).send({
         _id:newUser._id,
         name:newUser.name,
         email:newUser.email,
         password:newUser.password,
         pic:newUser.pic,
      });
   }catch(err){
      console.log(err.message);
   }
}

module.exports={signUp,login,editProfile};