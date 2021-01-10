<template>
  <div class="popup" :class="{popup__opened: getModalState}" @click.self="toggleModal">
    <form class="popup__form" @submit.prevent="submitHandler">
      <button type="button" class="popup__close" @click="toggleModal">&times;</button>
      <h4 class="popup__title">Вы уверены?</h4>
      <button type="submit" class="popup__submit">Да</button>
      <button type="button" class="popup__decline" @click="toggleModal">Отменить</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      opened: false,
    };
  },
  computed: {
    ...mapGetters(['getModalState']),
  },
  methods: {
    ...mapActions(['toggleModal', 'deleteContact']),
    submitHandler() {
      this.deleteContact();
      this.toggleModal();
    },
  },
};
</script>

<style scoped>
  .popup {
    visibility: hidden;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .7);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .popup__opened {
    visibility: visible;
  }
  .popup__title {
    margin-top: 0;
  }
  .popup__form {
    width: 320px;
    height: 150px;
    background-color: white;
    border-radius: 25px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: default;
  }
  .popup__close {
    position: absolute;
    top: -15px;
    right: -15px;
    background-color: transparent;
    border: none;
    color: white;
    outline: none;
    cursor: pointer;
  }
  .popup__submit {
    width: 50%;
    border: none;
    border-radius: 10px;
    color: white;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s linear;
    outline: none;
    background-color: lightblue;
  }
  .popup__decline {
    width: 50%;
    margin: 10px 0 0 0;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    color: white;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s linear;
    outline: none;
    background-color: salmon;
  }
</style>
