var io = require("socket.io").listen(3005);
var sequence = 1;
var users = {};
io.sockets.on("connection",function(socket){
    
    
   console.log('New client connected (id=' + socket.id + ').');
   
   socket.on("send username to server" , function(data){
      
        socket.nickname = data.name;
        users[socket.nickname] = socket;
       
   });

    socket.on("send data to server",function(data){

 

        users[data.sendmessageto].emit("send message from server" , {mess:data.message , nick:socket.nickname});

         console.log(users[data.sendmessageto]);


    });
});
