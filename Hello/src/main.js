console.log(111)
require.config({
	paths: {
		"jquery": "../common/libs/jquery.min",
		"merged": "../common/libs/obj-merged",
		"CryptoJS": "../common/libs/hmac-sha1",
		"Tool": "../common/scripts/Tool",
		"dataServices": "../common/scripts/dataServices"
　　},
	shim: {
		"CryptoJS": {
			deps: [],
			exports: "CryptoJS"
		}
	}
});

require(["Tool", "dataServices"], (Tool, dataServices)=>{
	var  params = { stock_code: "000001", type: "1"};
	var dataResponse = dataServices.suntimeMarkInfo(params);
	var callback0 = function (data) {
		debugger
	}
	var options = {
		dataResponse: dataResponse,
		callback0: callback0
	}
	dataServices.handleDataResponse(options)
});