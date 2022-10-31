export type UMsgType = 'default' | 'success' | 'error' | 'warning' | 'primary' | 'loading'

export interface UMsgOptions {
    type?: UMsgType
    message: string
    duration?: number
}
