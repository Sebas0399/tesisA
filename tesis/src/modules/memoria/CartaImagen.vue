<template>
  <div :class="['card', { flipped: isFlipped, matched: isMatched }]" @click="flipCard">
    <div v-if="!isFlipped" class="card-back"></div>
    <div v-else class="card-front">
      <img :src="image" alt="Imagen" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    isMatched: Boolean,
    isFlipped: Boolean
  },
  methods: {
    flipCard() {
      if (!this.isFlipped && !this.isMatched) {
        this.$emit('flip-card');
      }
    }
  }
};
</script>

<style scoped>
.card {
  width: 100px;
  height: 150px;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  margin: 10px;
}

.card-back {
  background-color: black;
}

.card-front img {
  max-width: 100%;
  max-height: 100%;
}

.matched {
  pointer-events: none;
}
</style>
