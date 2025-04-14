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

        <img src="@/assets/service_img/registQna.png" alt="문의사항 등록" class="regist-qna"   @click="goToRegister">
    </div>

    <div class="board-wrapper">
        <ServiceTable
            :posts="pagedPosts"
            titleHeader="공지 제목"
            :useLink="true"
            linkPrefix="/qnaDetail"
            />
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
    import { useRouter } from 'vue-router'; // ✅ 추가

    const router = useRouter(); // ✅ 추가
    
    const goToRegister = () => {
       router.push('/registQna')
    }

    const qnaPosts = ref([
        { title: '성공기 게시글 파일 등록 질문', date: '2025-04-01', count: 100 },
        { title: '업데이트 안내', date: '2025-03-29', count: 80 },
        { title: '이벤트 공지', date: '2025-03-27', count: 70 },
        { title: '시스템 점검', date: '2025-03-25', count: 90 },
        { title: '정기 점검 안내', date: '2025-03-23', count: 60 },
        { title: '새 기능 소개', date: '2025-03-21', count: 85 },
        { title: '긴급 공지', date: '2025-03-19', count: 95 },
        { title: '환영합니다', date: '2025-03-17', count: 120 },
    ])

    const itemsPerPage = 5;
    const currentPage = ref(1);

    const totalPages = computed(() =>
        Math.ceil(qnaPosts.value.length / itemsPerPage)
    )

    const pagedPosts = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage
        return qnaPosts.value.slice(start, start + itemsPerPage)
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

    .regist-qna {
        position: fixed;
        display: block;
        right: 500px;
        margin-right: auto;
        cursor: pointer;
        z-index: 1000;
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

    @media (max-width: 1000px) {
        .regist-qna {
            right: 40px;
        }
    }
</style>