import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import Home from "./pages/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:id',
    name: 'Invitación 2',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router