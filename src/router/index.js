import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../components/Home.vue'
import Login from '../components/Login'
import NotFound from '../components/NotFound'
import index from '../components/website/Index'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login',
            hidden: true,
            // component: () => import('@/components/Login')//懒加载
            component: Login
        },
        {
            path: '/login',
            name: 'Login',
            hidden: true,
            // component: () => import('@/components/Login')
            component: Login
        },
        {
            path: '*',
            name: 'NotFound',
            hidden: true,
            // component: () => import('@/components/NotFound')
            component: NotFound
        },
        // {
        //     path: '/home',
        //     // component: Home
        //     // component: () => import('@/components/Home')//懒加载
        //     component: resolve => require(['@/components/Home'], resolve)//异步组件加载
        // },
        {
            path: '/home',
            name: '学生管理',
            iconClass: 'fa fa-users',
            redirect: '/home/student',
            component: ()=>import('@/components/Home'),
            children: [
                {
                    path: '/home/student',
                    name: '学生列表',
                    iconClass: 'fa fa-list',
                    component: () => import('@/components/students/StudentList')
                },
                {
                    path: '/home/info',
                    name: '信息列表',
                    iconClass: 'fa fa-list-alt',
                    component: () => import('@/components/students/InfoList')
                },
                {
                    path: '/home/infoManagement',
                    name: '信息管理',
                    iconClass: 'fa fa-list-alt',
                    component: () => import('@/components/students/InfoManagement')
                },
                {
                    path: '/home/work',
                    name: '作业列表',
                    iconClass: 'fa fa-list-ul',
                    component: () => import('@/components/students/WorkList')
                },
                {
                    path: '/home/workManagement',
                    name: '作业管理',
                    iconClass: 'fa fa-th-list',
                    component: () => import('@/components/students/WorkManagement')
                },
            ]

        },
        {
            path: '/home',
            name: '数据分析',
            iconClass: 'fa fa-bar-chart',
            component: ()=>import('@/components/Home'),
            children: [
                {
                    path: '/home/dataView',
                    name: '数据概览',
                    iconClass: 'fa fa-line-chart',
                    component: () => import('@/components/dataAnalysis/DataView')
                },
                {
                    path: '/home/mapview',
                    name: '地图概览',
                    iconClass: 'fa fa-line-chart',
                    component: () => import('@/components/dataAnalysis/MapView')
                },
                {
                    path: '/home/travel',
                    name: '旅游地图',
                    iconClass: 'fa fa-line-chart',
                    component: () => import('@/components/dataAnalysis/TravelMap')
                },
                {
                    path: '/home/score',
                    name: '分数地图',
                    iconClass: 'fa fa-line-chart',
                    component: () => import('@/components/dataAnalysis/ScoreMap')
                }
            ]

        },
        {
            path: '/home',
            name: '用户中心',
            iconClass: 'fa fa-bar-chart',
            component: ()=>import('@/components/Home'),
            children: [
                {
                    path: '/users/user',
                    name: '权限管理',
                    iconClass: 'fa fa-th-list',
                    component: () => import('@/components/users/User')
                },
            ]
        },
        {
            path: '/index',
            component: index,
        }
    ],
    mode: 'history'
})