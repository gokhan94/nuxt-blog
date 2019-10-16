<template>
  <nav>
    <h3>Nuxt Blog</h3>  
    <i class="el-icon-minus"></i>
      <nuxt-link to="/admin/login">
          <el-button size="mini" round>Admin Girişi</el-button>
    </nuxt-link>
  </nav>
</template>
<style lang="scss" scoped>
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-bottom: 1px solid #e6e6e6;
  }
  nav h3 {
    color: #6A5ACD
  }
</style>


