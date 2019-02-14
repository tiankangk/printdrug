import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/system-menu'
    },
    {
        path: '/system-menu',
        name: 'systemMenu',
        component: () => import('view/systemMenu')
    },
    {
        path: '/drug-test',
        name: 'drugTest',
        component: () => import('view/drugTest/drugTest'),
        children: [{
            path: 'ware-housing',
            name: 'wareHousing',
            component: () => import('view/drugTest/components/wareHousing/wareHousing')
        },
        {
            path: 'out-stock',
            name: 'outStock',
            component: () => import('view/drugTest/components/outStock/outStock')
        }
        ]
    }

    ]
})
