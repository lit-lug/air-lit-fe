
/* 请求配置/响应的补充说明 */

interface ResponseData<T = any> {
    code: number
    data: T
    msg: string
    err: string
}

interface UserInfo {
    faculty: string;
    grade: string;
    major: string;
    class: string;
    name: string;
    card_id: string;
    role: string;
}

declare interface LoginReq {
    code: string;
}

declare interface AuthInfo {
    is_bind_sec: Boolean;
    token: string;
    user_info: UserInfo;
}



