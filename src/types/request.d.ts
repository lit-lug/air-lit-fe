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

interface ElecRemain {
    balance: string;
    balance_subsidy: string;
    build_name: string;
    electricity: string;
    electricity_subsidy: string;
    name: string;
    room: string;
  }

interface ElecRemainResp extends Array<ElecRemain> {}


interface ElecDetail {
    name: string;
    build_name: string;
    room: string;
    electricity: string;
    details: {
        time: string;
        value: string;
    }[];
}

interface ElecDetailsResp extends Array<ElecDetail> {}

interface Mx {
    accounttime: string;
    inmoney: string;
    paytype: string;
}

interface ElecChargeRecord {
    XTBZ: string;
    buildName: string;
    device: string;
    mdid: string;
    mx: Mx[];
    room: string;
    roomId: string;
    syl: string;
}

interface ElecChargeRecordResp extends Array<ElecChargeRecord> {}


interface ScoreInfo {
    class_name: string;
    set_credit: string;
    code: string;
    type: string;
    assess_type: string;
    score: string;
    credit: string;
    gpa: string;
    credit_gpa: string;
    info: string;
}

interface RawScoreInfo {
    class_name: string;
    set_credit: string;
    type: string;
    assess_type: string;
    code: string;
    raw_score: RawScore;
    score: string;
    info: string;
}

interface RawScore {
    usual: string;
    midterm: string;
    finalExam: string;
    skill: string;
    general: string;
}


type ScoreResp = {
    all: Map<string,  Map<string , ScoreInfo> >;
    raw: Map<string,  Map<string , RawScoreInfo> >;
}
