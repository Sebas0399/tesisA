<template>
  <div class="contenedor">
    <div class="tablero">
      <h1>Juego del ahorcado</h1>
      <h2>Intentos Restantes: {{ this.intentos }}</h2>
      <button @click="disableAll"> Desabilitar</button>
      <div class="palabra">
        <span v-for="(letra, indice) in palabraOculta" :key="indice"> {{ letra }} </span>
      </div>

      <div class="grilla">

        <!-- Teclado virtual -->
        <div class="teclado">
          <button :id="letra" v-for="letra in alfabeto" :key="letra" @click="obtenerLetra(letra)">
            {{ letra }}
          </button>
        </div>
        <div>
          <img :src="imagenActual" alt="">
        </div>
      </div>
    </div>
  </div>
  <div class="fin" v-if="fin">
    <router-link to="/memoria">

      <button>
        Siguiente
      </button>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      aciertos: 0,
      imagenActual: "assets/flor/est1.png",
      palabra: null, // La palabra actual
      intentos: 5,
      alfabeto: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
      letraSeleccionada: "",
      numParticulas: 10,
      errores: 0,
      fin: false,
      palabraOculta: [] // Agregamos palabraOculta como propiedad de datos
    };
  },
  created() {
    this.cargarPalabras();
   
  },
 

  methods: {
    cargarPalabras() {
      axios.get('/assets/ahorcado/palabras.json') // Ruta relativa a la carpeta public
        .then(response => {
          const palabras = response.data.palabras;
          this.palabra = this.obtenerPalabraAleatoria(palabras);
          this.palabraOculta = Array(this.palabra.length).fill("_");
        })
        .catch(error => {
          console.error('Error cargando las palabras:', error);
        });
    },
    obtenerPalabraAleatoria(palabras) {
      const indiceAleatorio = Math.floor(Math.random() * palabras.length);
      return palabras[indiceAleatorio];
    },
    obtenerLetra(letra) {

      if (this.palabra.includes(letra)) {
        this.palabra.split("").forEach((elemento, i) => {
          if (elemento === letra) {
            document.getElementById(letra).style.backgroundColor = 'green'
            document.getElementById(letra).style.color = 'white'
            document.getElementById(letra).disabled = true

            this.palabraOculta[i] = letra
            this.aciertos++;
          }

        });
      }
      else {
        document.getElementById(letra).style.backgroundColor = 'red'
        document.getElementById(letra).style.color = 'white'
        document.getElementById(letra).disabled = true
        this.errores++;
        this.intentos--;
      }
      if (!this.palabraOculta.includes("_")) {
        //window.alert("¡Ganaste! :D")
        this.fin = true
        this.disableAll()
        this.imagenActual = "assets/flor/est5.png"
        return
      }

      if (this.intentos === 0) {
       // window.alert("¡Perdiste! :c")
        this.disableAll()
        return
      }
      switch (this.aciertos) {

        case 1:
          this.imagenActual = "assets/flor/est2.png"

          break; case 2:
          this.imagenActual = "assets/flor/est3.png"

          break; case 3:
          this.imagenActual = "assets/flor/est4.png"
          break; case this.palabra.length:
          this.imagenActual = "assets/flor/est5.png"
          
          break;

        default:
          break;
      }
    },
    disableAll(){
      document.getElementById("A").disabled=true
      for (let index = 0; index < this.alfabeto.length; index++) {
        const element =  this.alfabeto[index];
        document.getElementById(element).disabled=true
      }
     // document.getElementById()

    }
  }
};
</script>

<style scoped>
.grilla {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.contenedor {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Estilos para el teclado */
.teclado {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  margin-top: 10px;
  width: 600px;
}

.teclado button {
  padding: 10px;
  font-size: 16px;
  margin: 10px;
  width: 40%;
  border-radius: 10px;
  height: 70%;
}

.teclado button:hover {

  background-color: aqua;
}
.teclado button:disabled{
  background-color: grey;
}

.correct-guess {
  background-color: green;
  color: white;
}

.wrong-guess {
  background-color: red;
  color: white;
}

span {
  font-size: 50px;
  margin: 10px;
}

.victoria {
  position: relative;
  height: 300px;
  /* Ajusta la altura según tus necesidades */
}

.particula {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: red;
  /* Color de las partículas */
  border-radius: 50%;
  opacity: 0;
  animation: subir 1s infinite;
}

@keyframes subir {
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    transform: translateY(-200px);
    /* Altura a la que suben las partículas */
    opacity: 0;
  }
}

/* Ajusta la posición de cada partícula según sea necesario */
.particula:nth-child(1) {
  left: 50%;
  transform: translateX(-50%);
  animation-delay: 0.4s;
}

.particula:nth-child(2) {
  left: 30%;
  animation-delay: 0.6s;
}

.particula:nth-child(3) {
  left: 70%;
  animation-delay: 0.6s;
}

img {
  width: 300px;
}
</style>
