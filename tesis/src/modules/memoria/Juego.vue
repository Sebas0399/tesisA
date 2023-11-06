<template>
  <div class="score">Intentos: {{ intentos }}</div>
  <div class="game-board ">
    <WordCard v-for="(word, index) in words" :key="index" :word="word.content" :isMatched="word.isMatched"
      :isEnabled="habilitado" :imgSrc="imagenCarta" :isFlipped="isWordFlipped(index)"
      @flip-card="handleFlipCard(index, word, 'word')" v-auto-animate />

  </div>
  <div v-if="intentos == 0 && contadorJuego != 4">
    <Button @click="siguienteJuego"> Siguiente</Button>
  </div>
  <div v-if="contadorJuego == 4 && intentos == 0">
    <Button @click="siguientePagina"> Siguiente</Button>

  </div>
</template>
  
<script>
import WordCard from './CartaPalabra.vue';
import palabrasJson from "@/assets/memoria/grupos.json";
import imagenCarta from "@/assets/memoria/backCard.png";
export default {
  components: {
    WordCard,
  },
  data() {
    return {
      words: null,
      imagenCarta: null,
      flippedCards: [],
      score: 0,
      intentos: 5,
      contadorJuego: 1,
      habilitado: false,
      puntuacion:0
    };
  },
  watch: {
    intentos: function (newValue, oldValue) {
      if (newValue <= 0) {
        this.habilitado = true
      }
    },
   
  },
  created() {
    this.imagenCarta = imagenCarta
    this.cargarPalabras();

  },
  methods: {
    siguientePagina() {
      const data = {
        comprension: this.puntuacion*10
      };
      const jsonData = JSON.stringify(data);
      localStorage.setItem('informeMemoria', jsonData);
      this.$router.push('/audio')
    },
    siguienteJuego() {
      this.words = []
      this.intentos = 2
      this.habilitado = false
      var pal = palabrasJson.palabras[this.contadorJuego++]
      pal.forEach(x => {
        var cont = { "content": x, "isMatched": false }
        this.words.push(cont)
        this.words.push(cont)
      })
      this.words.sort(() => Math.random() - 0.5)
    },
    cargarPalabras() {
      this.words = []
      var pal = palabrasJson.palabras[1]
      pal.forEach(x => {
        var cont = { "content": x, "isMatched": false }
        this.words.push(cont)
        this.words.push(cont)
      })
      this.words.sort(() => Math.random() - 0.5)

    },

    handleFlipCard(index, content, type) {
      if (this.flippedCards.length < 2 && !content.isMatched) {
        content.isFlipped = true; 
        this.flippedCards.push({ index, content, type });

        if (this.flippedCards.length === 2) {
          this.checkMatch();
        }
      }
    },
    checkMatch() {
      const [card1, card2] = this.flippedCards;

      if (this.cast(card1.content.content) !== this.cast(card2.content.content)) {
        setTimeout(() => {
          card1.content.isFlipped = false; 
          card2.content.isFlipped = false; 
          this.flippedCards = [];
          this.intentos--;
        }, 1000);
      } else {
        setTimeout(() => {
          this.score += 1;
          this.puntuacion=this.puntuacion+1
          card1.content.isMatched = true; // Marcar la carta como emparejada
          card2.content.isMatched = true; // Marcar la carta como emparejada
          this.flippedCards = [];
        }, 1000)

      }
    },

    cast(palabra) {
      if (palabra.includes('/')) {
        return palabra.split('/')[2].replace(/\.[^/.]+$/, '');
      } else {
        return palabra;
      }
    },



    isWordFlipped(index) {
      return (
        this.flippedCards.some(
          card =>
            card.index === index &&
            card.content.content === this.words[index].content &&
            card.type === 'word'
        )
      );
    },

  },
};
</script>
  
<style scoped>
.card.matched {
  border: 5px solid green;
}

.game-board {
  display: flex;
  flex-wrap: wrap;
  max-width: 700px;
  margin: 0 auto;
}





.score {
  margin-top: 20px;
  font-size: 24px;
}
</style>
  