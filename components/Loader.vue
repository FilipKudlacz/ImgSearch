<template>
  <div class="loader-wrapper">
    <div v-if="error" class="loader-small-error">
      <p>Ups, coś poszło nie tak</p>
    </div>
    <div v-else class="loader-small">
      <div class="dot" />
      <div class="dot" />
      <div class="dot" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.loader-small {
  display: flex;

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: gray;
    animation: 1s jump infinite ease-in-out;
    margin: 3px;

    &:nth-child(2) {
      animation-delay: 0.1s;
    }

    &:nth-child(3) {
      animation-delay: 0.2s;
    }
  }
}

@keyframes jump {
  25% {
    transform: translateY(-20px);
  }

  50% {
    transform: translateY(0);
  }
}

.loader-wrapper {
  width: 100%;
  height: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader-small-error {
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    margin-top: 10px;
  }
}
</style>
