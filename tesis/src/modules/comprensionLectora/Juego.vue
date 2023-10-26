<template>
    <div class="container text-center">
        <div class="row">
            <div class="col">
                <img :src=imagen alt="" class="img-fluid">
            </div>
            <div class="col">
                <p>{{ lectura }}</p>
                <div v-for="(pregunta, index) in preguntas" :key="pregunta">
                    <h4>{{ pregunta }}</h4>
                    <div class="form-check  text-start" v-for="(opcion, indexOpt) in opciones[index]" :key="opcion"
                            @click="comprobar(index, indexOpt)" >
                        <input class="form-check-input" type="radio" :name="pregunta" :id="opcion">
                        <label class="form-check-label " :for="opcion" >
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
            lectura: null,
            preguntas: null,
            opciones: null,
            imagen: null,
            respuestas: null,
            indexLectura: 0,
        };
    },
    mounted() {
        this.cargarLecturas();

    },
    methods: {
        cargarLecturas() {

            this.lectura = listalecturas.lecturas[this.indexLectura].lectura
            this.preguntas = listalecturas.lecturas[this.indexLectura].preguntas
            this.opciones = listalecturas.lecturas[this.indexLectura].opciones
            this.respuestas = listalecturas.lecturas[this.indexLectura].respuestas
            this.imagen = require('@/assets/comprensionLectora/imagenes/Lectura' + this.indexLectura + '.jpg')
        },
        siguienteLectura() {
            this.indexLectura++;
            this.lectura = listalecturas.lecturas[this.indexLectura].lectura
            this.preguntas = listalecturas.lecturas[this.indexLectura].preguntas
            this.opciones = listalecturas.lecturas[this.indexLectura].opciones
            this.imagen = require('@/assets/comprensionLectora/imagenes/Lectura' + this.indexLectura + '.jpg')
        },
        comprobar(index, indexOpt) {
            if (this.respuestas[index] == indexOpt) {
                console.log("correcta")
            }
            else {
                console.log("incorrecta")
            }
        }
    }
}

</script>
<style scoped>
img {}

p {
    font-size: 20px;
}
</style>