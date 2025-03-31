import React from 'react';

function SearchResults({ song, artist, album, duration, playSong, outUrl, albumCover, albumRelease }) {

    const seconds = Math.floor((duration / 1000) % 60)
    const minutes = Math.floor((duration / 1000) / 60)
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`

    const songDetails = { song, album, artist, albumCover, albumRelease }
    
    return (
        <div className='row border rounded align-items-center text-muted p-1 my-2 mx-4 bg-light bg-gradient'>
            <div className='col'>
                <img src={albumCover} alt="No img" className="p-2" style={{maxWidth: '10vw'}}/>
            </div>
            <div className='col-4 text-dark '>
                <span className="fw-bold">
                    {song}
                </span>
                <br/> by {artist}
            </div>
            <div className="col">
                {/* <div>{artist}</div> */}
                <div>Featured on: <br/>{album} - {albumRelease.slice(0, 4)}</div>
            </div>
            <div className="col">{formattedTime}</div>
            <a className="col btn btn-success p-1 m-1" href={outUrl} target="_blank">Open on Spotify</a>
        </div>
    );
}

export default SearchResults
