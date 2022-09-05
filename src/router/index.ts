import { ComponentPublicInstance, nextTick } from "vue"
//如果想要使用框架的自带工具函数请输入uni.$tm.u.?你的方法
//网络请示为uni.$tm.fetch.?你的方法


interface beforeRouterOpts {
    path: string,//当前页面路径，不含前缀 /
    opts?: any,//页面参数
    context: ComponentPublicInstance | null,
}


/**
 * 路由访问前执行的函数
 * @param path 页面路径，不带前缀/
 */
export const useTmRouterBefore = (arg: beforeRouterOpts): void => {
    // 每一个页面在初化前都会执行


    console.log('路由访问前执行的函数', arg)
}
/**
 * 路由访问后执行的函数
 * @param path 页面路径，不带前缀/
 * @param opts 页面加载完成后返回的参数
 */
export const useTmRouterAfter = (arg: beforeRouterOpts): void => {
    //每一个页面初始后都会执行


    // // 每一个页面在初化前都会执行
    // if (isAuth && arg.path != '/pages/mine/account/account') {
    //     // 未登录，跳转到登录页面
    //     uni.$tm.u.routerTo('/pages/mine/account/account', 'redirect')
    // }

    console.log('路由访问后执行的函数', arg)

}
