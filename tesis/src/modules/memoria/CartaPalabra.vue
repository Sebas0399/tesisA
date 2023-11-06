<template>
  <div :class="['card', { flipped: isFlipped, matched: isMatched, enabled: isEnabled }]" @click="flipCard"
    :style="{ color: randomColor }">
    <div v-if="isMatched"></div>
    <div v-if="!isFlipped && !isMatched" class="card-back">
      <img :src=imgSrc alt="">
    </div>
    <div v-else class="card-front">
      <span>{{ word }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      randomColor: ''
    };
  },
  props: {
    word: String,
    isMatched: Boolean,
    isFlipped: Boolean,
    isEnabled: Boolean,
    imgSrc: String
  },
  methods: {
    generateRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    flipCard() {
      if (!this.isFlipped && !this.isMatched) {
        this.$emit('flip-card');
      }
    },
  },

  created() {
    this.randomColor = this.generateRandomColor();

  }
};
</script>

<style scoped>
.card {
  width: 150px;
  height: 200px;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  margin: 10px;
  font-size: 30px;
  text-shadow: 
       1px 0px 0px black,   /* Right shadow */
       -1px 0px 0px black,  /* Left shadow */
       0px 1px 0px black,   /* Bottom shadow */
       0px -1px 0px black;  /* Top shadow */
   color: white;   

}

.card:hover {
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
  height: 100%;
}

.matched {
  pointer-events: none;

}

.enabled {
  pointer-events: none;

}
</style>
