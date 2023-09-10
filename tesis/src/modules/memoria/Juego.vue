<template>
    <div class="game-board flip-container">
        <WordCard v-for="(word, index) in words" :key="index" :word="word" :isMatched="isWordMatched(index)"
            :isFlipped="isWordFlipped(index)" @flip-card="handleFlipCard(index, word, 'word')" />
        <ImageCard v-for="(image, index) in images" :key="index" :image="image" :isMatched="isImageMatched(index)"
            :isFlipped="isImageFlipped(index)" @flip-card="handleFlipCard(index, image, 'image')" />
        <div class="score">Score: {{ score }}</div>
    </div>
</template>
  
<script>
import WordCard from './CartaPalabra.vue';
import ImageCard from './CartaImagen.vue';

export default {
    components: {
        WordCard,
        ImageCard
    },
    data() {
        return {
            words: ['apple', 'banana', 'Pájaro', 'Pez'],
            images: [
                'assets/images/apple.png',
                'assets/images/apple.png',
                'assets/images/banana.png',
                'assets/images/apple.png'
            ],
            flippedCards: [],
            score: 0
        };
    },
    methods: {
        handleFlipCard(index, content, type) {
            if (this.flippedCards.length < 2) {
                this.flippedCards.push({ index, content, type });

                if (this.flippedCards.length === 2) {
                    this.checkMatch();
                }
            }
        },
        checkMatch() {
            const [card1, card2] = this.flippedCards;

            if (this.cast(card1.content) !== this.cast(card2.content)) {
                setTimeout(() => {
                    this.resetFlippedCards();
                }, 1000);
            } else {
                this.score += 1;
                setTimeout(() => {
                    this.resetFlippedCards();
                }, 1000);
            }
        },
        cast(palabra) {
            if (palabra.includes("/")) {
                return palabra.split("/")[2].replace(/\.[^/.]+$/, "")
            }
            else{
                return palabra
            }
        },
        resetFlippedCards() {
            this.flippedCards = [];
        },
        isWordMatched(index) {
            return this.flippedCards.some(
                card => card.content === this.words[index] && card.type === 'word'
            );
        },
        isImageMatched(index) {
            return this.flippedCards.some(
                card => card.content === this.images[index] && card.type === 'image'
            );
        },
        isWordFlipped(index) {
            return this.flippedCards.some(
                card =>
                    card.index === index &&
                    card.content === this.words[index] &&
                    card.type === 'word'
            );
        },
        isImageFlipped(index) {
            return this.flippedCards.some(
                card =>
                    card.index === index &&
                    card.content === this.images[index] &&
                    card.type === 'image'
            );
        }
    }
};
</script>
  
<style scoped>
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
}

.card img {
    max-width: 100%;
    max-height: 100%;
}

.score {
    margin-top: 20px;
    font-size: 24px;
}
.flip-container {
  perspective: 1000px;
}

.flip-card {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flipped {
  transform: rotateY(180deg);
}
</style>
  