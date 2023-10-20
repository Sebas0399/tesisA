<template>
  <div>
    <div class="exercise">
      <input v-if="activeIndex !== null" :key="activeIndex" class="word-input" ref="wordRef" v-model="currentWord" />
    </div>
    <button v-if="activeIndex === null" @click="startExercise">Empezar</button>
    <button v-else @click="nextWord">Siguiente</button>

    <div v-if="activeIndex === null && successes.length > 0">
      <h2>Aciertos:</h2>
      <ul>
        <li v-for="(success, index) in successes" :key="index">{{ success }}</li>
      </ul>
    </div>
  </div>
</template>
  
<script>
import palabrasJson from "@/assets/segmentacion/palabras.json";

export default {
  data() {
    return {
      words: [],
      isSegmented: [],
      activeIndex: null,
      currentWord: "",
      successes: []
    };
  },
  methods: {
    startExercise() {
      this.activeIndex = 0;
      this.isSegmented = new Array(this.words.length).fill(false);
      this.currentWord = this.words[0];
      this.successes = [];
    },
    nextWord() {
      this.compareWords()
      if (this.activeIndex < this.words.length - 1) {
        this.activeIndex++;
        this.currentWord = this.words[this.activeIndex];
      } else {
        this.activeIndex = null;
        this.currentWord = "";
      }
    },
    compareWords() {
      const originalWords = palabrasJson.palabras.map((p) => p.original);
      const segmentedWords = palabrasJson.palabras.map((p) => p.segmentada);

      const userInput = this.currentWord;
      const correctSegmentation = segmentedWords[this.activeIndex];

      if (userInput === correctSegmentation) {
        this.successes.push(originalWords[this.activeIndex]);
      }
    },

  },
  created() {
    this.words = palabrasJson.palabras.map((p) => p.original);
  }
};
</script>
  
<style scoped>
.exercise {
  display: flex;
  flex-wrap: wrap;
}

.word-input {
  font-size: 24px;
  margin: auto;
  text-align: center;
  width: 80%;
  padding: 10px;
}

button {
  margin: 10px;
  border-radius: 5px;
  font-size: 20px;

}

button:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
}

h2 {
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
}
</style>
  