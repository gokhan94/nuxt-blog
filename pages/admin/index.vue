<template>
<div>
	<h2>Admin Sayfasına Hoşgeldiniz</h2>	
	<div class="tip">
		<p>Açılan Toplam Konu Sayısı: <strong>{{this.posts.length}}</strong></p>
		<br>
		<p>Kayıtlı Kullanıcı Sayısı: <strong>{{this.users.length}}</strong></p>
	</div>	
</div>
</template>	
<script>
export default {
	layout: 'admin',
	middleware: 'auth',
	head : {
		title: `Admin İndex Sayfası | ${process.env.appName}`
	},	
  async asyncData({store}){
  	const posts = await store.dispatch('post/fetch')
  	const users = await store.dispatch('auth/userAll')
  	return { posts, users }
  },
}	
</script>

<style soped>
.tip {
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin: 20px 0;
}
.page-container p {
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;
}
</style>