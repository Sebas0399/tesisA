<template>
  <div :class="['card', { flipped: isFlipped, matched: isMatched ,enabled:isEnabled}]" @click="flipCard">
    <div v-if="isMatched"></div>
    <div v-if="!isFlipped&&!isMatched" class="card-back">
      <img :src=imgSrc alt="">
    </div>
    
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
    isFlipped: Boolean,
    isEnabled:Boolean,
    imgSrc: String
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
.card:hover{
  box-shadow: 5px 5px 5px black;
}
.card-back {
  width: inherit;
  height: inherit;
  border: inherit;
  display: inherit;
  justify-content: inherit;
  align-items: inherit;
  cursor: inherit;
  border-radius: inherit
}

img {
  width: 100%;
}

.matched {
  pointer-events: none;

}
.enabled {
  pointer-events: none;

}
</style>
