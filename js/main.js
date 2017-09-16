$(document).ready(function(){

  // connecting to the server

  var socket;
  socket = io.connect("http://localhost:3005");


    
    $(".submit").click(function(){
        
        
        var username = $(".username").val();
        
        $.post("index.php" , {name:"senddata" , username:username} , function(data){
           
           
           if(data == "good"){
               
               $(".chatpage").css("display" , "block");
               $(".formenter").css("display" , "none");
               
           }
            socket.emit("send username to server" , { name: $(".username").val()});
            
        });
        
    });

    var sendto;
  $(".user").click(function(){

    sendto = $(this);
    $(".private-chat ul").append("<li style='width:200px;height:400px;background-color:red;float:right;margin-right: 20px'> <div class='chat-head col-lg-12'>"+ $(this).html() +"</div> <div class='chat-body col-lg-12' style='height: 298px;'></div> <div class='chat-send col-lg-12'><textarea class='message'></textarea></div></li>");

    var thisdata;
    $(".message").keyup(function(e){

      thisdata = $(this);

      if(e.which == 13){

        $.post("chat.php" , {send:"Hello"} , function(data){

         thisdata.parent().parent().children().first().next().html( data + " :" + thisdata.val());
         //socket.emit("send login username to server" , {username:})
         socket.emit("send data to server" , { message : thisdata.val() , sendmessageto : thisdata.parent().parent().children().first().html()});
        });

      }

    });

  });
  socket.on("send message from server",function(response){

       
       alert(4);
  });
});
