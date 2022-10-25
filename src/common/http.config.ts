import { language } from '@/tmui/tool/lib/language';
import Http from 'luch-request';
import { Encryption } from './cipher.config';

/** 定义默认配置 */
const http = new Http({
    baseURL: 'https://a-lit.singzer.cn',
    header: {},
});

http.config.timeout = 300000;

/** 添加请求拦截器 */
http.interceptors.request.use((config) => {
    if (config.custom?.load) {
        uni.showLoading({ title: language("message.load.text"), mask: true });
    }


    // 判断是否需要加密
    if (config.custom?.encryption) {
        if (config.method === "POST") {
            config.data = { data: Encryption.encryptByAES(JSON.stringify(config.data)) };
        }
    }

    // 是否需要认证
    if (config.custom?.auth) {
        const token = uni.getStorageSync('token');

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

    return config;
});

/** 添加响应拦截器 */
http.interceptors.response.use(
    (response) => {

        if (response.config.custom?.load) {
            uni.hideLoading();
        }

        if (!response.data.data) {
            uni.showToast({
                title: language("message.error.text"),
                icon: 'none',
                duration: 2000,
            });

            return Promise.resolve(response);
        }

        if (response.config.custom?.encryption) {
            response.data = JSON.parse(Encryption.decryptByAES(response.data.data));
        }

        const resp = response.data

        if (!resp) {
            uni.showToast({
                title: language("message.error.text"),
                icon: 'none',
                duration: 2000,
            });

            return Promise.resolve(response);
        }

        if (resp.code != 200) {
            uni.showToast({
                title: response.data.msg,
                icon: 'none',
                duration: 2000,
            });

            return Promise.resolve(response);
        }

        return resp
    },
    (error) => {

        uni.showToast({
            title: language("message.error.text"),
            icon: 'none',
            duration: 2000,
        });

        if (error.config.custom?.load) {
            uni.hideLoading();
        }
        return error;
    }
);

export default http;

