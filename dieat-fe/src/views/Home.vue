<template>
    <div>
      <Header></Header>
      <main class="main">
        <div class="image-wrapper">
          <img
            src="@/assets/home_img/diet_main_img.jpg"
            alt="기본 이미지"
            class="main-img"
          />
          <img
            src="@/assets/home_img/diet_main_img_hover.png"
            alt="호버 이미지"
            class="hover-overlay"
          />
        </div>
      </main>

      <br>
      <br>      

      <section class="carousel-wrapper">
        <Carousel
          ref = "carouselRef"
          v-model="currentSlide"
          :wrapAround="true"
          :transition="500"
          :transitionType="'fade'"
          :mouseDrag="false"
          :touchDrag="false"
          class="custom-carousel"
        >
          <Slide v-for="(img, index) in images" :key="index">
            <img :src="img" class="slide-img" />
          </Slide>          
        </Carousel>

        <div class="arrow-buttons">
          <button @click="prevSlide">&#10094;</button>
          <button @click="nextSlide">&#10095;</button>
        </div>
    </section>
    </div>
    
</template>
  
<script setup>
  import {ref, onMounted, onBeforeUnmount} from 'vue';
  import Header from '@/components/common/Header.vue';

  import { Carousel, Slide } from 'vue3-carousel';
  import 'vue3-carousel/dist/carousel.css'

  import img1 from '@/assets/home_img/mypage.png';
  import img2 from '@/assets/home_img/searchFood.png';
  import img3 from '@/assets/home_img/meal.png';
  import img4 from '@/assets/home_img/dietPost.png';
  import img5 from '@/assets/home_img/succPost.png';
  import img6 from '@/assets/home_img/freePost.png';

  const images = [img1, img2, img3, img4, img5, img6];


  const currentSlide = ref(0);

  let intervalId;

  onMounted(() => {
    intervalId = setInterval(() => {
      currentSlide.value = (currentSlide.value + 1) % images.length;
    }, 3000); // 4초마다 넘어감
  });

  onBeforeUnmount(() => {
    clearInterval(intervalId);
  });


  const carouselRef = ref(null);

  const prevSlide = () => {
    currentSlide.value =
    (currentSlide.value - 1 + images.length) % images.length;
  };

  const nextSlide = () => {
    currentSlide.value =
    (currentSlide.value + 1) % images.length;
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

    /* .carousel-wrapper {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    } */
    .custom-carousel {
      position: relative;
      margin-top: 2rem;
      display: flex;
      justify-content: center;
      height: auto;     /* 꼭 있어야 함 */
      z-index: 2;
    }


    .slide-img {
      width: 800px;
      height: 600px;
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
  