//path模块主要处理各种路径问题，主要是对字符串的解析工作，将其解析为平台相关的路径

/*
路径是否存在
当前路径完整路径
当前路径文档名称
路径拼接
*/
var path = require('path');
const os = require('os');

var filepath = 'C:\\temp\\myfile.html';

console.log("-----------------------------------------");
console.log("获取路径文档名称和扩展名");
//获取路径文档名称和扩展名
var basename = path.basename(filepath);
var basename2 = path.basename(filepath, ".html");
var extname = path.extname(filepath);
console.log(basename);
console.log(basename2);
console.log(extname);
console.log("-----------------------------------------");

//获取路径目录
console.log("获取路径目录");
var dirname = path.dirname(filepath);
console.log(dirname);
console.log("-----------------------------------------");
//路径拼接
console.log("路径拼接");
var path1 = "tets";
var path2 = "hello";
var path_concat = path.join(path2, path1);
console.log(path_concat);
console.log("-----------------------------------------");
//获取绝对路径
console.log("获取绝对路径");
var absolutePath = path.resolve("./hello");
console.log(absolutePath);
console.log("-----------------------------------------");

//获取当前执行路径
console.log("获取当前执行路径");
console.log(process.cwd());
// console.log(process.env.Path);
console.log("-----------------------------------------");

/*
一个路径对象是分为几个部分：根目录(root)、当前文档目录(dir)、文件名(basename)、扩展名(extname)

路径对象是对一个路径字符串对象分割获取到的所有信息，分隔符是根据系统确定的path.sep

path在处理路径时，会对每一个路径字符串生成一个路径对象，并对路径对象的root和dir进行判断，如果不是正常的root则会利用当前
执行路径代替。由于处理相对路径在win和linux下是相同的，因此首先需要判断是否有正斜杠存在，然后再利用系统的path.sep
*/
console.log(path.sep);
console.log("获取路径对象");
console.log(filepath.split("\\"));
console.log(path.parse(filepath));

console.log("/hello".split("/"));
console.log(path.parse("/hello\\hhe"));
console.log(path.resolve("////hello\\hhe"));

/*
1.判断传入参数是否是字符串
2.判断当前平台
3.判断是否有正斜杠，有则利用
*/
var str = "hello";
if(typeof str == "String") {

	if (os.platform() == "win32") {
		
	}
}else {
	// 报错
}