import axios from 'axios'

let server_host = "/api/v1/";

export default {
    get(url, param, success, error) {
        axios.get(server_host + url, {
            param
        })
        .then(function (res) {
            success(res)
        })
        .catch(function (res) {
            error(res);
        });
    },
    post(url, param, success, error) {
        axios.post(server_host + url, {
            method: "post",
            param,
        })
        .then(function (res) {
            success(res);
        })
        .catch(function (res) {
            error(res);
        });
    }
}