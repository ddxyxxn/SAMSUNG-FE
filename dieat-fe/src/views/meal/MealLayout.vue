<template>
    <header>
        <Header />
    </header>
    <div class="meal-container">
        <div class="meal-leftsection">
            <div class="meal-header">
                <h3>식사</h3>
                <button @click="goToRegistMeal">식사 등록</button>
            </div>
            <div class="meal-week">
                <WeeklyCalendar />
            </div>
            <div class="meal-list">
                <MealList />
            </div>
        </div>
        <div class="meal-rightsection">
            <h3>영양 요약</h3>
            <MealStats />
            <WeeklyStats />
        </div>
    </div>
</template>

<script setup>
    import MealList from './MealList.vue';
    import MealStats from '@/components/meal/MealStats.vue';
    import WeeklyCalendar from './WeeklyCalendar.vue';
    import WeeklyStats from '@/components/meal/WeeklyStats.vue';
    import Header from '@/components/common/Header.vue';
    import { ref, provide } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const selectedDate = ref(new Date().toISOString().split('T')[0]);
    provide('selectedDate', selectedDate);

    const goToRegistMeal = () => {
        router.push('/registmeal');
    };
</script>

<style scoped>
.meal-container {
    display: flex;
    gap: 20px;
    padding: 0;
    height: calc(100vh - 110px);
    overflow: hidden;
    position: relative;
}

.meal-leftsection {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 0;
    overflow-y: auto;
    margin-right: 493px;
    padding: 20px;
}

.meal-rightsection {
    position: fixed;
    right: 0;
    top: 110px;
    width: 493px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: calc(100vh - 110px);
    overflow-y: auto;
    background: #F0F0F0;
    padding: 20px;
}

.meal-rightsection h3 {
    margin: 0;
    padding-top: 20px;
    padding-left: 30px;
    color: #333;
    font-size: 1.2em;
    line-height: 1.6;
}

.meal-rightsection > :nth-child(2) {
    margin-left: auto;
    margin-right: auto;
}

.meal-rightsection > :nth-child(3) {
    margin-left: auto;
    margin-right: auto;
}

.meal-rightsection::-webkit-scrollbar {
    width: 6px;
}

.meal-rightsection::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.meal-rightsection::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
}

.meal-rightsection::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.meal-header {
    width: 582px;
    margin: 0 auto;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    padding-top: 20px;
}

.meal-header h3 {
    margin: 0;
    color: #333;
    font-size: 1.2em;
    margin-left: 10px;
    line-height: 1.6;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.meal-header button {
    padding: 8px 16px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
}

.meal-list {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    padding-right: 10px;
}

.meal-list::-webkit-scrollbar {
    width: 6px;
}

.meal-list::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.meal-list::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
}

.meal-list::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>