import Http from 'luch-request';
import { Encryption } from './cipher.config';

const { showToast, showMsg } = usePageStore();

/** 定义默认配置 */
const http = new Http({
    baseURL: 'https://a-lit.singzer.cn',
    header: {},
});

http.config.timeout = 300000;

/** 添加请求拦截器 */
http.interceptors.request.use((config) => {
    if (config.custom?.load) {
        showMsg({ type: "loading", message: "加载中" });
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
            showMsg({ type: "hide" });
            uni.navigateTo({ url: '/pages/auth/auth' });
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
            showMsg({ type: "hide" });
        }

        if (!response.data.data) {
            showToast({ message: "网络错误" });
            return Promise.resolve(response);
        }

        if (response.config.custom?.encryption) {
            response.data = JSON.parse(Encryption.decryptByAES(response.data.data));
        }

        const resp = response.data

        if (!resp) {
            showToast({ message: "未知错误" });
            return Promise.reject(response);
        }

        if (resp.code != 200) {
            showToast({ message: resp.msg });
            return
        }

        if (response.config.custom?.tip) {
            showToast({ message: resp.msg })
        }
        return resp
    },
    (error: any) => {

        console.log(error)

        if (error?.config.custom?.load) {
            showMsg({ type: "hide" });
        }

        if (error.statusCode == 401) {
            showToast({ message: "授权失效" });
            uni.navigateTo({ url: '/pages/auth/auth' });
            return Promise.reject(error);
        }

        showToast({ message: "网络错误" });

        error.data.data = null

        return Promise.reject(error);
    }
);

export default http;