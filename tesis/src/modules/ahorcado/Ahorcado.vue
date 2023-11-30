<template>
 
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
    <div class="tablero">
      <h1>Juego del ahorcado</h1>
      <h2>Intentos Restantes: </h2>
      <Knob v-model="intentosTotales" :max="7" :step="-1" readonly valueColor="MediumTurquoise" rangeColor="SlateGray" />

      <div class="palabra">
        <span v-for="(letra, indice) in palabraOculta" :key="indice">{{ letra }}</span>
      </div>

      <div class="grilla">
        <!-- Teclado virtual -->
        <div class="teclado">
          <button :id="letra" v-for="letra in alfabeto" :key="letra" @click="obtenerLetra(letra)"
            :disabled="tecladoDeshabilitado">
            {{ letra }}
          </button>
        </div>
        <div>
          <img :src="imagenActual" alt="">
        </div>
      </div>
    </div>
    <div class="fin" v-if="fin">
      <button @click="siguientePalabra" class="siguiente">Siguiente</button>
    </div>
  </div>
</template>

<script>
import palabrasRaw from "@/assets/ahorcado/palabras.json"
import Instruccion from "@/components/Instruccion.vue"

export default {
  components: {
    Instruccion,
  },
  data() {
    return {
      visible: false,
      aciertos: 0,
      imagenActual: "assets/flor/est1.png",
      palabra: null,
      intentosTotales: 7,
      alfabeto: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
      letraSeleccionada: "",
      numParticulas: 10,
      errores: 0,
      fin: false,
      palabraOculta: [],
      palabrasAdivinar: [],
      palabraActualIndex: 0,
      tecladoDeshabilitado: false,
      contadorCorrecto: 0,
      instruccion: {
        titulo: "Actividad del Ahorcado",
        instruccion: "Selecciona las letras correctas para formar una palabra. Cada letra que selecciones mal forma la imagen de una flor. Trata de formar la flor."
      }
    };
  },
  mounted() {
    this.visible = true

  },
  created() {
    this.cargarPalabras();
  },
  methods: {
    obtenerPalabrasAleatorias(cantidad, palabras) {
      const palabrasAleatorias = [];
      for (let i = 0; i < cantidad; i++) {
        const indiceAleatorio = Math.floor(Math.random() * palabras.length);
        console.log(palabras[indiceAleatorio])
        palabrasAleatorias.push(palabras[indiceAleatorio]);
      }
      return palabrasAleatorias;
    },
    cargarPalabras() {


      const palabras = palabrasRaw.palabras;

      this.palabrasAdivinar = this.obtenerPalabrasAleatorias(5, palabras);
      this.palabra = this.palabrasAdivinar[this.palabraActualIndex];
      this.palabraOculta = Array(this.palabra.length).fill("_");
      console.log(this.palabrasAdivinar)


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
        this.intentosTotales--;
        if (this.intentosTotales === 0) {
          this.disableAll();
          this.fin = true
          //this.siguientePalabra();
        }
      }
      if (!this.palabraOculta.includes("_")) {
        this.fin = true
        this.disableAll()
        this.imagenActual = "assets/flor/est5.png"
        this.contadorCorrecto++
        return
      }
      switch (this.aciertos) {
        case 1:
          this.imagenActual = "assets/flor/est2.png"
          break;
        case 2:
          this.imagenActual = "assets/flor/est3.png"
          break;
        case 3:
          this.imagenActual = "assets/flor/est4.png"
          break;
        case this.palabra.length:
          this.imagenActual = "assets/flor/est5.png"
          break;
        default:
          break;
      }
    },
    disableAll() {
      document.getElementById("A").disabled = true
      for (let index = 0; index < this.alfabeto.length; index++) {
        const element = this.alfabeto[index];
        document.getElementById(element).disabled = true
      }
      this.tecladoDeshabilitado = true;
    },
    siguientePalabra() {
      this.palabraActualIndex++;
      if (this.palabraActualIndex < this.palabrasAdivinar.length) {
        this.palabra = this.palabrasAdivinar[this.palabraActualIndex];
        this.palabraOculta = Array(this.palabra.length).fill("_");
        this.intentosTotales = 7;
        this.aciertos = 0;
        this.errores = 0;
        this.fin = false;
        this.imagenActual = "assets/flor/est1.png";
        this.enableAll();
        this.resetTeclado();
        this.tecladoDeshabilitado = false;
      } else {

        const data = {
          ahorcado: this.contadorCorrecto * 10
        };
        const jsonData = JSON.stringify(data);
        localStorage.setItem('informeAhorcado', jsonData);
        
        this.$router.push('/memoria')

      }
    },
    enableAll() {
      for (let index = 0; index < this.alfabeto.length; index++) {
        const element = this.alfabeto[index];
        document.getElementById(element).disabled = false;
      }
    },
    resetTeclado() {
      for (let index = 0; index < this.alfabeto.length; index++) {
        const element = this.alfabeto[index];
        document.getElementById(element).style.backgroundColor = "white";
        document.getElementById(element).style.color = "black";
      }
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
  flex-direction: column;
  background-image: url("../../assets/fondos/Fondo_Ahorcado.jpg");
  background-size: 100% 100%;

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

.teclado button:disabled {
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





img {
  width: 300px;
}

.siguiente {

  margin: 10px;
  border-radius: 5px;
  font-size: 20px;

}

.siguiente:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
}

.fin {
  margin-top: auto;
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
