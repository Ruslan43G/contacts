<template>
  <footer class="footer">
    <div class="footer__container">
      <Logo />
      <small class="footer__copy">2021 Ruslan Tikhomirov</small>
    </div>
  </footer>
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
  .footer {
    box-sizing: border-box;
    padding: 10px;
    background-color: lightblue;
    min-height: 50px;
  }
  .footer__container {
    margin: 0 auto;
    max-width: 1440px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .footer__copy {
    color: grey;
  }
</style>
