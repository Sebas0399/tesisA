<template>
    <Transition>

        <div class="acerca " v-if="show">

          

            <div class="cuadro">
                <h1>Instrucciones</h1>


                <h2>Antes de acceder a las actividades de Dislextest debes seguir las siguientes reglas:</h2>
                <p>
                <ol>
                    <li>Ingresa tus nombres y apellidos</li>
                    <li>Dislextest es un test dinámico con actividades para identificar tu conocimiento en las parte de
                        lectura y escritura.</li>
                    <li>El test no presenta un tiempo específico puedes tomarte el tiempo que necesites para hacerlo
                    </li>
                    <li>Cada actividades contara con un cierto porcentaje de aciertos y fallos si se te acaban los
                        intentos
                        debes pasar a la siguiente actividad.
                    </li>
                    <li>Hay actividades con audio puedes reproducirlo las veces que quieras y despacio.
                    </li>
                    <li>Las actividades de lectura solo aceptan una sola respuesta. De modo que debes leer de forma
                        detenida.
                    </li>
                    <li>Cada una de las actividades tiene oraciones, palabras al azar debes prestar atención a cada ronda
                        de
                        palabras que te salgan.</li>
                    <li>Dislextest esta centrado en ayudar a identificar de forma previa problemas con la dislexia no es
                        un
                        resultado definitivo sino una prueba previa.</li>
                    <li>
                        Esta diseñado para estudiantes de básica elemental de segundo de básica hasta cuarto de básica.

                    </li>
                    <li>Si necesitas la guía de tus padres para explicación de un apartado del test puedes hacerlo.
                    </li>
                    <li>
                        Al final del test te dará un resultado donde te indicará el porcentaje de cada actividad y se la
                        relacionará con una parte del proceso de lector escritura así que puedes sacarle un foto e indicarle
                        al
                        experto para que evalué tus resultados.</li>
                </ol>



                </p>



                <button @click="empezar" class="siguiente">Comenzar Test</button>
            </div>
            <div class="Fondos">
            </div>

        </div>
    </Transition>
</template>
<script>
export default {
    data() {
        return {
            show: false
        }
    },
    mounted() {
        this.show = true
    },
    methods: {
        empezar() {
            this.$router.push('/inicio')

        }
    }
}
</script>
<style scoped>
img {
    width: 50%;
}

header {
    display: flex;
    justify-content: center;
    align-items: center;
}

.siguiente {

    margin: 10px;
    border-radius: 5px;
    font-size: 20px;

}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.acerca {
    background-image: url("../assets/fondos/Fondo_Lecturas_2.jpg");
  background-position: center;
  /* Center the image */
  background-repeat: no-repeat;
  min-height: 100vh;
  /* Do not repeat the image */
  background-size: 100% 100%;

}

ol{
    text-align: left;
}

.cuadro {
    padding-top: 100px;
    border-radius: 32px 32px 32px 32px;
    -moz-border-radius: 32px 32px 32px 32px;
    -webkit-border-radius: 32px 32px 32px 32px;
    border: 4px solid #0bbd70;
}
li{
    margin: 20px;
}
button{
    background-color: #69f3b7;
    padding: 20px;
    border-radius: 10px;
}
button:hover{
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);

}
</style>