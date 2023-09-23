<template>
    <div class="game-board ">
      <WordCard
        v-for="(word, index) in words"
        :key="index"
        :word="word.content"
        :isMatched="word.isMatched"
        :isFlipped="isWordFlipped(index)"
        @flip-card="handleFlipCard(index, word, 'word')"
      />
      <ImageCard
        v-for="(image, index) in images"
        :key="index"
        :image="image.content"
        :isMatched="image.isMatched"
        :isFlipped="isImageFlipped(index)"
        @flip-card="handleFlipCard(index, image, 'image')"
      />
      <div class="score">Score: {{ score }}</div>
    </div>
  </template>
  
  <script>
  import WordCard from './CartaPalabra.vue';
  import ImageCard from './CartaImagen.vue';
  
  export default {
    components: {
      WordCard,
      ImageCard,
    },
    data() {
      return {
        words: [
          { content: 'apple', isMatched: false },
          { content: 'banana', isMatched: false },
          { content: 'Pájaro', isMatched: false },
          { content: 'Pez', isMatched: false },
        ],
        images: [
          { content: 'assets/images/apple.png', isMatched: false },
          { content: 'assets/images/apple.png', isMatched: false },
          { content: 'assets/images/banana.png', isMatched: false },
          { content: 'assets/images/apple.png', isMatched: false },
        ],
        flippedCards: [],
        score: 0,
      };
    },
    created() {
      this.shuffleArrays();
    },
    methods: {
      shuffleArrays() {
        this.words = this.shuffleArray(this.words);
        this.images = this.shuffleArray(this.images);
      },
      shuffleArray(array) {
        let currentIndex = array.length,
          temporaryValue,
          randomIndex;
  
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
  
        return array;
      },
      handleFlipCard(index, content, type) {
      if (this.flippedCards.length < 2 && !content.isMatched) {
        content.isFlipped = true; // Voltear la carta
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
          card1.content.isFlipped = false; // Voltear la carta de regreso
          card2.content.isFlipped = false; // Voltear la carta de regreso
          this.flippedCards = [];
        }, 1000);
      } else {
        this.score += 1;
        card1.content.isMatched = true; // Marcar la carta como emparejada
        card2.content.isMatched = true; // Marcar la carta como emparejada
        this.flippedCards = [];
      }
    },

      cast(palabra) {
        if (palabra.includes('/')) {
          return palabra.split('/')[2].replace(/\.[^/.]+$/, '');
        } else {
          return palabra;
        }
      },
      resetFlippedCards() {
        this.flippedCards.forEach(card => {
          card.content.isFlipped = false;
        });
        this.flippedCards = [];
      },
      isWordMatched(index) {
        return (
          this.flippedCards.some(
            card => card.content.content === this.words[index].content && card.type === 'word'
          ) || this.words[index].isMatched
        );
      },
      isImageMatched(index) {
        return (
          this.flippedCards.some(
            card => card.content.content === this.images[index].content && card.type === 'image'
          ) || this.images[index].isMatched
        );
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
      isImageFlipped(index) {
        return (
          this.flippedCards.some(
            card =>
              card.index === index &&
              card.content.content === this.images[index].content &&
              card.type === 'image'
          )
        );
      },
    },
  };
  </script>
  
  <style scoped>
  .card.matched {
    border: 2px solid green;
  }
  
  .game-board {
    display: flex;
    flex-wrap: wrap;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .card {
    width: 100px;
    height: 150px;
    border: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 10px;
    margin: 10px;
  }
  
  .card img {
    max-width: 100%;
    max-height: 100%;
  }
  
  .score {
    margin-top: 20px;
    font-size: 24px;
  }
  </style>
  