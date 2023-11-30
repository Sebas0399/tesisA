<template>
    <div class="cont-instrucciones">

    
        <h1>{{ titulo }}</h1>
        <h3>{{ instruccion }}</h3>
    </div>
</template>
<script>
export default {
    props:{
        titulo:String,instruccion:String,siguiente:String
    },
    data() {
        return {
           
        }
    },
    methods: {
        empezar() {
            this.$router.push('/'+siguiente)

        }
    }
}
</script>
<style scoped>
.cont-instrucciones{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
h3{
    margin-top: 20px;
}
</style>