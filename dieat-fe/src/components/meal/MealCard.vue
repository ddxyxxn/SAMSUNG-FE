<template>
    <div class="meal-card">
        <div class="meal-image"></div>
        <div class="meal-content">
            <div class="meal-header">
                <div class="meal-name">{{ meal.meal_title || meal.name }}</div>
                <div class="meal-time">{{ formatTime(meal.meal_dt) }}</div>
            </div>
            <div class="meal-desc">{{ meal.meal_desc || meal.description }}</div>
            <div class="meal-nutrition">
                <span>
                    <div>{{ Math.round(meal.meal_calories || meal.calories) }}</div>
                    <div>kcal</div>
                </span>
                <span>
                    <div>{{ Math.round(meal.meal_carbs || meal.carbs) }}</div>
                    <div>탄수</div>
                </span>
                <span>
                    <div>{{ Math.round(meal.meal_protein || meal.protein) }}</div>
                    <div>단백질</div>
                </span>
                <span>
                    <div>{{ Math.round(meal.meal_fat || meal.fat) }}</div>
                    <div>지방</div>
                </span>
                <span>
                    <div>{{ Math.round(meal.meal_sugar || meal.sugar) }}</div>
                    <div>당</div>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        meal: {
            type: Object,
            required: true
        }
    })

    const formatTime = (dateTimeStr) => {
        if (!dateTimeStr) return ''
        const date = new Date(dateTimeStr)
        return date.toLocaleTimeString('ko-KR', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        })
    }
</script>

<style scoped>
.meal-card {
    background: white;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 15px;
    width: 550px;
    height: 165px;
    box-sizing: border-box;
    border: 0.3px solid rgba(227, 227, 227, 0.67);
    overflow: hidden;
}

.meal-image {
    margin-top: 10px;
    width: 80px;
    height: 80px;
    border-radius: 5px;
    background-color: #f5f5f5;
    flex-shrink: 0;
    margin-right: 15px;
}

.meal-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 0;
}

.meal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 5px;
}

.meal-name {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 600;
    margin-top: 10px;
}

.meal-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #605E5E;
    margin-top: -15px;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.meal-nutrition {
    display: flex;
    gap: 15px;
    font-size: 0.9em;
    color: #666;
    flex-wrap: wrap;
}

.meal-nutrition span {
    background: #f5f5f5;
    padding: 4px 8px;
    border-radius: 4px;
    width: 42px;
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-sizing: border-box;
    gap: 2px;
    font-size: 12px;
    line-height: 1.2;
}

.meal-nutrition span div:first-child {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #000000;
}

.meal-nutrition span div:last-child {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 10px;
    color: #787878;
}

.meal-time {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 12px;
    color: #969696;
    margin-right: 5px;
    margin-top: 5px;
}
</style>