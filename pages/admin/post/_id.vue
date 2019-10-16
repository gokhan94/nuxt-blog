<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/admin/list">Konulara Geri Dön</el-breadcrumb-item>
      <el-breadcrumb-item>Konu İd Numarası: {{post.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
      <el-form-item label=".Md veya .html biçiminde metin" prop="text">
        <el-input
          type="textarea"
          v-model.trim="controls.text"
          resize="none"
          :rows="10"
        />
      </el-form-item>

      <div class="mb">
        <small class="mr">
          <i class="el-icon-time"></i>
          <span>
            {{ new Date(post.date).toLocaleString() }}
          </span>
        </small>

        <small>
          <i class="el-icon-view"></i>
          <span>{{ post.views }}</span>
        </small>
      </div>

      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          round
          :loading="loading"
        >
          Güncelle
        </el-button>
      </el-form-item>
    </el-form>


  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'auth',
  async asyncData({store, params}) {
    const post = await store.dispatch('post/fetchAdminById', params.id)
    return {post}
  },
  head(){
    title: `${this.post.title} | ${process.env.appName}`
  },   
  validate({params}) {
    return Boolean(params.id)
  },
  data() {
    return {
      loading: false,
      controls: {
        text: ''
      },
      rules: {
        text: [
          { required: true, message: 'Metin boş bırakılmamalıdır', trigger: 'blur' }
        ]
      }
    }
  },  
  mounted(){
    this.controls.text = this.post.text
  },
  methods : {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true

          const postData = {
            text: this.controls.text,
            id:   this.post._id
          }

          try {
            await this.$store.dispatch('post/update', postData)
            this.$message.success('Konu Güncellendi')
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

