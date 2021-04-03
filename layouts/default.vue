<template>
  <div>
    <Loader v-if="isLoading" class="loader" />
    <Nuxt v-else />
  </div>
</template>

<script>
import key from '@/config.json'
import Loader from '@/components/Loader.vue'

export default {
  components: {
    Loader,
  },
  data() {
    return {
      isLoading: true,
    }
  },
  mounted() {
    const self = this
    const collection = []

    this.$axios
      .get(
        self.$store.state.api.api + `topics?per_page=30&client_id=${key.key}`
      )
      .then((res) => {
        res.data.forEach((record) => {
          collection.push(record.slug)
        })
        self.$store.commit('autocomplete/setAutocomplete', collection)
        self.isLoading = false
      })
  },
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.loader {
  margin-top: 50vh;
}
</style>
