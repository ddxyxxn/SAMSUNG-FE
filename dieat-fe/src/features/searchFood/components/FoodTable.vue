<template>
    <table class="food-table">
        <thead>
            <tr>
                <th class="wide">음식명</th>
                <th>기준 단위</th>
                <th>열량</th>
                <th>탄수화물</th>
                <th>단백질</th>
                <th>지방</th>
                <th>당</th>
                <th>정확해요</th>
                <th>수정이 필요해요</th>
                <th>닉네임</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in items" :key="index" class="clickable-row" @click="handleClick(item)">
                <td class="wide">{{ item.name }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.kcal }}</td>
                <td>{{ item.carb }}</td>
                <td>{{ item.protein }}</td>
                <td>{{ item.fat }}</td>
                <td>{{ item.sugar }}</td>
                <td>{{ item.accurate }}</td>
                <td>{{ item.inaccurate }}</td>
                <td>{{ item.nickname }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
const props = defineProps({
    items: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['add-to-basket'])

const handleClick = (item) => {
    emit('add-to-basket', item)
}
</script>