const socket = ioServer('http://localhost:3000');

const msgs = [];

socket.on('chat message', function (strMsg) {
    var msg = JSON.parse(strMsg);    
    // JIF    
    msgs.push(msg);
});