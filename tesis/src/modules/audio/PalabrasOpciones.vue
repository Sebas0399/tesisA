<template>
    <div>
      <button v-for="(word, index) in words" :key="index" @click="selectWord(word)">
        {{ word }}
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      words: Array,
      correctWord: String
    },
    methods: {
      selectWord(selectedWord) {
        if (selectedWord === this.correctWord) {
          this.$emit('correct');
        } else {
          this.$emit('incorrect');
        }
      }
    }
  }
  </script>
  