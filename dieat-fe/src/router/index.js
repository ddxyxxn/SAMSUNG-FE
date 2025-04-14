// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// 페이지 컴포넌트 불러오기
import Home from '@/views/Home.vue';
import Signup from '@/views/Signup.vue';
import Login from '@/views/Login.vue';

import DietPostLayout from '@/views/dietpost/DietPostLayout.vue';
import MealLayout from '@/views/meal/MealLayout.vue';
import RegistMeal from '@/views/meal/RegistMeal.vue';
import NoticeLayout from '@/views/service/NoticeLayout.vue';
import QnaLayout from '@/views/service/QnaLayout.vue';
import SearchFood from '@/features/searchFood/pages/FoodSearchPage.vue';
// import ReadFree from '@/features/readFree/pages/FreePostListPage.vue';
import DietPostDetail from '@/views/dietpost/DietPostDetail.vue';

import Dashboard from '@/views/dashboard/Dashboard.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/signup', component: Signup },
    { path: '/login', component: Login },
    { path: '/dietPost', component: DietPostLayout },
    { path: '/searchFood', component: SearchFood },
    // { path: '/readFree', component: ReadFree },
    { path: '/noticeLayout', component: NoticeLayout },
    { path: '/qnaLayout', component: QnaLayout },
    { path: '/dietPost/:id', component: DietPostDetail },
    { path: '/MealLayout', component: MealLayout},
    {path: '/RegistMeal', component: RegistMeal},
    // {path: '/readFree', component: ReadFree },
    {path: '/dashboard', component: Dashboard}

  ]
});

export default router;
