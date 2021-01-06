<template>
  <section class="edit">
    <h2 class="edit__title">Редактировать контакт</h2>
    <div class="edit__container" ref="container">
      <div class="edit__item" v-for="(item, name) in contactFound" :key="item">
        <span>{{
          name === 'name' ? 'Имя:' :
          name === 'email' ? 'Почта:' :
          name === 'phone' ? 'Телефон:' :
          name === 'address' ? 'Адрес:' : `${name}:`
          }}</span>
        <p @click="edit" @input="(evt) => editHandler(evt, name)">{{item}}</p>
      </div>
      <button class="edit__button" @click="submitContact">Сохранить</button>
      <button type="button" class="edit__add-btn" @click="createField">Добавить поле</button>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      contact: {
        name: '',
        email: '',
        phone: '',
        address: '',
      },
    };
  },
  name: 'contact',
  computed: {
    ...mapGetters(['getContact']),
    contactFound() {
      return this.getContact(+this.$route.params.id);
    },
  },
  methods: {
    ...mapActions(['updateContact']),
    edit: (evt) => {
      const item = evt.target;
      item.contentEditable = true;
    },
    editHandler(evt, name) {
      console.log(name);
      this.contact[name] = evt.target.textContent;
      console.log(this.contact[name], this.contact[name]);
    },
    submitContact() {
      const index = +this.$route.params.id;
      this.updateContact({
        index,
        name: this.contact.name,
        email: this.contact.email,
        phone: this.contact.phone,
        address: this.contact.address,
      });
      this.$router.push('/');
    },
  },
  mounted() {
    this.contact = { ...this.contactFound };
  },
};
</script>

<style scoped>
  .edit__container {
    max-width: 40%;
    margin: 0 auto;
    text-align: left;
  }
  .edit__item {
    display: flex;
  }
  span {
    margin-right: 10px;
  }
  p {
    margin-top: 0;
    cursor: pointer;
  }
  p:hover::after {
    content: 'Редактировать';
    margin-left: 20px;
  }
</style>
