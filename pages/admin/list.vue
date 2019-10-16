<template>
  <el-table
    :data="posts"
    style="width: 100%"
  >
    <el-table-column
      prop="title"
      label="İsim"
    />
    <el-table-column label="Tarih">
      <template slot-scope="{row: {date}}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ new Date(date).toLocaleString() }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Görünümler">
      <template slot-scope="{row: {views}}">
        <i class="el-icon-view"></i>
        <span style="margin-left: 10px">{{ views }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Yorumlar">
      <template slot-scope="{row: {comments}}">
        <i class="el-icon-message"></i>
        <span style="margin-left: 10px">{{ comments.length }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Ayarlar">
      <template slot-scope="{row}">
        <el-button
          icon="el-icon-edit"
          type="primary"
          circle
          @click="openPost(row._id)"
        />
        <el-button
          icon="el-icon-delete"
          type="danger"
          circle
          @click="removePost(row._id)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'auth',
  head : {
    title: `Konular | ${process.env.appName}`
  }, 
  async asyncData({store}){
  	const posts = await store.dispatch('post/fetchAdmin')
  	return { posts }
  },
  methods : {
  	openPost(id){
  		this.$router.push(`/admin/post/${id}`)
  	},
    async removePost(id) {
      try {
        await this.$confirm('Gönderiyi Silmek İstediğinden Eminmisin', 'Dikkat!', {
          confirmButtonText: 'evet',
          cancelButtonText: 'iptal',
          type: 'warning'
        })
        //Hangi id no.lu konu silinecek id numarası alınır
        //Store gönderilip veritabanı üzerinden konu silinir
        await this.$store.dispatch('post/remove', id)
        this.posts = this.posts.filter(p => p._id !== id)

        this.$message.success('Silme işlemi başarılı')
      } catch (e) {}

    }
  }

}
</script>
