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
    if (config.custom?.msgRef) {
        // uni.showLoading({ title: language("message.load.text"), mask: true });
        config.custom?.msgRef.value?.show({ model: "load", mask: true, duration: -1 });
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

        if (response.config.custom?.msgRef) {
            // uni.hideLoading();
            response.config.custom?.msgRef.value?.hide();
        }

        if (!response.data.data) {
            // uni.showToast({
            //     title: language("message.error.text"),
            //     icon: 'none',
            //     duration: 2000,
            // });

            response.config.custom?.msgRef.value?.show({ model: "error", text: language("message.error.text") });

            return Promise.resolve(response);
        }

        if (response.config.custom?.encryption) {
            response.data = JSON.parse(Encryption.decryptByAES(response.data.data));
        }

        const resp = response.data

        if (!resp) {
            // uni.showToast({
            //     title: language("message.error.text"),
            //     icon: 'none',
            //     duration: 2000,
            // });

            response.config.custom?.msgRef.value?.show({ model: "error", text: language("message.error.text") });

            return Promise.resolve(response);
        }

        if (resp.code != 200) {
            // uni.showToast({
            //     title: response.data.msg,
            //     icon: 'none',
            //     duration: 2000,
            // });

            response.config.custom?.msgRef.value?.show({ model: "error", text: resp.msg });

            return Promise.resolve(response);
        }

        if (response.config.custom?.msgRef) {
            // uni.hideLoading();
            response.config.custom?.msgRef.value?.show({ model: "success", text: resp.msg });
        }

        return resp
    },
    (error) => {

        // uni.showToast({
        //     title: language("message.error.text"),
        //     icon: 'none',
        //     duration: 2000,
        // });

        if (error.config.custom?.msgRef) {
            // uni.hideLoading();
            error.config.custom?.msgRef.value?.hide();
        }
        return error;
    }
);

export default http;

