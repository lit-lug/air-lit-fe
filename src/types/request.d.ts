
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

interface UserInfo {
    is_bind_sec: Boolean;
    is_sub_oa: Boolean;
    is_need_update: Boolean;
    sec_info?: SecInfo;
}

declare interface LoginReq {
    code: string;
}

declare interface AuthInfo {
    token: string;
    user_info: UserInfo;
}



