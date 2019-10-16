<template>
  <el-row  type="flex" justify="center">
	<el-col v-if="this.posts.length > 0" :xs="24" :sm="18" :md="12" :lg="10">
		<Post 
			v-for="post in posts"
			:key="post._id"
			:post="post"
		/>
	</el-col>
	<el-col v-else :xs="24" :sm="18" :md="12" :lg="10">
	  <el-alert
	    title="Açılan bir konu bulunamamıştır..."
	    type="warning"
	    effect="dark">
	  </el-alert>
	</el-col>	
  </el-row>	
</template>

<script>
import Post from '@/components/main/Post'
export default {
	head : {
		title: `İndex Sayfası | ${process.env.appName}`
	},
	async asyncData({store}){
		const posts = await store.dispatch('post/fetch')
		return {posts}
	},
	components : {
		Post
	}
}
</script>

<style soped>
.tip {
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin: 20px 0;
}
.tip p {
	text-align: center;
}
</style>

