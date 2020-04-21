import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import PersonalGraduationRequirements from '../views/PersonalGraduationRequirements'
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
    ]
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

