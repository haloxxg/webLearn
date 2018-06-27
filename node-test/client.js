//chatClient.js
var net = require('net');
process.stdin.setEncoding('utf8');
var client = net.connect({port: 9999},function(){
    console.log('【本机提示】登录到聊天室');
	process.stdin.on('readable', () => {
	  const chunk = process.stdin.read();
	  if (chunk !== null) {
	    client.write(chunk);
	  }
	})
    client.on("data", function(data) {
        console.log(data.toString());
    });
    client.on('end', function() {
        console.log('【本机提示】退出聊天室');
        process.exit();
    });
    client.on('error', function() {
        console.log('【本机提示】聊天室异常');
        process.exit();
    });
});