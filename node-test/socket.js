//socket模块封装tcp/ip协议，代表是一份系统资源
/*

*/

//chatServer.js
var net = require('net');
var i = 0;
//保存客户机
var clientList = [];
var server = net.createServer(function(conn) {
    conn.id = i++;
    clientList.push(conn);
    conn.on("data", function(data) {
        //把当前连接的客户机的信息转发到其他客户机
        console.log("接收到客户端" + conn.id + "的信息");
        clientList.map((item, index)=>{
        	if (index !== conn.id) {
        		item.write(data)
        	}
        })
    });
    conn.on("close", function() {
        //当前客户机下线时，将其从客户机数组中移除
        clientList.splice(conn.id, 1);
        console.log("客户端" + conn.id + "退出");
    });
    conn.on('error', function(err) {
    	clientList.splice(conn.id, 1);
    	console.log("客户端" + conn.id + "退出");
    });
});
server.listen(9999);