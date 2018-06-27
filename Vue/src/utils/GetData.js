import Tool from "./tool";

let Getdata = function (mysetting) {
    const Hello = {
        render: function (createElement) {
            return createElement(
                div// tag name 标签名称
            )
        }
    };
    //默认配置
    let setting = {
        id: '', //应用唯一id表示
        type: 'GET', //请求类型
        url: '', //请求地址
        stop: false, //true拦截请求，false不拦截请求
        data: null, //发送给服务器的数据
        component: Hello, //数据回调给的组件
        success: (state, res, props) => { return state; }, //请求成功后执行的方法
        error: (state, res, xhr) => { return state; } //请求失败后执行的方法
    };

    /**
     * 覆盖默认设置
     */
    for (let key in mysetting) {
        setting[key] = mysetting[key];
    };

    let Index = {
        methods: {
            getUrl() {
                let { url } = setting,
                    {$route, $router} = this,
                    props = { route: $route };
                if (typeof url === 'function') {
                    return url(props);
                }else if (url && typeof url === 'string') {
                    return url;
                }
            },
            getData() {
                let { data } = setting,
                    { $route, $router, $store } = this,
                    props = { route: $route, state: $store.state[setting.id] };
                if (typeof data === 'function') {
                    return data(props);
                } else if (data && typeof data === 'string') {
                    return data;
                }
            },
            getState() {
                let { $route, $router, $store } = this,
                    props = { route: $route, state: $store.state[setting.id] },
                    { success, error } = setting,
                    success_fn = function (res) {
                        let { status, data } = res;
                        this.initState(data);
                        if (typeof data === 'function') {
                            success(data);
                        }
                    },
                    error_fn = function (res) {
                        if (typeof data === 'function') {
                            error()
                        }
                    };
                Tool.get(this.getUrl(), this.getData(), success_fn, error_fn);
            },
            initState() {

            }
        },
        created() {
            this.getState();
        },
        render: function (createElement) {
            return createElement(
                setting.component, // tag name 标签名称
            )
        }, 
    };

    return Index
}

export default Getdata