<template>
  <section class="edit">
    <h2 class="edit__title">Редактировать контакт</h2>
    <div class="edit__container">
      <form v-if="newField.visible" class="edit__form" @submit.prevent="createFiled">
        <h3 class="edit__form-title">Добавить поле</h3>
        <div>
          <select v-model="newField.key" class="edit__form-select">
            <option value="" disabled selected>Выберите опцию</option>
            <template v-for="(item, index) in availibleOptions" :key="index">
              <option
                v-if="!Object.keys(contact).includes(item)"
                :value="item"
                >
                {{
                  nameCheck(item)
                }}
              </option>
            </template>
          </select>
          <input
            v-model="newField.value"
            type="text"
            class="edit__form-input"
            placeholder="Введите значение"
            required>
        </div>
        <button type="submit" class="edit__form-submit edit__button">Добавить</button>
      </form>
      <div class="edit__confirm" :class="{ edit__confirm_opened: modal.delIsOpen}">
          <p>Удалить поле?</p>
          <button
            class="edit__button edit__confirm-yes"
            @click="eraseItem">
            Да
          </button>
          <button class="edit__button edit__confirm-no"
            @click="modal.delIsOpen = !modal.delIsOpen">
            Нет
          </button>
      </div>
      <div class="edit__cancel" :class="{ edit__cancel_opened: edited.isOpen}">
          <p>Изменить поле?</p>
          <button class="edit__button edit__confirm-yes" @click="saveChanges">Да</button>
          <button class="edit__button edit__confirm-no" @click="closeChanges">Нет</button>
        </div>
      <div class="edit__item"
        :class="{edit__item_first: name === 'name'}"
        v-for="(item, name) in contact"
        :key="item"
        >
        <span class="edit__name">{{
          nameCheck(name)
          }}:
        </span>
        <p
          class="edit__value"
          @click="(evt) => edit(evt, item)"
          @input="(evt) => editHandler(evt, name)"
          contenteditable>{{item}}
        </p>
        <button
          v-if="name !== 'name'"
          class="edit__del-btn"
          @click="() => openModal(name)"
          >&times;
        </button>
      </div>
      <button
        type="button"
        class="edit__button edit__add-btn"
        @click="newField.visible = true"
      >Добавить поле
      </button>
      <button
        class="edit__button edit__save-btn"
        @click="submitContact">
        Сохранить изменения
      </button>
      <button
        class="edit__button edit__fallback"
        v-if="lastModified && !edited.isOpen"
        @click="fallBack">
        Отменить
      </button>
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
      },
      modal: {
        delIsOpen: false,
        delItem: null,
      },
      edited: {
        isOpen: false,
      },
      newField: {
        visible: false,
        key: '',
        value: null,
      },
      lastModified: null,
      initialValue: null,
      availibleOptions: ['phone', 'email', 'address', 'work', 'birthday', 'surname'],
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
    nameCheck(value) {
      if (value === 'name') {
        return 'Имя';
      }
      if (value === 'email') {
        return 'Почта';
      }
      if (value === 'phone') {
        return 'Телефон';
      }
      if (value === 'address') {
        return 'Адрес';
      }
      if (value === 'birthday') {
        return 'День рождения';
      }
      if (value === 'surname') {
        return 'Фамилия';
      }
      if (value === 'work') {
        return 'Место работы';
      }
      return value;
    },
    edit(evt, item) {
      evt.target.classList.add('active');
      this.edited.isOpen = true;
      this.initialValue = item;
    },
    editHandler(evt, name) {
      this.edited[name] = evt.target.textContent;
      this.lastModified = name;
      console.log(this.lastModified);
    },
    submitContact() {
      const index = +this.$route.params.id;
      this.updateContact({
        index,
        ...this.contact,
      });
      this.$router.push('/');
    },
    createFiled() {
      this.contact[this.newField.key] = this.newField.value;
      this.newField.key = '';
      this.newField.value = null;
      this.newField.visible = false;
    },
    eraseItem() {
      delete this.contact[this.modal.delItem];
      this.modal.delIsOpen = false;
    },
    openModal(name) {
      this.modal.delItem = name;
      this.modal.delIsOpen = true;
    },
    saveChanges() {
      if (this.lastModified === null) {
        this.edited.isOpen = false;
        return;
      }
      this.contact[this.lastModified] = this.edited[this.lastModified];
      console.log(this.contact[this.lastModified]);
      this.edited.isOpen = false;
    },
    closeChanges() {
      const active = document.querySelector('.active');
      active.textContent = this.initialValue;
      active.classList.remove('active');
      this.lastModified = null;
      this.initialValue = null;
      this.edited.isOpen = false;
    },
    fallBack() {
      this.contact[this.lastModified] = this.initialValue;
      this.lastModified = null;
      this.initialValue = null;
    },
  },
  mounted() {
    this.contact = { ...this.contactFound };
  },
};
</script>

<style>
  .edit__title {
    margin-bottom: 30px;
  }
  .edit__container {
    max-width: 40%;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    text-align: left;
  }
  .edit__button {
    width: 50%;
    min-width: 150px;
    margin: 0 auto;
    border: none;
    border-radius: 10px;
    color: white;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s linear;
    outline: none;
  }
  .edit__form {
    margin-bottom: 30px;
  }
  .edit__form-select {
    padding: 10px;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
    border-radius: 10px;
    border: 1px solid lightblue;
    color: lightblue;
  }
  .edit__form-input {
    padding: 10px;
    box-sizing: border-box;
    outline: none;
    border-radius: 10px;
    border: 1px solid lightblue;
    margin-left: 25px;
  }
  .edit__form-input::placeholder {
    color: lightblue;
  }
  .edit__form-submit {
    background-color: lightseagreen;
    margin-top: 10px;
  }
  .edit__item {
    padding-right: 25px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid lightblue;
    margin-bottom: 10px;
    max-width: 100%;
    position: relative;
  }
  .edit__item_first {
    padding: 0;
  }
  .edit__value {

  }
  .edit__button:hover {
    opacity: 0.8;
    transition: all 0.3s linear;
  }
  .edit__button:active {
    transform: scale(1.1);
    transition: all 0.3s linear;
  }
  .edit__add-btn {
    margin: 30px auto 15px;
    background-color: lightblue;
  }
  .edit__confirm {
    display: none;
    margin-bottom: 30px;
  }
  .edit__confirm_opened {
    display: block;
  }
  .edit__confirm-yes {
    background-color: lightseagreen;
    max-width: 25px;
    margin-right: 10px;
  }
  .edit__confirm-no {
    background-color:salmon;
    max-width: 25px;
  }
  .edit__cancel {
    display: none;
    margin-bottom: 25px;
  }
  .edit__cancel_opened {
    display: block;
  }
  .edit__del-btn {
    border: none;
    color: red;
    background-color: transparent;
    align-self: flex-start;
    cursor: pointer;
    position: absolute;
    bottom: 16px;
    right: 0;
    outline: none;
  }
  .edit__save-btn {
    background-color: lightseagreen;
  }
  .edit__name {
    margin-right: 10px;
  }
  .edit__value {
    margin-top: 0;
    position: relative;
  }
  .edit__fallback {
    margin-top: 15px;
    background-color: yellow;
    color: black;
  }
  @media screen and (max-width: 1032px){
    .edit__form-input {
      margin: 10px 0;
    }
  }
  @media screen and (max-width: 774px){
    .edit__confirm-no {
      margin-top: 10px;
    }
  }
  @media screen and (max-width: 320px){
    .edit__container {
      padding: 0 10px;
    }
  }
</style>
