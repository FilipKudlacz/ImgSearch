<template>
  <div class="hello">
    <h1>Unsplash</h1>
    <p>
      The internet source of
      <a href="https://unsplash.com/license" target="_blank" rel="noopener"
        >freely-usable images</a
      >.
    </p>
    <p class="powered">Powered by creators everywhere.</p>
    <SearchBar class="search" />
    <p class="trending">
      Trending:
      <span
        v-for="trend in trending"
        :key="(index, trend)"
        @click="input = trend"
      >
        {{ trend }}
      </span>
    </p>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar'

export default {
  components: {
    SearchBar,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      trending: ['flower', 'wallpapers', 'backgrounds', 'happy', 'love'],
      input: '',
    }
  },
}
</script>

<style scoped lang="scss">
.hello {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 70%;
  padding-bottom: 100px;

  h1 {
    margin-top: 0px;
    padding-top: 20px;
    font-size: 40px;
  }

  p {
    margin: 10px 0;
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
}
</style>
