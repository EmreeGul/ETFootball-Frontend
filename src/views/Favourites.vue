<script>
import axios from 'axios';

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
      axios.get('https://etfootball-backend.onrender.com/')
        .then(response => {
          this.comments = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the comments!', error);
        });
    },
    submitComment() {

      // Post to render server
      axios.post('https://etfootball-backend.onrender.com/', this.comment, {
        headers: { 'Content-Type': 'application/json' }
      })
        .then(renderResponse => {
          // Optionally handle render response if different from local
          console.log('Comment posted to render server:', renderResponse.data);
        })
        .catch(error => {
          console.error('There was an error posting the comment to render server!', error);
        });
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

h2 {
  position: absolute;
  right: 160px;
  bottom: 380px;
}

li {
  position: relative;
  top: 80px;
  left: 490px;
}

.comment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  position: absolute;
  left: 0px;
  top: 300px;
}

.comment-form {
  position: absolute;
  left: 0px;
}
</style>
