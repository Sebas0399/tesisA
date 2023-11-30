<template>
  <Toast position="bottom-center" group="tl" />

  <Toast position="bottom-center" group="bl" />
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
    <div class="ejercicio">
      <Knob v-if="indiceActivo !== null" v-model="aciertos.length" :max="5" :step="1" readonly valueColor="MediumTurquoise"
        rangeColor="SlateGray" />

      <h1>{{ palabraActual }}</h1>
      <img :src="require('@/assets/logos/LogoSegmentacion.png')">
      <img :src="require('@/assets/logos/FlechaAbajo.png')" class="flecha">
      <input :disabled="inputDeshabilitado" v-if="indiceActivo !== null" :key="indiceActivo" class="entrada-palabra"
        ref="wordRef" v-model="palabraComparar" placeholder="Escribe Aquí" />
    </div>
    <button v-if="jugar" @click="siguiente">Siguiente</button>
    <button v-else @click="siguientePagina">Siguiente</button>

  </div>
</template>
  
<script>
import palabrasJson from "@/assets/segmentacion/palabras.json";
import Instruccion from "@/components/Instruccion.vue"
import { useToast } from 'primevue/usetoast';


export default {
  setup() {
    const toast = useToast();

    // Create a ref to store the toast message

    // Function to show the toast
    const showToast = () => {
      toast.add({ severity: 'success', summary: 'Bien hecho!', group: 'tl', life: 2000 });
    };
    const showToastBad = (inte) => {
      if (inte == 0) {
        toast.add({ severity: 'error', summary: 'No tienes mas intentos', group: 'bl', life: 2000 });

      }
      else {
        toast.add({ severity: 'error', summary: 'Intenta de nuevo tienes: ' + inte + ' intentos', group: 'bl', life: 2000 });

      }
    };
    return {
      showToast, showToastBad
    }
  },
  components: {
    Instruccion
  },
  data() {
    return {
      visible: true,
      palabras: [],
      estaSegmentada: [],
      indiceActivo: 0,
      indiceActivoModel:1,
      palabraActual: "",
      palabraComparar: null,
      aciertos: [],
      jugar: true,
      fin: false,
      intento: 0,
      intentoOracion: 7,
      inputDeshabilitado: false,
      instruccion: {
        titulo: "Actividad Segmentación",
        instruccion: "Dentro del recuadro hay una oración unida. Separa las palabras y las silabas de la oración de forma adecuada con el símbolo / del teclado. "
      }
    };
  },
  mounted() {
    this.comenzarEjercicio()
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
      this.jugar = true
      this.indiceActivo = 0;
      this.estaSegmentada = new Array(this.palabras.length).fill(false);
      this.palabraActual = this.palabras[0];
      this.aciertos = [];
      console.log(this.palabras)
    },
    cambiarPalabra(){
      this.intentoOracion=7
      this.indiceActivo++
      this.indiceActivoModel++
      this.palabraActual = this.palabras[this.indiceActivo];
      this.palabraComparar = ""
    },
   
    siguiente() {
      if(this.intentoOracion==0 && this.indiceActivo==4){
        this.siguientePagina()
      }
      if(this.intentoOracion==0){
        this.cambiarPalabra()
      }
      
     
      
      if (this.compararPalabras()) {
        if(this.indiceActivo==4){
          this.showToast()
          this.jugar=false
        }
        else{
          this.showToast()
          this.cambiarPalabra()

        }
      }
      else {
        this.intentoOracion--
        this.showToastBad(this.intentoOracion)


      }

    },
    compararPalabras() {
      const palabrasOriginales = palabrasJson.palabras.map((p) => p.original);
      const palabrasSegmentadas = palabrasJson.palabras.map((p) => p.segmentada);

      const segmentacionCorrecta = palabrasSegmentadas[this.indiceActivo];
      console.log(this.palabraComparar,segmentacionCorrecta)
      if (this.palabraComparar === segmentacionCorrecta) {
        
        this.aciertos.push(palabrasOriginales[this.indiceActivo]);
        return true
      }
      else {
        return false
      }
    },

  },
  created() {
    const shuffledPalabras = palabrasJson.palabras.sort(() => Math.random() - 0.5);
    this.palabras = shuffledPalabras.slice(0, 5).map((p) => p.original);
  },
  watch: {
    intentoOracion: function (newValue, oldValue) {

      console.log(newValue)
      if (newValue == 0) {
        this.inputDeshabilitado = !this.inputDeshabilitado;
      }
      else {
        this.inputDeshabilitado = false
      }

    },
   



  },
};
</script>

<style scoped>
h1 {

  color: black;
  margin: 20px;
  background-color: white;
  border: solid black 1px;
  border-radius: 5px;
}

.ejercicio {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.entrada-palabra {
  font-size: 30px;
  margin: auto;
  text-align: center;
  width: 80%;
  padding: 10px;
  margin: 20px;
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

.contenedor {
  background-image: url("../../assets/fondos/Fondo_Segmentacion.jpg");
  background-position: center;
  /* Center the image */
  background-repeat: no-repeat;
  min-height: 100vh;
  /* Do not repeat the image */
  background-size: 100% 100%;

}

.btn-centrar {
  display: flex;
  justify-content: center;
  align-self: center;
}

.btn-centrar button {
  background-color: #69f3b7;
  padding: 10px;
  border-radius: 10px;
}

.btn-centrar button:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);

}
img{
  width: 40vh;
}
.flecha{
  width: 10vh;
  animation-duration: 3s;
  animation-name: bounce;
  animation-iteration-count: infinite; /* Agrega esta línea */
}
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 
   40% {transform: translateY(-20px);} 
   60% {transform: translateY(-15px);} 
}
</style>
  