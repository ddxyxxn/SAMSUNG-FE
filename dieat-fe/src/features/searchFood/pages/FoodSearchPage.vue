<template>
    <header>
        <Header />
    </header>

    <div class="food-search-page">
        <h2>음식 데이터 검색</h2>

        <div class="search-bar-container">
            <SearchBar v-model="searchKeyword" @search="searchFood" @add="onAddFood" @settings="onSettingsClick" />
            <SearchResultList v-if="searchResults.length > 0" :results="searchResults" @select="handleSelectResult" />
        </div>

        <div class="main-content">
            <div class="search-result">
                <FoodTable v-if="selectedFood" :items="[selectedFood]" @add-to-basket="handleAddToBasket" />
                <p v-else class="no-data">표시할 데이터가 없습니다</p>
            </div>

            <div class="basket-panel">
                <BasketPanel :items="basket" @remove-item="removeFromBasket" @update-quantity="updateBasketQuantity" />
                <button class="complete-button">완료</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Header from '@/components/common/Header.vue';
import FoodTable from '../components/FoodTable.vue';
import BasketPanel from '../components/BasketPanel.vue';
import SearchResultList from '../components/SearchResultList.vue';
import SearchBar from '../components/SearchBar.vue';

const searchKeyword = ref('');
const searchResults = ref([]);
const selectedFood = ref(null);
const basket = ref([]);
const isManuallySelected = ref(false);

// 🔍 검색어 변경 감지
watch(searchKeyword, (newKeyword) => {
    if (isManuallySelected.value) {
        isManuallySelected.value = false;
        return;
    }

    if (newKeyword.trim()) {
        searchResults.value = mockSearch(newKeyword);
        console.log('[watch] searchResults:', searchResults.value);
    } else {
        searchResults.value = [];
        selectedFood.value = null;
    }
});

function searchFood(keyword = searchKeyword.value) {
    if (!keyword.trim()) {
        selectedFood.value = null;
        return;
    }

    const allItems = [
        {
            name: '불닭볶음면 큰 컵',
            unit: '140g / 1개',
            kcal: 530,
            carb: 85,
            protein: 12,
            fat: 16,
            sugar: 7,
            accurate: 0,
            inaccurate: 0,
            nickname: '한화시스템 비욘드캠프 14기',
        },
        {
            name: '불닭소스',
            unit: '20g / 1개',
            kcal: 100,
            carb: 5,
            protein: 2,
            fat: 8,
            sugar: 1,
            accurate: 0,
            inaccurate: 0,
            nickname: '소스소스',
        },
        {
            name: '불닭볶음면',
            unit: '100g',
            kcal: 470,
            carb: 70,
            protein: 10,
            fat: 15,
            sugar: 5,
            accurate: 1,
            inaccurate: 0,
            nickname: '기본불닭',
        }
    ];

    selectedFood.value = allItems.find(item => item.name === keyword.trim()) || null;
}

function mockSearch(keyword) {
    const options = [
        '불닭볶음면', '까르보불닭볶음면', '리틀핫불닭볶음면', '로제불닭볶음면',
        '4가지치즈불닭볶음면', '핵불닭볶음면', '불닭볶음면 큰 컵',
        '컵 불닭볶음면', '불닭볶음면 소스', '콘치즈불닭볶음면', '불닭소스'
    ];

    return options
        .filter(name => name.includes(keyword.trim()))
        .map(name => ({ name }));
}

function handleSelectResult(item) {
    isManuallySelected.value = true;
    searchKeyword.value = item.name;
    searchResults.value = [];
    searchFood(item.name);
}

function handleAddToBasket(item) {
    const exists = basket.value.find(b => b.name === item.name);
    if (!exists) {
        basket.value.push({ ...item, quantity: 1 });
    } else {
        exists.quantity += 1;
    }
}

function removeFromBasket(index) {
    basket.value.splice(index, 1);
}

function updateBasketQuantity({ index, quantity }) {
    if (quantity >= 0) {
        basket.value[index].quantity = quantity;
    }
}

function onAddFood() {
    alert('음식 추가 버튼 클릭됨 (추후 기능 추가)');
}

function onSettingsClick() {
    alert('설정 버튼 클릭됨 (추후 기능 추가)');
}
</script>