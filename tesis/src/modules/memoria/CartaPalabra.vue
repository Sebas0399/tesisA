<template>
    <div class="card" v-if="!isMatched && !isFlipped" @click="flipCard">
      <p>{{ word }}</p>
    </div>
    <div class="card flipped" v-else>
      <p>{{ word }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: ['word', 'isMatched', 'isFlipped'],
    methods: {
      flipCard() {
        this.$emit('flip-card', this.word);
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
  
  .flipped {
    background-color: #ccc;
  }
  </style>
  