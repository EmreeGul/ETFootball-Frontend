<template>
  <div>
    <h1>Posts</h1>
    <button type="button" @click="fetchMyComment">My posts</button>
    <button type="button" @click="fetchMyPostsFromComment">My comments</button>
    <div v-if="comment.length">
      <h2>My Posts:</h2>
      <ul>
        <li v-for="post in comment" :key="post.id">{{ post.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Post',
  data () {
    return {
      comment: []
    }
  },
  methods: {
    fetchMyComment () {
      axios.get('http://localhost:8080/comment', 'https://etfootball-backend.onrender.com')
        .then(response => {
          this.comment = response.data
        })
        .catch(error => {
          console.error('There was an error fetching the posts from localhost!', error)
        })
    },
    fetchMyPostsFromComment () {
      axios.get('https://forum-webtech.onrender.com/comment')
        .then(response => {
          this.comment = response.data
        })
        .catch(error => {
          console.error('There was an error fetching the posts from Render!', error)
        })
    }
  }
}
</script>

<style scoped>
</style>