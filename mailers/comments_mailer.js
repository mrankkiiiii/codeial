const nodeMailer = require('../config/nodemailer');
//newCOmment = function...
// module.exports = newComment
//another direct way to exporting a method
exports.newComment = (comment) =>{
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: 'agarg2311@ymail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: htmlString
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