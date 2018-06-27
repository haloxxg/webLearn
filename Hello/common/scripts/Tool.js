define(["jquery", "CryptoJS"], function($, CryptoJS) {
    var Tool = {};
    /**
     * 保留小数,四舍五入
     *
     * @param inter
     * @returns {*}
     */
    Tool.formateNum = function (inter, length) {
        if(!inter){
            return '0';
        }
        length = arguments.length === 1 ? 2 : length;
        inter = parseFloat(inter);
        return inter.toFixed(length);
    }

    /**
     * 保留两位小数,直接截掉
     *
     * @param inter
     * @returns {*}
     */
    Tool.fomatFloat = function (inter, length) {
        if(!inter){
            return '0';
        }
        var income = Math.floor(inter * 100) / 100;
        if (length == 1) {
            income = Math.floor(inter * 10) / 10;
        }else if (length == 0) {
            income = Math.floor(inter * 1) / 1;
        }
        return income;
    }

    /**
     * 根据class拼接dom
     */
    Tool.$ = function(name, index) {
        index = index == undefined ? 0 : index;
        return $(name)[index];
    };

    /**
     * 获取URL参数
     * @param param 获取的value
     * @return {string}
     */
    Tool.getQuery = function (param) {
        var result = window.location.search.match(new RegExp("(\\?|&)" + param + "=([^&]*)(&|$)"));
        return result ? decodeURIComponent(result[2]) : "";
    };

    function encodeUrl(url) {
        url = encodeURIComponent(url);
        url = url.replace(/(!)/g,'%21');
        url = url.replace(/(')/g, '%27');
        url = url.replace(/(\()/g, '%28');
        url = url.replace(/(\))/g, '%29');
        url = url.replace(/(\*)/g, '%2A');
        url = url.replace(/(~)/g, '%7E');
        return url;
    }

    Tool.makeSign = function(appKey, appSecret, reqMethod, apiName, params, timeStamp) {
        if (!timeStamp) {
            timeStamp = Math.round(new Date().getTime() / 1000).toString();
        }

        var paramsObj = {
            app_key : appKey,
            time_stamp : timeStamp
        };
        if(params && Object.prototype.toString.call(params) == '[object Object]'){
            for(var key in params){
                var value = params[key];
                if(typeof(value) !== 'undefined' && value !== null && value === value && value !== Infinity){
                    if(Object.prototype.toString.call(value) == '[object Array]' || Object.prototype.toString.call(value) == '[object Object]'){
                        paramsObj[key] = JSON.stringify(String(value));
                    }else{
                        paramsObj[key] = String(value);
                    }
                }
            }
        }else if(params && typeof(params) === 'string'){
            var strs = params.split('&');
            for (var i in strs) {
                var paramPair = strs[i].split('=');
                if(paramPair[0] == ''){
                    continue;
                    //break;
                }
                if(!paramPair[1]){
                    continue;
                    //paramPair[1] = '';
                }
                paramsObj[decodeURIComponent(paramPair[0])] = decodeURIComponent(paramPair[1]);
            }
        }
        delete paramsObj['sign']; // delete paramsObj.sign;

        var paramsArray = new Array();
        for ( var key in paramsObj) {
            var paramPair = new Array();
            paramPair[0] = key;
            var value = paramsObj[key];
            paramPair[1] = value;
            var value4Sign = '';
            for (var i = 0; i < value.length; i++) {
                var re = new RegExp('^([a-z]|[A-Z]|[0-9]|[*]|[!]|[(]|[)])$');
                if (re.test(value[i])) {
                    value4Sign += value[i];
                } else {
                    var bin = value[i].charCodeAt(0).toString(2);
                    if (7 < bin.length) {
                        bin = '10' + bin.substring(bin.length - 6);
                    }
                    value4Sign += '%' + parseInt(bin, 2).toString(16).toUpperCase();
                }
            }
            paramPair[2] = value4Sign;
            paramsArray.push(paramPair);
        }
        paramsArray.sort(function(a, b) {
            return a[0].localeCompare(b[0]);
        });

        var encodeParams = '';
        var res = apiName + '?';
        var query = {};
        for ( var i = 0; i < paramsArray.length;i++) {
            if (i > 0) {
                encodeParams += '&';
                res += '&';
            }
            paramsArray[i];
            encodeParams += paramsArray[i][0];
            encodeParams += '=';
            encodeParams += paramsArray[i][2];
            res += encodeURIComponent(paramsArray[i][0]);
            res += '=';
            res += encodeURIComponent(paramsArray[i][1]);
            query[paramsArray[i][0]] = paramsArray[i][1];
        }
        var encodeStr = reqMethod.toUpperCase() + '&' + encodeUrl(apiName) + '&' + encodeUrl(encodeParams);
        var sign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(encodeStr,
            appSecret));
        res += '&' + 'sign=' + encodeURIComponent(sign);
        query['sign'] = sign;
        return {
            sign : sign,
            res: res,
            query : query,
            reqString : res
        };
    }
    return Tool
})
