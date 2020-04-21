import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'

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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
