<template>
  <div class="searchbar-wrapper">
    <div class="searchbar" :class="{ dark: dark }">
      <div class="icon">
        <img src="../static/search.png" alt="search" />
      </div>
      <input
        v-model="input"
        type="text"
        placeholder="Search free high-resolution photos"
        @keyup.enter="search"
      />
      <div class="close">
        <img src="../static/close.png" alt="close" @click="clear" />
      </div>
    </div>
    <div class="results"></div>
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
    }
  },
  mounted() {
    if (this.phrase) {
      this.input = this.phrase
    }
  },
  methods: {
    search() {
      this.$router.push('/search/' + this.input)
    },
    clear() {
      this.input = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.searchbar-wrapper {
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
}
</style>
