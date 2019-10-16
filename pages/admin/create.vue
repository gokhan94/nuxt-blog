<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >

    <h1 class="mb">Yeni Konu Oluştur</h1>

    <el-form-item label="Konu Başlığı Giriniz" prop="title">
      <el-input
        v-model="controls.title"
      />
    </el-form-item>

    <el-form-item label=".html biçiminde metin giriniz" prop="text">
      <el-input
        type="textarea"
        v-model="controls.text"
        resize="none"
        :rows="10"
      />
    </el-form-item>

	<el-form-item>
	    <el-button class="mb" type="success" plain @click="previewDialog = true">
	      Önizleme
	    </el-button>  
	</el-form-item>

    <el-dialog title="Önizleme" :visible.sync="previewDialog">
      <div :key="controls.text">
        <vue-markdown>{{controls.text}}</vue-markdown>
      </div>
    </el-dialog>

    <el-upload
      class="mb"
      drag
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="handleImageChange"
      :auto-upload="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Bir resmi sürükleyin <em>veya tıklayın</em></div>
      <div class="el-upload__tip" slot="tip">jpg / png uzantılı dosyalar geçerlidir</div>
    </el-upload>    

    <el-form-item>
      <el-button
        type="primary"
        native-type="submit"
        round
        :loading="loading"
      >
        Kayıt
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
      image: null,
      previewDialog: false,
      loading: false,
      controls: {
        title: '',
        text: ''
      },
      rules: {
        text: [
          { required: true, message: 'Metin alanı boş bırakılmamalıdır', trigger: 'blur' }
        ],
        title: [
          { required: true, message: 'Konu başlığı boş olamaz', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
  	handleImageChange(file, fileList){
      console.log(file, fileList)
  		this.image = file.raw
  	},
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid && this.image) {
          this.loading = true

          const formData = {
            title: this.controls.title,
            text:  this.controls.text,
            image: this.image
          }

          try {
            await this.$store.dispatch('post/create', formData)
            this.controls.text = ''
            this.controls.title = ''
            this.image = ''
            this.$refs.upload.clearFiles()
            this.$message.success('Konu başarıyla kayıt edildi')
          } catch (e) {} finally {
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
