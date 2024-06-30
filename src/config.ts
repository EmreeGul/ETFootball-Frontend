export default {
  oidc: {
    clientId: '0oai1py9o7zg8POzV5d7',
    issuer: 'https://dev-96572138.okta.com/oauth2/default',
    redirectUri: 'http://localhost:8080/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    useInteractionCodeFlow: true
  }
}
