    

<template>
    <DataTable :value="todo" tableStyle="min-width: 50rem">
        <template #header>
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <span class="text-xl text-900 font-bold">Informe de:{{ nombre }}</span>

            </div>
        </template>
        <Column field="nombre" header="Nombre"></Column>
        <Column field="puntaje" header="Puntaje" sortable>
            <template #body="slotProps">
                <Rating :modelValue="slotProps.data.puntaje / 10" readonly :cancel="false" />

            </template>
        </Column>
        <Column header="Porcentaje">
            <template #body="slotProps">
                {{ slotProps.data.puntaje }}%
            </template>
        </Column>

        <template #footer> In total there are {{ todo ? todo.length : 0 }} todo.
            <Button @click="resetInforme">Reset</Button>
        </template>
    </DataTable>
</template>
  
<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            nombre: '',
            ahorcado: '',
            audio: '',
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
        console.log(data)
        console.log(dataAhorcado)
        console.log(dataAudio)
        this.nombre = data.nombre; // Esto te da el nombre guardado en el almacenamiento local
        this.ahorcado = dataAhorcado.ahorcado
        this.audio = dataAudio.audio
        this.todo = [
            { nombre: "Ahorcado", puntaje: this.ahorcado },
            { nombre: "Audio", puntaje: this.audio },
            { nombre: "Lectura", puntaje: this.lectura },
            { nombre: "Segmentacion", puntaje: this.segmentacion },
            { nombre: "Memoria", puntaje: this.memoria }]

    },
    methods: {
        resetInforme() {
            localStorage.clear();

        }
    }


}
</script>
  
<style scoped></style>
  