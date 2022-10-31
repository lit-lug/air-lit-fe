export type UMsgType = 'success' | 'error' | 'warning' | 'loading'

export interface UMsgOptions {
    type?: UMsgType
    message: string
    duration?: number
}
