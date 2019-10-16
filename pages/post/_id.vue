<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>{{post.title}}</h1>
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
      </div>
      <div class="post-info">
        <small>
          <i class="el-icon-time"></i>
          {{ new Date(post.date).toLocaleString() }}
        </small>
        <small>
          <i class="el-icon-view"></i>
          {{post.views}}
        </small>
      </div>
      <div class="post-image">
        <img 
          :src="post.imageUrl"
        >
      </div>
    </header>
    <main class="post-content">
      <vue-markdown>{{post.text}}</vue-markdown>
    </main>
    <footer>
      <CommentForm 
        v-if="addComment"
        @created="createComment"
        :postId="post._id"
      />
      <div class="comments" v-if="post.comments.length">
        <Comment 
          v-for="comment in post.comments"
          :key="comment._id"
          :comment="comment"
        />
      </div>
      <div class="text-center" v-else>
        Yorum Bulunamadı
      </div>
    </footer>
  </article>
</template>

<script>
import Comment     from '@/components/main/Comment'
import CommentForm from '@/components/main/CommentForm'
export default {
  validate({params}) {
    return Boolean(params.id)
  },
  head(){
    title: `${this.post.title} | ${process.env.appName}`
  },  
  async asyncData({store, params}){
    const post = await store.dispatch('post/fetchById', params.id)
    await store.dispatch('post/addView', post)
    return {
      post: {
       ...post,
        views: ++post.views
      }
    }
  },  
  components : {
    Comment,
    CommentForm
  },
  data(){
    return {
      addComment: true
    }
  },
  methods : {
    createComment(comment){
      //$emit('created')
      this.post.comments.unshift(comment)
      this.addComment = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .post {
    max-width: 600px;
    margin: 0 auto;
  }

  .post-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .post-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .5rem;
  }

  .post-image img {
    width: 100%;
    height: auto;
  }

  .post-header {
    margin-bottom: 1.5rem;
  }

  .post-content {
    margin-bottom: 2rem;
  }
</style>

