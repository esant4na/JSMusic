/*es un estado global para controlar el play/pause de las canciones.*/

// Importa la función create desde Zustand.
// create() se usa para crear un estado global compartido.
import { create } from "zustand"

// Importa algo desde el componente Player.
// En este archivo realmente no parece usarse,
// así que probablemente se pueda eliminar.
import { Volume } from "../components/Player"

// Creamos un store global llamado usePlayerStore.
// Este store podrá ser usado desde cualquier componente React.
export const usePlayerStore = create((set) => ({

    // Estado que indica si la música está reproduciéndose.
    // false = pausado
    // true = reproduciendo
    isPlaying: false,

    // Información de la música actual.
    currentMusic: {

        // Playlist actual seleccionada.
        playlist: null,

        // Canción actual.
        song: null,

        // Lista de canciones disponibles.
        songs: []
    },

    // Volumen actual.
    // 1 = volumen máximo
    // normalmente va de 0 a 1
    volume: 1,

    // Función para cambiar el volumen.
    // Recibe un valor y actualiza el estado global.
    setVolume: (volume) => set({ volume }),

    // Función para cambiar el estado play/pause.
    setIsPlaying: (isPlaying) => set({ isPlaying }),

    // Función para cambiar la canción actual.
    // Actualiza currentMusic completo.
    setCurrentMusic: (currentMusic) => set({ currentMusic }),
}))