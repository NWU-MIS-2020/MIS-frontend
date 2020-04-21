import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import PersonalGraduationRequirements from '../views/PersonalGraduationRequirements'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'personal_graduation_requirements',
        component: PersonalGraduationRequirements
      },
      {
        path: 'tutor/cards',
        component: () => import('../views/tutor/Cards.vue'),
      },
      {
        path: 'tutor/students',
        component: () => import('../views/tutor/Students.vue'),
      },
      {
        path: 'cm/cards',
        component: () => import('../views/CM/CourseCardsGroup')
      },
      {
        path: 'cm/list',
        component: () => import('../views/CM/CourseLeaderList')
      },
      {
        path: 'cm/statistic_details',
        component: () => import('../views/CM/CourseLeaderStatisticDetails')
      },
      {
        path: 'student/inquire',
        component: () => import('../views/student/RightInquire.vue'),
      },
      {
        path: 'student/alarm',
        component: () => import('../views/student/Alarm.vue'),
        redirect: 'student/alarm/alarm1',
        children: [
            {
                path: 'alarm1',
                component: () => import('../components/TagDateTable.vue'),
            },
            
            {
                path: 'alarm2',
                component: () => import('../components/PatternDataTable.vue'),
            },
            {
                path: 'alarm3',
                component: () => import('../components/CategoryDataTable.vue'),
            },
            {
                path: '*',
                name: 'other',
                redirect: 'alarm1',
            }, 
    ]
  },
  {
    path: '/student',
    component: () => import('../views/student/studentHome.vue'),
    children:[
      
        ]
    },
    ],
  },
  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

