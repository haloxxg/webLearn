// 封装数据请求
define(["jquery", "Tool"], ($, Tool)=>{
    var url_server = null,
        app_key = null,
        app_secret = null;
    // API环境(测试)
    // url_server = "http://ggservice.sandbox.gofund.com.cn/"//"http://apptest.gofund.cn:8093/";
    // app_key = "GGHvCBMappzQWEg",
    // app_secret = "AdhRhNReZOURCpG3XZMIootntv1N1TUg";
    // (预正式)
    // url_server = "http://app.gofund.cn:9111/ali/proxy.fopcors";

    //APP(正式) 
    url_server = "https://ggservice.go-goal.cn/";
    app_key = "VzNQumNMxCmPcbD";
    app_secret = "SYRyCEmkmZsMm8xnN5VrLQLXfc7C9GB1";

    /**
     * 发送ajax请求和服务器交互
     * @param {object} mySetting 配置ajax的配置
     */
    var ajax = function (mySetting) {
            
        function filter(str) { //特殊字符转义
            str += ''; //隐式转换
            str = str.replace(/%/g, '%25');
            str = str.replace(/\+/g, '%2B');
            str = str.replace(/ /g, '%20');
            str = str.replace(/\//g, '%2F');
            str = str.replace(/\?/g, '%3F');
            str = str.replace(/&/g, '%26');
            str = str.replace(/\=/g, '%3D');
            str = str.replace(/#/g, '%23');
            return str;
        }
        
        var setting = {
            url: window.location.pathname, //默认ajax请求地址
            async: true, //true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false
            type: 'GET', //请求的方式
            data: {}, //发给服务器的数据
            dataType: 'json',
            success: function (text) { }, //请求成功执行方法
            error: function () { } //请求失败执行方法
        };


        var aData = []; //存储数据
        var sData = ''; //拼接数据
        //属性覆盖
        for (var attr in mySetting) {
            setting[attr] = mySetting[attr];
        }
        for (var attr in setting.data) {
            aData.push(attr + '=' + filter(setting.data[attr]));
        }
        sData = aData.join('&');
        setting.type = setting.type.toUpperCase();
        // setting.url = window.TARGETWEBSITE + setting.url;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        try {
            if (setting.type == 'GET') { //get方式请求
                sData = setting.url + '?' + sData;
                xhr.open(setting.type, sData, setting.async);
                // xhr.setRequestHeader("Content-type", "application/json");
                xhr.send();
            } else { //post方式请求
                xhr.open(setting.type, setting.url, setting.async);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(sData);
            }
        } catch (e) {
            setting.fail(setting, xhr);
        }
        if (setting.async) {
            xhr.timeout = 15000;
            xhr.addEventListener('readystatechange', httpEnd, false);
            xhr.addEventListener('timeout', setting.fail, false);
        } else {
            httpEnd();
        }

        function httpEnd() {
            /*
                0：请求未初始化（还没有调用 open()）。
                1：请求已经建立，但是还没有发送（还没有调用 send()）。
                2：请求已发送，正在处理中（通常现在可以从响应中获取内容头）。
                3：请求在处理中；通常响应中已有部分数据可用了，但是服务器还没有完成响应的生成。
                4：响应已完成；您可以获取并使用服务器的响应了。
            */
            if (xhr.readyState == 4) {
                var head = xhr.getAllResponseHeaders();
                var response = xhr.responseText;
                //将服务器返回的数据，转换成json

                if (/application\/json/.test(head) || setting.dataType === 'json' && /^(\{|\[)([\s\S])*?(\]|\})$/.test(response)) {
                    response = JSON.parse(response);
                }

                if (xhr.status == 200) {
                    setting.success(response, setting, xhr);
                } else {
                    setting.fail(setting, xhr);
                }
            }
        }
        xhr.end = function () {
            xhr.removeEventListener('readystatechange', httpEnd, false);
        }

        // var date = new Date();
        // $.ajax({
        //     type : "get", //jquey是不支持post方式跨域的
        //     async: false,
        //     url : mySetting.url+"?"+sData, //跨域请求的URL
        //     dataType : "jsonp",
        //     //传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
        //     jsonp: "jsoncallback",
        //     //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //     jsonpCallback:"success_jsonpCallback"+date.getTime(),
        //     //成功获取跨域服务器上的json数据后,会动态执行这个callback函数
        //     success: function(json){ 
        //          mySetting.success(json);
        //     } 
        // }); 
        // $.get({
        //     url: mySetting.url,
        //     data: mySetting.data,
        //     dataType: "json",
        //     success: function(response, status, xhr) {
        //         mySetting.complete();
        //         if(status == 200) {
        //             mySetting.success(response);
        //         }else {
        //             mySetting.fail(xhr);
        //         }
        //     }
        // })
    };
    /**
     * 封装ajax post请求
     * @param {string} api_name 服务器请求地址
     * @param {object} params     发送给服务器的数据
     */
    var post = function (api_name, params) {
        // params.url_key = api_name;
        return function() {
            return {
                url: url_server + api_name,
                data: Tool.makeSign(app_key, app_secret, "GET", api_name, params).query,
                type: "POST"
            }
        };
    }

    /**
     * 封装ajax get请求
     * @param {string} api_name 服务器请求地址
     * @param {object} params     发送给服务器的数据
     */
    var get = function (api_name, params) {
        // params.url_key = api_name;
        return function() {
            return {
                url: url_server + api_name,
                data: Tool.makeSign(app_key, app_secret, "GET", api_name, params).query,
                type: "GET"
            }
        };
    };

    var handleDataResponse = function (option) {
        var dataResponse = option.dataResponse,
            callback0 = option.callback0, //response success
            callback1001 = option.callback1001 || function(){}, //has no data
            callbackNoError = option.callbackNoError || function(){},
            callback1009 = option.callback1009 || function(){},
            callback1100 = option.callback1100 || function(){},
            callback1101 = option.callback1101 || function(){},
            callback401 = option.callback401 || function(){},
            callback400 = option.callback400 || function(){},
            callbackError = option.callbackError || function(){},
            callbackAnyError = option.callbackAnyError,
            callbackFail = option.callbackFail || function(){}, //net error
            afterResponse = option.afterResponse || function(){};

        var object = dataResponse();
        object["success"] = function(res) {
            var data = res.data;
            var statusCode = res.code;
            if (statusCode === 0) {
                if (callback0 && typeof callback0 === "function") {
                    callback0(data);
                }
                if (callbackNoError && typeof callbackNoError === "function") {
                    callbackNoError();
                }
            } else if (statusCode === 1001) {
                if (callback1001 && typeof callback1001 === "function") {
                    callback1001();
                }
                if (callbackNoError && typeof callbackNoError === "function") {
                    callbackNoError();
                }
            } else {
                if (statusCode === 1100) {
                    if (callback1100 && typeof callback1100 === "function") {
                        callback1100();
                    }
                } else if (statusCode === 1101) {
                    if (callback1101 && typeof callback1101 === "function") {
                        callback1101();
                    }
                } else if (statusCode === 401) {
                    if (callback401 && typeof callback401 === "function") {
                        callback401();
                    }
                } else if (statusCode === 400) {
                    if (callback400 && typeof callback400 === "function") {
                        callback400();
                    }
                } else if (statusCode === 1009) {
                    if (callback1009 && typeof callback1009 === "function") {
                        callback1009();
                    }
                } else if (callbackError && typeof callbackError === "function") { //其它错误
                    callbackError();
                }

                if (callbackAnyError && typeof callbackAnyError === "function") {
                    callbackAnyError();
                }
            }
        };
        object["fail"] = callbackFail;
        object["complete"] = afterResponse;
        ajax(object);
    }

    //确定性评分信息
    // stock_code
    var suntimeMarkInfo = function(params) {
        let api_name = "v1/alipay/get_zyyx_appraisal";
        return get(api_name, params);
    };
    //确定评分K线信息
    // stock_code type(1三个月，2一年)
    var suntimeMarkKline = function(params) {
        let api_name = "v1/alipay/get_zyyx_appraisal_kline";
        return get(api_name, params);
    }
    //确定性评分分值更改
    // stock_code
    var suntimeMarkScoreChange = function(params) {
        let api_name = "v1/mystock/get_mystock_score_week_change";
        return get(api_name, params);
    }
    return {
        handleDataResponse: handleDataResponse,
        suntimeMarkInfo: suntimeMarkInfo,
        suntimeMarkKline: suntimeMarkKline,
        suntimeMarkScoreChange: suntimeMarkScoreChange
    }
})
