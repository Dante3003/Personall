import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/layouts/EmployeeLayout.vue'
import NotFound from '@/views/pages/NotFound.vue'
import NProgress from 'nprogress'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: { name: 'home.index' },
    children: [
      {
        path: 'employees',
        name: 'Employees',
        component: () => import('@/views/pages/employees/EmployeesPage.vue')
      },
      {
        path: 'single/:id',
        name: 'SinglePage',
        component: () => import('@/views/pages/employees/EmployeeSinglePage.vue'),
        props: true,
        beforeEnter (routeTo, routeFrom, next) {
          store.dispatch('fetchCurrentEmployee', routeTo.params.id).then(() => {
            next()
          }).catch(() => {
            next({ name: '404', params: { resource: 'Сотрудник' } })
          })
        }
      },
      {
        path: '/',
        name: 'home.index',
        component: () => import('@/views/pages/employees/Dashboard.vue'),
        meta: { title: 'Главная' }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'Страница' } }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
