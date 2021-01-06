<template>
  <footer class="footer">
    <Logo />
    <small class="footer__copy">2021 Ruslan Tikhomirov</small>
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
    padding: 10px;
    background-color: blue;
    min-height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .footer__copy {
    color:rgba(rgb(250, 246, 246), rgb(253, 253, 253), rgb(244, 244, 248), .8);
  }
</style>
