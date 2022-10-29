import { Ref } from "vue";

import http from './http.config';
/* api->index.ts 统一命名规范
 * 1. 接口暴露前缀统一为req -> request(请求)
 * 2. 需详细描述数据时, 在src/types/response.d.ts中声明
 * Template: export const req[name] = () => http.get("/api/list")
 */

// 暴露请求配置
export const httpConfig = http.config;

httpConfig.custom = {
    // load: true,
    auth: true,
    load: true,
    // msgRef: ref<InstanceType<typeof tmMessage> | null>(null),
    encryption: false,
    isBindSec: true,
}

// 微信用户认证
export const WeAppAuth = (req: LoginReq) => {
    return http.post<AuthInfo>("/api/weapp/auth", req, {
        custom: {
            ...httpConfig.custom,
            auth: false,
            encryption: true,
        }
    });
}

// 获取用户信息
export const GetUserInfo = () => {

    return http.get<UserInfo>('/api/weapp/user', {
        custom: {
            ...httpConfig.custom,
            auth: true,
            encryption: true,
        }
    });
};

// 获取状态
export const GetStatus = () => {
    return http.get<StatusResp>('/api/weapp/status', {
        custom: {
            ...httpConfig.custom,
            encryption: true,
        }
    });
};


// 获取 Identicon
export const GetIdenticonUrl = (key: string) => {
    return http.config.baseURL + "/api/weapp/identicon?key=" + key;
}