<template>
  <div id="app">
    <h1>Juego de memoria</h1>
    <div class="board">
      <div v-for="(pair, index) in pairs" :key="index" class="pair">
        <div class="card">
          <div class="image" :class="{ open: pair.imageOpen }" @click="flipCard(pair, 'image')">
            <img :src="pair.image" />
          </div>
          <div class="word" :class="{ open: pair.wordOpen }" @click="flipCard(pair, 'word')">
            {{ pair.word }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pairs: [
        {
          image: "assets/images/apple.png",
          word: "manzana",
          imageOpen: false,
          wordOpen: false
        },
        {
          image: "assets/images/banana.png",
          word: "plátano",
          imageOpen: false,
          wordOpen: false
        }
      ],
    };
  },
  methods: {
    flipCard(pair, type) {
      pair[type + 'Open'] = !pair[type + 'Open'];
    },
  },
};
</script>

<style>
img {
  width: 100px;
}

.board {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.pair {
  width: 100px;
  height: 100px;
  border: 1px solid black;
  margin: 10px;
}

.card {
  width: 100%;
  height: 100%;
}

.image,
.word {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  background-color: #f0f0f0;
}

.word {
  background-color: #e0e0e0;
}

.open {
  background-color: #bbb;
}
</style>
