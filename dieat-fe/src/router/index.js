// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// 페이지 컴포넌트 불러오기
import Home from '@/views/Home.vue';
import Regist from '@/components/Regist.vue';
import Login from '@/views/Login.vue';
import NoticeLayout from '@/views/service/NoticeLayout.vue';
import QnaLayout from '@/views/service/QnaLayout.vue';
import MyReportLayout from '@/views/service/MyReportLayout.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: Home, component: Home },
    { path: '/register', component: Regist },
    { path: '/login', component: Login },
    { path: '/noticeLayout', component: NoticeLayout},
    { path: '/qnaLayout', component: QnaLayout},
    { path: '/myReportLayout', component: MyReportLayout}
  ]
});

export default router;
