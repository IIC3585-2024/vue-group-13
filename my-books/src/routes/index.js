import { createRouter, createWebHistory } from 'vue-router'
import Menu from '../Menu.vue'
import Bookshelve from '../views/Bookshelve.vue'

const routes = [
  {
    path: '/',
    component: Menu,
    exact: true
  },
  {
    path: '/book-finder',
    component: () => import('../components/BookFinder.vue')
  },
  {
    path: '/bookshelves',
    component: Bookshelve
  }
]


export default createRouter({
  history: createWebHistory(),
  routes,
})