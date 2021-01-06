<template>
  <header class="header">
    <Logo />
    <nav class="header__nav">
      <ul class="header__nav-list">
        <li class="header__nav-item" @click="$router.push('/')">Главная</li>
        <li class="header__nav-item">Ссылка</li>
      </ul>
    </nav>
  </header>
</template>

<script>
import Logo from './Logo.vue';

export default {
  components: {
    Logo,
  },
};
</script>

<style scoped>
  .header {
    background-color: blue;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    box-shadow: 0px 5px 5px rgba(0,0,0,0.5);
  }
  .header__nav-list {
    color: white;
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    width: 150px;
  }
  .header__nav-item {
    cursor: pointer;
  }
</style>
