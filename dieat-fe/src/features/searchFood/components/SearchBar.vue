<template>
    <div class="search-section">
        <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            placeholder="검색할 음식명을 입력해 주세요" />
        <button class="icon-button" @click="$emit('add')">➕</button>
        <button class="icon-button" @click="$emit('settings')">⚙️</button>
    </div>
</template>

<script setup>
defineProps({
    modelValue: {
        type: String,
        default: ''
    }
})

defineEmits(['update:modelValue', 'add', 'settings'])
</script>