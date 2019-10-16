<template>
  <div>Çıkış</div>
</template>

<script>
export default {
  layout: 'admin',
  middleware : 'auth',
  head : {
    title: `Çıkış Sayfası | ${process.env.appName}`
  },   
  beforeCreate(){
  	this.$store.dispatch('auth/logout')
  	this.$router.push('/admin/login')
  	console.log('Sayfa oluşturmadan önce çalıştı')
  },
  created(){
  	console.log('created çalıştı')
  }
}
</script>
