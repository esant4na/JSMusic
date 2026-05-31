// Hooks de React.
//
// useRef:
// guarda referencias persistentes.
//
// useEffect:
// ejecuta lógica cuando algo cambia.
//
// useState:
// guarda estados locales.
import { useRef, useEffect, useState } from "react"


// Importa el estado global del reproductor usando Zustand.
import { usePlayerStore } from "../store/playerStore"


// Componente Slider personalizado.
import { Slider } from "./Slider"



/* =========================================================
   ICONOS SVG
========================================================= */

// Ícono Play.
export const Play = ({className}) => (
    <svg className={className} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16">
        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>
)

// Ícono Pause.
export const Pause = ({className}) => (
    <svg className={className} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" >
        <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>
)

// Ícono volumen apagado.
export const VolumeSilence = () => (
    <svg fill="currentColor" role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volumen apagado"
        viewBox="0 0 16 16">
        <path
            d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path>
        <path
            d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
    </svg>
)

// Ícono volumen alto.
export const Volume = () => (
    <svg fill="currentColor" role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volumen alto"
        id="volume-icon" viewBox="0 0 16 16">
        <path
            d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
        <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
    </svg>
)

/* =========================================================
   CURRENT SONG
========================================================= */

// Muestra la canción actual:
// portada, título y artistas.
const CurrentSong = ({ image, title, artists }) => {
    return (
        <div className={`flex items-center gap-5 relative overflow-hidden`}>
            <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
                <img src={image} alt={title} />
            </picture>

            <div className="flex flex-col">
                <h3 className="font-semibold block">
                    {title}
                </h3>
                <span className="text-xs opacity-70">
                    {artists?.join(',')}
                </span>
            </div>
        </div>
    )
}

/* =========================================================
   SONG CONTROL
========================================================= */

// Controla:
// - tiempo actual
// - barra de progreso
// - duración
const SongControl = ({audio}) => {

    // Estado local del tiempo actual.
    const [currentTime, setCurrentTime] = useState(0)

    // useEffect:
    // escucha el evento timeupdate del audio.
    useEffect(() => {

        audio.current.addEventListener('timeupdate', handleTimeUpdate)

        // Limpieza del evento.
        return () => {
            audio.current.removeEventListener('timeupdate', handleTimeUpdate)
        }

    }, [])

    // Actualiza currentTime.
    const handleTimeUpdate = () => {
        setCurrentTime(audio.current.currentTime)
    }

    // Convierte segundos a MM:SS
    const formatTime = (time) => {
        if (time == null) return `00:00`

        const seconds = Math.floor(time % 60)
        const minutes = Math.floor(time / 60)

        //return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    // Duración total del audio.
    const duration = audio?.current?.duration ?? 0

    return (
        <div className="flex gap-x-3 text-xs pt-2">
            <span className="opacity-50 w-12 text-right">{formatTime(currentTime)}</span>

                {/* Barra de progreso */}
                <Slider
                defaultValue={[0]}
                value={[currentTime]}
                max={audio?.current?.duration ?? 0}
                min={0}
                className="w-[400px]"

                // Cambia el tiempo de reproducción.
                onValueChange={(value) => {
                    audio.current.currentTime = value
                }}
            />

            {/* Duración total */}
            <span className="opacity-50 w-12">
                {duration ? formatTime(duration) : '0:00'}
            </span>
        </div>
    )
}

/* =========================================================
   VOLUME CONTROL
========================================================= */

// Control del volumen.
const VolumeControl = () => {

    // Obtiene volumen global.
    const volume = usePlayerStore(state => state.volume)

    // Función para actualizar volumen.
    const setVolume = usePlayerStore(state => state.setVolume)

    // Guarda el volumen anterior.
    const previousVolumeRef = useRef(volume)

    // Verifica si está muteado.
    const isVolumeSilence = volume < 0.1

    // Botón mute/unmute.
    const handleClickVolumen = () => {

        // Si está muteado:
        // recupera volumen anterior.
        if(isVolumeSilence) {
            setVolume(previousVolumeRef.current)
        } else {

            // Guarda volumen actual.
            previousVolumeRef.current = volume

            // Mutea.
            setVolume(0)
        }
    }

    return (
        <div className="flex justify-center gap-x-2 text-white">

            {/* Botón volumen */}
            <button className="opacity-70 hover:opacity-100 transition" onClick={handleClickVolumen}>

                {/* Cambia ícono */}
                {isVolumeSilence ? <VolumeSilence /> : <Volume />}

            </button>
        
        {/* Slider volumen */}
        <Slider
            defaultValue={[100]}
            max={100}
            min={0}
            value={[volume * 100]}
            className="w-[95px]"
            onValueChange={(value) => {
                const [newVolume] = value

                // Convierte 0-100 a 0-1
                const volumeValue = newVolume / 100
                setVolume(volumeValue)
            }
            }
        />
        </div>
    )
}

/* =========================================================
   PLAYER PRINCIPAL
========================================================= */

export function Player() {

    // Estado global del reproductor.
    const { currentMusic, isPlaying, setIsPlaying, volume } = usePlayerStore(state => state);

    // Referencia al elemento <audio>.
    const audioRef = useRef()

    /* -----------------------------------------------------
    Cambia volumen cuando volume cambia
    ----------------------------------------------------- */
    useEffect(() => {
        audioRef.current.volume = volume
    }, [volume])

    /* -----------------------------------------------------
    Play / Pause
    ----------------------------------------------------- */
    useEffect(() => {
        isPlaying
            ? audioRef.current.play()
            : audioRef.current.pause()
    }, [isPlaying])

    /* -----------------------------------------------------
       Cambia canción
    ----------------------------------------------------- */
    useEffect(() => {
        const { song, playlist, songs } = currentMusic

        // Si hay canción:
        if (song) {

            // Construye ruta del mp3.
            const src = `/music/${song?.audio}`

            // Cambia audio.
            audioRef.current.src = src

            // Aplica volumen.
            audioRef.current.volume = volume

            // Reproduce.
            audioRef.current.play()
        }
    }, [currentMusic])

    // Botón play/pause principal.
    const handleClick = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <div className="flex flex-row justify-between w-full px-4 z-50">

            {/* Canción actual */}
            <div className="w-[200px]">
                <CurrentSong {...currentMusic.song} />
            </div>

            <div className="grid place-content-center gap-4 flex-1">
                <div className="flex justify-center flex-col items-center">

                    {/* Botón Play/Pause */}
                    <button className="bg-white rounded-full p-2" onClick={handleClick}>
                        {isPlaying ? <Pause /> : <Play />}
                    </button>

                    {/* Barra progreso */}
                    <SongControl audio={audioRef} />

                    {/* Elemento audio HTML */}
                    <audio ref={audioRef} />
                    
                </div>
            </div>

            <div className="grid place-content-center">
                <VolumeControl />
                
                {/* <Slider
                    defaultValue={[100]}
                    max={100}
                    min={0}
                    className="w-[95px]"
                    onValueChange={(value) => {
                        const [newVolume] = value
                        const volumeValue = newVolume / 100
                        volumeRef.current = volumeValue
                        audioRef.current.volume = volumeValue
                    }
                    }
                /> */}
                
            </div>
        </div>
    )
}