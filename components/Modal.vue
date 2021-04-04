<template>
  <div class="modal-wrapper">
    <Loader v-if="!isLoaded" />
    <div v-if="isLoaded" class="top-section">
      <div class="profile">
        <img :src="information.user.profile_image.small" alt="profile photo" />
        <div class="name">
          <p class="full-name">{{ information.user.name }}</p>
          <p class="tag">{{ `@${information.user.instagram_username}` }}</p>
        </div>
      </div>
      <div class="close">
        <img
          src="@/static/close.png"
          alt="close modal"
          @click="$emit('closeModal')"
        />
      </div>
    </div>
    <img
      v-if="isLoaded"
      :src="information.urls.regular"
      alt="photo"
      class="main-photo"
    />
    <div v-if="isLoaded" class="bottom-section">
      <div class="place">
        <img src="@/static/location.png" alt="location" />
        {{ parseLocation(information.location) }}
      </div>
      <div class="date">
        {{ parseDate(information.created_at) }}
      </div>
    </div>
  </div>
</template>

<script>
import key from '@/config.json'
import Loader from '@/components/Loader.vue'

export default {
  components: {
    Loader,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      information: {},
      isLoaded: false,
    }
  },
  mounted() {
    const self = this

    this.$axios
      .get(self.$store.state.api.api + `photos/${self.id}?client_id=${key.key}`)
      .then((res) => {
        self.information = res.data
        self.isLoaded = true
      })
  },
  methods: {
    parseDate(date) {
      date = new Date(date)
      return (
        date.toLocaleString('default', {
          month: 'short',
        }) +
        ' ' +
        date.getFullYear()
      )
    },
    parseLocation(location) {
      if (location.name) {
        return location.name
      } else {
        return 'Location unknown'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  position: fixed;
  bottom: 10vh;
  width: 60vw;
  height: 80vh;
  z-index: 1;
  background-color: white;
  border-radius: 3px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .top-section {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;

    .profile {
      display: flex;

      img {
        widows: 32px;
        height: 32px;
        border-radius: 16px;
      }

      .name {
        padding-left: 10px;

        .full-name {
          font-weight: bold;
          text-align: left;
        }

        .tag {
          font-size: 12px;
          text-align: left;
        }
      }
    }

    .close {
      margin-right: 10px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .main-photo {
    max-width: 90%;
    height: 85%;
  }

  .bottom-section {
    display: flex;
    justify-content: space-between;
    height: 37px;
    width: 100%;
    align-items: center;

    .place {
      display: flex;
      align-items: center;
    }
  }
}
</style>
