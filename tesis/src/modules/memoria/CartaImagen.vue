<template>
    <div class="card" v-if="!isMatched && !isFlipped" @click="flipCard">
      <img :src="image" alt="card" />
    </div>
    <div class="card flipped" v-else>
      <img :src="image" alt="card" />
    </div>
  </template>
  
  <script>
  export default {
    props: ['image', 'isMatched', 'isFlipped'],
    methods: {
      flipCard() {
        const name=this.image.split("/")[2].replace(/\.[^/.]+$/, "")
        console.log(name)
        this.$emit('flip-card', this.image);
      }
    }
  }
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
  }
  
  .card img {
    max-width: 100%;
    max-height: 100%;
  }
  
  .flipped {
    background-color: #ccc;
  }
  </style>
  