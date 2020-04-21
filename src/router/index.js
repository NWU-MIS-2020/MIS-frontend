import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import CourseLeaderHome from '../views/CourseLeaderHome'
import CourseLeaderRequestsList from '../views/CourseLeaderRequestsList'
import CourseLeaderStatisticDetails from '../views/CourseLeaderStatisticDetails'

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
        component: () => import('../views/PersonalGraduationRequirements'),
      },
      {
        path: 'teacher/select_course',
        component: () => import('../views/teacher/Cards')
      },
      {
        path: 'teacher/input',
        component: () => import('../views/teacher/InputGrades')
      },
      {
        path: 'tutor/cards',
        component: () => import('../views/tutor/Cards.vue'),
      },
      {
        path: 'tutor/students',
        component: () => import('../views/tutor/Students.vue'),
      },
    ]
  },
  {
    path: '/student',
    component: () => import('../views/student/studentHome.vue'),
    children:[
      {
        path: '/student/inquire',
        name: 'rightInquire',
        component: () => import('../views/student/RightInquire.vue'),
      },
      {
        path: '/student/alarm1',
        name: 'alarm1',
        component: () => import('../views/student/Alarm.vue'),
        redirect: '/student/alarm1/alarm11',
        children: [
            {
                path: 'alarm11',
                name: 'alarm11',
                component: () => import('../components/TagDateTable.vue'),
            },
            
            {
                path: 'alarm12',
                name: 'alarm12',
                component: () => import('../components/PatternDataTable.vue'),
            },
            {
                path: 'alarm13',
                name: 'alarm13',
                component: () => import('../components/CategoryDataTable.vue'),
            },
            {
                path: '*',
                name: 'other',
                redirect: 'alarm11',
            }, 
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
  {
    path: '/courseLeaderHome',
    name: 'CourseLeaderHome',
    component: CourseLeaderHome
  },
  {
    path: '/courseLeaderRequestsList',
    name: 'CourseLeaderRequestsList',
    component: CourseLeaderRequestsList
  },
  {
    path: '/courseLeaderStatisticDetails',
    name: 'CourseLeaderStatisticDetails',
    component: CourseLeaderStatisticDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

