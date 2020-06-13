const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req,res){
    //populate the user of each of post
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    return res.json(200, {
        message: "List of Posts",
        posts: posts
    });
}
module.exports.destroy = async function(req,res){
    try {
        let post = await Post.findById(req.params.id);
           post.remove();   
           await Comment.deleteMany({post: req.params.id});
           return res.json(200,{
               message: "Posts and associated comments deleted successfully"
           });
    
    } catch (err) { 
        console.log(err);
        return res.json(200,{
            message: "Internal Server Error"
        });
    }
}