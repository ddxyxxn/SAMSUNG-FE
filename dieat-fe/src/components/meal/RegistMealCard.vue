<template>
    <div class="registmeal-card">
        <div class="regstmeal-card-category">
            <h3 class="registmeal-card-category-name">회원</h3>
        </div>
        <div class="registmeal-card-name-div">
            <h3 class="registmeal-card-name">불닭 볶음면 큰 컵</h3>
        </div>
        <div class="registmeal-card-unit"><h5 class="registmeal-card-unit-name">140 g / 1 컵</h5></div>
        <div class="registmeal-card-nutr-div">
            <div class="registmeal-card-nutr-cal">
                <h3 class="registmeal-card-nutr-cal-value">530</h3>
                <h5 class="registmeal-card-nutr-cal-unit">칼로리</h5>
            </div>
            <div class="registmeal-card-nutr-carb">
                <h3 class="registmeal-card-nutr-carb-value">85</h3>
                <h5 class="registmeal-card-nutr-carb-unit">탄수화물</h5>
            </div>
            <div class="registmeal-card-nutr-protein">
                <h3 class="registmeal-card-nutr-protein-value">12</h3>
                <h5 class="registmeal-card-nutr-protein-unit">단백질</h5>
            </div>
            <div class="registmeal-card-nutr-fat">
                <h3 class="registmeal-card-nutr-fat-value">16</h3>
                <h5 class="registmeal-card-nutr-fat-unit">지방</h5>
            </div>
            <div class="registmeal-card-nutr-sugar">
                <h3 class="registmeal-card-nutr-sugar-value">7</h3>
                <h5 class="registmeal-card-nutr-sugar-unit">당</h5>
            </div>
        </div>
        <div class="registmeal-card-amout-div"> 
            <h3 class="registmeal-card-amout-title">수량</h3>
            <div class="registmeal-card-amout">
                1
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
/* 카드 전체 컨테이너 스타일 */
.registmeal-card {
    width: 697px;
    height: 274px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
}

/* 카테고리 영역 */
.regstmeal-card-category {
    display: flex;
    align-items: center;
}

.registmeal-card-category-name {
    background: #7FBEB3;
    color: #FFFFFF;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 500;
}

/* 음식 이름 영역 */
.registmeal-card-name {
    font-size: 24px;
    font-weight: 600;
    color: #333333;
    margin: 8px 0;
}

/* 단위 표시 영역 */
.registmeal-card-unit {
    position: absolute;
    top: 24px;
    right: 24px;
}

.registmeal-card-unit-name {
    color: #666666;
    font-size: 16px;
}

/* 영양소 정보 영역 */
.registmeal-card-nutr-div {
    display: flex;
    gap: 24px;
    margin-top: 16px;
}

.registmeal-card-nutr-cal,
.registmeal-card-nutr-carb,
.registmeal-card-nutr-protein,
.registmeal-card-nutr-fat,
.registmeal-card-nutr-sugar {
    background: #F5F5F5;
    padding: 12px 20px;
    border-radius: 8px;
    text-align: center;
}

.registmeal-card-nutr-cal-value,
.registmeal-card-nutr-carb-value,
.registmeal-card-nutr-protein-value,
.registmeal-card-nutr-fat-value,
.registmeal-card-nutr-sugar-value {
    font-size: 20px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 4px;
}

.registmeal-card-nutr-cal-unit,
.registmeal-card-nutr-carb-unit,
.registmeal-card-nutr-protein-unit,
.registmeal-card-nutr-fat-unit,
.registmeal-card-nutr-sugar-unit {
    font-size: 14px;
    color: #666666;
}

/* 수량 영역 */
.registmeal-card-amout-div {
    position: absolute;
    bottom: 24px;
    right: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.registmeal-card-amout-title {
    font-size: 16px;
    color: #333333;
}

.registmeal-card-amout {
    background: #F5F5F5;
    padding: 8px 24px;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 500;
}
</style>