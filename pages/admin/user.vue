<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <h2>Kullanıcı Ekle</h2>

    <el-form-item label="İsim" prop="login">
      <el-input v-model.trim="controls.login" />
    </el-form-item>

    <div class="mb2">
      <el-form-item label="Şifre" prop="password">
        <el-input v-model.trim="controls.password" type="password" />
      </el-form-item>
    </div>

    <el-form-item>
      <el-button
        type="primary"
        native-type="submit"
        round
        :loading="loading"
      >
        Ekle
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'auth',
  head : {
    title: `Kullanıcı Ekle | ${process.env.appName}`
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
          { required: true, message: 'Şifrenizi girin', trigger: 'blur' },
          { min: 6, message: 'Şifre en az 6 karakter olmalı', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true

          try {
            const userData = {
              login: this.controls.login,
              password: this.controls.password
            }

            await this.$store.dispatch('auth/createUser', userData)
            this.$message.success('Kullanıcı Başarıyla Eklendi :)')
            this.controls.login = ''
            this.controls.password = ''
            this.loading = false

          } catch (e) {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  form {
    width: 600px;
  }
</style>

