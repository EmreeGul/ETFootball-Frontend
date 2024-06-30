<script>
import axios from 'axios';

export default {
  name: 'CommentForum',
  data() {
    return {
      comments: [],
      comment: {
        title: '',
        content: ''
      },
      selectedComment: null
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
      axios.post('https://etfootball-backend.onrender.com/', this.comment, {
        headers: { 'Content-Type': 'application/json' }
      })
        .then(renderResponse => {
          console.log('Comment posted to render server:', renderResponse.data);
          this.comments.push(renderResponse.data);
          this.comment.title = '';
          this.comment.content = '';
        })
        .catch(error => {
          console.error('There was an error posting the comment to render server!', error);
        });
    },
    selectComment(comment) {
      this.selectedComment = comment;
    }
  }
}
</script>

<template>
  <div>
    <h1>Comment Forum</h1>
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
        <li v-for="comment in comments" :key="comment.id">
          <a href="#" @click.prevent="selectComment(comment)">{{ comment.title }}</a>
        </li>
      </ul>
    </div>
    <div v-if="selectedComment">
      <h3>{{ selectedComment.title }}:</h3>
      <p>{{ selectedComment.content }}</p>
    </div>
  </div>
</template>

<style scoped>
.comment-container button {
  margin-left: auto;
  margin-top: 20px;
}

.my-comments-button {
  margin-right: 20px;
}

h2 {
  margin-right: 20px;
  margin-top: 20px;
}

li {
  margin-top: 10px;
}

.comment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

h1 {
  margin-top: 30px;
}

.comment-form {
  margin-top: 20px;
}

h3 {
  margin-top: 20px;
}

p {
  margin-left: 20px;
}
</style>
