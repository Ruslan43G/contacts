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
          <input v-model="newField.value" type="text" class="edit__form-input" required>
        </div>
        <button type="submit" class="edit__form-submit">Добавить</button>
      </form>
      <div class="edit__confirm" :class="{ edit__confirm_opened: modal.delIsOpen}">
          <p>Удалить поле?</p>
          <button @click="eraseItem">Да</button>
          <button @click="modal.delIsOpen = !modal.delIsOpen">Нет</button>
      </div>
      <div class="edit__cancel" :class="{ edit__cancel_opened: edited.isOpen}">
          <p>Изменить поле?</p>
          <button @click="closeChanges">X</button>
          <button @click="saveChanges">V</button>
        </div>
      <div class="edit__item" v-for="(item, name) in contact" :key="item">
        <span>{{
          nameCheck(name)
          }}:
        </span>
        <p
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
      <button class="edit__button" @click="submitContact">Сохранить изменения</button>
      <button
        type="button"
        class="edit__add-btn"
        @click="newField.visible = true"
      >Добавить поле
      </button>
      <button v-if="lastModified && !edited.isOpen" @click="fallBack">откатить</button>
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
      console.log(this.contact);
      this.newField.key = '';
      this.newField.value = null;
      this.newField.visible = false;
    },
    eraseItem() {
      delete this.contact[this.modal.delItem];
      this.modal.delIsOpen = false;
    },
    openModal(name) {
      console.log(this.contact[name]);
      this.modal.delItem = name;
      this.modal.delIsOpen = true;
      console.log(this.modal.delItem);
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
  updated() {
    console.log('updated!');
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
  .edit__confirm {
    display: none;
  }
  .edit__confirm_opened {
    display: block;
  }
  .edit__cancel {
    display: none;
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
