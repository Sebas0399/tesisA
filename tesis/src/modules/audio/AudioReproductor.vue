<template>
    <audio controls ref="audio" :src="audioSrc" autoplay></audio>
  </template>
  
  <script>
  export default {
    props: {
      audioSrc: String
    },
    methods: {
      playAudio() {
        this.$refs.audio.play();
      }
    }
  }
  </script>
  <style scoped>
  audio{
    margin: 20px;
  }
</style>
  