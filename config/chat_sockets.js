module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);    

    io.on('connection', function (socket) {
       console.log('new connection received',socket.id); 

        socket.on('disconnect', function(){
            console.log('socket disconnected');
        });

        socket.on('join_room', function(data){
            console.log('Joining request received ', data);
            
            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined',data);
        });

    });
}