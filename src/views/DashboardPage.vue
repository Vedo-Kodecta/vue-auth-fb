<template>
  <div class="dashboard">
    <div class="header">
      <h1>Welcome to Your Dashboard</h1>
      <button class="logout-btn" @click="logout">Logout</button>
    </div>
    <p>This is your personalized dashboard where you can manage your tasks, view analytics, and much more.</p>
    <div class="stats">
      <div class="stat">
        <i class="fas fa-tasks"></i>
        <span>Total Tasks: 10</span>
      </div>
      <div class="stat">
        <i class="fas fa-chart-line"></i>
        <span>Analytics: In Progress</span>
      </div>
      <div class="stat">
        <i class="fas fa-calendar-alt"></i>
        <span>Upcoming Events: 5</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      // Implement logout logic here
      console.log('Logged out');
    this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
}

.logout-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #333333;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
}

p {
  font-size: 16px;
  color: #555;
  margin-bottom: 30px;
}

.stats {
  display: flex;
  justify-content: space-between;
}

.stat {
  width: calc(33.33% - 10px);
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.stat i {
  font-size: 24px;
  margin-bottom: 10px;
  color: #4CAF50;
}

.stat span {
  font-size: 18px;
  color: #333;
}
</style>
