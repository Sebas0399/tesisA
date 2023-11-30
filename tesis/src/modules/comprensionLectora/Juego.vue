<template>
    <Dialog v-model:visible="visible" :pt="{
        mask: {
            style: 'backdrop-filter: blur(2px)'
        }
    }" modal header="Instrucciones" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="contenedor-dialgo">
            <h1>{{ instruccion.titulo }}</h1>
            <h2><strong>Parte 1:</strong>{{ instruccion.instruccion[0] }}</h2>
            <h2><strong>Parte 2:</strong>{{ instruccion.instruccion[1] }}</h2>
            <button @click="visible = false">Empezar</button>

        </div>
    </Dialog>
    <div class="contenedor2" v-if="esLectura">

        <div class="row justify-content-center">
            <div class="col ">

                <div v-for="(oracion, index) in oraciones" :key="oracion">
                    <table class="table">
                        <thead>
                            <th>
                                <h4>Oración {{ index }}:</h4>
                            </th>
                        </thead>
                        <tbody>
                            <tr>

                            </tr>
                        </tbody>
                        <div class="form-check " v-for="(opcion, indexOpt) in oracion.opciones" :key="opcion">
                            <input class="form-check-input" type="radio" :name="oracion.oracion" :id='opcion + pregunta'
                                @click="guardarRespuesta(index, indexOpt)">
                            <label class="form-check-label " :for="opcion + pregunta">
                                {{ opcion }}
                            </label>
                        </div>
                    </table>
                </div>

            </div>
            <div>
                <Button @click="siguienteLectura">Siguiente</Button>

            </div>
        </div>


    </div>
    <div class="contenedor
                                                                     text-center" v-else>

        <div class="row">


            <div class="row ">
                <div class="col">
                    <img :src=imagen alt="">
                </div>
                <div class=" col ">
                    <p class="lecturaF">{{ lectura }}</p>
                    <div v-for="(pregunta, index) in preguntas" :key="pregunta">
                        <table class="table">
                            <thead>
                                <th>{{ pregunta }}</th>
                            </thead>
                            <tbody class="form-check  " v-for="(opcion, indexOpt) in opciones[index]" :key="opcion">
                                <td>

                                    <input class="form-check-input" type="radio" :name="pregunta" :id="opcion + pregunta"
                                        @click="guardarRespuesta(index, indexOpt)">

                                </td>
                                <td>
                                    <label class="form-check-label " :for="opcion + pregunta">
                                        {{ opcion }}
                                    </label>
                                </td>
                            </tbody>

                        </table>

                    </div>
                </div>


            </div>
            <div class="row justify-content-center">
                <Button @click="siguienteLectura">Siguiente</Button>
            </div>
        </div>

    </div>
</template>
<script>
import listalecturas from "@/assets/comprensionLectora/lecturas/lecturas.json";
import Instruccion from "@/components/Instruccion.vue"

export default {
    components: {
        Instruccion,
    },
    data() {
        return {
            visible: true,

            esLectura: false,
            lectura: null,
            preguntas: null,
            opciones: null,
            imagen: null,
            respuestas: null,
            respuestasSeleccionada: new Map(),
            indexLectura: 0,
            oraciones: null,
            oracionesRespuestas: [],
            puntuacion: 0,
            instruccion: {
                titulo: "Actividad Comprensión Lectora ",
                instruccion: ["Lee la lectura de forma pausada. Una vez leída responde las preguntas que corresponden a cada lectura. Solo puedes escoger una respuesta por pregunta. ", "En cada recuadro tienes varias oraciones. Selecciona la oración que este bien escrita de entre las opciones que dan en el recuadro solo puedes elegir una."]

            }
        };
    },
    mounted() {
        this.cargarLecturas();

    },
    methods: {
        guardarRespuesta(index, indexOpt) {
            this.respuestasSeleccionada.set(index, indexOpt)
        },
        cargarLecturas() {
            this.oraciones = listalecturas.oraciones
            for (let index = 0; index < this.oraciones.length; index++) {
                const element = this.oraciones[index].respuesta;
                this.oracionesRespuestas.push(element)
            }
            console.log(this.oracionesRespuestas)

            this.lectura = listalecturas.lecturas[this.indexLectura].lectura
            this.preguntas = listalecturas.lecturas[this.indexLectura].preguntas
            this.opciones = listalecturas.lecturas[this.indexLectura].opciones
            this.respuestas = listalecturas.lecturas[this.indexLectura].respuestas
            this.imagen = require('@/assets/comprensionLectora/imagenes/Lectura' + this.indexLectura + '.jpg')
        },
        siguienteLectura() {

            this.comprobar()
            this.respuestasSeleccionada = new Map();
            this.indexLectura++;
            console.log(this.indexLectura)
            if (this.indexLectura == 4) {
                this.esLectura = true
                this.fondoImagen = "../../assets/fondos/Fondo_lectura_2.jpg"
                this.imagen = require('@/assets/comprensionLectora/imagenes/Lectura' + this.indexLectura + '.jpg')

            }
            else if (this.indexLectura > 4) {
                const data = {
                    comprension: this.puntuacion
                };
                const jsonData = JSON.stringify(data);
                localStorage.setItem('informeComprension', jsonData);

                this.$router.push('/informe')


            }
            else {
                this.lectura = listalecturas.lecturas[this.indexLectura].lectura
                this.preguntas = listalecturas.lecturas[this.indexLectura].preguntas
                this.opciones = listalecturas.lecturas[this.indexLectura].opciones
                this.respuestas = listalecturas.lecturas[this.indexLectura].respuestas

                this.imagen = require('@/assets/comprensionLectora/imagenes/Lectura' + this.indexLectura + '.jpg')
            }

        },
        comprobar() {
            if (this.esLectura) {
                for (const [key, value] of this.respuestasSeleccionada) {

                    if (this.oracionesRespuestas[key] == value) {
                        console.log("correcta")
                        this.puntuacion = this.puntuacion + 2.5
                    }
                    else {
                        console.log("incorrecta")
                    }
                }
            }
            else {
                for (const [key, value] of this.respuestasSeleccionada) {

                    if (this.respuestas[key] == value) {
                        console.log("correcta")
                        this.puntuacion = this.puntuacion + 2.5

                    }
                    else {
                        console.log("incorrecta")
                    }
                }
            }


        }
    }
}

</script>
<style scoped>
p {
    font-size: 20px;

    /* Top shadow */
    color: black;
}

img {
    margin-top: 20vh;
    width: 75%;
}

table {
    border: 2px solid blue;
    margin: 20px;
    background-color: transparent;
    background-color: white;
    max-width: 500px;

}

th {
    font-size: 20px;
    border: 2px solid blue;


    color: black;
    font-style: italic;

}


.form-check-label {
    background-color: transparent;
    text-shadow:
        1px 0px 0px white,
        /* Right shadow */
        -1px 0px 0px white,
        /* Left shadow */
        0px 1px 0px white,
        /* Bottom shadow */
        0px -1px 0px white;
    /* Top shadow */
    color: black;
}

input[type=radio] {
    appearance: none;
    padding: 10px;
    background-color: rgba(96, 53, 153, 0.993);
    border-radius: 50%;
}

input[type=radio]:checked {
    background-color: orange;
}

.contenedor {
    background-image: url("../../assets/fondos/Fondo_lectura_1.jpg");
    background-size: 100% 100%;


}

.contenedor2 {
    background-image: url("../../assets/fondos/Fondo_Lecturas_2.jpg");
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding-top: 100px;

}

.contenedor2 table {
    margin-top: 50px;
    margin-left: 100px;
}

Button {
    width: 100px;

}

.lecturaF {
    background-color: white;
    border: 2px solid blue;
    margin: 10px;
    padding: 10px;
}
.contenedor-dialgo{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.contenedor-dialgo button {
  background-color: #69f3b7;
  padding: 10px;
  border-radius: 10px;
}

.contenedor-dialgo button:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
</style> 