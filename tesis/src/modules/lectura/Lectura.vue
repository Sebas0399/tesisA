<template>
  <div>
    <div v-if="oracionActual">
      <p>
        <span v-for="(palabra, indice) in oracionActual.palabras" :key="indice"
          :class="{ 'palabra-incorrecta': indice === indicePalabraIncorrecta }"
          @click="seleccionarPalabraIncorrecta(indice)">
          {{ palabra }}&nbsp;
        </span>
      </p>
      <button @click="verificarRespuesta">Verificar</button>
    </div>
    <div v-else>
      <p>¡Juego completado!</p>
      <p>Puntuación final: {{ puntuacion }} / 5</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oraciones: [],
      indiceOracionActual: 0,
      indicePalabraIncorrecta: null,
      puntuacion: 0,
      oracionesSeleccionadas: [],
      oracionesTotales: 5 // Cambiar a 5 para seleccionar 5 oraciones aleatorias
    };
  },
  computed: {
    oracionActual() {
      return this.oracionesSeleccionadas[this.indiceOracionActual];
    }
  },
  methods: {
    seleccionarPalabraIncorrecta(indice) {
      this.indicePalabraIncorrecta = indice;
    },
    verificarRespuesta() {
      console.log(this.indicePalabraIncorrecta, this.oracionActual.indiceIncorrecto)
      if (this.indicePalabraIncorrecta !== null) {
        if (this.indicePalabraIncorrecta === this.oracionActual.indiceIncorrecto) {
          this.puntuacion++;
        }
      }

      if (this.indiceOracionActual < this.oracionesTotales - 1) {
        this.indiceOracionActual++;
        this.indicePalabraIncorrecta = null;
      } else {
        this.indiceOracionActual = null;
      }
    },
    cargarOraciones() {
      fetch('assets/lectura/oraciones.json')
        .then(respuesta => respuesta.json())
        .then(data => {
          this.oraciones = data.map(oracion => {
            const palabras = oracion.texto.split(' ');
            return { ...oracion, palabras };
          });

          this.seleccionarOracionesAleatorias();
        });
    },
    seleccionarOracionesAleatorias() {
      const oracionesAleatorias = [];
      for (let i = 0; i < this.oracionesTotales; i++) {
        const indiceAleatorio = Math.floor(Math.random() * this.oraciones.length);
        oracionesAleatorias.push(this.oraciones[indiceAleatorio]);
        this.oraciones.splice(indiceAleatorio, 1);
      }
      this.oracionesSeleccionadas = oracionesAleatorias;
    }
  },
  mounted() {
    this.cargarOraciones();
  }
};
</script>

<style scoped>
.palabra-incorrecta {
  color: red;
  cursor: pointer;
  font-style: bold;
  border: 2px solid black;
  border-radius: 5px;
  background-color: blue;
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
span{
  font-size: 30px;
}
</style>
