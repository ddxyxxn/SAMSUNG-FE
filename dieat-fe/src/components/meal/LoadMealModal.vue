<template>
    <div v-if="show" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <h2>식사 불러오기</h2>
                <button class="close-button" @click="closeModal">×</button>
            </div>
            <div class="modal-body">
                <div class="calendar-section">
                    <div class="calendar-header">
                        <div class="calendar-navigation">
                            <button @click="prevMonth">
                                <span class="arrow left"></span>
                            </button>
                            <span class="current-month">{{ loadMealMonth }}</span>
                            <button @click="nextMonth">
                                <span class="arrow right"></span>
                            </button>
                        </div>
                    </div>
                    <div class="calendar-grid">
                        <div class="weekdays">
                            <span>일</span>
                            <span>월</span>
                            <span>화</span>
                            <span>수</span>
                            <span>목</span>
                            <span>금</span>
                            <span>토</span>
                        </div>
                        <div class="days">
                            <div
                                v-for="day in calendarDays"
                                :key="day.date"
                                :class="[
                                    'day',
                                    { 'current-month': day.currentMonth },
                                    { 'other-month': !day.currentMonth },
                                    { 'selected': isSelectedDate(day.date) },
                                    { 'has-meal': hasMeal(day.date) }
                                ]"
                                @click="selectDate(day.date)"
                            >
                                {{ day.dayNumber }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right-section">
                    <div class="meal-list-section">
                        <div class="meal-list-header">
                            <h4>식사 목록</h4>
                        </div>
                        <div class="meal-list">
                            <div v-for="meal in selectedDateMeals" :key="meal.id" class="meal-card">
                                <div class="meal-card-content">
                                    <div class="meal-info">
                                        <div class="meal-name">{{ meal.name }}</div>
                                        <div class="meal-time">{{ meal.time }}</div>
                                    </div>
                                    <div class="meal-nutrients">
                                        <div class="nutrient">
                                            <span class="value">{{ meal.kcal }}</span>
                                            <span class="unit">kcal</span>
                                        </div>
                                        <div class="nutrient">
                                            <span class="value">{{ meal.carbs }}</span>
                                            <span class="unit">탄수화물</span>
                                        </div>
                                        <div class="nutrient">
                                            <span class="value">{{ meal.protein }}</span>
                                            <span class="unit">단백질</span>
                                        </div>
                                        <div class="nutrient">
                                            <span class="value">{{ meal.fat }}</span>
                                            <span class="unit">지방</span>
                                        </div>
                                        <div class="nutrient">
                                            <span class="value">{{ meal.sodium }}</span>
                                            <span class="unit">나트륨</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="cancel-button" @click="closeModal">취소</button>
                        <button class="confirm-button" @click="confirmSelection">확인</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['close', 'confirm']);

const currentDate = ref(new Date());
const selectedDate = ref(null);
const mealsData = ref([]);
const selectedDateMeals = ref([]);

const API_URL = 'http://localhost:3000/meals';

const fetchMonthlyMeals = async () => {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('서버 응답 오류');
        }
        
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
            // 현재 달의 데이터만 필터링
            const currentYear = currentDate.value.getFullYear();
            const currentMonth = String(currentDate.value.getMonth() + 1).padStart(2, '0');
            const yearMonth = `${currentYear}-${currentMonth}`;
            
            mealsData.value = data
                .filter(meal => meal.meal_dt.startsWith(yearMonth))
                .map(meal => meal.meal_dt);
        } else {
            mealsData.value = [];
        }
    } catch (error) {
        console.error('식사 데이터 조회 중 오류 발생:', error);
        mealsData.value = [];
    }
};

// 월이 변경될 때마다 데이터 다시 조회
watch(currentDate, () => {
    fetchMonthlyMeals();
});

// 컴포넌트가 마운트될 때 초기 데이터 조회
onMounted(() => {
    if (props.show) {
        fetchMonthlyMeals();
    }
});

// show prop이 변경될 때 데이터 조회
watch(() => props.show, (newValue) => {
    if (newValue) {
        fetchMonthlyMeals();
    }
});

const loadMealMonth = computed(() => {
    return `${currentDate.value.getFullYear()}년 ${currentDate.value.getMonth() + 1}월`;
});

const calendarDays = computed(() => {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();
    
    // 현재 달의 첫 날과 마지막 날
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // 이전 달의 마지막 날
    const prevMonthLastDay = new Date(year, month, 0);
    
    // 달력에 표시할 날짜들을 저장할 배열
    const days = [];
    
    // 이전 달의 날짜들 추가
    const firstDayWeekday = firstDay.getDay();
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
        days.push({
            date: new Date(year, month - 1, prevMonthLastDay.getDate() - i),
            dayNumber: prevMonthLastDay.getDate() - i,
            currentMonth: false
        });
    }
    
    // 현재 달의 날짜들 추가
    for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push({
            date: new Date(year, month, i),
            dayNumber: i,
            currentMonth: true
        });
    }
    
    // 다음 달의 날짜들 추가
    const remainingDays = 42 - days.length; // 6주 x 7일 = 42
    for (let i = 1; i <= remainingDays; i++) {
        days.push({
            date: new Date(year, month + 1, i),
            dayNumber: i,
            currentMonth: false
        });
    }
    
    return days;
});

const isSelectedDate = (date) => {
    if (!selectedDate.value) return false;
    return date.toDateString() === selectedDate.value.toDateString();
};

const selectDate = async (date) => {
    selectedDate.value = date;
    await fetchMealsByDate(date);
};

const prevMonth = () => {
    currentDate.value = new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth() - 1,
        1
    );
};

const nextMonth = () => {
    currentDate.value = new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth() + 1,
        1
    );
};

const closeModal = () => {
    emit('close');
};

const confirmSelection = () => {
    emit('confirm', selectedDate.value);
};

const hasMeal = (date) => {
    if (!mealsData.value || mealsData.value.length === 0) {
        return false;
    }
    
    // 날짜를 YYYY-MM-DD 형식으로 변환
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const targetDate = `${year}-${month}-${day}`;
    
    const hasMealOnDate = mealsData.value.some(mealDate => {
        const mealDateStr = mealDate.split(' ')[0];
        const result = mealDateStr === targetDate;
        return result;
    });
    
    return hasMealOnDate;
};

const fetchMealsByDate = async (date) => {
    try {
        // 날짜를 YYYY-MM-DD 형식으로 변환
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const targetDate = `${year}-${month}-${day}`;
        
        // 모든 데이터를 가져옴
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('서버 응답 오류');
        }
        
        const allData = await response.json();
        
        // 클라이언트에서 날짜 필터링
        const filteredData = allData.filter(meal => {
            const mealDate = new Date(meal.meal_dt);
            const mealDateStr = mealDate.toISOString().split('T')[0];
            return mealDateStr === targetDate;
        });

        // 해당 날짜에 meal 데이터가 없는 경우
        if (filteredData.length === 0) {
            alert('선택한 날짜에 등록된 식사 정보가 없습니다.');
            selectedDateMeals.value = [];
            return;
        }

        // 시간 추출 및 분 단위 변환 함수 (개선된 버전)
        const extractMinutes = (datetimeStr) => {
            try {
                // 날짜와 시간 분리
                const parts = datetimeStr.split(' ');
                if (parts.length < 2) {
                    console.error('잘못된 datetime 형식:', datetimeStr);
                    return 0; // 기본값
                }
                
                const timePart = parts[1]; // "08:15:00" 또는 "08:15"
                const timeComponents = timePart.split(':');
                const hour = parseInt(timeComponents[0], 10);
                const minute = parseInt(timeComponents[1], 10);
                
                if (isNaN(hour) || isNaN(minute)) {
                    console.error('시간 파싱 오류:', timePart);
                    return 0;
                }
                
                return hour * 60 + minute; // 총 분 단위로 변환
            } catch (error) {
                console.error('시간 변환 오류:', error, datetimeStr);
                return 0;
            }
        };

        // 데이터 정렬 전 로그
        // console.log('정렬 전 데이터:', filteredData.map(d => ({
        //     title: d.meal_title,
        //     time: d.meal_dt,
        //     minutes: extractMinutes(d.meal_dt)
        // })));

        // 시간 순서대로 정렬 (오름차순)
        filteredData.sort((a, b) => {
            const timeA = extractMinutes(a.meal_dt);
            const timeB = extractMinutes(b.meal_dt);
            // 내림차순으로 변경 (값이 반대로 되는지 확인)
            return timeB - timeA;
        });
        
        // 데이터 정렬 후 로그
        // console.log('정렬 후 데이터:', filteredData.map(d => ({
        //     title: d.meal_title,
        //     time: d.meal_dt,
        //     minutes: extractMinutes(d.meal_dt)
        // })));

        // 서버에서 받은 데이터를 화면에 표시할 형식으로 변환
        selectedDateMeals.value = filteredData.map(meal => ({
            id: meal.meal_code,
            name: meal.meal_title || '식사 이름 없음',
            time: new Date(meal.meal_dt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
            kcal: Math.round(meal.meal_calories) || 0,
            carbs: Math.round(meal.meal_carbs) || 0,
            protein: Math.round(meal.meal_protein) || 0,
            fat: Math.round(meal.meal_fat) || 0,
            sodium: Math.round(meal.meal_sugar) || 0
        }));
    } catch (error) {
        console.error('식사 데이터 조회 중 오류 발생:', error);
        selectedDateMeals.value = [];
    }
};
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
    border-radius: 8px;
    width: 1225px;
    height: 611px;
    max-height: 611px;
    display: flex;
    flex-direction: column;
}

.modal-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h2 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
}

.close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
}

.modal-body {
    padding: 0;
    display: flex;
    gap: 20px;
    height: calc(611px - 70px); /* 헤더 높이만 제외 */
}

.calendar-section {
    flex: 2;
    border: none;
    border-right: 1px solid #eee;
    border-radius: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.calendar-header {
    margin-bottom: 0;
    background-color: #F6F6F6;
    padding: 15px;
    border-radius: 0;
}

.calendar-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0;
    padding: 0 5px;  /* 양쪽에 5px 패딩 추가 */
}

.calendar-navigation button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    margin: 0 -5px;  /* 양쪽으로 -5px 마진으로 원래 위치에서 안쪽으로 이동 */
}

.arrow {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-top: 2px solid #333;
    border-right: 2px solid #333;
}

.arrow.left {
    transform: rotate(-135deg);
}

.arrow.right {
    transform: rotate(45deg);
}

.current-month {
    font-weight: bold;
}

.weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    margin-bottom: 10px;
}

.weekdays span {
    font-family: 'Inter';
    font-weight: 600;
    font-size: 14px;
    color: #555555;
}

.weekdays span:first-child {
    color: #FF4B4B;
}

.weekdays span:last-child {
    color: #333;
}

.day:nth-child(7n+1) {
    color: #FF4B4B;
}

.day:nth-child(7n) {
    color: #333;
}

.other-month.day:nth-child(7n+1),
.other-month.day:nth-child(7n) {
    color: #ccc;
}

.days {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 72px);
    gap: 0.5px;
    background-color: #f5f5f5;
    padding: 0.5px;
}

.day {
    height: 72px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: transparent;
    cursor: pointer;
    position: relative;
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
    padding: 8px 0 0 12px;
}

.day:hover {
    background-color: #f8f8f8;
}

.current-month {
    color: #000000;
    background-color: white;
}

.other-month {
    color: #ccc;
    background-color: #fafafa;
}

.selected {
    background-color: #FFA18E !important;
    color: white !important;
    font-family: 'Inter';
    font-weight: 800;
    font-size: 14px;
}

.selected:hover {
    background-color: #ff9277 !important;
}

.selected.has-meal {
    background-color: #FFA18E !important;
}

.right-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-right: 20px;
    overflow: hidden;
}

.meal-list-section {
    flex: 1;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 17px 17px 17px 17px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.meal-list-header {
    margin-bottom: 15px;
}

.meal-list-header h4 {
    margin: 0;
    font-size: 16px;
}

.meal-list {
    flex: 1;
    overflow-y: auto;
    padding: 0 8px;
    margin-right: -8px;
    display: flex;
    flex-direction: column-reverse;
}

.modal-footer {
    padding: 0;
    border-top: none;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    height: 40px;
}

.cancel-button {
    padding: 8px 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
    cursor: pointer;
}

.confirm-button {
    padding: 8px 20px;
    border: none;
    border-radius: 4px;
    background-color: #FF4B4B;
    color: white;
    cursor: pointer;
}

.confirm-button:hover {
    background-color: #ff3333;
}

.cancel-button:hover {
    background-color: #f5f5f5;
}

.calendar-grid {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}

.has-meal {
    background-color: #FFF8ED !important;
    z-index: 1;
}

.has-meal:hover {
    background-color: #FFF0DB !important;
}

.selected.has-meal {
    background-color: #FFA18E !important;
}

.meal-card {
    background: white;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.meal-card-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.meal-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.meal-name {
    font-family: 'Inter';
    font-weight: 600;
    font-size: 16px;
    color: #000000;
}

.meal-time {
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
    color: #666666;
}

.meal-nutrients {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F8F8F8;
    padding: 12px;
    border-radius: 4px;
}

.nutrient {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.nutrient .value {
    font-family: 'Inter';
    font-weight: 600;
    font-size: 14px;
    color: #000000;
}

.nutrient .unit {
    font-family: 'Inter';
    font-weight: 400;
    font-size: 12px;
    color: #666666;
}

.meal-list {
    padding: 0 8px;
}
</style> 