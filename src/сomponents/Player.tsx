import { useState, useRef, useEffect } from "react";
import { PlayerDetails } from "./PlayerDetails";
import { PlayerControls } from "./PlayerControls";

const Player = (props: any) => {
  const audioElement = useRef<HTMLAudioElement | any>(null);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (playing && ended) {
      setEnded(false);
      skipSong(true);
    }
  }, [playing, ended]);

  useEffect(() => {
    if (audioElement) {
      if (playing) {
        audioElement.current.play();
      } else {
        audioElement.current.pause();
      }
    }
  }, [playing]);

  useEffect(() => {
    audioElement.current.addEventListener("ended", endSong);
    audioElement.current.addEventListener("timeupdate", updateTime);
    audioElement.current.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audioElement.current.removeEventListener("ended", endSong);
      audioElement.current.removeEventListener("timeupdate", updateTime);
      audioElement.current.removeEventListener(
        "loadedmetadata",
        updateDuration
      );
    };
  }, []);

  const endSong = () => {
    setEnded(true);
  };

  const updateTime = () => {
    setCurrentTime(audioElement.current.currentTime);
  };

  const updateDuration = () => {
    setDuration(audioElement.current.duration);
  };

  const skipSong = (forwards = true) => {
    if (forwards) {
      props.setCurrentSong((prevSong: any) => {
        let temp = prevSong + 1;

        if (temp > props.song.length - 1) {
          temp = 0;
        }
        return temp;
      });
    } else {
      props.setCurrentSong((prevSong: any) => {
        let temp = prevSong - 1;

        if (temp < 0) {
          temp = props.song.length - 1;
        }
        return temp;
      });
    }
  };

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="player">
      <audio
        src={props.song[props.currentSong].path}
        ref={audioElement}
      ></audio>
      <h4>Играет сейчас:</h4>
      <PlayerDetails song={props.song[props.currentSong]} />
      <PlayerControls
        playing={playing}
        setPlaying={setPlaying}
        skipSong={skipSong}
      />
      <div className="bar">
        <progress value={currentTime} max={duration}></progress>
      </div>
      <div className="time">
        <span>{formatTime(currentTime)}</span> /{" "}
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default Player;
