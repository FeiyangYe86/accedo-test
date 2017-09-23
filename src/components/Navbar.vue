<template>
  <div class="main-nav">
    <span class="navbar-title">{{ title }}</span>
    <ul class="item-list">
      <router-link to="/">Home</router-link>
      <router-link to="/history">History</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Demo project'
    }
  }
}
</script>

<style lang="scss">
  .main-nav {
    text-align: left;
    background: #428bca;
    padding: 5px 20px;

    .navbar-title {
      width: 25%;
      color: #fff;
      font-weight: bold;
    }

    .item-list {
      width: 75%;
      display: inline-block;
      text-align: right;
    }
  }
</style>