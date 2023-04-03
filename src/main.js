import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'
import storeConfig from './store'
import {Select,message} from 'ant-design-vue';
import { Pagination } from "ant-design-vue";
import 'ant-design-vue/lib/select/style/index.css';
import 'ant-design-vue/lib/notification/style/index.css';
import 'ant-design-vue/lib/pagination/style/index.css'
const store = createStore(storeConfig)
const app = createApp(App)
app.use(router)
app.use(store)
app.use(Select)
app.use(Pagination)
app.mount('#app')
app.config.globalProperties.$message = message;