<template>
  <div :class="['card', { flipped: isFlipped, matched: isMatched }]" @click="flipCard">
    <div v-if="!isFlipped" class="card-back"></div>
    <div v-else class="card-front">
      <span>{{ word }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    word: String,
    isMatched: Boolean,
    isFlipped: Boolean
  },
  methods: {
    flipCard() {
      if (!this.isFlipped && !this.isMatched) {
        this.$emit('flip-card');
      }
    },
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


.matched {
  pointer-events: none; /* Deshabilita los clics en cartas emparejadas */
  /* Otros estilos para cartas emparejadas si los necesitas */
}

</style>
