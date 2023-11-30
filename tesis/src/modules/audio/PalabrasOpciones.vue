<template>
  <div>
    <button v-for="(word, index) in words" :key="index" @click="selectWord(word)" id="btn-opt">
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
  mounted() {
    console.log(this.words)
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
<style scoped>
button {
  margin: 10px;
  border-radius: 5px;
  font-size: 20px;

}

button:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
}
</style>
  