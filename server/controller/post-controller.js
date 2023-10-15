import Post from "../model/post.js"
import mongoose from "mongoose";
export const createPost = async(req,res)=>{
    try{
       
        const post = await new Post(req.body)
        await post.save();
        return res.status(200).json({
            message:"Post saved Succesfullyzz"
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Error"
        })
    }   
}

export const getAllPosts = async(req,res)=>{
    let category = req.headers["params"];
    let posts
    try{
        if(category){
            posts = await Post.find({
                categories:category
                       
            })
        }
        else{
            posts = await Post.find({})


        } 
        
        return res.status(200).json(posts)
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:err.message
        })
    }
}

export const getPost = async(req,res)=>{
    try{
        const id = req.headers["id"];
        const post = await Post.findById(id);
        return res.status(200).json(post)

    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}
export const updatePost = async(req,res)=>{
    try{
        const id = req.headers["id"];
        const post =  await Post.findById(id);
        if(!post){
            return res.status(404).json({
                message:"Post not Found"
            })
        }
        await Post.findByIdAndUpdate(id,{$set:req.body})
        return res.status(200).json({
            message:"Post Updated Succesfully"
        })
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

export const deletePost = async(req,res)=>{
    try{
        const id = req.params.id
        console.log(id)
        const post = await Post.findByIdAndDelete(id);
        if(!post){
            return res.status(404).json({
                message:"Post not Found"
            })
        }
        return res.status(200).json({
            message:"Post deleted SuccesFully"
        })

    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}