<template>
  <div class="hello">
    <div class="login-container">
      <div class="login-image">
        <img src="assets/images/saludp.png" alt="Imagen de perfil" />
      </div>
      <div class="login-form">
        <h2>Bienvenido</h2>
        <form>
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required v-model="nombre" />
          </div>

          <router-link to="/ahorcado">
            <button type="submit" @click="guardarNombre">Empezar</button>
          </router-link>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      nombre: ''
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
  margin-right: 20px;
}

.login-image img {
  max-width: 500px;
}

.login-form {
  max-width: 300px;
  font-size: 50px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 5px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
