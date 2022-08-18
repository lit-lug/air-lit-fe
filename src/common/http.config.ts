import Http from 'luch-request';


/** 定义默认配置 */
const http = new Http({
    baseURL: 'https://easy-lit.singzer.cn',
    header: {},
});

/** 添加请求拦截器 */
http.interceptors.request.use((config) => {
    if (config.custom?.load) {
        uni.showLoading({ title: '加载中...', mask: true });
    }

    // 是否需要认证
    if (config.custom?.auth) {
        const token = uni.getStorageSync('token');

        console.log("token", token);

        // 未认证 -> 跳转到登录页
        if (!token) {
            uni.navigateTo({ url: '/pages/mine/account/account' });
            return Promise.reject(config)
        }

        config.header = {
            ...config.header,
            Authorization: `Bearer ${token}`,
        };
    }

    // if (config.custom?.isBindSec) {
    //     // 未认证 -> 跳转到账户页
    //     const isSecBound = uni.getStorageSync('isSecBound');
    //     if (!isSecBound) {
    //         uni.navigateTo({ url: '/pages/mine/account/account' });
    //         return Promise.reject(config)
    //     }
    // }

    return config;
});

/** 添加响应拦截器 */
http.interceptors.response.use(
    (response) => {

        if (response.config.custom?.load) {
            uni.hideLoading();
        }

        const resp = response.data;

        console.log(resp);

        if (!resp) {
            uni.showToast({
                title: "数据异常, 请稍后再试!",
                icon: 'none',
            });
            return Promise.resolve(response);
        }

        if (resp.code != 200) {
            uni.showToast({
                title: response.data.msg,
                icon: 'error',
            });
            return Promise.resolve(response);
        }

        return resp
    },
    (error) => {
        // if (error.config.custom?.load) {
        uni.hideLoading();
        // }
        return error;
    }
);

export default http;

