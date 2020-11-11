import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import Categorylist from '../views/Categorylist.vue'
import Product from '../views/Product.vue'
import Buycart from '../views/Buycart.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            showBottomTabBar: true
        }
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/category',
        name: 'category',
        component: Category,
        meta: {
            showBottomTabBar: true
        }
    },
    {
        path: '/categorylist/:id',
        name: 'categorylist',
        component: Categorylist,
        props: true, //传递参数
        meta: {
            showBottomTabBar: true
        }
    },
    {
        path: '/product/:id',
        name: 'product',
        component: Product,
        props: true,
    }, {
        path: '/buycart',
        name: 'buycart',
        component: Buycart,
        meta: {
            showBottomTabBar: true
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router