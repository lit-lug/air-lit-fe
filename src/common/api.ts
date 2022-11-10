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
    tip: true,
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
            load: false,
            encryption: true,
        }
    });
}


// 获取用户信息
export const GetUserInfo = ({ load = false, tip = true }) => {

    return http.get<UserInfo>('/api/weapp/user', {
        custom: {
            ...httpConfig.custom,
            load,
            auth: true,
            tip,
            encryption: true,
        }
    });
};

// 绑定智慧门户
export const BindSec = (req: BindSecReq) => {
    return http.post<UserInfo>('/api/weapp/bind_sec', req, {
        custom: {
            ...httpConfig.custom,
            auth: true,
            encryption: true,
        }
    });
};

// 解绑智慧门户
export const UnbindSec = () => {
    return http.get<UserInfo>('/api/weapp/unbind_sec', {
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
            tip: false,
            load: false,
            encryption: true,
        }
    });
};

// 获取 Identicon
export const GetIdenticonUrl = (key: string) => {
    return http.config.baseURL + "/api/weapp/identicon?key=" + key;
}


// 认证二维码
export const AuthQrCode = (data: QrCodeID) => {
    return http.post<QrCodeID>('/api/weapp/qrcode', data, {
        custom: {
            ...httpConfig.custom,
            auth: true,
            encryption: true,
        }
    });
}

// 获取 QrCodeID
export const GetQrCodeID = () => {
    return http.get<QrCodeID>('/api/h5/qrcode_id', {
        custom: {
            ...httpConfig.custom,
            auth: false,
            load: true,
            tip: false,
            encryption: true,
        }
    });
}

// 获取 QrCode
export const GetQrCodeUrl = (id: string) => {
    return http.config.baseURL + "/api/h5/qrcode?code_id=" + id;
}

// 获取 QrCode Status
export const GetQrCodeStatus = (id: string) => {
    return http.get<QrCodeStatus>("/api/h5/qrcode_status?code_id=" + id, {
        custom: {
            ...httpConfig.custom,
            auth: false,
            load: false,
            tip: false,
            encryption: true,
        }
    });
}


// 获取校历
export const GetCalendar = () => {
    return http.get<Calendar>('/api/weapp/calendar', {
        custom: {
            ...httpConfig.custom,
            auth: true,
            encryption: true,
            tip: false,
        }
    });
}