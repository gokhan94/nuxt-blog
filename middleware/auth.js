export default function ({ store, redirect }) {
  // Giriş yapmış mı ?
  if (!store.getters['auth/isAuthenticated']) {
     redirect('/admin/login?message=login')
  }
}