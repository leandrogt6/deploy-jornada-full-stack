import React from "react";
import Player from "../components/Player";
import { Link, useParams } from "react-router-dom";
import { songsArray } from "../assets/database/songs";
import { artistArray } from "../assets/database/artists";

const Song = () => {
  const { id } = useParams();

  // Encontrar a música pelo ID
  const currentSong = songsArray.find((song) => song._id === id);

  if (!currentSong) {
    console.error(`Música com ID ${id} não encontrada.`);
    return <p>Música não encontrada</p>;
  }

  const { image, name, duration, artist, audio } = currentSong;

  // Encontrar o artista da música
  const artistObj = artistArray.find(
    (artistItem) => artistItem.name === artist
  );

  if (!artistObj) {
    console.error(`Artista ${artist} não encontrado.`);
    return <p>Artista não encontrado</p>;
  }

  // Pegar todas as músicas do mesmo artista
  const songsArrayFromArtist = songsArray.filter(
    (song) => song.artist === artist
  );

  // Evitar erro caso tenha menos de duas músicas
  const getRandomSongId = () => {
    if (songsArrayFromArtist.length < 2) return id;
    let randomSong;
    do {
      randomSong =
        songsArrayFromArtist[
          Math.floor(Math.random() * songsArrayFromArtist.length)
        ];
    } while (randomSong._id === id); // Evita selecionar a mesma música
    return randomSong._id;
  };

  const randomIdFromArtist = getRandomSongId();
  const randomId2FromArtist = getRandomSongId();

  return (
    <div className="song">
      <div className="song__container">
        <div className="song__image-container">
          <img src={image} alt={`Imagem da música ${name}`} />
        </div>
      </div>

      <div className="song__bar">
        <Link to={`/artist/${artistObj._id}`} className="song__artist-image">
          <img
            width={75}
            height={75}
            src={artistObj.image}
            alt={`Imagem do Artista ${artist}`}
          />
        </Link>

        <Player
          duration={duration}
          currentSongId={id}
          randomIdFromArtist={randomIdFromArtist}
          randomId2FromArtist={randomId2FromArtist}
          audio={audio}
        />

        <div>
          <p className="song__name">{name}</p>
          <p>{artist}</p>
        </div>
      </div>
    </div>
  );
};

export default Song;
