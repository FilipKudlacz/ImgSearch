<template>
  <div class="container">
    <Loader v-if="!loaded" class="the-loader" />
    <div v-else class="nav-wrapper">
      <div class="search-wrapper">
        <SearchBar :phrase="$route.params.id" class="search" :dark="true" />
      </div>
      <h1 class="title">{{ $route.params.id }}</h1>
      <p class="trending">
        Trending:
        <span v-for="trend in trending" :key="trend" @click="input = trend">
          {{ trend }}
        </span>
      </p>
    </div>
    <div class="results-wrapper">
      <div v-for="result in results" :key="result.id" class="result">
        <img :src="result.urls.small" class="photo" />
        <div class="tags">
          <div
            v-for="tag in result.tags"
            :key="tag.title"
            class="tag"
            @click="$router.push('/search/' + tag.title)"
          >
            {{ tag.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import key from '@/config.json'
import Loader from '@/components/Loader.vue'

export default {
  components: {
    SearchBar,
    Loader,
  },
  data() {
    return {
      trending: ['flower', 'wallpapers', 'backgrounds', 'happy', 'love'],
      phrase: '',
      key: '',
      results: [],
      loaded: false,
    }
  },
  mounted() {
    this.phrase = this.$route.params.id
    const self = this

    this.$axios
      .get(
        self.$store.state.api.api +
          `search/photos?query=${self.phrase}&per_page=12&client_id=${key.key}`
      )
      .then((res) => {
        self.results = res.data.results
        self.loaded = true
      })
  },
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  background: white;
  color: black;
  position: relative;

  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
}

.the-loader {
  margin-top: 50vh;
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

.nav-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 70%;
  padding-bottom: 100px;
  padding-top: 50px;

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

.search-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .search {
    height: 36px;
    width: 70%;
  }
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

.results-wrapper {
  width: 70%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .result {
    display: flex;
    flex-direction: column;
    width: 32%;
    margin: 20px 0;

    .photo {
      width: 100%;
      height: 300px;
      background: grey;
      object-fit: cover;
    }

    .tags {
      width: 100%;
      display: flex;
      margin-top: 10px;
      overflow: auto;

      .tag {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #e5e5e5;
        height: 24px;
        padding: 0 7px;
        border-radius: 2px;
        margin-right: 7px;
        cursor: pointer;
      }
    }
  }
}
</style>
