<template>
  <div class="summary-chart">
    <canvas ref="chartRef" width="240" height="240" />
    <div class="center-text">{{ percentage }}%</div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js'
import { weightGoals } from '@/components/dashboard/data/weightGoals'
import { weightRecords } from '@/components/dashboard/data/weightData'

Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

const chartRef = ref(null)

const start = weightGoals.startWeight
const goal = weightGoals.goalWeight
const currentWeight = weightRecords.length > 0 ? weightRecords[weightRecords.length - 1].weight : null

const totalToLose = start - goal
const lost = start - currentWeight
const remaining = totalToLose - lost

const percentage = computed(() => {
  if (!currentWeight || totalToLose <= 0) return 0
  const ratio = Math.min(lost / totalToLose, 1)
  return Math.round(ratio * 100)
})

onMounted(() => {
  const ctx = chartRef.value.getContext('2d')
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['달성', '남은 목표'],
      datasets: [
        {
          data: [lost, remaining > 0 ? remaining : 0],
          backgroundColor: ['#46a3ff', '#e0e0e0'],
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true // ✅ 툴팁 다시 보이게 설정
        }
      },
      cutout: '60%'
    }
  })
})
</script>

<style scoped>
.summary-chart {
  position: relative;
  width: 240px;
  height: 240px;
  margin: auto;
}

canvas {
  display: block;
  width: 240px;
  height: 240px;
}

.center-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
  font-weight: bold;
  color: #333;
}
</style>
