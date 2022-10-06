import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    email: '',
    name: '',
    status: '',
    role: '',

    
  },
  getters: {
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },

    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },
    setEmail(state, email) {
      state.email = email;
      localStorage.email = email;
    },

    removeEmail(state) {
      state.email = '';
      localStorage.email = '';
    },
    setName(state, name) {
      state.name = name;
      localStorage.name = name;
    },

    removeName(state) {
      state.name = '';
      localStorage.name = '';
    },
    setRole(state, role) {
      state.role = role;
      localStorage.role = role;
    },
    removeRole(state) {
      state.role = '';
      localStorage.role = '';
    },
    setStatus(state, status) {
      state.status = status;
      localStorage.status = status;
    },
    removeStatus(state) {
      state.status = '';
      localStorage.status = '';
    },
  },
  actions: {
  },
  modules: {
  }
})
