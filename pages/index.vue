<template>
  <div class="container">
    <div class="layer">
      <div class="wrapper">
        <h1 class="title">Unsplash</h1>
        <p>
          The internet source of
          <a href="https://unsplash.com/license" target="_blank" rel="noopener">
            freely-usable images </a
          >.
        </p>
        <p class="powered">Powered by creators everywhere.</p>
        <SearchBar class="search" />
        <p class="trending">
          Trending:
          <span
            v-for="trend in trending"
            :key="trend"
            @click="$router.push('/search/' + trend)"
          >
            {{ trend }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'

export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      trending: ['flower', 'wallpapers', 'backgrounds', 'happy', 'love'],
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  background-image: url('../static/mainBg.jpg');
  background-size: cover;
  color: white;

  .layer {
    background-color: rgba(68, 68, 68, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: bold;
  font-size: 50px;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 60%;
  padding-bottom: 100px;

  p {
    font-size: 20px;
  }
}

a {
  color: white;
}

.powered {
  margin-bottom: 30px;
}

.search {
  height: 50px;
}

.trending {
  font-weight: bold;

  span {
    font-weight: normal;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
