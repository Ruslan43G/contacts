<template>
  <li
    class="contacts__list-item"
    >
      <span>{{contact.name}}</span>
      <button @click="openPage" class="contact__btn contact__open-btn">Открыть</button>
      <button
        class="contact__btn contacts__del-btn"
        type="button" @click="openModal(contact)">&times;</button>
  </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: ['contact'],
  methods: {
    ...mapActions(['createContact', 'toggleModal', 'setItemToDelete']),
    openModal() {
      this.setItemToDelete(this.contact);
      this.toggleModal();
    },
    openPage() {
      this.$router.push({ name: 'contact', params: { id: this.getAllContacts.indexOf(this.contact) } });
    },
  },
  computed: {
    ...mapGetters(['getAllContacts']),
  },
};
</script>

<style>
  .contacts__list-item {
    width: 50%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid blue;
    margin: 0 0 15px 0;
    position: relative;
    padding: 0 0 5px 20px;
    box-sizing: border-box;
  }
  .contact__open-btn {
    margin: 0 20px 0 auto;
    background-color: transparent;
  }
  .contact__btn:hover {
    opacity: 0.8;
    transition: all 0.2s linear;
  }
  .contact__btn:active {
    transform: scale(1.1);
    transition: all 0.2s linear;
  }
  .contact__btn {
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: all 0.2s linear;
    outline: none;
  }
  .contacts__del-btn {
    width: 24px;
    background-color: #e53935;
    color: white;
  }
</style>
