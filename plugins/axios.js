export default function ({ $axios, redirect, store  }) {

  //İstek gönderilmeden önce çalışır
  //Örnek olarak kullanıcı eklerken eğer yoksa 
  //common.Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV
 // gibi bir yetkilendirme başlığı ekleyebilir

  $axios.interceptors.request.use(request => {
  	if (store.getters['auth/isAuthenticated'] && !request.headers.common['Authorization']) {
  		const token = store.getters['auth/token']
  		request.headers.common['Authorization'] = `Bearer ${token}`  		
  	}
  	
  	return request
  })

  $axios.onError(error => {
  	if (error.response) {
  		if (error.response.status === 401) {
  			redirect('/admin/login?messages=session')
  			store.dispatch('auth/logout')
  		}
  		if (error.response.status === 500) {
  			console.log('Server 500 Error')
  		}
  	}
  })

}