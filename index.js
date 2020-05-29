//this is the server file
const io=require('socket.io')(8000)
 
const user={};

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        if(name !=null)
        {
        user[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
        }
    });
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,name:user[socket.id]})
    });

    socket.on('disconnect',message=>{
        if(user[socket.id]!=null)
        {
        socket.broadcast.emit('left',user[socket.id]);
        }
        delete user[socket.id];
    })
})