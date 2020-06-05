{
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            //it isused to prevent default behaviour of button
            e.preventDefault();
            //it is used to submit the form manually
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                }, error: function(error){
                    console.log(error.responseText);
                }
                
            });
        });
    }

    //method to create a post in DOM

    createPost();
}