import { language } from '@/tmui/tool/lib/language';
import Http from 'luch-request';


/** 定义默认配置 */
const http = new Http({
    baseURL: 'https://easy-lit.singzer.cn',
    header: {},
});

http.config.timeout = 300000;

/** 添加请求拦截器 */
http.interceptors.request.use((config) => {
    if (config.custom?.load) {
        uni.showLoading({ title: language("message.load.text"), mask: true });
    }

    // 是否需要认证
    if (config.custom?.auth) {
        const token = uni.getStorageSync('token');

        // 未认证 -> 跳转到登录页
        if (!token) {
            uni.navigateTo({ url: '/pages/mine/account/account?back=false' });
            return Promise.reject(config)
        }

        config.header = {
            ...config.header,
            Authorization: `Bearer ${token}`,
        };
    }

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
                title: language("message.error.text"),
                icon: 'none',
            });


            uni.hideToast();

            return Promise.resolve(response);
        }

        if (resp.code != 200) {
            uni.showToast({
                title: response.data.msg,
                icon: 'error',
            });

            uni.hideToast();
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

