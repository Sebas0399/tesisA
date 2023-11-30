<template>
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
  <div class="hello">
    <div class="login-container">
      <div class="login-image">
        <img :src="require('@/assets/logos/Logo.png')" alt="Imagen de perfil" />
      </div>
      <div class="login-form">
        <form>
          <div >
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required v-model="nombre" />
          </div>
          <div>
            <router-link to="/ahorcado">
              <button type="submit" @click="guardarNombre">Empezar</button>
            </router-link>
          </div>

        </form>
      </div>
    </div>

  </div>
</template>

<script>
import Instruccion from "@/components/Instruccion.vue"

export default {
  
  components: {
    Instruccion,
  },
  name: 'HelloWorld',
  data() {
    return {
      visible:true,
      nombre: '',
      instruccion: {
        titulo: "Bienvenido a Dislextest",
        instruccion: "Para continuar ingresa tus nombres y apellidos"
      }
    };
  },
  methods: {
    guardarNombre() {
      const data = {
        nombre: this.nombre
      };
      const jsonData = JSON.stringify(data);

      localStorage.setItem('informe', jsonData);

    }
  }

}
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  border: solid 5px rgb(0, 255, 255);
}

.login-image {
  margin-top: -75px;

  margin-left: -150px;
}

.login-image img {
  max-width: 275px;
}

.login-form {
  margin-top: -100px;
  max-width: 500px;
  font-size: 50px;
  margin-left: 50px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 75%;
  height: 50px;
  padding: 5px;
}

button {
  
  font-size: 30px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  height: 50px;
}

button:hover {
  background-color: #0056b3;
}

.hello {
  background-image: url("../assets/fondos/Fondo_Login.jpeg");
  background-repeat: no-repeat;
  background-size: 100% 100%;

}
.btn-centrar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-centrar button {
  background-color: #69f3b7;
  
  border-radius: 10px;
}

.btn-centrar button:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);

}
</style>
