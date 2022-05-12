//Initialize the current app
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5055;
var express =require('express');
var path = require('path');

//直接获取路由信息, 设置获取文档的位置
////Get routing information directly, set the location to get the document
app.use(express.static(path.join(__dirname, '/')));
//通过获取get参数,定位发送文档. 如果没有任何参数信息,则直接发送home页面
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

//socket连接并且开启监听
////socket connection and start listening
io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});
//node listens on the current http port
http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

//This is file informtion is most from the https://socket.io/get-started/chat
//And I change it to fit my web

