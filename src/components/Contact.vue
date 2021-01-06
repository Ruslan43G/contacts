<template>
  <li
    class="contacts__list-item"
    >
      <span @click="openPage">{{contact.name}}</span>
      <span>{{contact.email}}</span>
      <span>{{contact.phone}}</span>
      <span>{{contact.address}}</span>
      <button class="contacts__del-btn" type="button" @click="openModal(contact)">&times;</button>
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
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid blue;
    margin: 0 0 15px 0;
    position: relative;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .contacts__del-btn {
    border-radius: 5px;
    border: none;
    margin-bottom: 5px;
    background-color: #e53935;
    color: white;
    cursor: pointer;
  }
  span:first-of-type{
    cursor: pointer;
  }
</style>
