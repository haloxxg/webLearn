//文件操作主要完成相应路径的系统文件资源

/*
路径对象生成解析时是和系统文件资源无关的，只有在使用时才会确定是否相相应路径对应的系统资源。
系统文件资源是和fs模块相关的，是资源的路径，而不是路径的资源，主体是系统资源。因为路径对
象只是一个数据结构体，操作普遍，但是系统文件资源涉及到其他的系统硬件，只应该在需要用时才会
确定。因此，在路径对象建立时不会去主动绑定相应的系统资源，只有在确定使用时才会却查找相应的
资源。
*/
const fs = require('fs');
const path = require('path')

//创建目录
// var mkdir = function(pathname) {
// 	pathname = path.normalize(pathname);

// }

	
fs.mkdir("hello", ()=>{
	console.log("创建目录成功");
})