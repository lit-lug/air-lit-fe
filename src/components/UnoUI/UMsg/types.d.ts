export type UMsgType = 'success' | 'error' | 'warning' | 'loading' | 'hide'

export interface UMsgOptions {
    type?: UMsgType
    message?: string
    duration?: number
}
