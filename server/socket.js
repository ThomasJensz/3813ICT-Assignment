module.exports = {

    connect: function(io, PORT){

        io.on('connection',(socket) => {
            console.log('user connection on port ' + PORT + " : " + socket.id);
            socket.on('message',(message)=>{
                //io.emit('message',message);
                io.sockets.in(message.channel).emit('message',message);
            });
            socket.on('join', (data) => {
                socket.join(data.channel);
                console.log(data.name + " has joined channel: " + data.channel);
                io.sockets.in(data.channel).emit('message',data);
            });
            socket.on('leave', (data)=>{
                socket.leave(data.channel);
                console.log(data.name + " has left channel: " + data.channel);
                io.sockets.in(data.channel).emit('message',data);
            });
        });
    }
}