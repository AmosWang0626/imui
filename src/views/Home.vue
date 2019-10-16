<template>
  <div id="app">
    <BaseFrame>
      <template v-slot:main>
        <router-view />
      </template>
    </BaseFrame>
  </div>
</template>

<script>
import BaseFrame from '@/components/BaseFrame.vue'

export default {
  name: 'app',
  components: {
    BaseFrame
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #c0c4cc;
}
</style>
