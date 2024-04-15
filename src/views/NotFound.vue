<template>
  <div class="not-found">
    <h1 class="title">Oops!</h1>
    <p class="message">It seems you've taken a wrong turn.</p>
    <router-link to="/" class="btn">Go Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.title {
  font-size: 4rem;
  margin-bottom: 20px;
  color: #41b883; 
}

.message {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #4f5d75; 
  text-align: center;
}

.btn {
  padding: 10px 20px;
  background-color: #41b883; 
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #2c7a46; 
}
</style>
