<template>
  <div>
    <div class="ejercicio">
      <h1>{{ palabraActual }}</h1>
      <input v-if="indiceActivo !== null" :key="indiceActivo" class="entrada-palabra" ref="wordRef"
        v-model="palabraComparar" />
    </div>
    <button v-if="empezar" @click="comenzarEjercicio">Empezar</button>
    <button v-if="jugar" @click="siguientePalabra">Siguiente</button>
    <button v-if="fin" @click="siguientePagina">Siguiente</button>

  </div>
</template>
  
<script>
import palabrasJson from "@/assets/segmentacion/palabras.json";

export default {
  data() {
    return {
      palabras: [],
      estaSegmentada: [],
      indiceActivo: null,
      palabraActual: "",
      aciertos: [],
      empezar: true,
      jugar: false,
      fin: false
    };
  },
  methods: {
    siguientePagina() {
      const data = {
        segmentacion: this.aciertos.length * 10
      };
      const jsonData = JSON.stringify(data);
      localStorage.setItem('informeSegmentacion', jsonData);

      this.$router.push('/comprension')

    },
    comenzarEjercicio() {
      this.empezar = false
      this.jugar = true
      this.indiceActivo = 0;
      this.estaSegmentada = new Array(this.palabras.length).fill(false);
      this.palabraActual = this.palabras[0];
      this.aciertos = [];
    },
    siguientePalabra() {
      this.compararPalabras()
      if (this.indiceActivo < this.palabras.length - 1) {
        this.indiceActivo++;
        this.palabraActual = this.palabras[this.indiceActivo];
      } else {
        this.jugar = false
        this.empezar = false
        this.fin = true

      }
    },
    compararPalabras() {
      const palabrasOriginales = palabrasJson.palabras.map((p) => p.original);
      const palabrasSegmentadas = palabrasJson.palabras.map((p) => p.segmentada);

      const entradaUsuario = this.palabraActual;
      const segmentacionCorrecta = palabrasSegmentadas[this.indiceActivo];

      if (entradaUsuario === segmentacionCorrecta) {
        this.aciertos.push(palabrasOriginales[this.indiceActivo]);
      }
    },
  },
  created() {
    const shuffledPalabras = palabrasJson.palabras.sort(() => Math.random() - 0.5);
    this.palabras = shuffledPalabras.slice(0, 5).map((p) => p.original);
  }
};
</script>

<style scoped>
.ejercicio {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.entrada-palabra {
  font-size:30px;
  margin: auto;
  text-align: center;
  width: 80%;
  padding: 10px;
}

button {
  margin: 10px;
  border-radius: 5px;
  font-size: 20px;

}

button:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
}

h2 {
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
}
</style>
  