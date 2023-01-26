<script setup>
import AllPosts from './components/AllPosts.vue'
import Incrementer from './components/Incrementer.vue'
import Routes from './components/Routes.vue'
import Stops from './components/Stops.vue'
</script>

<template>
  <header>
  </header>
  <h2>Route 42</h2>
  <Routes :route-number="42"/>
  
  <h2>All Stops</h2>
  <Stops :route-number="52"/>
</template>

<style scoped>

</style>
