<template>
  <div class="container">
    <div class="fixed-form">
      <h1>Comment</h1>
      <form @submit.prevent="submitComment" class="comment-form">
        <input type="text" v-model="comment.title" placeholder="Title" />
        <input type="text" v-model="comment.content" placeholder="Content" />
        <button type="submit">Submit</button>
      </form>
      <button type="button" @click="fetchMyComment" class="my-comments-button">Show Comments</button>
    </div>
    <div class="content-section">
      <div v-if="comments.length" class="comments-section">
        <h2>Comments:</h2>
        <table>
          <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="comment in paginatedComments" :key="comment.id" @click="selectComment(comment)">
            <td>{{ comment.title }}</td>
            <td>{{ truncateContent(comment.content) }}</td>
          </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
      <div v-if="selectedComment" class="selected-comment">
        <h3>Comment Content von {{ selectedComment.title }}:</h3>
        <p class="wrapped-content">{{ selectedComment.content }}</p>
        <button @click="editComment(selectedComment)" class="edit-button">Edit</button>
        <button @click="confirmDelete(selectedComment.id)" class="delete-button">Delete</button>
      </div>
      <div v-if="isEditing" class="edit-section">
        <h3>Edit Comment</h3>
        <form @submit.prevent="updateComment" class="edit-form">
          <input type="text" v-model="editedComment.title" placeholder="Title" />
          <input type="text" v-model="editedComment.content" placeholder="Content" />
          <button type="submit">Update</button>
          <button type="button" @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Comment Forum',
  data() {
    return {
      comments: [],
      comment: {
        title: '',
        content: ''
      },
      editedComment: {
        id: null,
        title: '',
        content: ''
      },
      selectedComment: null,
      isEditing: false,
      currentPage: 1,
      itemsPerPage: 10
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.comments.length / this.itemsPerPage);
    },
    paginatedComments() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedComments.slice(start, end);
    },
    sortedComments() {
      return [...this.comments].reverse();
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
      this.isEditing = false;
    },
    truncateContent(content) {
      if (content.length > 20) {
        return content.slice(0, 20) + '...';
      }
      return content;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    confirmDelete(commentId) {
      if (confirm('Are you sure you want to delete this comment?')) {
        this.deleteComment(commentId);
      }
    },
    deleteComment(commentId) {
      axios.delete(`https://etfootball-backend.onrender.com/${commentId}`)
        .then(response => {
          console.log('Comment deleted from render server!', response);
          this.fetchMyComment(); // Reload the comments after deletion
        })
        .catch(error => {
          console.error('There was an error deleting the comment from the render server!', error);
        });
    },
    editComment(comment) {
      this.editedComment = { ...comment };
      this.isEditing = true;
    },
    updateComment() {
      axios.put(`https://etfootball-backend.onrender.com/${this.editedComment.id}`, this.editedComment, {
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          console.log('Comment updated on render server!', response);
          this.fetchMyComment(); // Reload the comments after update
          this.isEditing = false;
          this.selectedComment = null;
        })
        .catch(error => {
          console.error('There was an error updating the comment on render server!', error);
        });
    },
    cancelEdit() {
      this.isEditing = false;
      this.editedComment = {
        id: null,
        title: '',
        content: ''
      };
    }
  }
}
</script>

<style scoped>
.container {
  padding-top: 80px; /* Abstand zur Navbar */
}

.fixed-form {
  position: absolute;
  top: 350px; /* Tieferer Abstand zur Navbar */
  left: 50px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 300px; /* Fixe Breite */
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
}

.my-comments-button {
  margin-top: 10px;
  width: 100%;
}

.content-section {
  margin-top: 300px; /* Sicherstellen, dass genug Platz für das feste Formular ist */
  width: 90%;
  margin-left: 400px; /* Platz lassen für das fixe Formular */
}

.comments-section {
  width: 100%; /* Tabelle breiter machen */
  margin: 20px auto; /* Abstand zu den Formularen */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #1e3939;
  color: white;
}

tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

.selected-comment {
  margin-top: 20px;
}

.wrapped-content {
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: 50ch; /* Maximale Breite für den Zeilenumbruch */
}

.edit-button, .delete-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
}

.edit-button {
  background-color: #4CAF50;
}

.edit-button:hover {
  background-color: #45a049;
}

.delete-button:hover {
  background-color: #ff1a1a;
}

.edit-section {
  margin-top: 20px;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 10px;
  padding: 5px 10px;
}
</style>
