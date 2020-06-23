const nodeMailer = require('../config/nodemailer');
//newCOmment = function...
// module.exports = newComment
//another direct way to exporting a method
exports.newComment = (comment) =>{
    console.log('inside new comment mailer',comment);
    nodeMailer.transporter.sendMail({
        from: 'agarg2311@ymail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: '<h1>Yup , Your comment is now published</h1>'
    },(err,info)=>{
        if(err)
        {
            console.log('error in sending mail',err);
            return;
        }
        console.log('Message sent',info);
        return;
    });
}