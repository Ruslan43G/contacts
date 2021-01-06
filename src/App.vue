<template>
  <Header />
  <router-view/>
  <Footer />
  <ConfirmModal />
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import ConfirmModal from './components/ConfirmModal.vue';

export default {
  components: {
    Header,
    Footer,
    ConfirmModal,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
