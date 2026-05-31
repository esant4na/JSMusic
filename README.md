# JSMusic

Aplicación web de música desarrollada con Astro, React y Svelte.

El proyecto comenzó como base de aprendizaje a partir de un tutorial y posteriormente fue ampliado con funcionalidades propias como:

* reproducción persistente entre páginas
* generación automática de metadata
* organización dinámica de álbumes
* soporte para múltiples carpetas de música
* interfaz personalizada

## Tecnologías

* Astro
* React
* Svelte
* JavaScript
* CSS
* Node.js

## Features

* Reproductor de música
* Metadata automática desde archivos MP3
* Organización por álbumes
* Sistema de covers
* Persistencia de audio entre navegación
* Generación automática de `music.ts`

## Estructura del proyecto

```text
public/
   music/
      free/
      private/

src/
   components/
   layouts/
   pages/
   scripts/
```

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Notas

La carpeta `public/music/private` no se incluye en el repositorio debido a copyright y uso personal de archivos de música.

## Créditos

Proyecto inspirado inicialmente en un tutorial y posteriormente expandido con funcionalidades propias.
