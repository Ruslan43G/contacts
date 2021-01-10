<template>
  <header class="header">
    <div class="header__container">
      <Logo />
      <nav class="header__nav">
        <ul class="header__nav-list">
          <li class="header__nav-item" @click="$router.push('/')">Главная</li>
        </ul>
      </nav>
    </div>
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
    background-color: lightblue;
    box-sizing: border-box;
    padding: 10px;
  }
  .header__container {
    margin: 0 auto;
    max-width: 1440px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header__nav-list {
    color: white;
    padding: 0;
    list-style-type: none;
    display: flex;
    justify-content: space-between;
  }
  .header__nav-item {
    cursor: pointer;
  }
</style>
