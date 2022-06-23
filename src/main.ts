import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from '@/router'
import components from './utils/components'
import 'normalize.css/normalize.css' //重置 css  样式
import '@/style/index.scss' //引入主样式
// 导入element-plus
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register';
import SvgIcon from "./icons/index.vue";

// 创建vue实例
const app = createApp(App)

// 挂载router
app.use(router)

// 挂载pinia
app.use(store)

//全局组件
app.use(components)
//样式框架
// app.use(ElementPlus) //在vite config 中 已经进行了对应的配置
app.component("svg-icon", SvgIcon)
// 挂载实例
app.mount('#app')