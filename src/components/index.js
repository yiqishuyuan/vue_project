// 组件全局
// 在全局中组件能使用
import imageViews from "./imageViews.vue";
export const components = {
    install(app){
        app.component('imageViews',imageViews)
    }
}