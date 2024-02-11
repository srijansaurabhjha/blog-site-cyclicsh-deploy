const Blog=require('../model/blogModel.js');

const addBlog=async(req,res)=>{
    try{
        const {author,title,desc,file}=req.body;

        if(!author||!title||!desc){
            res.status(400).send("Plz enter all necessary fields");
            throw new Error("Plz enter all required fields");
        }

        if(file){
            const newBlog=await Blog.create({
                author,title,desc,file
            });

            if(newBlog){
                res.status(201).send({
                    author:newBlog.author,
                    title:newBlog.title,
                    desc:newBlog.desc,
                    file:newBlog.file
                });
            }else{
                res.status(400).send("Blog addition failed");
                throw new Error("Blog addition failed");
            }
        }else{
            const newBlog=await Blog.create({
                author,title,desc
            });

            if(newBlog){
                res.status(201).send({
                    author:newBlog.author,
                    title:newBlog.title,
                    desc:newBlog.desc,
                });
            }else{
                res.status(400).send("Blog addition failed");
                throw new Error("Blog addition failed");
            }
        }
    }catch(err){
        console.log(err.message);
    }
}

const getAllBlog=async(req,res)=>{
    try{
        const q=req.query.q.toLowerCase();
        const Blogs=await Blog.find().populate('author','name');
        Blogs.reverse();
        const searchedBlogs=Blogs.filter((b)=>{
           return(
             b.title.toLowerCase().includes(q) || 
             b.author.name.toLowerCase().includes(q) ||
             b.desc.toLowerCase().includes(q)
           )
        });
        res.status(201).send(searchedBlogs)
    }catch(err){
        console.log(err.message);
        res.status(400).send("Unsuccessful retrival of blogs");
    }
}


const editBlog=async(req,res)=>{
    try{
        const {author,title,desc,file,blogId}=req.body;

        const newBlog=await Blog.findByIdAndUpdate(blogId,{author,title,desc,file},{new:true}).populate('author','name');

        res.status(201).send(newBlog)
    }catch(err){
        console.log(err.message);
        res.status(400).send("Unsuccessful updation of Blog")
    }
}

const deleteBlog=async(req,res)=>{
    try{
        const blogId=req.params.id;
        const response=await Blog.deleteOne({_id:blogId});
        res.status(201).send("Deletion successful");
    }catch(err){
        console.log(err.message);
        res.status(400).send("Unsuccessful deletion of Blog");
    }
}

module.exports={addBlog,getAllBlog,editBlog,deleteBlog};