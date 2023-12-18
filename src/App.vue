<template>
  <main class="main">
    <div class="page">
      <CityCard />
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import CityCard from './components/CityCard.vue'
</script>

<style scoped>
.page {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 4rem);
  padding: 20px;
  background-color: #59585d;
  border-radius: 2rem;
}
</style>
