import {createRouter, createWebHashHistory} from "vue-router";
import routerPages from './pages'
const router = createRouter({
    history: createWebHashHistory(),
    routes: [...routerPages]
});

export default router;