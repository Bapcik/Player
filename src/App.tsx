import { useState, useEffect } from "react";
import Player from "./сomponents/Player";
import "./App.css";

const App = () => {
  const [song] = useState([
    {
      title: "A Million On My Soul",
      artist: "Alexiane, EMR3YGUL, Moses",
      path: "/music/AMillionOnMySoul.mp3",
    },
    {
      title: "Rampampam",
      artist: "Minelli",
      path: "/music/Rampampam.mp3",
    },
    {
      title: "А уже фсе",
      artist: "MITCHEL",
      path: "/music/AndThatsAll.mp3",
    },
  ]);

  
  const [currentSong, setCurrentSong] = useState(0);
  useEffect(() => {
    const playNext = () => {
      return currentSong + 1;
    };
  }, [currentSong]);

  return (
    <Player
      currentSong={currentSong}
      setCurrentSong={setCurrentSong}
      song={song}
    />
  );
};

export default App;
