import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js'
import {authorizeToken} from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})
router.beforeEach(authorizeToken)

export default router
