<template>
  <!-- главная страница -->
  <section class="home">
    <!-- Блок со списком контактов -->
    <div class="contacts">
      <h3 class="contacts__title" @click="getAllContacts">Список контактов</h3>
      <ul class="contacts__list">
        <!-- компонент для отображения одного контакта. Итерируется из данных со стора. -->
        <Contact
          v-bind:contact="item"
          v-for="(item, index) of getAllContacts"
          :key="index"
        />
      </ul>
      <button class="contact__add-contact" @click="form = true">Добавить новый контакт</button>
    </div>
    <!-- Форма для добавления контакта -->
    <form v-if="form" class="form" @submit.prevent="submitContact">
      <h3 class="form__form-title">Новый контакт</h3>
      <label class="form__label" for="name">Имя</label>
      <input
        type="text" id="name"
        v-model="contact.name" class="form__input" placeholder="Введите имя" required>
      <label class="form__label" for="email">Почта</label>
      <input type="email" id="email"
        v-model="contact.email" class="form__input" placeholder="Введите email">
      <label class="form__label" for="phone">Телефон</label>
      <input type="tel" id="phone"
        v-model="contact.phone" class="form__input" placeholder="Введите номер телефона">
      <label class="form__label" for="adress">Адрес</label>
      <input type="text" id="adress"
        v-model="contact.address" class="form__input" placeholder="Введите адрес">
      <button class="form__submit" type="submit">Добавить</button>
    </form>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Contact from '../components/Contact.vue';

export default {
  name: 'Home',
  data() {
    return {
      contact: {
      },
      form: false,
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
      this.createContact({ ...this.contact });
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
  .form {
    box-sizing: border-box;
    width: 50%;
    min-width: 320px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
  }
  .form__form-title {
    font-size: 40px;
  }
  .form__label {
    text-align: left;
    margin: 0 0 10px 0;
    font-weight: bold;
  }
  .form__input {
    box-sizing: border-box;
    margin: 0 0 25px 0;
    border-radius: 5px;
    border: none;
    border-bottom: 1px solid blue;
    padding: 10px;
    outline: none;
  }
  .form__input:focus {
    box-shadow: 0px 5px 5px rgba(0,0,0,0.5);
  }
  .form__input:invalid {
    border-bottom: 1px solid red;
  }

  .form__submit {
    width: 50%;
    align-self: center;
    border-radius: 5px;
    border: none;
    background-color: green;
    height: 40px;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;
  }
  .form__submit:hover {
    opacity: 0.8;
    box-shadow: 0px 5px 5px rgba(0,0,0,0.5);
    transition: all 0.2s ease;
  }
  .form__submit:active {
    transform: scale(1.1);
    transition: transform 0.2s linear;
  }
  .contacts {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
    width: 80%;
    min-width: 320px;
  }
  .contacts__title {
    font-size: 40px;
  }
  .contacts__list {
    width: 50%;
    min-width: 310px;
    list-style-type: none;
    padding: 0;
    counter-reset: list;
  }
  .contacts__list-item {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
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
  .contact__add-contact {
    margin-top: 50px;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    border: none;
    outline: none;
    background-color: blue;
    color: white;
    transition: all 0.2s linear;
  }
  .contact__add-contact:hover {
    opacity: 0.7;
    transition: all .2s linear;
    box-shadow: 0px 5px 5px rgba(0,0,0,0.5);
  }
  .contact__add-contact:active {
    transform: scale(1.1);
    transition: transform .2s linear;
  }

  @media screen and (max-width: 320px){
    .form {
      padding: 0 10px;
    }
  }
</style>
