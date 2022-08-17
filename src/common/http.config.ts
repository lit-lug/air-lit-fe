import Http from 'luch-request';

/** 定义默认配置 */
const http = new Http({
    baseURL: 'https://easy-lit.singzer.cn',
    header: {},
});

/** 添加请求拦截器 */
http.interceptors.request.use((config) => {
    if (config.custom?.load) {
        uni.showLoading({ title: '加载中...' });
    }
    return config;
});

/** 添加响应拦截器 */
http.interceptors.response.use(
    (response) => {

        if (response.config.custom?.load) {
            uni.hideLoading();
        }

        if (response.data.code == 200) {
            return response.data;
        } else {
            uni.showToast({
                title: response.data.msg,
                icon: 'none',
            });
            return Promise.reject(response.data);
        }
    },
    (error) => {
        if (error.config.custom?.load) {
            uni.hideLoading();
        }
        return error;
    }
);

export default http;

