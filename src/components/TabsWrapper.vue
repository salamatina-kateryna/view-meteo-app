<template>
  <div class="tabs">
    <ul class="tabs__header">
      <li
        v-for="title in tabTitles"
        :key="title"
        @click="selectedTitle = title"
        :class="{ selected: title == selectedTitle }"
      >
        {{ title }}
      </li>
    </ul>

    <slot :selectedTitle="selectedTitle"></slot>
  </div>
</template>

<script setup lang="tsx">
import { ref, provide } from 'vue'

const props = defineProps(['titles'])

const tabTitles = props?.titles

const selectedTitle = ref<string>(tabTitles[0])

provide('selectedTitle', selectedTitle)
</script>

<style>
.tabs {
  max-width: 400px;
  margin: 0 auto;
}

.tabs__header {
  margin-bottom: 10px;
  list-style: none;
  padding: 0;
  display: flex;
}

.tabs__header li {
  width: 50%;
  text-align: center;
  padding: 10px 20px;
  background-color: transparent;
  border-bottom: 1px solid rgba(235, 235, 235, 0.5);
  cursor: pointer;
  transition: 0.4s all ease-out;
}

.tabs__header li.selected {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
