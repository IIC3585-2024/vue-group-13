import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    auth: {
      isLoggedIn: false,
      access_token: '',
      user: {
        id: '',
        name: '',
        email: '',
        token: '',
        picture: '',
        bookshelves: []
      }
    },
  },
  mutations: {
    setUser(state, user) {
      state.auth.user = user
    },
    setAuth(state, auth) {
      state.auth = auth
    },
    logIn(state, { user, access_token }) {
      state.auth.isLoggedIn = true
      state.auth.access_token = access_token
      state.auth.user = user
    },
    logOut(state) {
      state.auth.isLoggedIn = false
      state.auth.access_token = ''
      state.auth.user = {
        id: '',
        name: '',
        email: '',
        picture: '',
        token: '',
        bookshelves: []
      }
    }
  },
  actions: {
    setUser(context, user) {
      context.commit('setUser', user)
    },
    setAuth(context, auth) {
      context.commit('setAuth', auth)
    },
    logIn(context, user, access_token) {
      context.commit('logIn', { user, access_token })
    },
    logOut(context, user) {
      context.commit('logOut')
    }
  },
  plugins: [
    createPersistedState()
  ]
})