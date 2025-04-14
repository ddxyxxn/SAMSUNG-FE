<template>
    <Header></Header>
    <div>
        <div class="breadcrumb">
            <RouterLink to="/" class="text-link">Home &gt; </RouterLink>
            <span>Post &gt; </span>
            <RouterLink to="/SuccessLayout" class="text-link">성공기 게시글</RouterLink>
        </div>
        <h1>성공기 게시글</h1>
        <img src="@/assets/service_img/searching.png" alt="searching bar" class="searchingBar-img">

        <img src="@/assets/succpost_img/registerPost.png" alt="게사글 등록" class="regist-post"   @click="goToRegister">
    </div>

    <div class="board-wrapper">
        <table class="post-table">
            <thead>
            <tr>
                <th>No.</th>
                <th>제목</th>
                <th>작성자</th>
                <th>일시</th>
                <th>조회수</th>
                <th>좋아요</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(post, index) in paginatedPosts" :key="post.id">
                <td>{{ post.no }}</td>
                <td>{{ post.title }}</td>
                <td>{{ post.writer }}</td>
                <td>{{ post.date }}</td>
                <td>{{ post.views }}</td>
                <td>{{ post.likes }}</td>
            </tr>
            </tbody>
        </table>
    </div>

      <div class="pagination">
        <button @click="prevPage" :disabled="page === 1">&lt;</button>
        <span>{{ page }}</span>
        <button @click="nextPage" :disabled="page === maxPage">&gt;</button>
      </div>
      <br>
      <br>
      <br>
      <br>
      <Footer></Footer>
</template>

<script setup>
    import Header from '@/components/common/Header.vue';
    import Footer from '@/components/common/Footer.vue';
    import { ref, computed } from 'vue';
    import { useRouter } from 'vue-router'; // ✅ 추가

    const router = useRouter(); // ✅ 추가
    
    const goToRegister = () => {
       router.push('/registerSucc')
    }

    const page = ref(1)
    const postsPerPage = 7


    const posts = ref([
    { no: 17, title: '먹으면서 뺐다, 진짜로', writer: 'jerry0417', date: '2025-04-12', views: 0, likes: 0 },
    { no: 16, title: '초간단 성공기 3주 느낀 점', writer: '윈터공주', date: '2025-04-06', views: 3, likes: 1 },
    { no: 15, title: '하루 1식, 한 달 후기 드림!', writer: '냉장고요정', date: '2025-04-02', views: 6, likes: 1 },
    { no: 14, title: '나를 위한 도전, 나는 날았다', writer: '열정만렙다이어터', date: '2025-04-01', views: 11, likes: 3 },
    { no: 13, title: '다이어트는 지옥이었다...', writer: '밥은건들지마', date: '2025-03-31', views: 13, likes: 1 },
    { no: 12, title: '퇴짜맞던 다 프로포즈 받았습니다..!', writer: '엉뚱한토마토', date: '2025-03-30', views: 23, likes: 2 },
    { no: 11, title: '먹어도 빠지는 법을 배웠습니다', writer: '성북동비둘기', date: '2025-03-30', views: 34, likes: 5 },
    { no: 10, title: '나도 할 수 있었다는 이야기 [7kg]', writer: '오뚝이', date: '2025-03-28', views: 14, likes: 3 },
    { no: 9, title: '위염약 먹다 뺀 나의 10kg', writer: '망원동고양이', date: '2025-03-23', views: 33, likes: 24 }
    ])

    const maxPage = computed(() => Math.ceil(posts.value.length / postsPerPage))

    const paginatedPosts = computed(() =>
        posts.value.slice((page.value - 1) * postsPerPage, page.value * postsPerPage)
    )

    function prevPage() {
        if (page.value > 1) page.value--
    }

    function nextPage() {
        if (page.value < maxPage.value) page.value++
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

    .regist-post {
        display: block;
        margin-left: auto;
        margin-right: 300px;
        cursor: pointer;
        z-index: 1000;
    }

    .post-controls {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    }

    .post-table {
        position: relative;
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 10px;
        margin-top: 1rem;
        border-radius: 12px;
        border: 2px solid lightgray;
        padding: 30px;
    }

    .post-table thead {
    background-color: #f5f5f5;
    font-weight: 600;
    }

    .post-table th {
        background-color: white;
        font-weight: bold;
        padding: 12px;
        text-align: center;
        border-bottom: 2px solid gray;
    }
    .post-table td {
        background-color: white;
        padding: 16px;
        text-align: center;
        border: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
        border-radius: 8px;
    }

    .post-table tr:hover  td{
        background-color: #f9f9f9;
        transition: background-color 0.2s ease;
    }

    .title-link a {
        text-decoration: none;
        color: inherit;     
        font-weight: normal;
        cursor: pointer;
    }

    .title-link a:hover {
        text-decoration: none;     /* 호버 시에도 밑줄 제거 */
        color: inherit;
    }

    .post-table .title-cell {
    text-align: left;
    padding-left: 20px;
    }

    .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-size: 16px;
    }

    .board-wrapper {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .pagination button {
    background: none;
    border: none;
    font-size: 18px;
    margin: 0 10px;
    cursor: pointer;
    color: #333;
    }

    .pagination button:disabled {
    color: #ccc;
    cursor: default;
    }

    @media (max-width: 1000px) {
        .regist-post {
            margin-left: auto;
            margin-right: 60px;
        }
    }
</style>