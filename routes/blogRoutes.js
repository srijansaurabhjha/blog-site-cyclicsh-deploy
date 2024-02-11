const express=require('express');
const {addBlog,getAllBlog,editBlog,deleteBlog}=require('../controller/blogController.js');

const router=express.Router();

//add blog
router.post("/add",addBlog);

//get all blogs
router.get("/allBlogs",getAllBlog);

//edit blog
router.put("/edit",editBlog);

//delete blog
router.delete("/delete/:id",deleteBlog);

module.exports=router;