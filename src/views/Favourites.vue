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
        url: 'http://localhost:8080/',
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
    <div class="comment-container">
      <form @submit.prevent="submitComment" class="comment-form">
        <input type="text" v-model="comment.title" placeholder="Title" />
        <input type="text" v-model="comment.content" placeholder="Content" />
        <button type="submit">Submit</button>
      </form>
      <button type="button" @click="fetchMyComment" class="my-comments-button">My Comments</button>
    </div>
    <div v-if="comments.length">
      <h2>My Comments:</h2>
      <ul>
        <li v-for="comment in comments" :key="comment.id">{{ comment.title }}</li>
      </ul>
    </div>
  </div>
</template>



<style scoped>

.comment-container button {
  margin-left: auto;

}
.my-comments-button {
  position: absolute;
  right: 250px;
}

.comment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  position: absolute;
  left: 0px;
  top: 350px;}

.comment-form {
  position: absolute;
  left: 0px;
}

</style>