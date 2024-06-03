<script setup>
import BookFinder from "./components/BookFinder.vue";
import Login from './components/Login.vue';
import Menu from './Menu.vue';
</script>

<template>
  <div className="App">
    <div className="main">
    <div className="left-side"></div>
    <div className="right-side"></div>
    <router-view />
  </div>
  </div>
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
.App {
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  color: white;
  margin: 0;
}

.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 100vh;
  margin: 0;
}

.left-side {
  background-color: #1b3cb5;
  width: 50%;
  height: 100%;
}

.right-side {
  background-color: #f0f0f0;
  width: 50%;
  height: 100%;
}
</style>
