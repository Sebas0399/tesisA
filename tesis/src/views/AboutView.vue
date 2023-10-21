<template>
  <div class="about">
    <body>
    <header>
      <img src="@/assets/logos/Logo1Test.png" />    </header>
    
    <div class="cuadro"> 
    <main>
        <h1>Bienvenidos a Dislextest</h1>
        <p><b>DISLEXTEST</b></p>

         <h2>¿Qué es?</h2>
         <p>Dislextest es un test digital dirigido a estudiantes de segundo y tercero de básica elemental que comprenden una edad entre 5 a 7 años. Este test concentra una serie de ejercicios que se enfocan en los procesos de lecto-escritura que desarrollan en los primeros años escolares de cada estudiante. Este surge como una ayuda preventiva para generar una detección de falencias dentro del los procesos de lectura y escritura. Permitiendo identificar algunos síntomas que indiquen que los estudiantes tengan un trastorno del aprendizaje que se oriente en los procesos de lecto-escritura.</p>
             
         <h2>Objetivo</h2>

         <p>Identificar de forma preventiva los síntomas del trastorno del aprendizaje no asociado a un discapacidad conocido como dislexia en los estudiantes de un rango de edad de 5 a 7 años con ayuda de procesos dinámicos y enfocados en la lecto-escritura.</p>
        
         <h2>Su eje principal</h2>

         <p>El test se centra en una innovación en la forma en la que se toma los test para detectar los trastornos del aprendizaje no asociados a una discapacidad. Estos ejercicios que son los mas comunes en la mayoría de los test son llevados de forma dinámica, lúdica y apegados a la metodología de la gamificación a la parte digital. Esto permite que el estudiante pueda lo vea al test de una forma amigable, sin precisión o miedo.</p>
          <p>El test se compondrá de ejercicios que se enfocan en los procesos de comprensión lectora, de conciencia fonológica, así como la parte de la memoria, identificación de palabras entre otros.</p>
          <p>Cada ejercicio del test se compone a modo de nivel. Es decir, debe completar uno para pasar al siguiente. Dándole un porcentaje al estudiante de errores y aciertos al final de cada uno de los ejercicios en base a cada una temáticas que lo componen.</p>

         <h2>Beneficios</h2>
        <ol>
            <li>Involucra al estudiante de forma dinámica y lúdica aprender sobre los procesos de lecto-escritura.</li>
            <li>Permite identificar los síntomas iniciales del trastorno del aprendizaje de la dislexia.</li>
            <li>Da un diagnostico preventivo de dificultades o fallas en los procesos de lecto-escritura.</li>
            <li>Ideal para identificar falencia en los problemas en las parte de la fonología y la compresión lectura.</li>
        </ol> 

        <p>Para iniciar el test de clic en el siguiente botón y lea las instrucciones de forma cuidadosa</p>
        
        <button @click="empezar" class="siguiente">Empezar</button>
    </main>
</div>
    <div class="Fondos">
    </div>

</body>
  </div>
</template>
<script>
export default{
  methods:{
    empezar(){
      this.$router.push('/ahorcado')

    }
  }
}
</script>
<style scoped>


.siguiente{
 
 margin: 10px;
 border-radius: 5px;
 font-size: 20px;

}
</style>