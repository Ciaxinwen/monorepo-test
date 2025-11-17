<template>
  <div class="counter-container">
    <h2>Pinia Counter 示例</h2>
    <div class="counter-display">
      <p>计数: {{ counter.count }}</p>
      <p>双倍计数: {{ counter.doubleCount }}</p>
    </div>
    <div class="counter-buttons">
      <a-button type="primary" @click="counter.increment">增加</a-button>
      <a-button @click="counter.decrement">减少</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores'

const counter = useCounterStore()
</script>

<style scoped>
.counter-container {
  padding: 20px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  margin: 20px 0;
}

.counter-display {
  margin: 20px 0;
}

.counter-buttons {
  display: flex;
  gap: 10px;
}
</style>
