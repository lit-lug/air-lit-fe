
/* 请求配置/响应的补充说明 */

interface ListOpts {
    page: number;
    limit: number;
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

declare interface LoginResp {
    is_bind_sec: Boolean;
    token: string;
    user_info: UserInfo | {};
}
