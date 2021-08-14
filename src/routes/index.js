import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/routes/Home'
import Movie from '@/routes/Movie'
import About from '@/routes/About'
import NotFound from '@/routes/NotFound'

Vue.use(VueRouter)

export default new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/movie/:id',
      component: Movie
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})