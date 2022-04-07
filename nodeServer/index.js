// node server which will handle socket io connections
const io = require("socket.io")(8001);
const users = {};

 io.on('connection', socket=>{
    //  If new user joins, let other users connected to the server knows.
     socket.on('new-user-joined', name=>{
         users[socket.id] = name;
         socket.broadcast.emit('user-joined', name);
     });

    
    // If someone sends a message , then braodcast it to all other peoples.

     socket.on('send', message=>{
         socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
     });
    

    // If someone leaves the chat, let other peoples knows.
    
     socket.on('disconnect', message=>{
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });
 })
