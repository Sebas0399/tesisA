<template>
    <div>
      <audio-player :audioSrc="audioSrc" ref="audioPlayer" />
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
        audioSrc: require('@/assets/audio/sound.mp3'), // Ruta del archivo de audio
        words: ['Palabra1', 'Palabra2', 'Palabra3'], // Lista de palabras
        correctWord: 'Palabra1' // Palabra correcta
      };
    },
    methods: {
      handleCorrect() {
        alert('¡Correcto!');
      },
      handleIncorrect() {
        alert('Incorrecto. Intenta de nuevo.');
      }
    }
  };
  </script>
  