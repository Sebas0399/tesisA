<template>
  <div class="game-board">
    <h1>Juego del ahorcado</h1>
    <div class="word">
      <span v-for="(letter, index) in hiddenWord" :key="index">{{ letter }}</span>
    </div>
    <div class="body">
      <div class="head"></div>
      <div class="torso"></div>
      <div class="legs"></div>
    </div>


    <!-- Teclado virtual -->
    <div class="keyboard">
      <button :id="letra" v-for="letra in alfabeto" :key="letra" @click="obtenerLetra(letra)">
        {{ letra }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      word: null, // La palabra actual
      intentos: 6,
      alfabeto: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
      guess: "",
      hiddenWord: [] // Agregamos hiddenWord como propiedad de datos
    };
  },
  created() {
    this.loadWords();
  },

  methods: {
    loadWords() {
      axios.get('/assets/words.json') // Ruta relativa a la carpeta public
        .then(response => {
          const words = response.data.words;
          this.word = this.getRandomWord(words);
          this.hiddenWord = Array(this.word.length).fill("_");
        })
        .catch(error => {
          console.error('Error cargando las palabras:', error);
        });
    },
    getRandomWord(words) {
      const randomIndex = Math.floor(Math.random() * words.length);
      return words[randomIndex];
    },
    obtenerLetra(letra){
      
      this.word.split("").forEach((element,i) => {
        if(element===letra){
        document.getElementById(letra).style.backgroundColor='green'
        document.getElementById(letra).style.color='white'

          this.hiddenWord[i]=letra
        }
      });
      this.intentos--;
      if(this.intentos===0){
        console.log("MEKO")
      }
    }
  }
};
</script>

<style scoped>
/* Estilos para el teclado */
.keyboard {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  margin-top: 10px;
}

.keyboard button {
  padding: 10px;
  font-size: 16px;
  margin:10px;
  width:50%
  
}

.correct-guess {
  background-color: green;
  color: white;
}

.wrong-guess {
  background-color: red;
  color: white;
}

span {
  font-size: 50px
}
</style>
