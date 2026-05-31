import fs from "fs";
import path from "path";
import { parseFile } from "music-metadata";

const MUSIC_DIR = "./public/music";
const OUTPUT = "./src/lib/music.ts";

const playlists = [];
const songs = [];

let albumId = 1;

const categories = ["private", "free"];

for (const category of categories) {

  const categoryPath = path.join(MUSIC_DIR, category);

  if (!fs.existsSync(categoryPath)) continue;

  // artistas
  const artistsFolders = fs.readdirSync(categoryPath);

  for (const artistFolder of artistsFolders) {

    const artistPath = path.join(
      categoryPath,
      artistFolder
    );

    if (!fs.statSync(artistPath).isDirectory()) continue;

    // albums
    const albumFolders = fs.readdirSync(artistPath);

    for (const albumFolder of albumFolders) {

      const albumPath = path.join(
        artistPath,
        albumFolder
      );

      if (!fs.statSync(albumPath).isDirectory()) continue;

      // mp3 files
      const files = fs
        .readdirSync(albumPath)
        .filter(file =>
          file.toLowerCase().endsWith(".mp3")
        );

      if (files.length === 0) continue;

      // detecta portada
      let coverFile =
        fs.readdirSync(albumPath)
          .find(file =>
            file.startsWith("cover.")
          );


      // si NO existe cover físico
      if (!coverFile) {

        // usa la primera canción del álbum
        const firstSongPath = path.join(
          albumPath,
          files[0]
        );

        const firstSongMetadata =
          await parseFile(firstSongPath);

        const picture =
          firstSongMetadata.common.picture?.[0];

        // si el mp3 tiene portada embebida
        if (picture) {

          // extensión según formato
          let extension = "jpg";

          if (picture.format.includes("png")) {
            extension = "png";
          }

          if (picture.format.includes("webp")) {
            extension = "webp";
          }

          coverFile = `cover.${extension}`;

          // guarda el cover automáticamente
          fs.writeFileSync(
            path.join(albumPath, coverFile),
            picture.data
          );
        }
      }


      // ruta final cover
      const coverPath = coverFile
        ? `/music/${category}/${artistFolder}/${albumFolder}/${coverFile}`
        : "/default-cover.jpg";



      // metadata primera canción
      const firstSong = await parseFile(
        path.join(albumPath, files[0])
      );

      playlists.push({
        id: albumId.toString(),

        albumId,

        title:
          firstSong.common.album ||
          albumFolder,

        cover: coverPath,

        artists:
          firstSong.common.artists ||
          [artistFolder],
      });

      let songId = 1;

      for (const file of files) {

        const filePath = path.join(
          albumPath,
          file
        );

        const metadata = await parseFile(
          filePath
        );

        const durationSeconds =
          metadata.format.duration || 0;

        const minutes =
          Math.floor(durationSeconds / 60);

        const seconds =
          Math.floor(durationSeconds % 60)
            .toString()
            .padStart(2, "0");

        songs.push({

          id: songId,

          albumId,

          title:
            metadata.common.title ||
            path.parse(file).name,

          image: coverPath,

          artists:
            metadata.common.artists ||
            [artistFolder],

          album:
            metadata.common.album ||
            albumFolder,

          duration:
            `${minutes}:${seconds}`,

          audio:
            `/music/${category}/${artistFolder}/${albumFolder}/${file}`,
        });

        songId++;
      }

      albumId++;
    }
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

