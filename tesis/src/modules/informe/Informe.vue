    

<template>
    <div class="contenedor">

        <DataTable :value="todo" tableStyle="min-width: 70rem">
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">Informe de:{{ nombre }}</span>

                </div>
            </template>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="puntaje" header="Puntaje" sortable>
                <template #body="slotProps">
                    <Rating :modelValue="slotProps.data.puntaje/10" readonly :cancel="false" />

                </template>
            </Column>
            <Column header="Porcentaje">
                <template #body="slotProps">
                    {{ slotProps.data.puntaje*2 }}%
                </template>
            </Column>

            <template #footer>
                <Button @click="resetInforme">Reiniciar</Button>
            </template>
        </DataTable>
    </div>
</template>
  
<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            nombre: '',
            ahorcado: '',
            audio: '',
            memoria: '',
            comprension: '',
            todo: null
        };
    },
    mounted() {
        const jsonData = localStorage.getItem('informe');
        const data = JSON.parse(jsonData);

        const jsonDataAhorcado = localStorage.getItem('informeAhorcado');
        const dataAhorcado = JSON.parse(jsonDataAhorcado);

        const jsonDataAudio = localStorage.getItem('informeAudio');
        const dataAudio = JSON.parse(jsonDataAudio);

        const jsonDataMemoria = localStorage.getItem('informeMemoria');
        const dataMemoria = JSON.parse(jsonDataMemoria);

        const jsonDataSegmentacion = localStorage.getItem('informeSegmentacion');
        const dataSegmentacion = JSON.parse(jsonDataSegmentacion);

        const jsonDataComprension = localStorage.getItem('informeComprension');
        const dataComprension = JSON.parse(jsonDataComprension);


        this.nombre = data.nombre; // Esto te da el nombre guardado en el almacenamiento local
        //50 maximo puntaje
        this.ahorcado = this.cacularPuntaje(50, dataAhorcado.ahorcado)
        //50 maximo puntaje
        this.audio = this.cacularPuntaje(50, dataAudio.audio)
        //240 maximo puntaje
        this.memoria = this.cacularPuntaje(240, dataMemoria.memoria)
        //
        this.segmentacion =  this.cacularPuntaje(50, dataSegmentacion.segmentacion)
        this.comprension = this.cacularPuntaje(50, dataComprension.comprension)
        console.log(this.ahorcado)
        this.todo = [
            { nombre: "Ahorcado", puntaje: this.ahorcado },
            { nombre: "Audio", puntaje: this.audio },
            { nombre: "Segmentacion", puntaje: this.segmentacion },
            { nombre: "Memoria", puntaje: this.memoria },
            { nombre: "Comprension", puntaje: this.comprension },
        ]

    },
    methods: {
        resetInforme() {
            localStorage.clear();
            this.$router.push("/")
        },
        cacularPuntaje(maximo, acutal) {

            return (acutal * 50) / maximo;
        }
    }


}
</script>
  
<style scoped>
.contenedor {
    background-image: url("../../assets/fondos/Fondo_Resultados.jpeg");
    background-size: 100% 100%;
    min-height: 100VH;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;

}

.tabla {
    border-radius: 2rem;
    margin: 10rem 2rem;
    border-width: 2px;
    font-size: 30px;

}
</style>
