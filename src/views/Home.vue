<template>
  <section class="home">
    <form class="add-form" @submit.prevent="submitContact">
      <h3 class="add-form__form-title">Добавить контакт</h3>
      <label class="add-form__label" for="name">Имя</label>
      <input type="text" id="name" v-model="name" class="add-form__input" placeholder="Введите имя">
      <label class="add-form__label" for="email">Почта</label>
      <input type="email" id="email"
      v-model="email" class="add-form__input" placeholder="Введите email">
      <label class="add-form__label" for="phone">Телефон</label>
      <input type="number" id="phone"
      v-model="phone" class="add-form__input" placeholder="Введите телефон">
      <label class="add-form__label" for="adress">Адрес</label>
      <input type="text" id="adress"
      v-model="address" class="add-form__input" placeholder="Введите адрес">
      <button class="add-form__submit" type="submit">Добавить</button>
    </form>
    <div class="contacts">
      <h3 class="contacts__title" @click="getAllContacts">Список контактов</h3>
      <ul class="contacts__list">
        <Contact v-bind:contact="item"
        v-for="item of getAllContacts"
        :key="getAllContacts.indexOf(item)"
        />
      </ul>
    </div>

  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Contact from '../components/Contact.vue';

export default {
  name: 'Home',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      address: '',
    };
  },
  components: {
    Contact,
  },
  computed: {
    ...mapGetters(['getAllContacts']),
  },
  methods: {
    ...mapActions(['createContact']),
    submitContact() {
      this.createContact({
        name: this.name, email: this.email, phone: this.phone, address: this.address,
      });
    },
  },
};
</script>

<style scoped>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .add-form {
    width: 500px;
    display: flex;
    flex-direction: column;
  }
  .add-form__form-title {
    font-size: 40px;
  }
  .add-form__label {
    text-align: left;
    margin: 0 0 10px 0;
    font-weight: bold;
  }
  .add-form__input {
    margin: 0 0 25px 0;
    border-radius: 10px;
    border: 1px solid blue;
    padding: 10px;
  }
  .add-form__submit {
    width: 50%;
    align-self: center;
    border-radius: 5px;
    border: none;
    background-color: green;
    height: 40px;
    color: white;
    cursor: pointer;
  }
  .add-form__submit:hover {
    opacity: 0.8;
    box-shadow: 0px 5px 5px rgba(0,0,0,0.5);
    transition: all 0.5s ease;
  }
  .contacts {
    margin-bottom: 50px;
  }
  .contacts__title {
    font-size: 40px;
  }
  .contacts__list {
    width: 800px;
    list-style-type: none;
    padding: 0;
    counter-reset: list;
  }
  .contacts__list-item:last-of-type {
    margin-bottom: 0;
  }
  .contacts__list-item::before {
    counter-increment: list;
    content: counter(list)".";
    position: absolute;
    top: 0;
    left: 0;
    color: rgba(0, 0, 0, 0.5);
  }
</style>
