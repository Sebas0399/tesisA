<!-- Navbar.vue -->
<template>
    <Transition>

        <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex mx-auto" v-if="isMouseNearTop">
            <div class="container">
                <a class="navbar-brand" href="#"> <img :src="require('@/assets/logos/LogoFin.png')" width="30"
                        height="30" class="d-inline-block align-top" alt=""></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link">Home</router-link>
                        </li>
                        <router-link to="/ahorcado" class="nav-link">Ahorcado</router-link>
                        <li class="nav-item">
                            <router-link to="/memoria" class="nav-link">Memoria</router-link>
                        </li>
                        <router-link to="/audio" class="nav-link">Audio</router-link>
                        <li class="nav-item">

                            <router-link to="/segmentacion" class="nav-link">Segmentacion</router-link>
                        </li>
                        <li class="nav-item">

                            <router-link to="/comprension" class="nav-link">Comprension</router-link>
                        </li>
                        <li class="nav-item">

                            <router-link to="/informe" class="nav-link">Informe</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </Transition>
</template>
  
<script>
export default {
    data() {
        return {
            isMouseNearTop: true
        };
    },
    mounted() {
        window.addEventListener('mousemove', this.handleMouseMove);
    },
    beforeDestroy() {
        window.removeEventListener('mousemove', this.handleMouseMove);
    },
    methods: {
        handleMouseMove(event) {
            // Obtén la posición Y del mouse
            const mouseY = event.clientY;

            // Define la distancia desde la parte superior donde deseas activar el navbar
            const activationDistance = 50; // Ajusta según sea necesario

            // Calcula si el mouse está cerca de la parte superior
            this.isMouseNearTop = mouseY <= activationDistance;
        },
    },
};
</script>
  
<style scoped>
.navbar--scrolled {
    background-color: #ffffff;
    /* Cambia el color de fondo cuando se desplaza */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* Agrega una sombra cuando se desplaza */
}

.nav-item.active {
    background-color: #e3f2fd;
    /* Cambia el color de fondo para resaltar la página activa */
}

.v-enter-active,

.v-leave-active {
    transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
  