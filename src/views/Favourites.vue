<script>
import axios from 'axios'

export default {
  name: 'Comment',
  data() {
    return {
      comments: [],
      comment: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    fetchMyComment() {
      axios.get('http://localhost:8080/', 'https://etfootball-backend.onrender.com/')
        .then(response => {
          this.comments = response.data
        })
        .catch(error => {
          console.error('There was an error fetching the comments from localhost!', error)
        })
    },
    submitComment() {
      axios({
        method: 'post',
        url: 'http://localhost:8080/', // replace with your actual API endpoint
        data: this.comment,
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          this.comments = response.data
        })
        .catch(error => {
          console.error('There was an error posting the comment!', error)
        })
    }
  }
}
</script>

<template>
  <div>
    <h1>Comment</h1>
    <button type="button" @click="fetchMyComment">My Comments</button>
    <div v-if="comments.length">
      <h2>My Comments:</h2>
      <ul>
        <li v-for="comment in comments" :key="comment.id">{{ comment.title }}</li>
      </ul>
    </div>
    <h1>Submit Comment</h1>
    <form @submit.prevent="submitComment">
      <input type="text" v-model="comment.title" placeholder="Title" />
      <input type="text" v-model="comment.content" placeholder="Content" />
      <button type="submit">Submit</button>
    </form>

  </div>


</template>

<style scoped>
</style>