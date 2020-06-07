{
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(event){
            //it isused to prevent default behaviour of button
            event.preventDefault();
            //it is used to submit the form manually
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                   
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                    new Noty({
                        theme: 'sunset',
                        text: 'Post published!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                }, error: function(error){
                    console.log(error.responseText);
                }  
            });
        });
    }

    //method to create a post in DOM 
    let newPostDom = function(post){
        return $(` <li id="post-${post._id}"> 
        <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${ post._id}">X</a>
            </small>
            ${post.content}
         <br>
         <small>
         ${post.user.name}
         </small>
        </p>
        <div class="post-comments">
                 <form action="/comments/create" method="POST" id="new-comment-form-${ post._id }">
                     <input type="text" name="content" placeholder="Type Here to add comment..." required>
                     <input type="hidden" name="post" value="${post._id}">
                     <input type="submit" value="Add Comment">
                 </form>
         <div class="post-comments-list">
             <ul id="post-comments-${post._id}">
  
             </ul>
    
         </div>
     </div>
     </li> `);
    }

    //method to delete a post
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(event){
            event.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'sunset',
                        text: 'Post and associated comments deleted',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();
}