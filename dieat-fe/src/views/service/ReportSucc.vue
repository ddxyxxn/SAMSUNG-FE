<template>
    <Header></Header>
    <div>
        <h1>신고 하기</h1>
        <img src="@/assets/service_img/registSuccBtn" alt="등록 완료" class="succ-btn">
    </div>
</template> 

<script setup>
    import Header from '@/components/common/Header.vue';
</script>

<style scoped>
    .succ-btn {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
</style>