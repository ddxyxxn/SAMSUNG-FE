<template>
    <div v-if="show" class="modal-overlay">
        <div class="modal-content">
            <p>{{ message }}</p>
            <button @click="$emit('confirm')" class="modal-confirm-btn">{{ confirmText }}</button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    show: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        default: '알림'
    },
    message: {
        type: String,
        required: true
    },
    confirmText: {
        type: String,
        default: '확인'
    }
});

defineEmits(['confirm']);
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    width: 409px;
    height: 285px;
    border-radius: 12px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    position: relative;
}

.modal-content h3 {
    margin: 0 0 30px 0;
    font-size: 24px;
    color: #333;
    font-weight: 600;
}

.modal-content p {
    margin-top: 80px;
    margin-bottom: 40px;
    color: #666;
    font-family: 'Inter', sans-serif;
    font-size: 22px;
    font-weight: 600;
}

.modal-confirm-btn {
    position: absolute;
    bottom: 40px;
    width: 93px;
    height: 35px;
    background-color: #F85230;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 700;
    transition: background-color 0.2s;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-confirm-btn:hover {
    background-color: #e64a2b;
}
</style> 