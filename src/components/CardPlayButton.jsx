// Importa los íconos de Play y Pause
// desde el componente Player.
import { Pause, Play } from "../components/Player"

// Importa el estado global del reproductor usando Zustand.
import { usePlayerStore } from "../store/playerStore"


// Componente del botón Play/Pause.
//
// Recibe:
// - id -> id de la playlist
// - size -> tamaño del ícono
//
// size tiene valor por defecto 'small'
export function CardPlayButton({id, size = 'small'}) {

    // Obtiene datos y funciones del estado global.
    const {
        currentMusic,
        setCurrentMusic,
        isPlaying,
        setIsPlaying
        
        // state => state devuelve TODO el store.
    } = usePlayerStore(state => state)
        

    // Verifica si:
    // - actualmente se está reproduciendo música
    // - y la playlist actual coincide con este botón
    //
    // Si ambas cosas son verdaderas:
    // este botón mostrará Pause.
    const isPlayingPlayList =
        isPlaying &&
        currentMusic?.playlist?.id === id
    

    // Función que se ejecuta al hacer click.
    const handleClick = () => {

        // Si esta playlist ya está reproduciéndose:
        // pausamos la música.
        if (isPlayingPlayList) {

            setIsPlaying(false)

            return 
        }

        // Si NO está reproduciéndose:
        // obtiene la información de la playlist desde la API.
        fetch(`/api/get-info-playlist.json?id=${id}`)

            // Convierte la respuesta a JSON.
            .then(res => res.json())

            // Procesa los datos recibidos.
            .then(data => {

                // Extrae playlist y songs del JSON.
                const { playlist, songs } = data

                // Cambia el estado a reproduciendo.
                setIsPlaying(true)

                // Guarda la playlist actual,
                // canciones y canción inicial.
                setCurrentMusic({
                    playlist,
                    songs,

                    // Primera canción de la playlist.
                    song: songs[0]
                })
            })
    }


    // Determina el tamaño del ícono según la prop size.
    //
    // Tailwind:
    // w-4 h-4 -> pequeño
    // w-5 h-5 -> grande
    const iconClassName =
        size === 'small'
            ? 'w-4 h-4'
            : 'w-5 h-5'


    // Render del botón.
    return (

        <button

            // Evento click.
            onClick={handleClick}

            // Clases Tailwind.
            className="
                card-play-button
                rounded-full
                bg-green-500
                p-4
                hover:scale-105
                transition
                hover:bg-green-600
            "
        >

            {/* 
                Si la playlist está reproduciéndose:
                muestra Pause.
                
                Si no:
                muestra Play.
            */}
            {
                isPlayingPlayList
                    ? <Pause iconClassName={iconClassName} />
                    : <Play iconClassName={iconClassName}/>
            }

        </button>
    )
}