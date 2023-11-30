<template>
  <Transition>

    <div class="acerca " v-if="show">

      <header>
        <img :src="require('@/assets/logos/Logo1Test.png')" />
      </header>

      <div class="cuadro">
        <h1><strong>Bienvenidos a Dislextest</strong></h1>

        <h2><strong>¿Qué es?</strong></h2>
        <p>Dislextest es un test digital dirigido a estudiantes de segundo y tercero de básica elemental que
          comprenden
          una edad entre 5 a 7 años. Este test concentra una serie de ejercicios que se enfocan en los procesos de
          lecto-escritura que desarrollan en los primeros años escolares de cada estudiante. Este surge como una ayuda
          preventiva para generar una detección de falencias dentro del los procesos de lectura y escritura.
          Permitiendo
          identificar algunos síntomas que indiquen que los estudiantes tengan un trastorno del aprendizaje que se
          oriente en los procesos de lecto-escritura.</p>

        <h2><strong>Objetivo</strong></h2>

        <p>Identificar de forma preventiva los síntomas del trastorno del aprendizaje no asociado a un discapacidad
          conocido como dislexia en los estudiantes de un rango de edad de 5 a 7 años con ayuda de procesos dinámicos
          y
          enfocados en la lecto-escritura.</p>

        <h2><strong>Su eje principal</strong></h2>

        <p>El test se centra en una innovación en la forma en la que se toma los test para detectar los trastornos del
          aprendizaje no asociados a una discapacidad. Estos ejercicios que son los mas comunes en la mayoría de los
          test son llevados de forma dinámica, lúdica y apegados a la metodología de la gamificación a la parte
          digital.
          Esto permite que el estudiante pueda lo vea al test de una forma amigable, sin precisión o miedo.</p>
        <p>El test se compondrá de ejercicios que se enfocan en los procesos de comprensión lectora, de conciencia
          fonológica, así como la parte de la memoria, identificación de palabras entre otros.</p>
        <p>Cada ejercicio del test se compone a modo de nivel. Es decir, debe completar uno para pasar al siguiente.
          Dándole un porcentaje al estudiante de errores y aciertos al final de cada uno de los ejercicios en base a
          cada una temáticas que lo componen.</p>

        <h2><strong>Beneficios</strong></h2>
        <ul>
          <li>Involucra al estudiante de forma dinámica y lúdica aprender sobre los procesos de lecto-escritura.</li>
          <li>Permite identificar los síntomas iniciales del trastorno del aprendizaje de la dislexia.</li>
          <li>Da un diagnostico preventivo de dificultades o fallas en los procesos de lecto-escritura.</li>
          <li>Ideal para identificar falencia en los problemas en las parte de la fonología y la compresión lectura.
          </li>
        </ul>

        <p>Para iniciar el test de clic en el siguiente botón y lea las instrucciones de forma cuidadosa</p>

        <button @click="empezar" class="siguiente">Siguiente</button>
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
  margin-left: 75px;
  margin-top: 10px;
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
  background-color: #69f3b7;
    padding: 20px;
    border-radius: 10px;

}
.siguiente:hover{
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);

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
  background-image: linear-gradient(135deg, #00B7D4, #b8fff7, #c2fff8, #d4fff6, #c3fff5, #e1fff5, #f3fff3);
  background-size: 500%;
  animation: fanimado 10s infinite;
padding-bottom: 50px;
}



.cuadro {
  background-color: white;
  margin-top: 50px;
  margin-left: 50px;
  margin-right: 50px;

  padding: 20px;
  border-radius: 32px 32px 32px 32px;
  -moz-border-radius: 32px 32px 32px 32px;
  -webkit-border-radius: 32px 32px 32px 32px;
  border: 4px solid orange;
}

@keyframes fanimado {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }

 
}</style>