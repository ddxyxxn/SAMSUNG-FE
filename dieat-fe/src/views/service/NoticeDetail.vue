<template>
    <Header></Header>
    <div v-if="postId === '0'" class="notice-detail">
      <h1 class="title">공지 사항</h1>
  
      <button class="back-btn" @click="router.push('/noticeLayout')">
        <img src="@/assets/service_img/gotoList.png" alt="목록"/>
      </button>
  
      <div class="detail-box">
        <div class="meta-table">
          <div class="meta-row">
            <span class="label">제목</span>
            <span class="value">{{ post.title }}</span>
            <span class="date">작성일자: {{ post.date }}</span>
          </div>
        </div>
  
        <div class="content-box">
          <p>저희 서비스는 <strong>2025년 4월 16일 이후</strong> 이후로 잠시 중단될 예정입니다.<br />
          그동안 많은 이용해주셔서 감사합니다.</p>
          <p>더 좋은 서비스로 여러분들을 찾아뵙겠습니다.</p>
        </div>
      </div>
    </div>
  
    <div v-else style="text-align: center; margin-top: 5rem;">
      <h2 style="color: red;">해당 게시글은 존재하지 않습니다.</h2>
    </div>
    <Footer></Footer>
</template>
  
<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import Header from '@/components/common/Header.vue';
  import Footer from '@/components/common/Footer.vue';
  
  const route = useRoute();
  const router = useRouter();
  const postId = route.params.id;
  
  // 0번 게시물만 허용
  const post = {
    title: '공지사항입니다. 공지사항',
    date: '2025-03-27 03:24:23',
    count: '18',
  };
  </script>
  
  <style scoped>
  .notice-detail {
    max-width: 800px;
    margin: 3rem auto;
    padding: 1rem;
  }
  
  .title {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .back-btn {
    background: none;
    border: none;
    
    cursor: pointer;
    margin-bottom: 50px;
  }
  
  .detail-box {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 50px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    margin-bottom: 100px;
  }
  
  .meta-table {
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
  
  .meta-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .label {
    font-weight: bold;
    margin-right: 0.5rem;
    font-size: 23px;
  }
  
  .value {
    flex: 1;
    font-weight: 500;
    font-size: 20px;
  }
  
  .date {
    color: gray;
    font-size: 15px;
    white-space: nowrap;
  }
  
  .content-box {
    border: 1px solid #eaeaea;
    background: #fafafa;
    border-radius: 8px;
    padding: 1.2rem;
    line-height: 1.6;
    font-size: 18px;
  }
</style>
  