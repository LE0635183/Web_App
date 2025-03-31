import React, { useState, useEffect } from 'react';
import LocalTrack from '../Components/LocalTrack';
import 'react-h5-audio-player/lib/styles.css';
import { localTracks } from '../data/localTracks';
import MusicPlayer from '../Components/MusicPlayer';

function LocalLibrary() {
  const [source, setSource] = useState('');
  const [currentSong, setCurrentSong] = useState({
    name: '',
    artist: '',
  });

  const playSong = (url, songDetails) => {
    setSource(url);
    setCurrentSong(songDetails);
  };

  const handleSongEnd = () => {
    const trackName = currentSong.name;
    const playedTracks = JSON.parse(localStorage.getItem('playedTracks')) || {};
    playedTracks[trackName] = (playedTracks[trackName] || 0) + 1;
    localStorage.setItem('playedTracks', JSON.stringify(playedTracks));
    setCurrentSong({
      name: '',
      artist: '',
    }); 
  };

  useEffect(() => {
    if (!localStorage.getItem('playedTracks')) {
      localStorage.setItem('playedTracks', JSON.stringify({}));
    }
  }, []);

  return (
    <div className='text-center'>
      <h1>Local Music</h1>
      <div className='px-2 container-fluid' style={{ paddingBottom: '175px' }}>
        <div className='row'>
          {localTracks.map((track) => {
            const listens = JSON.parse(localStorage.getItem('playedTracks'))?.[track.name] || 0;

            return (
              <div className='col-6' key={track.id}>
                <LocalTrack
                  name={track.name}
                  artist={track.artist}
                  duration={track.duration}
                  source={track.source}
                  listens={listens}
                  playSong={playSong}
                />
              </div>
            );
          })}
        </div>
        <a className='btn btn-secondary' href='/'>
          Back
        </a>
      </div>
      {currentSong.name && (
        <div className='container border rounded fixed-bottom bg-white'>
          <h4>
            Playing: <span className='fw-bold'>{currentSong.name}</span> by {currentSong.artist}
          </h4>
          <MusicPlayer
            song={currentSong.name}
            url={source}
            artist={currentSong.artist}
            onEnded={handleSongEnd}
          />
        </div>
      )}
    </div>
  );
}

export default LocalLibrary;
