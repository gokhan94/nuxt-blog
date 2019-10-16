export const state = () => ({
	token: null
})

export const getters = {
	isAuthenticated(state){
		return Boolean(state.token)
	},
  token(state){
    state.token
  }
}

export const mutations = {
	setToken(state, token){
		state.token = token
	},
	removeToken(state){
		state.token = null
	}	
}

export const actions = {

  async login({commit, dispatch}, userData) {
    try {
      const {token} = await this.$axios.$post('/api/auth/admin/login', userData)
      dispatch('setToken', token)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async createUser({commit}, userData) {
    try {
      await this.$axios.$post('/api/auth/admin/create', userData)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async userAll({commit}) {
    try {
      return await this.$axios.$get('/api/auth/admin/allUser')
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },   
  setToken({commit}, token){
    this.$axios.setToken(token, 'Bearer')
    commit('setToken', token)
  },  
	logout({commit}){
    this.$axios.setToken(false)
		commit('removeToken')
	}, 
}