<template>
    <div class="Inicio">
      <h1 class="logo-header">
        <span class="logo">DISLEX</span><span class="logo">TEST</span>
      </h1>
    </div>
    <header>
      <h4>DISLEXTEST</h4>
    </header>
  </template>
  
  <script>
 
  
  
  export default {
    name: 'HomeView',
    mounted() {
        const Inicio = document.querySelector('.Inicio');
        const logo = document.querySelector('.logo-header');
        const logoSpans = document.querySelectorAll('.logo');
      logoSpans.forEach((span, idx) => {
        setTimeout(() => {
          span.classList.add('active');
        }, (idx + 1) * 400);
      });
  
      setTimeout(() => {
        logoSpans.forEach((span, idx) => {
          setTimeout(() => {
            span.classList.remove('active');
            span.classList.add('fade');
          }, (idx + 1) * 50);
        });
      }, 2000);
  
      setTimeout(() => {
        Inicio.style.top = '-100vh';
      }, 2300);
      setTimeout(() => {
        this.$router.push('acerca');    }, 2750);
    },
  };
  </script>
  
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}


header {
    position: relative;
    left: 0;
    top: 0;
    width: 1005;
    height: 80px;

}

header h4 {
    position: absolute;
    left: 10%;
    bottom: 1rem;
    font-size: 1.6rem;
}

/*splash screen*/

.Inicio {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: #53C9CD;
    transition: 1s;
}

.logo-header {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
}

.span {
    position: absolute;
    display: inline-block;
    bottom: -20px;
    opacity: 0;
}


.logo-active {
    bottom: 0;
    opacity: 1;
    transition: ease-in-out 0.5s;
}

.logo.fade {
    bottom: 150px;
    opacity: 0;
    transition: ease-in-out 0.5s;
}
</style>
