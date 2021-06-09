import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue'),
    // component: () => import(/* webpackChunkName: "test" */ '../views/TableTest.vue'),
  },
  {
    path: '/JsonEditorDemo',
    name: 'JsonEditorDemo',
    component: () => import(/* webpackChunkName: "test" */ '../views/JsonEditorDemo.vue'),
  },
  {
    path: '/test1',
    name: 'test1',
    component: () => import(/* webpackChunkName: "test" */ '../views/test1.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {
        path: ':id',
        name: 'Home1',
        component: Home
      },
    ]
  },
  {
    path: '/md',
    name: 'md',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/markdown/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // console.groupCollapsed('beforeEach')
  // console.log(to, 'to');
  // console.log(from, 'from');
  // console.groupEnd()
  next();
})
router.beforeResolve((to, from, next) => {
  // console.groupCollapsed('beforeResolve')
  // console.log(to, 'to');
  // console.log(from, 'from');
  // console.groupEnd()
  next();
})
router.afterEach((to, from) => {
  // console.groupCollapsed('afterEach')
  // console.log(to, 'to');
  // console.log(from, 'from');
  // console.groupEnd()
})

export default router
