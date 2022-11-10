/* 请求配置/响应的补充说明 */

interface ResponseData<T = any> {
    code: number
    data: T
    msg: string
    err: string
}

interface SecInfo {
    faculty: string;
    grade: string;
    major: string;
    class: string;
    name: string;
    card_id: string;
    role: string;
}

interface QrCodeID {
    code_id: string;
}

interface QrCodeStatus {
    is_auth: boolean;
    is_expired: boolean;
    auth_info?: AuthInfo;
}

interface UserInfo {
    is_bind_sec: Boolean;
    is_sub_oa: Boolean;
    is_need_update: Boolean;
    sec_info?: SecInfo;
}

declare interface LoginReq {
    code: string;
}

interface BindSecReq {
    username: string;
    password: string;
}

declare interface AuthInfo {
    token: string;
    user_info: UserInfo;
}

interface StatusResp {
    start_day: string;
    sec: IsWork;
    jw: IsWork;
    zhyd: IsWork;
    health: IsWork;
}

interface IsWork {
    is_work: boolean;
}

interface Calendar {
    sub_title: string;
    img_url: string;
}