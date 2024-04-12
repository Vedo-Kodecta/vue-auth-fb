<template>
  <div class="auth-container">
    <div class="auth-tabs">
      <button :class="{ active: activeTab === 'login' }" @click="toggleTab('login')">Login</button>
      <button :class="{ active: activeTab === 'register' }" @click="toggleTab('register')">Register</button>
    </div>
    <div class="auth-form">
      <form v-if="activeTab === 'login'" @submit.prevent="login">
        <input type="text" placeholder="Username" v-model="loginUsername">
        <input type="password" placeholder="Password" v-model="loginPassword">
        <button type="submit">Login</button>
        <button class="google-login-btn" @click="loginWithGoogle">
          <img src="@/assets/google-logo.svg" alt="Google Logo" class="google-logo">
          <span>Login with Google</span>
        </button>
      </form>
      <form v-else @submit.prevent="register">
        <input type="text" placeholder="Email" v-model="registerUsername">
        <input type="password" placeholder="Password" v-model="registerPassword">
        <input type="password" placeholder="Confirm Password" v-model="confirmPassword">
        <button type="submit">Register</button>
        <ul v-if="!success && errorData && Object.keys(errorData).length > 0" class="error-messages">
          <li v-for="(errors, field) in errorData" :key="field">
            {{ formatErrors(field, errors) }}
          </li>
        </ul>
        <p v-if="success" class="success-message">{{ message }}</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthForm',
  data() {
    return {
      activeTab: 'login',
      loginUsername: '',
      loginPassword: '',
      registerUsername: '',
      registerPassword: '',
      confirmPassword: '',
      success: null,
      message: '',
      errorData: {}
    };
  },
  methods: {
    toggleTab(tab) {
      this.activeTab = tab;
    },
    async login() {
      console.log('Logging in...');
      
      // Implement login logic here
      const response = await fetch('http://127.0.0.1:8000/firebase-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.loginUsername,
            password: this.loginPassword
          })
        });
      const data = await response.json();
      if (response?.ok) {
        localStorage.setItem("accessToken", data?.user?.idToken);
        this.$router.push('/dashboard');
      } else this.message = data?.error;
      
    },
    async register() {
      console.log('Registering...');
      
      console.log('Confirm Password:', this.confirmPassword);
      try {
        const response = await fetch('http://127.0.0.1:8000/firebase-register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.registerUsername,
            password: this.registerPassword
          })
        });
        const data = await response.json();
        if (response.ok) {
          this.success = true;
          this.message = data.message;
        } else {
          this.success = false;
          this.errorData = data;
        }
      } catch (error) {
        console.error('Error:', error);
        this.success = false;
        this.message = 'An error occurred while registering.';
      }
    },
    loginWithGoogle() {
      // Initialize Google Sign-In
      // eslint-disable-next-line no-undef
      gapi.load('auth2', () => {
        // eslint-disable-next-line no-undef
        const auth2 = gapi.auth2.init({
          client_id: '515451191353-svpbtcqcpkvpelk2cd5p2spk1ivm2hl7.apps.googleusercontent.com',
          scope: 'profile email'
        });
        
        // Sign in with Google
        auth2.signIn().then(googleUser => {
          // Obtain the Google ID token
          const idToken = googleUser.getAuthResponse().id_token;
          
          // Send the token to your backend for verification and authentication
          this.sendGoogleIdTokenToServer(idToken);
        });
      });
    },
    sendGoogleIdTokenToServer(idToken) {
      // Send an HTTP request to your backend with the Google ID token
      // Example:
      fetch('http://127.0.0.1:8000/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken })
      })
      .then(response => {
        if (response.ok) {
          // Handle successful authentication
          console.log('Successfully logged in with Google');
          this.$router.push('/dashboard');
        } else {
          // Handle authentication error
          console.error('Failed to log in with Google');
        }
      })
      .catch(error => {
        // Handle network error
        console.error('Error:', error);
      });
    },
    formatErrors(field, errors) {
      let messages = [];
      if (Array.isArray(errors)) {
        messages = errors.map(error => `${field}: ${error}`);
      } else if (typeof errors === 'string') {
        messages.push(`${field}: ${errors}`);
      } else if (typeof errors === 'object') {
        for (const key in errors) {
          if (Object.hasOwnProperty.call(errors, key)) {
            messages.push(`${field}: ${errors[key]}`);
          }
        }
      }
      return messages.join('\n');
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40vh;
}

.auth-tabs {
  display: flex;
  margin-bottom: 20px;
}

.auth-tabs button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 18px;
  padding: 10px 20px;
  margin-right: 10px;
}

.auth-tabs button.active {
  color: #ffffff;
  background-color: #333333;
}

.auth-form {
  width: 300px;
}

.auth-form form {
  display: flex;
  flex-direction: column;
}

.auth-form input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.auth-form button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #333333;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
}

.error-messages {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}

.error-messages li {
  color: #ff0000;
}

.success-message {
  color: #00ff00;
}

.google-login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
}

.auth-form button:hover {
  background-color: #525252;
}

.google-logo {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
</style>
