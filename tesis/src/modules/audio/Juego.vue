<template>
  <div>
    <Knob v-model="correctas" :min="0" :max="5" />
    <h1>Reproduce el audio</h1>
    <audio-player :audioSrc="audioSrc" ref="audioPlayer" />
    <h2>Selecciona la opcion correcta</h2>
    <word-options :words="words" :correctWord="correctWord" @correct="handleCorrect" @incorrect="handleIncorrect" />
  </div>
</template>
  
<script>
import AudioPlayer from './AudioReproductor.vue';
import WordOptions from './PalabrasOpciones.vue';

export default {
  components: {
    AudioPlayer,
    WordOptions
  },
  data() {
    return {
      audioSrc: null,
      words: null,
      wordsAleatorias: null,
      correctas: 0,
      audioSrc: null,

      //audioSrc: require('@/assets/audio/sound.mp3'), // Ruta del archivo de audio
      wordsGeneral: require('@/assets/audio/palabras.json'),
      correctWord: 'null',
      currentIndex: 0,

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
  methods: {
    handleCorrect() {
      alert('¡Correcto!');
      this.moveToNextWord();
      this.correctas++

    },
    handleIncorrect() {
      alert('Incorrecto. Intenta de nuevo.');
      this.moveToNextWord();

    },
    moveToNextWord() {
      if (this.currentIndex < 4) {
        this.currentIndex++;
        this.words = this.wordsAleatorias.at(this.currentIndex).Opciones.split(",");
        this.audioSrc = require('@/assets/audio/' + this.wordsAleatorias.at(this.currentIndex).Palabra + '.ogg')

        this.correctWord = this.wordsAleatorias.at(this.currentIndex).Respuesta;
      } else {
        alert('¡Has completado todas las palabras!');


        const data = {
          audio: this.correctas * 10
        };
        const jsonData = JSON.stringify(data);
        localStorage.setItem('informeAudio', jsonData);
        window.alert(this.correctas)
        this.$router.push('/segmentacion')
      }
    },
  }
};
</script>
<style scoped>
div{
  padding: 20px;
}

</style>
  