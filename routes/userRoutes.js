const express=require('express');
const {signUp,login,editProfile}=require('../controller/userControllers.js')

const router=express.Router();

//for signUp
router.post('/signup',signUp);

//for login
router.post('/login',login);

//edit Profile
router.put("/editProfile",editProfile);

module.exports=router;