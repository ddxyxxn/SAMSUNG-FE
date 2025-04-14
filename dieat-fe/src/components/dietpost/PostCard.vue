<template>
  <div class="post-card">
    <!-- 👤 사용자 정보 -->
    <div class="post-header">
      <img :src="userImage" alt="사용자 이미지" class="user-image" />
      <span class="nickname">{{ post.nickname }}</span>
      <button @click="toggleFollow" class="follow-btn">
        {{ isFollowing ? '팔로잉' : '팔로우' }}
      </button>
      <MoreMenu />
    </div>

    <!-- 🖼️ 썸네일 + 오버레이 + 제목 + 북마크 -->
    <div class="image-container" @click="goToDetail" style="cursor: pointer;">
      <img :src="dietImage" alt="식단 이미지" class="thumbnail" />
      <div class="overlay"></div>

    <!-- 제목 + 북마크 버튼 부분 -->
    <div class="title-bookmark">
      <h3 class="image-title">{{ post.title }}</h3>
    <BookmarkButton
      :isActive="isBookmarked"
      @toggle="toggleBookmark"
    />
</div>
    </div>

    <!-- 📅 날짜 + ❤️ 좋아요 + 💬 댓글 -->
    <div class="meta">
      <span class="date">{{ post.date }}</span>
      <div class="right-meta">
        <LikeButton :initialCount="post.likes" />
        <span>💬 {{ post.comments }}</span>
      </div>
    </div>

    <!-- 🔥 영양 정보 -->
    <div class="nutrition-tags">
      <span class="tag">열량 <br> {{ post.calories }} kcal</span>
      <span class="tag">탄수화물 <br> {{ post.carbs }} g</span>
      <span class="tag">단백질 <br> {{ post.protein }} g</span>
      <span class="tag">지방 <br> {{ post.fat }} g</span>
      <span class="tag">당 <br> {{ post.sugar }} g</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import userImage from '@/assets/dietpost/user_img.png'
import dietImage from '@/assets/dietpost/diet_post_img.png'
import BookmarkButton from './BookmarkButton.vue'
import MoreMenu from './MoreMenu.vue'
import LikeButton from './LikeButton.vue'

// defineProps({
//   post: Object
// })

const isFollowing = ref(false)
const isBookmarked = ref(false)

const router = useRouter()
const { post } = defineProps(['post'])

function toggleFollow() {
  isFollowing.value = !isFollowing.value
}

function toggleBookmark() {
  isBookmarked.value = !isBookmarked.value
}

function goToDetail() {
  router.push(`/dietPost/${post.id}`)
}
</script>

<style scoped>
.post-card {
  width: 320px;
  padding: 1rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-image {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}

.nickname {
  font-weight: 600;
  flex-grow: 1;
}

.follow-btn {
  padding: 2px 12px;
  font-size: 0.8rem;
  border: 1.5px solid black;
  background-color: white;
  color: black;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.follow-btn:hover {
  background-color: #f2f2f2;
}

.more-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  color: black;
}

.image-container {
  position: relative;
}

.thumbnail {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

/* 🔳 어두운 오버레이 */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(43, 43, 43, 0.5);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

/* 📝 제목 + 저장 버튼 */
.title-bookmark {
  position: absolute;
  top: 8px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  color: white;
}

.image-title {
  font-size: 1.05rem;
  margin: 0;
  font-weight: bold;
}

.bookmark-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.save-icon {
  width: 20px;
  height: 20px;
}

/* 📅 날짜 + 좋아요/댓글 */
.meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #666;
  align-items: center;
}

.right-meta {
  display: flex;
  gap: 10px;
}

.nutrition-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  background: #f2f2f2;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  text-align: center;

}
</style>
