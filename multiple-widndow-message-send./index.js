const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

var browser_clients = {};
io.on('connection', (socket) => {
    console.log('connect......')

    
    socket.on('connect_user', (data)=>{
        // socket.join(socket.request._query.user_id);
        if(browser_clients[data.user_id]){
            var arr = browser_clients[data.user_id];
            browser_clients[data.user_id] = [...arr, socket.id];
        }else{
            browser_clients[data.user_id] = [socket.id];
        }
    });


    socket.on('message', (data)=>{
        // io.to(browser_clients[socket.request._query.user_id]).emit('reply', data)
        io.to(browser_clients[data.id]).emit('reply', data)
    });

});



server.listen(3000, ()=>{
    console.log('http://localhost:3000/')
});
