import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login',
            hidden: true,
            component: Login
        },
        {
            path: '/login',
            name: 'Login',
            hidden: true,
            component: Login
        },
        {
            path: '*',
            name: 'NotFound',
            hidden: true,
            component: ()=>import('@/components/NotFound')
        },
        {
            path: '/home',
            name: '学生管理',
            iconClass: 'fa fa-users',
            redirect: '/home/student',
            component: () => import('@/components/Home'),
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
                    path: '/home/work',
                    name: '作业列表',
                    iconClass: 'fa fa-list-ul',
                    component: () => import('@/components/students/WorkList')
                }
            ]

        },
        {
            path: '/home',
            name: '数据分析',
            iconClass: 'fa fa-bar-chart',
            component: () => import('@/components/Home'),
            children: [
                {
                    path: '/home/dataView',
                    name: '数据概览',
                    iconClass: 'fa fa-line-chart',
                    component: () => import('@/components/dataAnalysis/DataView')
                }
            ]

        },
        {
            path: '/home',
            name: '用户中心',
            iconClass: 'fa fa-user',
            component: () => import('@/components/Home'),
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
            name: 'index',
            component: ()=>import('@/components/website/Index'),
            redirect: '/index/content',
            children: [
                {
                    path: '/index/content',
                    name: 'content',
                    component: ()=>import('@/components/website/ListForIndex')
                },
                {
                    path: '/index/details/:id',
                    name: 'details',
                    component: ()=>import('@/components/website/Details')
                }
            ]
        },

    ],
    mode: 'history'
})