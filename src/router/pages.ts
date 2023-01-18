// @ts-ignore
import basicComponents from "@/router/routerPage/basicComponents";
import formComponents from "@/router/routerPage/formComponents";
import dataComponents from "@/router/routerPage/dataComponents";
import navigationComponents from "@/router/routerPage/navigationComponents";
import feedbackComponents from "@/router/routerPage/feedbackComponents";
import othersComponents from "@/router/routerPage/othersComponents";

export default [
    {
        path: '/',
        name: 'home',
        component: () => import("@/views/HomePage.vue"),
    },
    {
        path: '/components',
        name: 'components',
        component: () => import("@/views/ComponentsGuide.vue"),
        children: [
            ...basicComponents,
            ...formComponents,
            ...dataComponents,
            ...navigationComponents,
            ...feedbackComponents,
            ...othersComponents
        ]
    }
]