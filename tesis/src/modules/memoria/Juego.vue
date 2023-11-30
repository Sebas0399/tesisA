<template>
  <Toast position="bottom-center" group="tl" />
  
  <Toast position="bottom-center" group="bl" />

  <Dialog v-model:visible="visible" :pt="{
    mask: {
      style: 'backdrop-filter: blur(2px)'
    }
  }" modal header="Instrucciones" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <Instruccion :titulo=instruccion.titulo :instruccion=instruccion.instruccion></Instruccion>
    <div class="btn-centrar">
      <button @click="visible = false">Empezar</button>

    </div>
  </Dialog>
  <div class="contenedor">
    <div class="score">Intentos: {{ intentos }}</div>
    <div class="game-board ">
      <WordCard v-for="(word, index) in words" :key="index" :word="word.content" :isMatched="word.isMatched"
        :isEnabled="habilitado" :imgSrc="imagenCarta" :isFlipped="isWordFlipped(index)"
        @flip-card="handleFlipCard(index, word, 'word')" v-auto-animate />

    </div>
    <div v-if="(intentos == 0 && contadorJuego != 4) || score == 6">
      <Button @click="siguienteJuego"> Siguiente</Button>
    </div>
    <div v-if="contadorJuego == 4 && intentos == 0">
      <Button @click="siguientePagina"> Siguiente</Button>

    </div>
  </div>
</template>


<script>
import WordCard from './CartaPalabra.vue';
import palabrasJson from "@/assets/memoria/grupos.json";
import imagenCarta from "@/assets/memoria/backCard.png";
import Instruccion from "@/components/Instruccion.vue"
import { useToast } from 'primevue/usetoast';


export default {
  setup() {
    const toast = useToast();

    // Create a ref to store the toast message

    // Function to show the toast
    const showToast = () => {
      toast.add({ severity: 'success', summary: 'Bien hecho!', group: 'tl', life: 2000 });
    };
    const showToastBad = () => {
      toast.add({ severity: 'error', summary: 'Intenta de nuevo', group: 'bl', life: 2000 });
    };
    return{
      showToast,showToastBad
    }
  },

  components: {
    WordCard, Instruccion
  },
  data() {
    return {
      visible: true,
      words: null,
      imagenCarta: null,
      flippedCards: [],
      score: 0,
      intentos: 7,
      contadorJuego: 1,
      habilitado: false,
      puntuacion: 0,
      instruccion: {
        titulo: "Actividad Memoria",
        instruccion: "Dentro de este juego de tarjetas hay varias palabras mescladas debes encontrar las parejas de cada palabra. "
      }
    };
  },
  watch: {
    intentos: function (newValue, oldValue) {
      if (newValue <= 0) {
        this.habilitado = true
      }
      
    },
    puntuacion:function (newValue,oldValue){
        console.log(newValue);
      }

  },
  created() {
    this.imagenCarta = imagenCarta
    this.cargarPalabras();
    console.log(palabrasJson.palabras)

  },
  methods: {

    siguientePagina() {
      const data = {
        memoria: this.puntuacion * 10
      };
      const jsonData = JSON.stringify(data);
      localStorage.setItem('informeMemoria', jsonData);
      this.$router.push('/audio')
    },
    siguienteJuego() {
      this.words = []
      this.score=0
      this.intentos = 7
      this.habilitado = false
      this.contadorJuego++
      var pal = palabrasJson.palabras[this.contadorJuego]
      pal.forEach(x => {
        var cont = { "content": x, "isMatched": false }
        this.words.push(cont)
        this.words.push(cont)
      })
      this.words.sort(() => Math.random() - 0.5)
    },
    cargarPalabras() {
      this.words = []
      var pal = palabrasJson.palabras[this.contadorJuego]
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
          this.showToastBad();
        }, 1000);
      } else {
        setTimeout(() => {
          this.score += 1;
          this.puntuacion = this.puntuacion + 1
          this.showToast()
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
  padding-bottom: 50px;
}



.contenedor {

  background-image: url("../../assets/fondos/Fondo_Memoria.jpg");
  background-size: 100% 100%;
}

.score {
  font-weight: bold;
  font-size: 24px;
}

.btn-centrar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-centrar button {
  background-color: #69f3b7;
  padding: 10px;
  border-radius: 10px;
}

.btn-centrar button:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
</style>
  