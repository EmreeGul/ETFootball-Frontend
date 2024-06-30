<template>
  <div class="register">
    <h1>Registrierung</h1>
    <form @submit.prevent="register">
      <div>
        <label for="firstName">Vorname:</label>
        <input type="text" v-model="firstName" required />
      </div>
      <div>
        <label for="lastName">Nachname:</label>
        <input type="text" v-model="lastName" required />
      </div>
      <div>
        <label for="email">E-Mail:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Passwort:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Registrieren</button>
    </form>
  </div>
</template>

<script>
import { OktaAuth } from '@okta/okta-auth-js';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      const oktaAuth = new OktaAuth({
        issuer: 'https://dev-96572138.okta.com/oauth2/default',
        clientId: '0oai1py9o7zg8POzV5d7',
      });

      try {
        const response = await oktaAuth.signUp({
          profile: {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            login: this.email,
          },
          credentials: {
            password: {
              value: this.password,
            },
          },
        });

        if (response.status === 'ACTIVE') {
          this.$router.push('/login');
        } else {
          console.error('Registrierung fehlgeschlagen:', response);
        }
      } catch (error) {
        console.error('Fehler bei der Registrierung:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Füge hier deine CSS-Stile hinzu */
</style>
