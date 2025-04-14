<template>
    <header>
        <Header />
    </header>
    <div class="registmeal-wrapper">
        <div class="registmeal-container">
            <div class="registmeal-leftsection">
                <div class="registmeal-name-div">
                    <h3 class="registmeal-name">식사 이름</h3>
                    <input type="text" class="registmeal-name-input">
                </div>
                <div class="registmeal-desc-div">
                    <h3 class="registmeal-desc">식사 설명</h3>
                    <textarea class="registmeal-desc-input"></textarea>
                </div>
                <div class="registmeal-time-wrapper">
                    <div class="registmeal-time-div">
                        <h3 class="registmeal-time">식사 시간</h3>
                        <input 
                            type="text" 
                            class="registmeal-time-input" 
                            placeholder="0000-00-00 00:00"
                            maxlength="16"
                            @input="formatTimeInput"
                            v-model="timeInput"
                        >
                        <p v-if="timeError" class="time-error-message">숫자를 입력해주세요.</p>
                    </div>
                    <div class="registmeal-img-div">
                        <h3 class="registmeal-img-title">대표 이미지</h3>
                        <div class="registmeal-img-bg" @click="triggerFileInput">
                            <template v-if="!previewImage">
                                <h5 class="registmeal-img-i">대표 이미지 등록</h5>
                                <div class="registmeal-img-plus"></div>
                            </template>
                            <template v-else>
                                <img :src="previewImage" class="preview-image" alt="선택된 이미지">
                                <div class="image-overlay">
                                    <button class="remove-image" @click.stop="removeImage">×</button>
                                </div>
                                <span class="image-name">{{ selectedImageInfo?.originalName }}</span>
                            </template>
                            <input 
                                type="file" 
                                ref="fileInput" 
                                class="file-input" 
                                @change="handleFileUpload"
                                accept="image/*"
                            >
                        </div>
                        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                        <p v-if="isLoading" class="loading-message">저장 중...</p>
                    </div>
                </div>
                <div>
                    <h3 class="registmeal-nutrient-title">총 영양성분</h3>
                    <div class="registmeal-nutrient-graph">
                        <div class="nutrient-bar-container">
                            <div class="nutrient-bar" style="height: 170px;">
                                <div class="nutrient-bar-fill calorie" style="height: 60%;"></div>
                            </div>
                            <span class="nutrient-label">칼로리</span>
                        </div>
                        <div class="nutrient-bar-container">
                            <div class="nutrient-bar" style="height: 170px;">
                                <div class="nutrient-bar-fill carb" style="height: 40%;"></div>
                            </div>
                            <span class="nutrient-label">탄수화물</span>
                        </div>
                        <div class="nutrient-bar-container">
                            <div class="nutrient-bar" style="height: 170px;">
                                <div class="nutrient-bar-fill protein" style="height: 30%;"></div>
                            </div>
                            <span class="nutrient-label">단백질</span>
                        </div>
                        <div class="nutrient-bar-container">
                            <div class="nutrient-bar" style="height: 170px;">
                                <div class="nutrient-bar-fill fat" style="height: 20%;"></div>
                            </div>
                            <span class="nutrient-label">지방</span>
                        </div>
                        <!-- 그리드 라인 -->
                        <div class="grid-line" style="bottom: 25%;"></div>
                        <div class="grid-line" style="bottom: 50%;"></div>
                        <div class="grid-line" style="bottom: 75%;"></div>
                    </div>
                </div>
            </div>
            <div class="registmeal-rightsection">
                <div class="registmeal-header">
                    <h3 class="registmeal-mealtitle">음식</h3>
                    <div class="registmeal-buttons">
                        <button class="registmeal-mealplus" @click="addMealCard">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4V20" stroke="black" stroke-width="3" stroke-linecap="round"/>
                                <path d="M4 12H20" stroke="black" stroke-width="3" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <button class="registmeal-mealminus" @click="removeMealCard">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 12H20" stroke="black" stroke-width="3" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <RegistMealCard v-if="showMealCard" />
            </div>
            <div class="registmeal-footer">
                <button class="registmeal-load-dietpost">식단 불러오기</button>
                <button class="registmeal-load-meal" @click="openLoadMealModal">식사 불러오기</button>
                <button class="registmeal-regist" @click="handleSubmit">등록</button>
                <button class="registmeal-cancel" @click="goToMeal">취소</button>
            </div>
        </div>
    </div>
    <AlertModal 
        :show="showNoFoodModal"
        message="음식이 등록되지 않았습니다."
        @confirm="closeNoFoodModal"
    />
    <LoadMealModal
        :show="showLoadMealModal"
        @close="closeLoadMealModal"
        @confirm="handleLoadMealConfirm"
    />
</template>

<script setup>
    import RegistMealCard from '@/components/meal/RegistMealCard.vue';
    import Header from '@/components/common/Header.vue';
    import AlertModal from '@/components/meal/AlertModal.vue';
    import LoadMealModal from '@/components/meal/LoadMealModal.vue';
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { useRegistMealStore } from '@/stores/registMeal';

    const router = useRouter();
    const timeInput = ref('');
    const timeError = ref(false);
    const fileInput = ref(null);
    const previewImage = ref(null);
    const selectedImageInfo = ref(null);
    const isLoading = ref(false);
    const errorMessage = ref('');
    const showNoFoodModal = ref(false);
    const showMealCard = ref(false);
    const showLoadMealModal = ref(false);
    const registeredFoods = ref([]); // 등록된 음식 목록을 관리하는 ref

    const mealStore = useRegistMealStore();

    // JSON 서버 기본 URL
    const API_URL = 'http://localhost:3000/meals';

    // 고유한 파일명 생성 함수
    const generateUniqueFileName = (originalName) => {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        const extension = originalName.split('.').pop();
        const baseName = originalName.split('.')[0];
        return `${baseName}_${timestamp}_${random}.${extension}`;
    };

    const formatTimeInput = (event) => {
        const originalValue = event.target.value;
        if (/[^\d\-: ]/.test(originalValue)) {  // 숫자, 하이픈, 콜론, 공백이 아닌 문자가 있는지 체크
            timeError.value = true;
            return;
        }
        timeError.value = false;
        
        let value = originalValue.replace(/[^\d]/g, ''); // 숫자만 남김
        
        // 날짜와 시간 형식 적용 (0000-00-00 00:00)
        if (value.length > 0) {
            // 연도
            let formatted = value.slice(0, 4);
            
            // 월 추가
            if (value.length > 4) {
                formatted += '-' + value.slice(4, 6);
            }
            
            // 일 추가
            if (value.length > 6) {
                formatted += '-' + value.slice(6, 8);
            }
            
            // 시간 추가
            if (value.length > 8) {
                formatted += ' ' + value.slice(8, 10);
            }
            
            // 분 추가
            if (value.length > 10) {
                formatted += ':' + value.slice(10, 12);
            }
            
            value = formatted;
        }
        
        // 날짜 및 시간 유효성 검사
        const dateParts = value.split(' ')[0]?.split('-') || [];
        const timeParts = value.split(' ')[1]?.split(':') || [];
        
        // 월 검증 (01-12)
        if (dateParts.length > 1 && dateParts[1].length === 2) {
            const month = parseInt(dateParts[1]);
            if (month > 12) {
                value = value.substring(0, 5) + '12' + value.substring(7);
            } else if (month === 0) {
                value = value.substring(0, 5) + '01' + value.substring(7);
            }
        }
        
        // 일 검증 (01-31)
        if (dateParts.length > 2 && dateParts[2].length === 2) {
            const day = parseInt(dateParts[2]);
            if (day > 31) {
                value = value.substring(0, 8) + '31' + value.substring(10);
            } else if (day === 0) {
                value = value.substring(0, 8) + '01' + value.substring(10);
            }
        }
        
        // 시간 검증 (00-23)
        if (timeParts.length > 0 && timeParts[0].length === 2) {
            const hours = parseInt(timeParts[0]);
            if (hours > 23) {
                value = value.substring(0, 11) + '23' + value.substring(13);
            }
        }
        
        // 분 검증 (00-59)
        if (timeParts.length > 1 && timeParts[1].length === 2) {
            const minutes = parseInt(timeParts[1]);
            if (minutes > 59) {
                value = value.substring(0, 14) + '59';
            }
        }
        
        timeInput.value = value;
    };

    const triggerFileInput = () => {
        fileInput.value.click();
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageData = e.target.result;
                    const uniqueFileName = generateUniqueFileName(file.name);
                    
                    // 미리보기와 파일 정보 저장
                    previewImage.value = imageData;
                    selectedImageInfo.value = {
                        originalName: file.name,
                        uniqueName: uniqueFileName,
                        type: file.type,
                        size: file.size,
                        path: `/src/img/meal/${uniqueFileName}` // 저장될 경로 추가
                    };
                };
                reader.readAsDataURL(file);

                // FormData를 사용하여 파일 업로드
                const formData = new FormData();
                formData.append('file', file);
                formData.append('filename', selectedImageInfo.value.uniqueName);

                // 파일 업로드 API 호출
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('파일 업로드 실패');
                }

            } catch (error) {
                console.error('파일 업로드 중 오류 발생:', error);
                errorMessage.value = '파일 업로드에 실패했습니다.';
            }
        }
    };

    const addMealCard = () => {
        // 현재 입력된 식사 정보를 store에 저장
        const mealInfo = {
            meal_name: document.querySelector('.registmeal-name-input').value,
            meal_description: document.querySelector('.registmeal-desc-input').value,
            meal_time: timeInput.value,
            file: selectedImageInfo.value
        };
        
        mealStore.setTempMealInfo(mealInfo);
        
        // /searchFood 경로로 이동
        router.push('/searchFood');
    };

    const removeMealCard = () => {
        showMealCard.value = false;
        registeredFoods.value = [];  // 음식 목록 초기화
    };

    const handleSubmit = async () => {
        // 등록된 음식이 없는 경우 모달 표시
        if (!showMealCard.value || registeredFoods.value.length === 0) {
            showNoFoodModal.value = true;
            return;
        }

        try {
            if (!selectedImageInfo.value || !previewImage.value) {
                console.error('이미지가 선택되지 않았습니다.');
                errorMessage.value = '이미지를 선택해주세요.';
                return;
            }

            isLoading.value = true;
            errorMessage.value = '';

            const mealData = {
                id: Date.now(),
                meal_name: document.querySelector('.registmeal-name-input').value,
                meal_description: document.querySelector('.registmeal-desc-input').value,
                meal_time: timeInput.value,
                file: [{
                    id: -1,
                    originalName: selectedImageInfo.value.originalName,
                    uniqueName: selectedImageInfo.value.uniqueName,
                    path: selectedImageInfo.value.path,
                    type: selectedImageInfo.value.type,
                    size: selectedImageInfo.value.size,
                    uploadDate: new Date().toISOString()
                }]
            };

            // 저장될 데이터 콘솔에 출력
            console.log('저장될 데이터:', JSON.stringify(mealData, null, 2));

            // fetch를 사용하여 데이터 저장
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mealData)
            });

            if (!response.ok) throw new Error('서버 응답 오류');
            
            // 저장 성공 시 /meal 경로로 이동
            await router.push('/meal');

        } catch (error) {
            console.error('저장 중 오류 발생:', error);
            errorMessage.value = '저장에 실패했습니다.';
        } finally {
            isLoading.value = false;
        }
    };

    const removeImage = () => {
        // 로컬 상태만 초기화
        previewImage.value = null;
        selectedImageInfo.value = null;
        if (fileInput.value) {
            fileInput.value.value = '';  // 파일 input 초기화
        }
    };

    const goToMeal = () => {
        router.push('/meal');
    };

    const closeNoFoodModal = () => {
        showNoFoodModal.value = false;
    };

    const openLoadMealModal = () => {
        showLoadMealModal.value = true;
    };

    const closeLoadMealModal = () => {
        showLoadMealModal.value = false;
    };

    const handleLoadMealConfirm = () => {
        // 선택된 식사 데이터 처리 로직 구현 예정
        closeLoadMealModal();
    };
</script>

<style scoped>
.registmeal-wrapper {
    margin-top: 20px;
}

.registmeal-container {
    width: 1054px;
    height: 784px;
    margin: 0 auto;
    background-color: rgba(217, 217, 217, 0.3);
    display: flex;
    position: relative;
    padding: 20px;
    box-sizing: border-box;
}

.registmeal-leftsection {
    width: 426px;
    height: 684px;
    padding: 20px;
    margin-left: 40px;
    position: relative;
}

.registmeal-container::after {
    content: '';
    position: absolute;
    left: 466px;
    top: 20px;
    width: 1px;
    height: calc(100% - 100px);
    background-color: rgba(128, 128, 128, 0.3);
}

.registmeal-rightsection {
    width: 547px;
    height: 684px;
    padding: 20px;
    margin-left: 40px;
}

.registmeal-name,
.registmeal-desc,
.registmeal-time,
.registmeal-img-title,
.registmeal-nutrient-title {
    font-family: 'Inter';
    font-weight: 800;
    font-size: 16px;
    margin-bottom: 10px;
}

.registmeal-name-input {
    width: 344px;
    height: 30px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
}

.registmeal-desc-input {
    width: 344px;
    height: 80px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
    resize: none;
    font-family: inherit;
}

.registmeal-time-input {
    width: 133px;
    height: 30px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
    text-align: center;
}

.registmeal-time-input::placeholder {
    color: #999;
    text-align: center;
}

.registmeal-img-div {
    margin-bottom: 20px;
}

.registmeal-img-bg {
    width: 145px;
    height: 116px;
    background-color: #CDCDCD;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    cursor: pointer;
    overflow: hidden;
}

.registmeal-img-i {
    margin: 0;
    text-align: center;
    position: absolute;
    top: 25px;
    width: 100%;
}

.registmeal-img-plus {
    width: 20px;
    height: 20px;
    position: relative;
    margin-top: auto;
    margin-bottom: 30px;
}

.registmeal-img-plus::before,
.registmeal-img-plus::after {
    content: '';
    position: absolute;
    background-color: #666;
}

.registmeal-img-plus::before {
    width: 20px;
    height: 2px;
    top: 9px;
    left: 0;
}

.registmeal-img-plus::after {
    width: 2px;
    height: 20px;
    left: 9px;
    top: 0;
}

.registmeal-nutrient-title {
    font-family: 'Inter';
    font-weight: 800;
    font-size: 16px;
    margin-top: -30px;
    margin-bottom: 10px;
}

.registmeal-nutrient-graph {
    background: white;
    width: 343px;
    height: 240px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 20px;
    position: relative;
}

.nutrient-bar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60px;
    position: relative;
    z-index: 2;
}

.nutrient-bar {
    width: 30px;
    background-color: #E6E6E6;
    margin-bottom: 10px;
    position: relative;
}

.nutrient-bar-fill {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
}

.nutrient-label {
    font-family: 'Inter';
    font-weight: 500;
    font-size: 12px;
    color: #666;
    text-align: center;
}

.nutrient-bar-fill.calorie { background-color: #FF4B4B; }
.nutrient-bar-fill.carb { background-color: #FFA94B; }
.nutrient-bar-fill.protein { background-color: #4CAF50; }
.nutrient-bar-fill.fat { background-color: #4B7BFF; }

.grid-line {
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #E6E6E6;
    z-index: 1;
}

.registmeal-footer {
    clear: both;
    padding: 20px;
    border-top: 1px solid #eee;
    width: calc(100% - 40px);
    height: 60px;
    position: absolute;
    bottom: 20px;
    left: 20px;
}

.registmeal-load-dietpost,
.registmeal-load-meal,
.registmeal-regist,
.registmeal-cancel {
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
}

.registmeal-load-dietpost {
    position: absolute;
    left: 100px;
    background-color: #ff4b4b;
    color: white;
    padding: 8px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 142px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.registmeal-load-meal {
    position: absolute;
    left: 270px;
    background-color: #ff4b4b;
    color: white;
    padding: 8px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 142px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.registmeal-regist {
    position: absolute;
    right: 280px;
    background-color: #4CAF50;
    color: white;
    padding: 8px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.registmeal-cancel {
    position: absolute;
    right: 140px;
    background-color: #9e9e9e;
    color: white;
    padding: 8px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.registmeal-load-dietpost:hover,
.registmeal-load-meal:hover {
    background-color: #ff3333;
}

.registmeal-regist:hover {
    background-color: #45a049;
}

.registmeal-cancel:hover {
    background-color: #888888;
}

.registmeal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.registmeal-mealtitle {
    margin: 0;
}

.registmeal-buttons {
    display: flex;
    gap: 20px;
    align-items: center;
}

.registmeal-mealplus,
.registmeal-mealminus {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s;
    background-color: transparent;
    padding: 0;
}

.registmeal-mealminus {
    background-color: transparent;
    margin-right: 5px;
}

.registmeal-mealplus:hover {
    background-color: transparent;
}

.registmeal-mealminus:hover {
    background-color: transparent;
}

.registmeal-mealplus svg,
.registmeal-mealminus svg {
    width: 24px;
    height: 24px;
}

.registmeal-time-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 344px;
    margin-bottom: 20px;
}

.registmeal-time-div {
    margin-bottom: 20px;
}

.registmeal-img-div {
    margin-bottom: 20px;
}

.time-error-message {
    color: #FF4B4B;
    font-size: 12px;
    margin-top: 2px;
    margin-bottom: 6px;
    margin-left: 5px;
}

.registmeal-time-input.error {
    border-color: #FF4B4B;
}

.file-input {
    display: none;
}

.preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
}

.image-overlay {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    display: none;
}

.registmeal-img-bg:hover .image-overlay {
    display: block;
}

.remove-image {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    padding: 0;
}

.remove-image:hover {
    background: rgba(0, 0, 0, 0.7);
}

.image-name {
    position: absolute;
    bottom: -20px;
    left: 0;
    font-size: 12px;
    color: #666;
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.error-message {
    color: #FF4B4B;
    font-size: 12px;
    margin-top: 8px;
}

.loading-message {
    color: #666;
    font-size: 12px;
    margin-top: 8px;
}

.registmeal-cancel-btn {
    padding: 10px 20px;
    background-color: #6B6B6B;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.registmeal-cancel-btn:hover {
    background-color: #555555;
}

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
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    width: 300px;
}

.modal-content h3 {
    margin: 0 0 15px 0;
    font-size: 18px;
    color: #333;
}

.modal-content p {
    margin: 0 0 20px 0;
    color: #666;
}

.modal-confirm-btn {
    background-color: #155b45;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
}

.modal-confirm-btn:hover {
    background-color: #0f4433;
}
</style>