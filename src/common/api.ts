
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
    isBindSec: true,
}

// 微信用户认证
export const WeAppAuth = (req: LoginReq) => {
    return http.post<AuthInfo>("/v2/weapp/auth", req, {
        custom: {
            ...httpConfig.custom,
            auth: false
        }
    });
}

// 模拟用户请求
export const GetUserInfo = (load: boolean = false) => {
    return http.get<UserInfo>('/v2/weapp/user', {
        custom: {
            ...httpConfig.custom,
            auth: true,
            load: load
        }
    });
};

// 模拟用户请求
export const GetStatus = (load: boolean = false) => {
    return http.get<StatusResp>('/v2/weapp/status', {
        custom: {
            ...httpConfig.custom,
            auth: false,
            load: load
        }
    });
};

export const GetIdenticonUrl = (key: string) => {
    return http.config.baseURL + "/weapp/identicon?key=" + key;
}