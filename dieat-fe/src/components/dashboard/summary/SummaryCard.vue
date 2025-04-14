<template>
  <div class="card-container">
    <div v-for="item in summaryItems" :key="item.label" class="summary-item">
      <strong :class="item.textClass">{{ item.label }}</strong>
      <div class="bar-container">
        <div
          class="bar-fill"
          :style="{
            width: item.goal ? `${(item.value / item.goal) * 100}%` : '0%',
            backgroundColor: item.color
          }"
        ></div>
      </div>
      <span class="value">{{ item.value }} / {{ item.goal }} {{ item.unit }}</span>
    </div>
  </div>
</template>

<script setup>
import { sampleMeals } from '../data/sampleMeals'
import { nutritionGoals } from '../data/nutritionGoals' // 오타 주의: nutirition ❌ → nutrition ✅

const total = sampleMeals.reduce((acc, meal) => {
  acc.calories += meal.calories
  acc.carbs += meal.carbs
  acc.protein += meal.protein
  acc.fat += meal.fat
  return acc
}, { calories: 0, carbs: 0, protein: 0, fat: 0 })

function getTextColor(value, goal) {
  const overPercent = ((value - goal) / goal) * 100
  if (overPercent > 20) return 'over-red'
  if (overPercent > 10) return 'over-orange'
  if (overPercent > 0) return 'over-yellow'
  return ''
}

const summaryItems = [
  {
    label: '칼로리',
    value: total.calories,
    goal: nutritionGoals.calories,
    unit: 'kcal',
    color: '#FD5D5D',
    textClass: getTextColor(total.calories, nutritionGoals.calories)
  },
  {
    label: '탄수화물',
    value: total.carbs,
    goal: nutritionGoals.carbs,
    unit: 'g',
    color: '#FDCA5D',
    textClass: getTextColor(total.carbs, nutritionGoals.carbs)
  },
  {
    label: '단백질',
    value: total.protein,
    goal: nutritionGoals.protein,
    unit: 'g',
    color: '#50E250',
    textClass: getTextColor(total.protein, nutritionGoals.protein)
  },
  {
    label: '지방',
    value: total.fat,
    goal: nutritionGoals.fat,
    unit: 'g',
    color: '#5D7DFD',
    textClass: getTextColor(total.fat, nutritionGoals.fat)
  }
]
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.summary-item {
  font-size: 14px;
}

.bar-container {
  background-color: #e0e0e0;
  height: 10px;
  border-radius: 6px;
  overflow: hidden;
  margin: 4px 0;
}

.bar-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.value {
  font-size: 12px;
  color: #555;
}

/* 색상 변화용 텍스트 클래스 */
.over-yellow {
  color: #ffbb00;
}

.over-orange {
  color: #ff7f50;
}

.over-red {
  color: #ff3b3b;
}
</style>
