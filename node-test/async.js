var fs = require('fs');


fs.readFile("test.txt", (err, data)=>{
	if (err) {
		return console.error(err);
	};
	setTimeout(()=>{
		console.log(data.toString());
	}, 1000)
})

fs.unlink('test.txt', function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("文件删除成功！");
});