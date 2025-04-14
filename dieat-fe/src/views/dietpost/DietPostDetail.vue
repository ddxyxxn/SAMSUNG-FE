<template>
    <Header></Header>
    <div class="post-detail">
  
      <!-- 페이지 경로 -->
      <div class="breadcrumb">
        HOME &gt; MEAL &gt; 식단 게시글
        <button class="back-btn">목록 보기</button>
      </div>
  
      <!-- 게시글 내용 -->
      <div class="post-container">
        <h2>🔍 {{ post.title }}</h2>
  
        <!-- 작성자 정보 -->
        <div class="info">
          <span><strong>작성자</strong> {{ post.nickname }}</span>
          <span><strong>작성일시</strong> {{ post.date }}</span>
          <span><strong>조회수</strong> {{ post.views }}</span>
        </div>
  
        <!-- 이미지 -->
        <img :src="dietImage" alt="썸네일" class="main-img" />
  
        <!-- 설명 -->
        <p class="description">
          {{ post.description }}
        </p>
  
        <!-- 상세 영양 리스트 -->
        <div class="nutrition-table">
          <div class="row" v-for="(item, index) in post.items" :key="index">
            <span class="food-name">{{ item.name }}</span>
            <span>{{ item.kcal }} kcal</span>
            <span>{{ item.carbs }} g</span>
            <span>{{ item.protein }} g</span>
            <span>{{ item.fat }} g</span>
            <span>{{ item.sugar }} g</span>
          </div>
        </div>
  
        <!-- 총 영양 정보 -->
        <div class="summary">
          <h3>영양 정보</h3>
          <div class="summary-row">
            <span>총 열량: <strong>{{ post.total.kcal }} kcal</strong></span>
            <span>총 탄수화물: <strong>{{ post.total.carbs }} g</strong></span>
            <span>총 단백질: <strong>{{ post.total.protein }} g</strong></span>
            <span>총 지방: <strong>{{ post.total.fat }} g</strong></span>
            <span>총 당: <strong>{{ post.total.sugar }} g</strong></span>
          </div>
        </div>
  
        <!-- 좋아요 및 댓글 -->
        <div class="interaction">
          ❤️ 좋아요 {{ post.likes }} &nbsp;&nbsp;&nbsp; 💬 댓글 {{ post.comments.length }}
        </div>
  
        <!-- 댓글 목록 -->
        <div class="comment-list">
          <div class="comment" v-for="(c, i) in post.comments" :key="i">
            <strong>{{ c.writer }}</strong>: {{ c.content }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Header from '@/components/common/Header.vue'
  import dietImage from '@/assets/dietpost/diet_post_img.png'
  
  const post = {
    title: '스크램블 에그와 토스트 조합!',
    nickname: '웰시킹',
    date: '2025-04-02 14:00:00',
    views: 50,
    description: '담백하면서도 고소한 스크램블 에그와 토스트입니다...',
    likes: 59,
    items: [
      { name: '스크램블 에그', kcal: 177, carbs: 1.9, protein: 12, fat: 13, sugar: 1 },
      { name: '토스트', kcal: 148, carbs: 16, protein: 10, fat: 7, sugar: 1 }
    ],
    total: { kcal: 1200, carbs: 500, protein: 300, fat: 200, sugar: 10 },
    comments: [
      { writer: '열치열', content: '얼치 143g 피스 미쳤다..' },
      { writer: '헬도리군', content: '상상보다 헬치!' }
    ]
  }
  </script>
  
  <style scoped>
  .post-detail {
    padding-top: 10px;
    max-width: 900px;
    margin: 0 auto;
    font-family: sans-serif;
  }
  .breadcrumb {
    text-align: right;
    font-size: 0.85rem;
    color: #555;
    margin-bottom: 1rem;
  }
  .back-btn {
    margin-left: 1rem;
    background: #f5f5f5;
    border: 1px solid #ccc;
    padding: 4px 10px;
    border-radius: 6px;
    cursor: pointer;
  }
  .post-container {
    border: 1px solid #2caa88;
    border-radius: 12px;
    padding: 1.5rem;
  }
  .info {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  .main-img {
    width: 100%;
    border-radius: 12px;
    margin: 1rem 0;
  }
  .description {
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  .nutrition-table {
    margin-bottom: 1rem;
  }
  .nutrition-table .row {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    border-bottom: 1px solid #eee;
  }
  .food-name {
    font-weight: bold;
    color: #333;
  }
  .summary {
    background: #f9f9f9;
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 10px;
  }
  .summary-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    font-size: 0.9rem;
  }
  .interaction {
    margin-top: 1.5rem;
    font-weight: bold;
    color: #d44;
  }
  .comment-list {
    margin-top: 1rem;
  }
  .comment {
    margin-bottom: 0.5rem;
  }
  </style>
  