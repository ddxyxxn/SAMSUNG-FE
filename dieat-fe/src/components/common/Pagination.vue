<template>
    <div class="pagination">
        <button @click="$emit('prev')" :disabled="currentPage === 1" class="prevBtn">◀</button>
        <span>{{ currentPage }} {{ nextPage }}</span>
        <button @click="$emit('next')" :disabled="currentPage === totalPages" class="nextBtn">▶</button>
    </div>
</template>

<script setup>
    defineProps({
        currentPage: {
            type: Number,
            required: true,
        },
        totalPages: {
            type: Number,
            required: true,
        },
    })
</script>

<style scoped>
    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin-top: 1.5rem;
        flex-wrap: nowrap;
    }

    button {
        padding: 0.5rem 1rem;
        background-color: #155b45;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
 
</style>