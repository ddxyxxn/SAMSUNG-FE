<template>
    <Header></Header>
    <div>
        <div class="breadcrumb">
            <RouterLink to="/" class="text-link">Home &gt; </RouterLink>
            <span>Service &gt; </span>
            <RouterLink to="/noticeLayout" class="text-link">공지 사항</RouterLink>
        </div>
        <h1>공지 사항</h1>
        <img src="@/assets/service_img/searching.png" alt="searching bar" class="searchingBar-img">

        <ul class="post-list">
            <li v-for="(post, index) in posts" :key="index" class="post-item">
                <h3>{{ post.title }}</h3>
                <p class="meta">일시: {{ post.date }} | 조회수: {{ post.count }}</p>
            </li>
        </ul>
    </div>

    <div class="board-wrapper">
        <ServiceTable :posts="noticePosts"/>
    </div>

</template>

<script setup>
    import Header from '@/components/common/Header.vue';
    import ServiceTable from './ServiceTable.vue';
    import { ref } from 'vue';
    
    const noticePosts = ref([
        { title: '공지사항입니다. 공지사항', date: '2025-03-27', count: '18' },
        { title: 'Dieat 서비스 안내', date: '2025-03-27', count: '18' },
        { title: '3월 업데이트 안내', date: '2025-03-24', count: '65' },
        { title: '시스템 점검 시간으로 인한 사이트 접속 제한', date: '2025-03-14', count: '69' },
        { title: '공지사항에는', date: '2025-03-11', count: '73' },
        { title: '또 무슨 공지가 있을까요', date: '2025-03-08', count: '99' },
        { title: '그래서 저희의 요점은', date: '2025-03-01', count: '123' },
        { title: '다잇, 삼성 많은 사랑 부탁드립니다.', date: '2025-02-27', count: '232' }
    ])
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
</style>