<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <h1>Bir Yorum Giriniz</h1>

    <el-form-item label="İsminiz" prop="name">
      <el-input v-model="controls.name" />
    </el-form-item>

    <el-form-item label="Yorum metni" prop="text">
      <el-input
        type="textarea"
        v-model="controls.text"
        resize="none"
        :rows="2"
      />
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        native-type="submit"
        round
        :loading="loading"
      >
        Yorum Ekle
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      controls: {
        name: '',
        text: ''
      },
      rules: {
        name: [
          { required: true, message: 'İsim boş olmamalıdır', trigger: 'blur' }
        ],
        text: [
          { required: true, message: 'Bir Yorum Giriniz', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true

          //Kayıt ekleme işlemi...
          //{name: "title", text: "desc", postId: "adsadsf5546"}
          const formData = {
            name:   this.controls.name,
            text:   this.controls.text,
            postId: this.postId
          }

          try {
              const newComment = await this.$store.dispatch('comment/create', formData)
              this.$message.success('Başarılı')
              this.$emit('created', newComment) 
          } catch (e) {
            this.loading = false
          }    
        }
      })
    }
  }
}
</script>


