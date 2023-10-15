import Comment from "../model/comment.js"

export const newComment = async(req,res)=>{
    try{
        const comment = await new Comment(req.body);
        await comment.save();
        res.status(200).json({
            message:"Commment saved Successfully"
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Something went wrong"
        })
    }
}

export const getComments = async(req,res)=>{
    try{
       const comments = await Comment.find({postId:req.params.id})
       res.status(200).json(comments);

    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
export const deleteComment = async(req,res)=>{
    try{

        const comment = await Comment.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message:"Comment deleted Successfully"
            

        })
        
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Problem encountered while deleting commentz"
        })
    }
}