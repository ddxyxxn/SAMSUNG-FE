<template>
    <div class="weekly-stats">
        <h3>한 주 평균</h3>
        <div class="stats-overview">
            <div class="main-stat">
                <div class="stat-value" :style="{ color: caloriesColor }">{{ averageCalories }}</div>
                <div class="stat-label">칼로리(kcal)</div>
            </div>
            <div class="main-stat">
                <div class="stat-value">86%</div>
                <div class="stat-label">목표 달성률</div>
            </div>
        </div>
        <div class="stats-detail">
            <div class="stat-item">
                <div class="stat-label">평균 칼로리</div>
                <div class="stat-value">{{ averageCalories }} kcal</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">평균 탄수화물</div>
                <div class="stat-value">{{ averageCarbs }} g</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">평균 단백질</div>
                <div class="stat-value">{{ averageProtein }} g</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">평균 지방</div>
                <div class="stat-value">{{ averageFat }} g</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, watch, onMounted, computed } from 'vue'

const selectedDate = inject('selectedDate')
const weeklyMeals = ref([])

const TARGET_VALUES = {
    calories: 2000,
    carbs: 300,
    protein: 200,
    fat: 50
}

const getNutrientColor = (current, target) => {
    const ratio = (current / target) * 100
    if (ratio > 110) return '#D30E0E'
    if (ratio > 100) return '#FF9D00'
    return '#000'
}

const fetchWeeklyStats = async (date) => {
    try {
        const currentDate = new Date(date)
        const startOfWeek = new Date(currentDate)
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() + 6)

        const startDate = startOfWeek.toISOString().split('T')[0]
        const endDate = endOfWeek.toISOString().split('T')[0]

        const response = await fetch('http://localhost:3000/meals')
        if (!response.ok) {
            throw new Error('주간 통계 데이터를 가져오는데 실패했습니다.')
        }
        const allMeals = await response.json()
        
        weeklyMeals.value = allMeals.filter(meal => {
            const mealDate = new Date(meal.meal_dt).toISOString().split('T')[0]
            return mealDate >= startDate && mealDate <= endDate
        })
    } catch (error) {
        console.log('주간 식사 데이터가 없습니다.')
        weeklyMeals.value = []
    }
}

const calculateDailyAverage = (meals, nutrientKey) => {
    if (!meals || meals.length === 0) return 0

    try {
        const dailyTotals = meals.reduce((acc, meal) => {
            const date = new Date(meal.meal_dt).toISOString().split('T')[0]
            if (!acc[date]) {
                acc[date] = 0
            }
            acc[date] += meal[nutrientKey] || 0
            return acc
        }, {})

        const daysWithMeals = Object.keys(dailyTotals).length
        if (daysWithMeals === 0) return 0

        const total = Object.values(dailyTotals).reduce((sum, daily) => sum + daily, 0)
        return Math.round(total / daysWithMeals)
    } catch (error) {
        console.log(`${nutrientKey} 계산 중 오류 발생.`)
        return 0
    }
}

const averageCalories = computed(() => {
    return calculateDailyAverage(weeklyMeals.value, 'meal_calories')
})

const caloriesColor = computed(() => getNutrientColor(averageCalories.value, TARGET_VALUES.calories))

const averageCarbs = computed(() => {
    return calculateDailyAverage(weeklyMeals.value, 'meal_carbs')
})

const averageProtein = computed(() => {
    return calculateDailyAverage(weeklyMeals.value, 'meal_protein')
})

const averageFat = computed(() => {
    return calculateDailyAverage(weeklyMeals.value, 'meal_fat')
})

onMounted(() => {
    fetchWeeklyStats(selectedDate.value)
})

watch(selectedDate, (newDate) => {
    fetchWeeklyStats(newDate)
})
</script>

<style scoped>
.weekly-stats {
    width: 400px;
    height: 332px;
    background-color: white;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
    width: 287px;
    font-size: 16px;
    letter-spacing: -0.02em;
    font-weight: 800;
    font-family: Inter;
    color: #000;
    text-align: left;
    display: flex;
    align-items: center;
    height: 25px;
    margin: 0;
    padding: 0;
}

.stats-overview {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    gap: 19px;
}

.main-stat {
    text-align: center;
    background-color: #F5F5F5;
    border-radius: 5px;
    height: 46px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0;
}

.main-stat:first-child {
    width: 227px;
}

.main-stat:last-child {
    width: 114px;
}

.main-stat .stat-value {
    font-size: 12px;
    font-weight: 600;
    font-family: Inter;
    margin-bottom: 4px;
    transition: color 0.3s ease;
}

.main-stat .stat-label {
    font-size: 8px;
    font-weight: 500;
    font-family: Inter;
    color: #696969;
}

.stats-detail {
    margin-top: 20px;
}

.stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid rgba(107, 107, 107, 0.11);
}

.stat-item:last-child {
    border-bottom: none;
}

.stat-item .stat-label {
    font-size: 14px;
    color: #000;
    font-family: Pretendard;
    font-weight: 400;
    letter-spacing: -0.02em;
}

.stat-item .stat-value {
    font-size: 14px;
    font-weight: 600;
    color: #696969;
    font-family: Pretendard;
    letter-spacing: -0.02em;
}
</style>
