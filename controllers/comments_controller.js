const Comment = require('../models/comment');
const Post = require('../models/post');
const commentMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const { Job } = require('kue');
module.exports.create = async function(req,res){
    try {
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
    
            post.comments.push(comment);
            post.save();
            comment=await comment.populate('user', 'name email').execPopulate();

            let job = queue.create('emails', comment).save(function(err){
                if(err)
                {
                    console.log('error in creating a queue',err);
                    return;
                }
                console.log('job enqueued',job.id);
            });

            //commentMailer.newComment(comment);
            if(req.xhr){
                return res.status(200).json({
                 data:{
                     comment: comment
                 },   
                 message: "Comment created!"
                });
            }
            req.flash('success', 'Comment Published!');
            res.redirect('/');
        }
    } catch (err) {
        console.log('Error',err);  
        return; 
    }
}

module.exports.destroy = async function(req,res){
    try {
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
           let post = await Post.findByIdAndUpdate(postId,{$pull: {comments: req.params.id}});
           if(req.xhr){
            return res.status(200).json({
             data:{
                 comment_id: req.params.id
             },   
             message: "Comment Deleted!"
            });
        }
           req.flash('success', 'Comment deleted!');
           return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error',err);  
        return;
    }
}