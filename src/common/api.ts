
import { Encryption } from './cipher.config';
import http from './http.config';
/* api->index.ts 统一命名规范
 * 1. 接口暴露前缀统一为req -> request(请求)
 * 2. 需详细描述数据时, 在src/types/response.d.ts中声明
 * Template: export const req[name] = () => http.get("/api/list")
 */

// 暴露请求配置
export const httpConfig = http.config;

httpConfig.custom = {
    load: true,
    auth: true,
    encryption: false,
    isBindSec: true,
}

// 微信用户认证
export const WeAppAuth = (req: LoginReq) => {
    return http.post<AuthInfo>("/api/weapp/auth", req, {
        custom: {
            ...httpConfig.custom,
            auth: false,
            load: true,
            encryption: true,
        }
    });
}

// 模拟用户请求
export const GetUserInfo = (load: boolean = false) => {

    return http.get<UserInfo>('/api/weapp/user', {
        custom: {
            ...httpConfig.custom,
            auth: true,
            load: load,
            encryption: true,
        }
    });
};

// 模拟用户请求
export const GetStatus = (load: boolean = false) => {
    return http.get<StatusResp>('/api/weapp/status', {
        custom: {
            ...httpConfig.custom,
            auth: false,
            load: load,
            encryption: true,
        }
    });
};

export const GetIdenticonUrl = (key: string) => {
    return http.config.baseURL + "/weapp/identicon?key=" + key;
}