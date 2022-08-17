
import http from './http.config';
/* api->index.ts 统一命名规范
 * 1. 接口暴露前缀统一为req -> request(请求)
 * 2. 需详细描述数据时, 在src/types/response.d.ts中声明
 * Template: export const req[name] = () => http.get("/api/list")
 */

// 暴露请求配置
export const httpConfig = http.config;

httpConfig.custom = {
    load: true
}

// 微信用户认证
export const WeAppAuth = (data: LoginReq) => {
    return http.post("/weapp/auth", data);
}

// 模拟用户请求
export const getUserInfo = () => {
    // http.config.custom.load = true;
    // httpConfig.custom = {
    //     load: false
    // }
    return http.get<UserInfo>('/login');
};

// 模拟请求列表
export const getList = (params: ListOpts) => {
    httpConfig.custom = {
        load: true
    }
    return http.get('/list', { params });
};