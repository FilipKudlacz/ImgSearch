<template>
  <div class="searchbar-wrapper">
    <div class="searchbar" :class="{ dark: dark }">
      <div class="icon" @click="$refs.search.focus()">
        <img src="../static/search.png" alt="search" />
      </div>
      <input
        ref="search"
        v-model="input"
        v-click-outside="turnOffSuggestions"
        type="text"
        placeholder="Search free high-resolution photos"
        @keyup.enter="search"
        @input="checkSuggestions"
        @click="suggestionsActive = true"
      />
      <div class="close">
        <img src="../static/close.png" alt="close" @click="clear" />
      </div>
    </div>
    <div
      v-if="suggestionsActive"
      class="results"
      :class="{ 'results-dark': dark }"
    >
      <div
        v-for="suggestion in suggestions"
        :key="suggestion"
        class="result"
        @click="$router.push(`/search/${suggestion}`)"
      >
        {{ suggestion }}
      </div>
      <div
        v-if="input.length >= 3 && suggestions.length == 0"
        class="result disabled"
      >
        No suggestions found
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    phrase: {
      default: '',
      type: String,
    },
    dark: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      input: '',
      suggestions: [],
      allTags: [],
      suggestionsActive: false,
    }
  },
  mounted() {
    if (this.phrase) {
      this.input = this.phrase
    }
    this.allTags = this.$store.state.autocomplete.autocomplete
    this.checkSuggestions()
  },
  methods: {
    search() {
      this.$router.push('/search/' + this.input)
    },
    clear() {
      this.input = ''
    },
    checkSuggestions() {
      this.suggestionsActive = true

      if (this.input.length >= 3) {
        this.suggestions = this.allTags.filter((tag) => {
          return tag.includes(this.input.toLowerCase())
        })
      } else {
        this.suggestions = []
      }
    },
    turnOffSuggestions() {
      this.suggestionsActive = false
    },
  },
}
</script>

<style lang="scss" scoped>
.searchbar-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  border-radius: 5px;

  .searchbar {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;

    .icon {
      position: absolute;
      left: 0;
      height: 100%;
      display: flex;
      align-items: center;
      margin: 0 10px;

      img {
        width: 32px;
        height: 32px;
      }

      &:hover {
        cursor: pointer;
      }
    }

    input {
      border: none;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      font-size: 16px;
      padding-left: 55px;
      padding-right: 30px;
    }

    .close {
      position: absolute;
      right: 10px;
      cursor: pointer;
      height: 18px;
    }
  }

  .results {
    position: absolute;
    top: 100%;
    margin-top: 5px;
    background-color: white;
    width: 100%;
    max-height: 250px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    overflow: auto;

    .result {
      display: flex;
      align-items: center;
      width: 100%;
      height: 50px;
      text-align: left;
      padding-left: 20px;
      color: black;

      &:hover {
        cursor: pointer;
        background: #d3d3d3;
      }
    }

    .disabled:hover {
      cursor: default;
      background: white;
    }
  }

  .dark {
    .icon {
      img {
        width: 20px;
        height: 20px;
      }
    }

    input {
      background: #e5e5e5;
      border-radius: 18px;
    }
  }

  .results-dark {
    background: #e5e5e5;
    max-height: 180px;

    .result {
      height: 36px;
    }

    .disabled:hover {
      cursor: default;
      background: #e5e5e5;
    }
  }
}
</style>
