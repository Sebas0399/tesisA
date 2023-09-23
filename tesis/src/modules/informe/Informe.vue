<template>
    
    <div>
        <h1>{{ nombre }}</h1>
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
    mounted() {
        const jsonData = localStorage.getItem('informe');
        const data = JSON.parse(jsonData);
        console.log(data)
        this.nombre = data.nombre; // Esto te da el nombre guardado en el almacenamiento local

    },
   

}
</script>
  
<style scoped></style>
  