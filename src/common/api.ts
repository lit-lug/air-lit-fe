

// 仅用于获取组件类型
import tmMessage from "@/tmui/components/tm-message/tm-message.vue";
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
    msgRef: ref<InstanceType<typeof tmMessage> | null>(null),
    encryption: false,
    isBindSec: true,
}

// 微信用户认证
export const WeAppAuth = (req: LoginReq, msgRef?: Ref<InstanceType<typeof tmMessage> | null>) => {
    return http.post<AuthInfo>("/api/weapp/auth", req, {
        custom: {
            ...httpConfig.custom,
            auth: false,
            msgRef,
            encryption: true,
        }
    });
}

// 获取用户信息
export const GetUserInfo = (msgRef?: Ref<InstanceType<typeof tmMessage> | null>) => {

    return http.get<UserInfo>('/api/weapp/user', {
        custom: {
            ...httpConfig.custom,
            auth: true,
            msgRef,
            encryption: true,
        }
    });
};

// 获取状态
export const GetStatus = (msgRef?: Ref<InstanceType<typeof tmMessage> | null>) => {
    return http.get<StatusResp>('/api/weapp/status', {
        custom: {
            ...httpConfig.custom,
            msgRef,
            encryption: true,
        }
    });
};


// 获取 Identicon
export const GetIdenticonUrl = (key: string) => {
    return http.config.baseURL + "/api/weapp/identicon?key=" + key;
}