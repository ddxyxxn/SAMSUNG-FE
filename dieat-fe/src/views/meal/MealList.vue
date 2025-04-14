<template>
    <div class="meal-list">
        <div v-if="filteredMeals.length === 0" class="no-meals">
            등록된 식사 정보가 없습니다.
        </div>
        <MealCard
            v-else
            v-for="meal in filteredMeals"
            :key="meal.id"
            :meal="meal"
        />
    </div>
</template>

<script setup>
    import { ref, inject, watch, onMounted, computed } from 'vue'
    import MealCard from '@/components/meal/MealCard.vue'

    const selectedDate = inject('selectedDate')
    const meals = ref([])

    const filteredMeals = computed(() => {
        const filtered = meals.value.filter(meal => {
            // DB date format: "2025-04-13 21:00"
            const mealDateStr = meal.meal_dt.split(' ')[0]; // "2025-04-13"
            
            // Check if the dates match exactly
            return mealDateStr === selectedDate.value;
        });
        
        return filtered;
    })

    const fetchMeals = async () => {
        try {
            const response = await fetch('http://localhost:3000/meals')
            if (!response.ok) {
                throw new Error('식사 데이터를 가져오는데 실패했습니다.')
            }
            const data = await response.json()
            meals.value = data
        } catch (error) {
            console.error('식사 데이터 조회 오류:', error)
            meals.value = []
        }
    }

    onMounted(() => {
        fetchMeals()
    })

    // selectedDate가 변경될 때마다 fetchMeals를 다시 호출
    watch(selectedDate, () => {
        fetchMeals()
    })
</script>

<style scoped>
    .meal-list {
        width: 582px;
        margin: 0 auto;
        padding: 20px;
    }

    .no-meals {
        text-align: center;
        color: #999;
        padding: 40px;
        background-color: #f5f5f5;
        border-radius: 4px;
        font-size: 1.1em;
    }
</style>