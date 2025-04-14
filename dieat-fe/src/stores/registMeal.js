import { defineStore } from 'pinia';

export const useRegistMealStore = defineStore('registMeal', {
  state: () => ({
    tempMealInfo: {
      meal_name: '',
      meal_description: '',
      meal_time: '',
      file: null
    }
  }),
  actions: {
    setTempMealInfo(info) {
      // 기본값
      const defaultInfo = {
        meal_name: '',
        meal_description: '',
        meal_time: '',
        file: null
      };

      const safeInfo = info || defaultInfo;

      this.tempMealInfo = {
        meal_name: safeInfo.meal_name || '',
        meal_description: safeInfo.meal_description || '',
        meal_time: safeInfo.meal_time || '',
        file: safeInfo.file ? [{
          id: -1,
          originalName: safeInfo.file.originalName || '',
          uniqueName: safeInfo.file.uniqueName || '',
          path: safeInfo.file.path || '',
          type: safeInfo.file.type || '',
          size: safeInfo.file.size || 0,
          uploadDate: new Date().toISOString()
        }] : null
      };
    },
    clearTempMealInfo() {
      this.tempMealInfo = {
        meal_name: '',
        meal_description: '',
        meal_time: '',
        file: null
      };
    }
  }
}); 