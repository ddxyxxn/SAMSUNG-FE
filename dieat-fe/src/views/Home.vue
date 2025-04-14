<template>
  <div>
    <Header></Header>
    <main class="main">
      <div class="image-wrapper">
        <img src="@/assets/home_img/diet_main_img.jpg" alt="기본 이미지" class="main-img"/>
        <img src="@/assets/home_img/diet_main_img_hover.png" alt="호버 이미지" class="hover-overlay"/>
      </div>
    </main>

    <br>    

    <div class="swiper-wrapper">
      <swiper
        
        :modules="[Navigation, Autoplay]"
        :loop="true"
        :autoplay="{ delay: 3000 }"
        class="my-swiper"
        @swiper="onSwiper"
        @mouseenter="pauseAutoplay"
        @mouseleave="resumeAutoplay"
      >
        <swiper-slide v-for="(img, i) in images" :key="i">
          <img :src="img" class="slide-img" />
        </swiper-slide>
      </swiper>

      <div class="arrow-buttons">
        <button @click="slidePrev">&#10094;</button>
        <button @click="slideNext">&#10095;</button>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import {ref} from 'vue';
import Header from '@/components/common/Header.vue';

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'


import img1 from '@/assets/home_img/mypage.png';
import img2 from '@/assets/home_img/searchFood.png';
import img3 from '@/assets/home_img/meal.png';
import img4 from '@/assets/home_img/dietPost.png';
import img5 from '@/assets/home_img/succPost.png';
import img6 from '@/assets/home_img/freePost.png';

const images = [img1, img2, img3, img4, img5, img6];

const swiperInstance = ref(null);

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

const slidePrev = () => {
  swiperInstance.value?.slidePrev();
};

const slideNext = () => {
  swiperInstance.value?.slideNext();
};

const pauseAutoplay = () => {
  swiperInstance.value?.autoplay?.stop();
};

const resumeAutoplay = () => {
  swiperInstance.value?.autoplay?.start();
};
</script>

<style scoped>
  .main {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      position: relative;
      z-index: 1;
  }
  
  .image-wrapper {
      position: relative;
      width: 100%;
      max-width: 800px;
      aspect-ratio: 7/5; /* 이미지 비율 유지 (선택) */
      z-index: 1;
  }
  
  .main-img {
      width: 800px;
      height: 600px;
      object-fit: cover;
      display: block;
  }
  
  /* 호버 이미지: 평소엔 안 보이고, 위에 겹쳐짐 */
  .hover-overlay {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      transition: opacity 0.3s ease;
      pointer-events: none;
  }

  /* 마우스를 올리면 호버 이미지가 부드럽게 나타남 */
  .image-wrapper:hover .hover-overlay {
      opacity: 0.8; /* 투명도 설정 */
  }

  .swiper-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;  
    margin-top: 2rem;
  }

  .my-swiper {
    width: 800px;
    height: 600px;
  }

  .slide-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .arrow-buttons {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
  }

  .arrow-buttons button {
    background: #189b71;
    color: white;
    font-size: 2rem;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .arrow-buttons button:hover {
    background: #117653;
  }
</style>
