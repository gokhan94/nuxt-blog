export const actions = {
	async create({commit}, commentData){
		try{
			return await this.$axios.$post('/api/comment', commentData)
		}catch(e){
			commit('setError', e, {root:true})
		}
	}
}