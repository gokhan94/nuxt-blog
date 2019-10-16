<template>
  <el-menu
    router
    :style="{height: '100%'}"
    :default-active="$route.path"
  >
    <el-menu-item index="/admin">
      <i class="el-icon-menu"></i>
      <span>Anasayfa</span>
    </el-menu-item>
    <el-menu-item index="/admin/create">
      <i class="el-icon-edit-outline"></i>
      <span>Blog Oluştur</span>
    </el-menu-item>
    <el-menu-item index="/admin/list">
      <i class="el-icon-tickets"></i>
      <span>Konular</span>
    </el-menu-item>
    <el-menu-item index="/admin/user">
      <i class="el-icon-s-custom"></i>
      <span>Kullanıcılar</span>
    </el-menu-item>
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span>Blog Anasayfa</span>
    </el-menu-item>    
    <el-menu-item index="/admin/logout">
      <i class="el-icon-setting"></i>
      <span>Çıkış</span>
    </el-menu-item>
  </el-menu>
</template>
