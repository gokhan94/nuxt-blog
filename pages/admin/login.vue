<template>
  <el-card
    shadow="always"
    :style="{width: '500px'}"
  >
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
      <h2>Yönetici paneline giriş yapın</h2>

      <el-form-item label="Giriş" prop="login">
        <el-input v-model.trim="controls.login" placeholder="admin" />
      </el-form-item>

      <div class="mb2">
        <el-form-item label="Şifre" prop="password">
          <el-input v-model.trim="controls.password" type="password" placeholder="123456"/>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          round
          :loading="loading"
        >
          Giriş yap
        </el-button>
        <el-button
          type="primary"
          @click="$router.push('/')"
          round
        >
          Anasayfaya Geri Dön
        </el-button>

      </el-form-item>

    </el-form>
  </el-card>
</template>

<script>
export default {
  layout: 'empty',
  head : {
    title: `Giriş Sayfası | ${process.env.appName}`
  },   
  data() {
    return {
      loading: false,
      controls: {
        login: '',
        password: ''
      },
      rules: {
        login: [
          { required: true, message: 'Giriş yap', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Lütfen Şifrenizi giriniz', trigger: 'blur' },
          { min: 6, message: 'Şifre en az 6 karakter olmalı', trigger: 'blur' }
        ]
      }
    }
  },
  mounted(){
    const { message } = this.$route.query
    if (message === 'login') {
      this.$message.info('Panele erişebilmek için lütfen giriş yapınız')
    }
    if (message === 'session') {
      this.$message.warning('Böyle bir session bulunamadı')
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true

          try {
            const formData = {
              login:    this.controls.login,
              password: this.controls.password
            }

            await this.$store.dispatch('auth/login', formData)
            this.$router.push('/admin')

          } catch (e) {
            this.loading = false
          }

          
        }
      })
    }
  }
}
</script>
