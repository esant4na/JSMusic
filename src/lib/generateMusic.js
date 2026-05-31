import fs from "fs";
import path from "path";
import { parseFile } from "music-metadata";

const MUSIC_DIR = "./public/music";
const OUTPUT = "./src/lib/music.ts";

const songs = [];
const playlists = [];

let albumId = 1;

// carpetas principales
const categories = ["free", "private"];

for (const category of categories) {

  const categoryPath = path.join(MUSIC_DIR, category);

  // si la carpeta no existe, la salta
  // ejemplo: en github probablemente no exista private
  if (!fs.existsSync(categoryPath)) continue;

  // albums dentro de free/ o private/
  const folders = fs.readdirSync(categoryPath);

  for (const folder of folders) {

    const folderPath = path.join(categoryPath, folder);

    if (!fs.statSync(folderPath).isDirectory()) continue;

    const files = fs
      .readdirSync(folderPath)
      .filter(file => file.endsWith(".mp3"));

    if (files.length === 0) continue;

    const firstSong = await parseFile(
      path.join(folderPath, files[0])
    );

    playlists.push({
      id: albumId.toString(),
      albumId,
      title: firstSong.common.album || folder,
      cover: `/covers/${albumId}.jpg`,
      artists: firstSong.common.artists || [],
    });

    let songId = 1;

    for (const file of files) {

      const metadata = await parseFile(
        path.join(folderPath, file)
      );

      songs.push({
        id: songId,

        albumId,

        title:
          metadata.common.title ||
          path.parse(file).name,

        image: `/covers/${albumId}.jpg`,

        artists:
          metadata.common.artists || [],

        album:
          metadata.common.album || folder,

        duration:
          Math.floor(metadata.format.duration / 60)
          + ":" +
          String(
            Math.floor(metadata.format.duration % 60)
          ).padStart(2, "0"),

        // ruta completa del mp3
        audio: `${category}/${folder}/${file}`
      });

      songId++;
    }

    albumId++;
  }
}

const content = `
export const playlists = ${JSON.stringify(playlists, null, 2)
  .replace(/"([^"]+)":/g, '$1:')}

export const songs = ${JSON.stringify(songs, null, 2)
  .replace(/"([^"]+)":/g, '$1:')}
`;

fs.writeFileSync(OUTPUT, content);

console.log("music.ts generado");