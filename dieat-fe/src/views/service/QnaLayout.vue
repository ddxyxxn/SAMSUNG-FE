<template>
    <Header></Header>
    <div>
        <div class="breadcrumb">
            <RouterLink to="/" class="text-link">Home &gt; </RouterLink>
            <span>Service &gt; </span>
            <RouterLink to="/qnaLayout" class="text-link">문의 사항</RouterLink>
        </div>
        <h1>문의 사항</h1>
        <img src="@/assets/service_img/searching.png" alt="searching bar" class="searchingBar-img">
<!-- 
        <ul class="post-list">
            <li v-for="(post, index) in posts" :key="index" class="post-item">
                <h3>{{ post.title }}</h3>
                <p class="meta">일시: {{ post.date }} | 조회수: {{ post.count }}</p>
            </li>
        </ul> -->
    </div>

    <div class="board-wrapper">
        <ServiceTable :posts = "pagedPosts"/>
    </div>

    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @prev="prevPage"
      @next="nextPage"
    />
</template>

<script setup>
    import Header from '@/components/common/Header.vue';
    import ServiceTable from './ServiceTable.vue';
    import Pagination from '@/components/common/Pagination.vue';
    import { ref, computed } from 'vue';

    const posts = ref([
        { title: '문의사항 1', author: '관리자', date: '2025-04-01', count: 100 },
        { title: '업데이트 안내', author: '운영자', date: '2025-03-29', count: 80 },
        { title: '이벤트 공지', author: '운영자', date: '2025-03-27', count: 70 },
        { title: '시스템 점검', author: '관리자', date: '2025-03-25', count: 90 },
        { title: '정기 점검 안내', author: '관리자', date: '2025-03-23', count: 60 },
        { title: '새 기능 소개', author: '관리자', date: '2025-03-21', count: 85 },
        { title: '긴급 공지', author: '운영자', date: '2025-03-19', count: 95 },
        { title: '환영합니다', author: '관리자', date: '2025-03-17', count: 120 },
    ])

    const itemsPerPage = 5;
    const currentPage = ref(1);

    const totalPages = computed(() =>
        Math.ceil(posts.value.length / itemsPerPage)
    )

    const pagedPosts = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage
        return posts.value.slice(start, start + itemsPerPage)
    })

    const nextPage = () => {
        if (currentPage.value < totalPages.value) {
            currentPage.value++
        }
    }

    const prevPage = () => {
        if (currentPage.value > 1) {
            currentPage.value--
        }
    }

</script>

<style scoped>
    .breadcrumb {
        display: block;
        text-align: right;
        margin-top: 1rem;
        margin-right: 3rem;
        color: gray;
        flex-wrap: nowrap;
    }

    .text-link {
        color: inherit;
        text-decoration: none;
        font-weight: normal;
        cursor: pointer;
    }

    h1 {
        text-align: center;
    }

    .searchingBar-img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 6rem;
    }

    .board-wrapper {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
    }

    .notice-wrapper {
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem;
    }
</style>