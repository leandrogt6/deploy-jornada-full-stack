import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { songsArray } from "../assets/database/songs";

// Função para formatar o tempo
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(timeInSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

// Converte string "mm:ss" para segundos
const timeInSeconds = (timeString) => {
  const [minutes, seconds] = timeString.split(":").map(Number);
  return minutes * 60 + seconds;
};

const Player = ({ duration, audio, currentSongId, onSongEnd }) => {
  const navigate = useNavigate();
  const audioPlayer = useRef(null);
  const progressbar = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00");

  const durationInSeconds = timeInSeconds(duration);

  // Buscar a música atual
  const currentSong = songsArray.find((song) => song._id === currentSongId);

  if (!currentSong) {
    console.error(`Música com ID ${currentSongId} não encontrada!`);
    navigate(`/song/${songsArray[0]._id}`);
    return null;
  }

  // Escolher uma música aleatória de um artista diferente
  const getRandomSongFromDifferentArtist = () => {
    const differentArtistSongs = songsArray.filter(
      (song) => song.artist !== currentSong.artist
    );

    if (differentArtistSongs.length === 0) {
      console.warn("Nenhuma música de artista diferente encontrada.");
      return currentSongId;
    }

    const randomIndex = Math.floor(Math.random() * differentArtistSongs.length);
    return differentArtistSongs[randomIndex]._id;
  };

  useEffect(() => {
    if (!audioPlayer.current) {
      audioPlayer.current = new Audio(audio);
    } else {
      audioPlayer.current.src = audio;
    }

    const audioElement = audioPlayer.current;

    const updateProgress = () => {
      setCurrentTime(formatTime(audioElement.currentTime));
      if (progressbar.current) {
        progressbar.current.style.setProperty(
          "--_progress",
          (audioElement.currentTime / durationInSeconds) * 100 + "%"
        );
      }
    };

    const handleEnd = () => {
      const nextSongId = getRandomSongFromDifferentArtist();
      if (onSongEnd) {
        onSongEnd(nextSongId);
      } else {
        navigate(`/song/${nextSongId}`);
      }
    };

    if (isPlaying) {
      audioElement.play();
    }

    audioElement.addEventListener("timeupdate", updateProgress);
    audioElement.addEventListener("ended", handleEnd);

    return () => {
      audioElement.pause();
      audioElement.removeEventListener("timeupdate", updateProgress);
      audioElement.removeEventListener("ended", handleEnd);
    };
  }, [audio, isPlaying, durationInSeconds, navigate, currentSongId, onSongEnd]);

  const playPause = () => {
    if (!audioPlayer.current) return;
    if (isPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="player">
      <div className="player__controllers">
        <Link to={`/song/${getRandomSongFromDifferentArtist()}`}>
          <FontAwesomeIcon className="player__icon" icon={faBackwardStep} />
        </Link>

        <FontAwesomeIcon
          className="player__icon player__icon--play"
          icon={isPlaying ? faCirclePause : faCirclePlay}
          onClick={playPause}
        />

        <Link to={`/song/${getRandomSongFromDifferentArtist()}`}>
          <FontAwesomeIcon className="player__icon" icon={faForwardStep} />
        </Link>
      </div>

      <div className="player__progress">
        <p>{currentTime}</p>
        <div className="player__bar">
          <div ref={progressbar} className="player__bar-progress"></div>
        </div>
        <p>{duration}</p>
      </div>

      <audio ref={audioPlayer}></audio>
    </div>
  );
};

export default Player;
