// Importa:
// - todas las playlists
// - todas las canciones
//
// desde data.ts
import {
    allPlaylists,
    songs as allSongs

} from "../../lib/data";



/* =========================================================
   API GET
========================================================= */

// Esta función se ejecuta cuando alguien hace:
//
// /api/get-info-playlist.json?id=1
//
// Astro crea automáticamente una API route.
export async function GET({ params, request }) {


    /* =====================================================
       OBTENER URL
    ===================================================== */

    // Obtiene la URL completa del request.
    //
    // Ejemplo:
    // http://localhost:4321/api/get-info-playlist.json?id=1
    const { url } = request


    // Convierte el string URL en objeto URL.
    //
    // Esto permite acceder a:
    // - pathname
    // - query params
    // - host
    // etc.
    const urlObject = new URL(url)



    /* =====================================================
       OBTENER ID
    ===================================================== */

    // Obtiene el parámetro "id".
    //
    // Ejemplo:
    // ?id=1
    //
    // resultado:
    // "1"
    const id = urlObject.searchParams.get('id')



    /* =====================================================
       BUSCAR PLAYLIST
    ===================================================== */

    // Busca la playlist cuyo id coincida.
    //
    // find devuelve:
    // - la playlist encontrada
    // - o undefined
    const playlist = allPlaylists.find(
        playlist => playlist.id === id
    )



    /* =====================================================
       BUSCAR CANCIONES
    ===================================================== */

    // Filtra canciones del álbum correspondiente.
    //
    // albumId conecta:
    // playlist -> songs
    const songs = allSongs.filter(
        song => song.albumId === playlist?.albumId
    )



    /* =====================================================
       RESPUESTA JSON
    ===================================================== */

    // Devuelve JSON al frontend.
    //
    // JSON.stringify convierte objeto -> string JSON.
    //
    // content-type:
    // indica que la respuesta es JSON.
    return new Response(

        JSON.stringify({

            playlist,
            songs

        }),

        {
            headers: {

                "content-type": "application/json"

            },
        }
    )
}