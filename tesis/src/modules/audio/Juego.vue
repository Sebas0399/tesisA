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
    <Knob v-model="correctas" :min="0" :max="5" readonly="true"/>
    <h1>Reproduce el audio</h1>
    <audio-player :audioSrc="audioSrc" ref="audioPlayer" />
    <h2>Selecciona la opcion correcta</h2>
    <word-options :words="words" :correctWord="correctWord" @correct="handleCorrect" @incorrect="handleIncorrect" />
    <button v-if="intentos==5" @click="moveToNextWord()">Siguiente</button>
  </div>
</template>
  
<script>
import AudioPlayer from './AudioReproductor.vue';
import WordOptions from './PalabrasOpciones.vue';
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
    AudioPlayer,
    WordOptions,
    Instruccion
  },
  data() {
    return {
      visible:true,
      audioSrc: null,
      words: null,
      wordsAleatorias: null,
      correctas: 0,
      audioSrc: null,
      intentos:0,
      //audioSrc: require('@/assets/audio/sound.mp3'), // Ruta del archivo de audio
      wordsGeneral: require('@/assets/audio/palabras.json'),
      correctWord: 'null',
      currentIndex: 0,
      instruccion: {
        titulo: "Actividad Fonológica",
        instruccion: "Da clic en el reproductor de audio que tienes en el centro y selecciona la silaba que escuchaste en el audio de las opciones que tienes abajo. "
      }
    };
  },
  mounted() {
    const indicesAleatorios = new Set();

    while (indicesAleatorios.size < 5) {
      const indiceAleatorio = Math.floor(Math.random() * this.wordsGeneral.palabras.length);
      indicesAleatorios.add(indiceAleatorio);

    }

    const palabrasAleatorias = Array.from(indicesAleatorios).map(indice => this.wordsGeneral.palabras[indice]);
    this.wordsAleatorias = palabrasAleatorias
    this.words = palabrasAleatorias.at(0).Opciones.split(",")
    this.audioSrc = require('@/assets/audio/' + palabrasAleatorias.at(0).Palabra + '.ogg')
    this.correctWord = palabrasAleatorias.at(0).Respuesta
  },
  watch: {
    intentos: function (newValue, oldValue) {
      

      if (newValue == 5) {
        this.disableButtonsWithId();
      }
      
    },
    

  },
  methods: {
    enableButtonsWithId() {
      // Obtener todos los elementos con un ID que comienza con 'boton'
      const buttons = document.querySelectorAll('[id^="btn-opt"]');

      // Deshabilitar los botones encontrados
      buttons.forEach(button => {
        button.disabled = false;
      });
    },
    disableButtonsWithId() {
      // Obtener todos los elementos con un ID que comienza con 'boton'
      const buttons = document.querySelectorAll('[id^="btn-opt"]');

      // Deshabilitar los botones encontrados
      buttons.forEach(button => {
        button.disabled = true;
      });
    },
    
    handleCorrect() {
      this.showToast()
      this.intentos=5
      //this.moveToNextWord();
      this.correctas++

    },
    handleIncorrect() {
      this.showToastBad()
      
      //this.moveToNextWord();
      this.intentos++;

    },
    moveToNextWord() {
      this.intentos=0
      this.enableButtonsWithId();
      if (this.currentIndex < 4) {
        this.currentIndex++;
        this.words = this.wordsAleatorias.at(this.currentIndex).Opciones.split(",");
        this.audioSrc = require('@/assets/audio/' + this.wordsAleatorias.at(this.currentIndex).Palabra + '.ogg')

        this.correctWord = this.wordsAleatorias.at(this.currentIndex).Respuesta;
      } else {


        const data = {
          audio: this.correctas * 10
        };
        const jsonData = JSON.stringify(data);
        localStorage.setItem('informeAudio', jsonData);
        this.$router.push('/segmentacion')
      }
    },
  }
};
</script>
<style scoped>
div {
  padding: 50px;
}

.contenedor {

  background-image: url("../../assets/fondos/Fondo_Audio.jpg");
  min-height: 100vh;
  background-size: 100% 100%;
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
  