import React, { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function MusicPlayer(props) {
  const [playCounted, setPlayCounted] = useState(false);

  const handleEnded = () => {
    if (!playCounted) {
      if (typeof props.onEnded === 'function') {
        props.onEnded();
        setPlayCounted(true);
      }
    }
  };

  return (
    <div className="container border rounded fixed-bottom bg-dark bg-gradient text-light">
      <h4>
        Playing: <span className='fw-bold text-light'>{props.song}</span> by {props.artist}
      </h4>
      <div className="container my-1">
        <AudioPlayer autoPlay={true} src={props.url} volume={0.5} onEnded={handleEnded} />
      </div>
    </div>
  );
}

export default MusicPlayer;
