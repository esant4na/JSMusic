<script lang="ts">

// lang="ts"
// indica que el script usa TypeScript.


// Obtiene la fecha y hora actual del sistema.
const currentTime = new Date()


// Obtiene solamente la hora actual.
// Devuelve un número entre 0 y 23.
const currentHour = currentTime.getHours()


// Variable donde se guardará el saludo.
let greeting = ""


// Si la hora es menor a 12:
// muestra "Good Morning"
if(currentHour < 12) {

    greeting = "Good Morning"

// Si la hora es menor a 18:
// muestra "Good Afternoon"
} else if(currentHour < 18) {

    greeting = "Good Afternoon"

// Si no:
// muestra "Good Evening"
} else {

    greeting = "Good Evening"
}	

</script>


<!--
    Muestra el saludo en pantalla.
    
    {greeting}
    inserta el valor de la variable.
    
    Tailwind:
    text-3xl -> texto grande
    font-bold -> negrita
-->
<h1 class="text-3xl font-bold">
    {greeting}
</h1>