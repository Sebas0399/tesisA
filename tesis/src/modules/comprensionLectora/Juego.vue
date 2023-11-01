<template>
    <div class="container text-center">
        <div class="row">
            <div class="col">
                <img :src=imagen alt="" class="img-fluid">
            </div>
            <div v-if="esLectura" class="col">
                <div v-for="(oracion, index) in oraciones" :key="oracion">
                    <h4>{{ oracion.oracion }}</h4>
                    <div class="form-check  text-start" v-for="(opcion, indexOpt) in oracion.opciones" :key="opcion">
                        <input class="form-check-input" type="radio" :name="oracion.oracion"  :id='opcion+indexOpt' @click="guardarRespuesta(index, indexOpt)">
                        <label class="form-check-label " :for="opcion">
                            {{ opcion }}
                        </label>
                    </div>

                </div>
            </div>
            <div class="col" v-else>
                <p>{{ lectura }}</p>
                <div v-for="(pregunta, index) in preguntas" :key="pregunta">
                    <h4>{{ pregunta }}</h4>
                    <div class="form-check  text-start" v-for="(opcion, indexOpt) in opciones[index]" :key="opcion">
                        <input class="form-check-input" type="radio" :name="pregunta" :id="opcion"
                            @click="guardarRespuesta(index, indexOpt)">
                        <label class="form-check-label " :for="opcion">
                            {{ opcion }}
                        </label>
                    </div>

                </div>

            </div>

        </div>
        <Button @click="siguienteLectura">Siguiente</Button>
    </div>
</template>
<script>
import listalecturas from "@/assets/comprensionLectora/lecturas/lecturas.json";

export default {

    data() {
        return {
            //listalecturas: null,
            esLectura: true,
            lectura: null,
            preguntas: null,
            opciones: null,
            imagen: null,
            respuestas: null,
            respuestasSeleccionada: new Map(),
            indexLectura: 0,
            oraciones: null
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
            this.lectura = listalecturas.lecturas[this.indexLectura].lectura
            this.preguntas = listalecturas.lecturas[this.indexLectura].preguntas
            this.opciones = listalecturas.lecturas[this.indexLectura].opciones
            this.respuestas = listalecturas.lecturas[this.indexLectura].respuestas
            this.imagen = require('@/assets/comprensionLectora/imagenes/Lectura' + this.indexLectura + '.jpg')
        },
        siguienteLectura() {
            
            this.comprobar()
            this.respuestasSeleccionada = new Map();
            console.log(this.respuestasSeleccionada)
            this.indexLectura++;
            if (this.indexLectura==5) {
                this.esLectura = true
            }
            this.lectura = listalecturas.lecturas[this.indexLectura].lectura
            this.preguntas = listalecturas.lecturas[this.indexLectura].preguntas
            this.opciones = listalecturas.lecturas[this.indexLectura].opciones
            this.respuestas = listalecturas.lecturas[this.indexLectura].respuestas

            this.imagen = require('@/assets/comprensionLectora/imagenes/Lectura' + this.indexLectura + '.jpg')
        },
        comprobar() {
            for (const [key, value] of this.respuestasSeleccionada) {

                if (this.respuestas[key] == value) {
                    console.log("correcta")
                }
                else {
                    console.log("incorrecta")
                }
            }

        }
    }
}

</script>
<style scoped>

p {
    font-size: 20px;
}
</style>