<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { getCurrentDate } from '@monorepo-test/utils/date'
import { Button } from '@monorepo-test/components'
import { version } from '@/utils/test'
console.log(version)
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <HelloWorld msg="我政务端" />
  <h1>
    {{ getCurrentDate() }}
  </h1>
  <a-button type="primary">我是ant-btn</a-button>
  <br />
  <hr />
  <Button size="large" type="primary">我是二次封装的btn</Button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
