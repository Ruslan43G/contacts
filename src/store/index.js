import { createStore } from 'vuex';
import contacts from '../utils/constants';

export default createStore({
  state: {
    contacts: {
      items: contacts,
    },
    modal: {
      open: false,
      delItem: null,
    },
  },
  mutations: {
    addItem: (state, data) => {
      state.contacts.items.push(data);
    },
    setModal: (state) => {
      state.modal.open = !state.modal.open;
    },
    deleteItem: (state) => {
      state.contacts.items = state.contacts.items.filter((item) => item !== state.modal.delItem);
    },
    setDelItem: (state, item) => {
      state.modal.delItem = item;
    },
    updateItem: (state, { index, ...rest }) => {
      state.contacts.items[index] = { ...rest };
    },
  },
  actions: {
    createContact: ({ commit }, data) => {
      commit('addItem', data);
    },
    toggleModal: ({ commit }) => {
      commit('setModal');
    },
    deleteContact: ({ commit }) => {
      commit('deleteItem');
    },
    setItemToDelete: ({ commit }, item) => {
      commit('setDelItem', item);
    },
    updateContact: ({ commit }, data) => {
      commit('updateItem', data);
    },
  },
  getters: {
    getAllContacts(state) {
      return state.contacts.items;
    },
    getModalState(state) {
      return state.modal.open;
    },
    getContact: (state) => (index) => state.contacts.items[index],
  },
});
