var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    console.log(`client: ${socket.id}`)

    socket.on('joined', function(data) {
        console.log('joined: ' + data);
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        //socket.emit('response message', msg + '  from server');
        socket.broadcast.emit('response_socket', msg + '  from server');
    });
});

http.listen(8080, function(){
    console.log('listening on *:8080');
});