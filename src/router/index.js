import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import PatientView from '../views/PatientView.vue'
import AddPatientView from '../views/AddPatientView.vue'

const routes = [
  {
    path: '/',
    component: PatientView
  },
  {
    path: '/AddPatient',
    component: AddPatientView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
