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
        <a href="/Paginas/archivo3.html" class="button">Ir a otro archivo</a>
    </main>
</div>
    <div class="Fondos">
    </div>

</body>
  </div>
</template>
<style scoped>
/* Estilos generales */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
}

header {
    background-color: #0078d4;
    padding: 10px;
    text-align: center;
}

header img {
    max-width: 100%;
    height: auto;
}

main {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

h1 {
    font-size: 24px;
    color: #333;
}

p {
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
}

/* Estilos del botón */
.button {
    display: inline-block;
    background-color: #0078d4;
    color: #fff;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: #005dab;
}
* {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
}

body {
    background-image: linear-gradient(135deg,#00B7D4, #b8fff7,#c2fff8,#d4fff6,#c3fff5,  #e1fff5, #f3fff3);
    background-size: 500%;
    animation:fanimado 10s infinite;;
    
}

.Fondoa {
    color:white;
    text-align: center;
    margin: 300px 0;
    font-size: 28px;
}
 
@keyframes fanimado {
    0% {
        background-position: 0%  50%;
    }
    50% {
        background-position: 100%   50%;
    }
    100% {
        background-position:0%  50%;
    }
}


* {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
}

body {
    background-image: linear-gradient(135deg,#00B7D4,  #b8fff7,#c2fff8,#d4fff6,#c3fff5,  #e1fff5, #f3fff3);
    background-size: 500%;
    animation:fanimado 10s infinite;;
    
}

.Fondos {
    color:white;
    text-align: center;
    margin: 300px 0;
    font-size: 28px;
}

.cuadro {
    border-radius: 32px 32px 32px 32px;
    -moz-border-radius: 32px 32px 32px 32px;
    -webkit-border-radius: 32px 32px 32px 32px;
    border: 4px solid #0bbd70;
}

@keyframes fanimado {
    0% {
        background-position: 0%  50%;
    }
    50% {
        background-position: 100%   50%;
    }
    100% {
        background-position:0%  50%;
    }
}




</style>