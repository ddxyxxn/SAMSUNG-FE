<template>
  <header>
    <Header />
  </header>
  <div class="layout-wrapper">
    <main class="content">
      <!-- 🔹 경로 표시 (오른쪽 정렬 + 헤더 바로 아래) -->
      <div class="breadcrumb-wrapper">
        <div class="breadcrumb">HOME &gt; MEAL &gt; 식단 게시글</div>
      </div>

      <!-- 🔹 제목 + 버튼 -->
      <div class="top-section">
        <h1 class="page-title">식단 게시글</h1>
        <div class="button-group">
          <button class="btn register">식단 등록</button>
          <button class="btn my-posts">나의 게시글</button>
        </div>
      </div>

      <!-- 🔹 검색창 -->
      <div class="search-bar">
        <input v-model="searchKeyword" type="text" placeholder="검색할 식단을 입력하세요." />
        <button @click="handleSearch">🔍</button>
      </div>

      <!-- 🔹 게시글 목록 -->
      <div class="post-grid">
        <PostCard
          v-for="post in posts"
          :key="post.id"
          :post="post"
        />
      </div>

      <!-- 🔹 페이지네이션 -->
      <div class="pagination">
        <button>◀</button>
        <button class="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>▶</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PostCard from '@/components/dietpost/PostCard.vue'
import Header from '@/components/common/Header.vue'

const searchKeyword = ref('')

const posts = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  nickname: '헬스킹',
  title: `닭가슴살 도시락 ${i + 1}`,
  date: '2025-03-26',
  likes: Math.floor(Math.random() * 100),
  comments: Math.floor(Math.random() * 10),
  calories: 300 + i,
  carbs: 20 + i,
  protein: 35 - i,
  fat: 10 + i,
  sugar: 2 + i
}))

function handleSearch() {
  console.log('검색어:', searchKeyword.value)
}
</script>

<style scoped>
.layout-wrapper {
  width: 100%;
  padding-top: 10px; /* 헤더 고정 고려 */
  background-color: #f9f9f9;
  min-height: 100vh;
}

.content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem;
}

/* 🔹 경로 표시 우측 정렬 */
.breadcrumb-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}

.breadcrumb {
  font-size: 0.9rem;
  color: #888;
}

/* 🔹 제목 + 버튼 정렬 */
.top-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}

.page-title {
  font-size: 1.6rem;
  font-weight: bold;
  margin: 0;
}

.button-group {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.register,
.my-posts {
  background-color: #0f8f64;
  color: white;
}

/* 🔹 검색창 */
.search-bar {
  display: flex;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
}

.search-bar input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.search-bar button {
  padding: 0 1.2rem;
  background: #0f8f64;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

/* 🔹 카드 리스트 */
.post-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* 🔹 페이지네이션 */
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.pagination button {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}

.pagination .active {
  background: #0f8f64;
  color: white;
  font-weight: bold;
}
</style>
