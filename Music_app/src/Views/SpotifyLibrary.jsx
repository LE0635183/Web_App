import React, { useState } from 'react'
import SearchResults from '../Components/SearchResults'
import { performSearch, performSearchMore } from '../data/spotify';
import MusicPlayer from '../Components/MusicPlayer';
import spotifyIcon from '../assets/Spotify_Icon_CMYK_White.png';
import spotifyLogo from '../assets/Spotify_Logo_CMYK_Black.png';

function SpotifyLibrary() {
  const [isVisibleResults, setIsVisibleResults] = useState(false)
  const [isVisiblePlayer, setIsVisiblePlayer] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [nextResultsUrl, setNextResultsUrl] = useState('')
  const [currentSong, setCurrentSong] = useState({
    album: '',
    artist: '',
    song: '',
    duration: '',
    url: '',
    outUrl: ''
  })

  const playSong = (songDetails) => {
    setCurrentSong(songDetails)
    console.log(songDetails)
    setIsVisiblePlayer(true)
  }

  const onNewSearch = (event) => {
    setKeyword(event.target.value)
  };

  const handleSearch = async () => {
    const results = await performSearch(keyword)
    setIsVisibleResults(true)
    setSearchResults(results.tracks)
    setNextResultsUrl(results.next)
  };
  
  const fetchMoreResults = async () => {
    if (nextResultsUrl) {
      const moreResults = await performSearchMore(nextResultsUrl)
      setSearchResults(prevResults => [...prevResults, ...moreResults.tracks])
      setNextResultsUrl(moreResults.next)
    }
  };

  const playerPadding = isVisiblePlayer ? '180px' : '20px'

  const playerOpen = {
    paddingBottom: playerPadding
  }

  return (
    <div className="text-center" style={playerOpen}>
      <div className="container">
        <a className="btn btn-secondary btn-border-radius-0 position-fixed top-0 start-0" href="/home">Back</a>
      </div>
      <div className="container pt-5">
        <div className="container d-flex justify-content-center align-items-center centered-content">
          <img src={spotifyLogo} style={{ maxHeight: '70px', marginRight: '10px' }} />
          <h1>Library</h1>
        </div>
        <br />
        <div className="input-group input-group-lg mb-3">
          <input type="text" value={keyword} className="form-control" placeholder="Album or Song Name" onChange={onNewSearch} />
          <button className="btn btn-outline-secondary bg-success bg-gradient text-white" type="button"
            id="button-addon2" data-mdb-ripple-init data-mdb-ripple-color="dark" onClick={handleSearch}>
            <div>
              Search
            </div>
            <div>
              <img src={spotifyIcon} alt="logo" style={{ maxHeight: '24px' }} />
            </div>
          </button>
        </div>
        {isVisibleResults && <div>
          <h3>Search Results</h3>
          {searchResults.map(track => {
            return (
              <div key={track.id}>
                <SearchResults song={track.song} artist={track.artist} album={track.album} duration={track.duration}  url={track.url} outUrl={track.outUrl} playSong={playSong} key={track.id} />
              </div>
            )
          })}
          <button className="btn btn-secondary" onClick={fetchMoreResults}>Show More</button>
        </div>}
        {isVisiblePlayer&& <div id='musicPlayer'>
          <MusicPlayer song={currentSong.song} url={currentSong.url} artist={currentSong.artist} />
        </div>}
      </div>
    </div>
  )
}

export default SpotifyLibrary
